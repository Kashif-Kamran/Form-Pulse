import { ActivityIcon, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useActivity } from "@/hooks/api/dashboard.hook";

export function ActivityCard() {
  const { activity, isLoading, error } = useActivity();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ActivityIcon className="h-5 w-5 text-gray-500" />
            Activity
          </CardTitle>
          <CardDescription>Recent system activity</CardDescription>
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
            <ActivityIcon className="h-5 w-5 text-gray-500" />
            Activity
          </CardTitle>
          <CardDescription>Recent system activity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-red-500">Error loading activity data</p>
        </CardContent>
      </Card>
    );
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "animals_added":
        return "text-green-600";
      case "vaccinations_given":
        return "text-blue-600";
      case "feed_orders":
        return "text-orange-600";
      case "active_users":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  const formatCount = (type: string, count: number) => {
    if (type === "animals_added") {
      return `+${count}`;
    }
    return count.toString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ActivityIcon className="h-5 w-5 text-gray-500" />
          Activity
        </CardTitle>
        <CardDescription>Recent system activity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {activity.length === 0 ? (
          <p className="text-gray-500">No activity data available</p>
        ) : (
          activity.map((item) => (
            <div key={item.type} className="flex justify-between">
              <span>{item.label}</span>
              <span className={`font-medium ${getActivityColor(item.type)}`}>
                {formatCount(item.type, item.count)}
              </span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
