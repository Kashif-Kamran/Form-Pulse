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
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ChooseAnimalDialog } from "../dialogs/choose-animal-dialog-box";
import { ChooseUserDialog } from "@/dialogs/choose-user-dialog-box";
import { useToggleState } from "@/hooks/use-toggle-state";
import { useNotifyNutritionist } from "@/hooks/api/notification.hook";
import { useToast } from "@/hooks/use-toast";
import { AnimalPublic, PublicUser, RoleType } from "@repo/shared";
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
  const [message, setMessage] = useState("");
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

  const { mutateAsync: notifyNutritionist, isPending } =
    useNotifyNutritionist();
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
    if (!selectedAnimal || !selectedNutritionist || !message.trim()) {
      return;
    }

    try {
      await notifyNutritionist({
        message: message.trim(),
        animalId: selectedAnimal.id,
        nutritionistId: selectedNutritionist.id,
      });

      toast({
        title: "Notification sent successfully!",
        description: `Nutritionist ${selectedNutritionist.name} has been notified about ${selectedAnimal.name}.`,
      });

      // Reset form
      setMessage("");
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

  const isFormValid = message.trim() && selectedAnimal && selectedNutritionist;

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
          {/* Message */}
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Describe the dietary requirements or concerns..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px]"
            />
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
