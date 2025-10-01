import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Send } from "lucide-react";
import { CreateNotificationForm } from "./form";
import { CreateNotificationFormData } from "./schema";

interface CreateNotificationModalProps {
  triggerButton?: React.ReactNode;
  onNotificationCreated?: (data: CreateNotificationFormData) => void;
}

export function CreateNotificationModal({
  triggerButton,
  onNotificationCreated,
}: CreateNotificationModalProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  const handleSubmit = (data: CreateNotificationFormData) => {
    if (onNotificationCreated) {
      onNotificationCreated(data);
    }
  };

  // Prevent modal from closing unless explicitly intended
  const handleOpenChange = (newOpen: boolean) => {
    // Only allow closing if explicitly setting to false
    // This prevents accidental closes from nested components
    setOpen(newOpen);
  };

  const defaultTrigger = (
    <Button className="flex items-center gap-2">
      <Plus className="h-4 w-4" />
      Create Notification
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{triggerButton || defaultTrigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="bg-primary rounded-md p-4 text-primary-foreground mt-4">
          <DialogTitle className="font-semibold text-center flex items-center justify-center gap-2">
            <Send className="h-5 w-5" />
            Create New Notification
          </DialogTitle>
          <DialogDescription className="text-primary-foreground/80 text-center">
            Send notifications, tasks, and messages to team members
          </DialogDescription>
        </DialogHeader>

        <CreateNotificationForm
          onSubmit={handleSubmit}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
