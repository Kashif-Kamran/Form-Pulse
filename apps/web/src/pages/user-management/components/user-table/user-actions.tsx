import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditIcon, EllipsisVertical, Trash2Icon } from "lucide-react";
import { PublicUser } from "@repo/shared";
import { useState } from "react";

interface UserActionsProps {
  user: PublicUser;
  currentUser: PublicUser;
  onEdit: (user: PublicUser) => void;
  onDelete: (user: PublicUser) => void;
}

function UserActions({
  user,
  currentUser,
  onEdit,
  onDelete,
}: UserActionsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isCurrentUser = user.id === currentUser.id;
  const canDelete = !isCurrentUser; // Cannot delete yourself

  function handleEdit(user: PublicUser) {
    // Close dropdown first
    setIsDropdownOpen(false);

    // Small delay to ensure dropdown is closed before modal opens
    setTimeout(() => {
      onEdit(user);
    }, 100);
  }

  function handleDelete(user: PublicUser) {
    // Close dropdown first
    setIsDropdownOpen(false);

    onDelete(user);
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
          onClick={() => handleEdit(user)}
          className="cursor-pointer"
        >
          <EditIcon className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        {canDelete && (
          <DropdownMenuItem
            onClick={() => handleDelete(user)}
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
