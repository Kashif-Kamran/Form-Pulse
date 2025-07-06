import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { PublicUser } from "@repo/shared";
import UserActions from "./user-actions";

import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface UserManagementTableProps {
  users: PublicUser[];
  isLoading: boolean;
  onEdit: (user: PublicUser) => void;
  onDelete: (user: PublicUser) => void;
}

function UserManagementTable({
  users,
  isLoading,
  onEdit,
  onDelete,
}: UserManagementTableProps) {
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "Admin":
        return "destructive";
      case "Veterinarian":
        return "default";
      case "Nutritionist":
        return "secondary";
      case "Care Taker":
        return "outline";
      default:
        return "outline";
    }
  };

  const getVerificationBadge = (isVerified: boolean) => {
    return isVerified ? (
      <Badge variant="default" className="bg-green-100 text-green-800">
        Verified
      </Badge>
    ) : (
      <Badge variant="outline" className="border-orange-300 text-orange-800">
        Pending
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col overflow-hidden bg-white rounded-xl">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

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
              <TableHead>Created</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="flex-1">
            {users.length === 0 ? (
              <TableRow>
                <TableCell className="p-4" colSpan={6}>
                  No Users Found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="pl-6 font-medium">
                    {user.name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{getVerificationBadge(user.isVerified)}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <UserActions
                      user={user}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}

export default UserManagementTable;
