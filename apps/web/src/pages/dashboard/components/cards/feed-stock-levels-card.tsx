import { Wheat } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function FeedStockLevelsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wheat className="h-5 w-5 text-gray-500" />
          Feed Stock Levels
        </CardTitle>
        <CardDescription>Caretaker, Admin</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span>Premium Dog Food</span>
            <span className="font-medium">85kg</span>
          </div>
          <Progress value={85} className="h-2 [&>div]:bg-green-500" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span>Cat Kibble</span>
            <span className="font-medium">45kg</span>
          </div>
          <Progress value={45} className="h-2 [&>div]:bg-yellow-400" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span>Hay Bales</span>
            <span className="font-medium">12kg</span>
          </div>
          <Progress value={12} className="h-2 [&>div]:bg-orange-400" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span>Horse Feed</span>
            <span className="font-medium">8kg</span>
          </div>
          <Progress value={8} className="h-2 [&>div]:bg-red-500" />
        </div>
      </CardContent>
    </Card>
  )
}
