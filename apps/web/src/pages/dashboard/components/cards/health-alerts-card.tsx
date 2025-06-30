import { AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function HealthAlertsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          Health Alerts
        </CardTitle>
        <CardDescription>Urgent attention needed</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <span className="h-2 w-2 bg-red-500 rounded-full mt-1.5" />
            <div>
              <p className="font-semibold text-red-800">11 Overdue Vaccines</p>
              <p className="text-sm text-red-700">Requires immediate attention</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <span className="h-2 w-2 bg-yellow-500 rounded-full mt-1.5" />
            <div>
              <p className="font-semibold text-yellow-800">5 Missing Records</p>
              <p className="text-sm text-yellow-700">New animals without health data</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
