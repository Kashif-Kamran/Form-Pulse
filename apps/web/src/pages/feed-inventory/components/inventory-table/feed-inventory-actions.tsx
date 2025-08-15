import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditIcon, EllipsisVertical, Trash2Icon } from "lucide-react";
import { IFeedInventory } from "@repo/shared";
import { useState } from "react";

interface FeedInventoryActionsProps {
  feedItem: IFeedInventory;
  onEdit: (feedItem: IFeedInventory) => void;
  onDelete: (feedItem: IFeedInventory) => void;
}

function FeedInventoryActions({
  feedItem,
  onEdit,
  onDelete,
}: FeedInventoryActionsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleEdit(feedItem: IFeedInventory) {
    // Close dropdown first
    setIsDropdownOpen(false);

    // Small delay to ensure dropdown is closed before modal opens
    setTimeout(() => {
      onEdit(feedItem);
    }, 100);
  }

  function handleDelete(feedItem: IFeedInventory) {
    // Close dropdown first
    setIsDropdownOpen(false);

    onDelete(feedItem);
  }

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleEdit(feedItem)}
          className="cursor-pointer"
        >
          <EditIcon className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleDelete(feedItem)}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <Trash2Icon className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FeedInventoryActions;
