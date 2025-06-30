import { SyringeIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function VaccinationStatusCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SyringeIcon className="h-5 w-5 text-gray-500" />
          Vaccination Status
        </CardTitle>
        <CardDescription>Veterinarian, Admin</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 bg-green-500 rounded-full" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-3">
            <Progress value={89} className="w-24 h-2" />
            <span className="font-medium">89</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 bg-yellow-400 rounded-full" />
            <span>Pending</span>
          </div>
          <div className="flex items-center gap-3">
            <Progress value={28} className="w-24 h-2" />
            <span className="font-medium">28</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 bg-red-500 rounded-full" />
            <span>Overdue</span>
          </div>
          <div className="flex items-center gap-3">
            <Progress value={11} className="w-24 h-2" />
            <span className="font-medium">11</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
