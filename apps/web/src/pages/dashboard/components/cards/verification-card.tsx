import { CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function VerificationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-gray-500" />
          Verification
        </CardTitle>
        <CardDescription>User verification status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 bg-green-500 rounded-full" />
            <span>Verified</span>
          </div>
          <span className="font-medium">20</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 bg-red-500 rounded-full" />
            <span>Unverified</span>
          </div>
          <span className="font-medium">4</span>
        </div>
        <div>
          <Progress value={83} className="h-2" />
          <p className="text-sm text-gray-500 text-center mt-2">83% Verified</p>
        </div>
      </CardContent>
    </Card>
  )
}
