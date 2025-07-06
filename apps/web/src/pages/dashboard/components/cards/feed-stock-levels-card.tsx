import { Wheat, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useFeedStockLevels } from "@/hooks/api/dashboard.hook"

export function FeedStockLevelsCard() {
  const { feedStockLevels, isLoading, error } = useFeedStockLevels();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wheat className="h-5 w-5 text-gray-500" />
            Feed Stock Levels
          </CardTitle>
          <CardDescription>Caretaker, Admin</CardDescription>
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
            <Wheat className="h-5 w-5 text-gray-500" />
            Feed Stock Levels
          </CardTitle>
          <CardDescription>Caretaker, Admin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-red-500">Error loading feed stock levels</p>
        </CardContent>
      </Card>
    );
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'good':
        return '[&>div]:bg-green-500';
      case 'low':
        return '[&>div]:bg-yellow-400';
      case 'critical':
        return '[&>div]:bg-red-500';
      default:
        return '[&>div]:bg-gray-400';
    }
  };

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
        {feedStockLevels.length === 0 ? (
          <p className="text-gray-500">No feed inventory data available</p>
        ) : (
          feedStockLevels.slice(0, 5).map((feed) => (
            <div key={feed.feedId}>
              <div className="flex justify-between mb-1">
                <span>{feed.feedName}</span>
                <span className="font-medium">{feed.remainingStock}kg</span>
              </div>
              <Progress 
                value={feed.percentage} 
                className={`h-2 ${getProgressColor(feed.status)}`} 
              />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
