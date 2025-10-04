import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { ChooseAnimalDialog } from "../dialogs/choose-animal-dialog-box";
import { ChooseUserDialog } from "@/dialogs/choose-user-dialog-box";
import { useToggleState } from "@/hooks/use-toggle-state";
import { useCreateNotification } from "@/hooks/api/notification.hook";
import { useToast } from "@/hooks/use-toast";
import {
  AnimalPublic,
  PublicUser,
  RoleType,
  NotificationTypes,
  NotificationPriorities,
  NotificationPriorityValues,
} from "@repo/shared";
import { Bell } from "lucide-react";

interface NotifyNutritionistDialogProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function NotifyNutritionistDialog({
  isOpen,
  onOpenChange,
  trigger,
}: NotifyNutritionistDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<NotificationPriorityValues>(
    NotificationPriorities.MEDIUM
  );
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalPublic | null>(
    null
  );
  const [selectedNutritionist, setSelectedNutritionist] =
    useState<PublicUser | null>(null);

  const [isAnimalDialogOpen, openAnimalDialog, closeAnimalDialog] =
    useToggleState();
  const [
    isNutritionistDialogOpen,
    openNutritionistDialog,
    closeNutritionistDialog,
  ] = useToggleState();

  const { mutateAsync: createNotification, isPending } =
    useCreateNotification();
  const { toast } = useToast();

  const handleSelectAnimal = (animal: AnimalPublic) => {
    setSelectedAnimal(animal);
    closeAnimalDialog();
  };

  const handleSelectNutritionist = (user: PublicUser) => {
    setSelectedNutritionist(user);
    closeNutritionistDialog();
  };

  const handleSendNotification = async () => {
    if (!selectedAnimal || !selectedNutritionist || !title.trim()) {
      return;
    }

    try {
      await createNotification({
        title: title.trim(),
        description: description.trim() || undefined,
        type: NotificationTypes.DIET_PLAN_REQUEST,
        priority: priority,
        recipient: selectedNutritionist.id,
        animal: selectedAnimal.id,
      });

      toast({
        title: "Notification sent successfully!",
        description: `Nutritionist ${selectedNutritionist.name} has been notified about ${selectedAnimal.name}.`,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setPriority(NotificationPriorities.MEDIUM);
      setSelectedAnimal(null);
      setSelectedNutritionist(null);

      // Close dialog
      onOpenChange?.(false);
    } catch (error: any) {
      toast({
        title: "Failed to send notification",
        description:
          error.message || "An error occurred while sending the notification.",
        variant: "destructive",
      });
    }
  };

  const isFormValid = title.trim() && selectedAnimal && selectedNutritionist;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notify Nutritionist
          </DialogTitle>
          <DialogDescription>
            Send a notification to a nutritionist about an animal's dietary
            needs.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Title */}
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Diet consultation request..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the dietary requirements or concerns..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Priority */}
          <div className="grid gap-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={priority}
              onValueChange={(value: NotificationPriorityValues) =>
                setPriority(value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NotificationPriorities.LOW}>Low</SelectItem>
                <SelectItem value={NotificationPriorities.MEDIUM}>
                  Medium
                </SelectItem>
                <SelectItem value={NotificationPriorities.HIGH}>
                  High
                </SelectItem>
                <SelectItem value={NotificationPriorities.URGENT}>
                  Urgent
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Animal Selection */}
          <div className="grid gap-2">
            <Label>Select Animal</Label>
            <Button
              variant="outline"
              onClick={openAnimalDialog}
              className="justify-start"
            >
              {selectedAnimal ? selectedAnimal.name : "Choose Animal"}
            </Button>
          </div>

          {/* Nutritionist Selection */}
          <div className="grid gap-2">
            <Label>Select Nutritionist</Label>
            <Button
              variant="outline"
              onClick={openNutritionistDialog}
              className="justify-start"
            >
              {selectedNutritionist
                ? selectedNutritionist.name
                : "Choose Nutritionist"}
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange?.(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendNotification}
            disabled={!isFormValid || isPending}
          >
            {isPending ? "Sending..." : "Send Notification"}
          </Button>
        </DialogFooter>

        {/* Animal Selection Dialog */}
        <ChooseAnimalDialog
          isOpen={isAnimalDialogOpen}
          onClose={closeAnimalDialog}
          onSelectAnimal={handleSelectAnimal}
          selectedAnimalId={selectedAnimal?.id}
        />

        {/* Nutritionist Selection Dialog */}
        <ChooseUserDialog
          isOpen={isNutritionistDialogOpen}
          onClose={closeNutritionistDialog}
          onSelectUser={handleSelectNutritionist}
          selectedUserId={selectedNutritionist?.id}
          role={RoleType.Nutritionist}
        />
      </DialogContent>
    </Dialog>
  );
}
