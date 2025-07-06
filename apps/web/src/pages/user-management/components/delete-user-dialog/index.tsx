import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PublicUser } from "@repo/shared";
import { useDeleteUser } from "@/hooks/api/user.hook";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

interface DeleteUserDialogProps {
  user: PublicUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleteUser: () => void;
}

export function DeleteUserDialog({
  user,
  open,
  onOpenChange,
  onDeleteUser,
}: DeleteUserDialogProps) {
  const { mutateAsync: deleteUser, isPending } = useDeleteUser();
  const { toast } = useToast();

  const handleConfirmDelete = async () => {
    if (!user) return;

    try {
      await deleteUser(user.id);
      onDeleteUser();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error Deleting User",
        description: error.message || "There was an error deleting the user. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Delete User
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{user?.name}</strong>? 
            This action cannot be undone and will permanently remove the user 
            and all their data from the system.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
