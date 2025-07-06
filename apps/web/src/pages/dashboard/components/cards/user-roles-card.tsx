import { Users, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useUserRoles } from "@/hooks/api/dashboard.hook"

export function UserRolesCard() {
  const { userRoles, isLoading, error } = useUserRoles();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-500" />
            User Roles
          </CardTitle>
          <CardDescription>Admin access</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-500" />
            User Roles
          </CardTitle>
          <CardDescription>Admin access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-red-500">Error loading user roles data</p>
        </CardContent>
      </Card>
    );
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-green-500';
      case 'Veterinarian':
        return 'bg-purple-500';
      case 'Nutritionist':
        return 'bg-orange-500';
      case 'Care Taker':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatRoleName = (role: string) => {
    switch (role) {
      case 'Care Taker':
        return 'Caretakers';
      case 'Veterinarian':
        return 'Veterinarians';
      case 'Nutritionist':
        return 'Nutritionists';
      case 'Admin':
        return 'Admins';
      default:
        return role;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-500" />
          User Roles
        </CardTitle>
        <CardDescription>Admin access</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {userRoles.length === 0 ? (
          <p className="text-gray-500">No user data available</p>
        ) : (
          userRoles.map((role) => (
            <div key={role.role} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 ${getRoleColor(role.role)} rounded-full`} />
                <span>{formatRoleName(role.role)}</span>
              </div>
              <span className="font-medium">{role.count}</span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
