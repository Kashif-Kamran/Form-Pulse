import { Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function UserRolesCard() {
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 bg-blue-500 rounded-full" />
            <span>Caretakers</span>
          </div>
          <span className="font-medium">12</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 bg-purple-500 rounded-full" />
            <span>Veterinarians</span>
          </div>
          <span className="font-medium">6</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 bg-green-500 rounded-full" />
            <span>Admins</span>
          </div>
          <span className="font-medium">4</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 bg-orange-500 rounded-full" />
            <span>Volunteers</span>
          </div>
          <span className="font-medium">2</span>
        </div>
      </CardContent>
    </Card>
  )
}
