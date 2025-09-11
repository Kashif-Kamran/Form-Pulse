import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useDeleteFeedInventory } from "@/hooks/api/feed-inventory.hook";
import { IFeedInventory } from "@repo/shared";
import { useState } from "react";

interface DeleteFeedInventoryDialogProps {
  feedItem: IFeedInventory | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteFeedInventoryDialog({
  feedItem,
  open,
  onOpenChange,
}: DeleteFeedInventoryDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const { mutateAsync: deleteFeedInventory } = useDeleteFeedInventory();

  const handleDelete = async () => {
    if (!feedItem?.id) return;

    setIsDeleting(true);
    try {
      await deleteFeedInventory(feedItem.id);
      toast({
        title: "Feed inventory item deleted successfully",
        description: `${feedItem.name} has been removed from inventory.`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error deleting feed inventory item",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    if (!isDeleting) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Feed Inventory Item</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{feedItem?.name}" from your feed
            inventory? This action cannot be undone and the feed item will no
            longer be available for use in diet plans.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
