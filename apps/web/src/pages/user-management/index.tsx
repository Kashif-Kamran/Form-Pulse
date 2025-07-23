import SearchInputField from "@/components/custom-ui/search-input-feild";
import { useUsers } from "@/hooks/api/user.hook";
import { useMe } from "@/hooks/api/profile.hook";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RoleType, PublicUser } from "@repo/shared";
import UserManagementTable from "./components/user-table";
import { CreateUserModal } from "./components/create-user-modal";
import { UpdateUserModal } from "./components/update-user-modal";
import { DeleteUserDialog } from "./components/delete-user-dialog";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function UserManagement() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get current user for role-based access control
  const { data: currentUser, isLoading: isUserLoading } = useMe();

  const initialSearch = searchParams.get("q") || "";
  const initialRole = searchParams.get("role") || "";
  const [search, setSearch] = useState(initialSearch);
  const [query, setQuery] = useState(initialSearch);
  const [selectedRole, setSelectedRole] = useState<RoleType | "">(
    initialRole as RoleType
  );

  // Update and Delete dialog states
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<PublicUser | null>(null);

  const {
    users = [],
    count,
    isLoading,
  } = useUsers(query, selectedRole || undefined);

  // Check if user is an admin
  const isAdmin = currentUser?.role === RoleType.Admin;

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  // Redirect non-admin users
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <Shield className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800">Access Denied</h3>
                <p className="text-sm text-red-700">
                  You need Administrator privileges to access user management.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSearch = () => {
    setQuery(search);
    const params = new URLSearchParams();
    if (search.trim()) {
      params.set("q", search);
    }
    if (selectedRole) {
      params.set("role", selectedRole);
    }

    const queryString = params.toString();
    navigate(queryString ? `?${queryString}` : "");
  };

  const handleRoleFilter = (role: string) => {
    const newRole = role === "all" ? "" : (role as RoleType);
    setSelectedRole(newRole);

    const params = new URLSearchParams();
    if (query.trim()) {
      params.set("q", query);
    }
    if (newRole) {
      params.set("role", newRole);
    }

    const queryString = params.toString();
    navigate(queryString ? `?${queryString}` : "");
  };

  const handleEdit = (user: PublicUser) => {
    setSelectedUser(user);
    setUpdateDialogOpen(true);
  };

  const handleDelete = (user: PublicUser) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleCreateUser = () => {
    toast({
      title: "User created successfully",
      description: "The new user has been added to the system",
      variant: "default",
    });
  };

  const handleUpdateUser = () => {
    setUpdateDialogOpen(false);
    setSelectedUser(null);
    toast({
      title: "User updated successfully",
      description: "User information has been updated",
      variant: "default",
    });
  };

  const handleDeleteUser = () => {
    setDeleteDialogOpen(false);
    setSelectedUser(null);
    toast({
      title: "User deleted successfully",
      description: "User has been removed from the system",
      variant: "default",
    });
  };

  return (
    <div className="space-y-4 flex flex-col h-full">
      {/* Search and Filter Section */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-center md:items-center">
        <div className="flex-1 flex gap-2">
          <SearchInputField
            placeholder="Search users by name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={handleSearch}
          />

          <Select value={selectedRole} onValueChange={handleRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {Object.values(RoleType).map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <CreateUserModal onCreateUser={handleCreateUser} />
      </div>

      {/* Users Table */}
      <div className="flex-1">
        <UserManagementTable
          users={users}
          isLoading={isLoading}
          currentUser={currentUser}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Update User Modal */}
      <UpdateUserModal
        user={selectedUser}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
        onUpdateUser={handleUpdateUser}
      />

      {/* Delete User Dialog */}
      <DeleteUserDialog
        user={selectedUser}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onDeleteUser={handleDeleteUser}
      />

      {/* Stats */}
      {count > 0 && (
        <div className="text-sm text-gray-600 text-center">
          Showing {users.length} of {count} users
          {selectedRole && ` with role: ${selectedRole}`}
          {query && ` matching: "${query}"`}
        </div>
      )}
    </div>
  );
}

export default UserManagement;
