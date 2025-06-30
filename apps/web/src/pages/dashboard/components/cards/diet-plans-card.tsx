import { FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function DietPlansCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-gray-500" />
          Diet Plans
        </CardTitle>
        <CardDescription>Compliance overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span>With Diet Plans</span>
          <span className="font-bold text-green-600">95 animals</span>
        </div>
        <div className="flex justify-between items-center">
          <span>No Diet Plans</span>
          <span className="font-bold text-red-600">33 animals</span>
        </div>
        <div>
          <Progress value={74} className="h-2" />
          <p className="text-sm text-gray-500 text-center mt-2">74% Compliance</p>
        </div>
      </CardContent>
    </Card>
  )
}
