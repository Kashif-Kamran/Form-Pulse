import { BarChart, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useFeedUsage } from "@/hooks/api/dashboard.hook"

export function FeedUsageCard() {
  const { feedUsage, isLoading, error } = useFeedUsage();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-gray-500" />
            Feed Usage
          </CardTitle>
          <CardDescription>Most consumed feed items</CardDescription>
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
            <BarChart className="h-5 w-5 text-gray-500" />
            Feed Usage
          </CardTitle>
          <CardDescription>Most consumed feed items</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-red-500">Error loading feed usage data</p>
        </CardContent>
      </Card>
    );
  }

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
        {feedUsage.length === 0 ? (
          <p className="text-gray-500">No feed usage data available</p>
        ) : (
          feedUsage.slice(0, 5).map((feed) => (
            <div key={feed.feedId} className="flex justify-between">
              <span>{feed.feedName}</span>
              <span className="font-medium">{feed.usedStock}kg</span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
