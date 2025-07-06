import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PublicUser, RoleType } from "@repo/shared";
import { useDeleteUser } from "@/hooks/api/user.hook";
import { useToast } from "@/hooks/use-toast";
import { Trash2, AlertTriangle } from "lucide-react";

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

  const isAdminUser = user?.role === RoleType.Admin;

  const handleConfirmDelete = async () => {
    if (!user) return;

    try {
      await deleteUser(user.id);
      
      toast({
        title: "User Deleted Successfully",
        description: `${user.name} has been removed from the system`,
        variant: "default",
      });
      
      onDeleteUser();
      onOpenChange(false);
    } catch (error: any) {
      let errorMessage = "There was an error deleting the user. Please try again.";
      
      // Handle specific error messages from the backend
      if (error.message) {
        errorMessage = error.message;
      } else if (error.error) {
        errorMessage = error.error;
      }
      
      toast({
        title: "Error Deleting User",
        description: errorMessage,
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
          <DialogDescription className="space-y-2">
            <p>
              Are you sure you want to delete <strong>{user?.name}</strong>? 
              This action cannot be undone and will permanently remove the user 
              and all their data from the system.
            </p>
            {isAdminUser && (
              <div className="flex items-start gap-2 p-3 bg-orange-50 border border-orange-200 rounded-md">
                <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-orange-700">
                  <strong>Warning:</strong> You are deleting an Administrator account. 
                  Make sure there is at least one other admin in the system before proceeding.
                </div>
              </div>
            )}
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
