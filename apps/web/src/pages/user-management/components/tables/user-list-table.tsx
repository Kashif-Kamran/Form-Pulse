import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { PublicUser } from "@repo/shared";
import { Trash2Icon, Edit2Icon, MoreHorizontal } from "lucide-react";

export interface UserListTableProps {
  results: PublicUser[];
  onEdit: (user: PublicUser) => void;
  onDelete: (userId: string) => void;
  isLoading?: boolean;
}

function UserListTable({ results, onEdit, onDelete }: UserListTableProps) {
  const { toast } = useToast();

  function handleDelete(userId: string, userName: string) {
    // Show confirmation toast
    toast({
      title: "User Deleted",
      description: `${userName} has been removed from the system`,
      variant: "default",
    });
    onDelete(userId);
  }

  function handleEdit(user: PublicUser) {
    onEdit(user);
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800";
      case "Veterinarian":
        return "bg-blue-100 text-blue-800";
      case "Nutritionist":
        return "bg-green-100 text-green-800";
      case "Care Taker":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white rounded-xl">
      <ScrollArea className="h-full">
        <Table>
          <TableHeader className="bg-[#E2E2E2]">
            <TableRow>
              <TableHead className="pl-6">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="flex-1">
            {results.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="p-4 text-center">
                  No Users Found
                </TableCell>
              </TableRow>
            )}
            {results.length > 0 &&
              results.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="pl-6 font-medium">
                    {user.name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isVerified ? "default" : "secondary"}>
                      {user.isVerified ? "Verified" : "Unverified"}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-0 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="h-8 w-8 p-0" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEdit(user)}
                          className="cursor-pointer"
                        >
                          <Edit2Icon className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(user.id, user.name)}
                          className="cursor-pointer text-destructive focus:text-destructive"
                        >
                          <Trash2Icon className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}

export default UserListTable;
