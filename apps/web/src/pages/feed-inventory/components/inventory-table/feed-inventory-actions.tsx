import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditIcon, EllipsisVertical, Trash2Icon } from "lucide-react";
import { IFeedInventory } from "@repo/shared";

interface FeedInventoryActionsProps {
  feedItem: IFeedInventory;
  onEdit: (feedItem: IFeedInventory) => void;
  onDelete: (feedItem: IFeedInventory) => void;
}

function FeedInventoryActions({ feedItem, onEdit, onDelete }: FeedInventoryActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-8 w-8 p-0"
        >
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => onEdit(feedItem)}
          className="cursor-pointer"
        >
          <EditIcon className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onDelete(feedItem)}
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
