import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditIcon, EllipsisVertical, Trash2Icon } from "lucide-react";
import { PublicUser } from "@repo/shared";

interface UserActionsProps {
  user: PublicUser;
  currentUser: PublicUser;
  onEdit: (user: PublicUser) => void;
  onDelete: (user: PublicUser) => void;
}

function UserActions({ user, currentUser, onEdit, onDelete }: UserActionsProps) {
  const isCurrentUser = user.id === currentUser.id;
  const canDelete = !isCurrentUser; // Cannot delete yourself

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => onEdit(user)}
          className="cursor-pointer"
        >
          <EditIcon className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        {canDelete && (
          <DropdownMenuItem
            onClick={() => onDelete(user)}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <Trash2Icon className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserActions;
