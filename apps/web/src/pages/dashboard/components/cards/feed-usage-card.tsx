import { BarChart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function FeedUsageCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-gray-500" />
          Feed Usage
        </CardTitle>
        <CardDescription>Most consumed feed items</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span>Premium Dog Food</span>
          <span className="font-medium">245kg</span>
        </div>
        <div className="flex justify-between">
          <span>Cat Kibble</span>
          <span className="font-medium">189kg</span>
        </div>
        <div className="flex justify-between">
          <span>Hay Bales</span>
          <span className="font-medium">156kg</span>
        </div>
        <div className="flex justify-between">
          <span>Horse Pellets</span>
          <span className="font-medium">98kg</span>
        </div>
      </CardContent>
    </Card>
  )
}
