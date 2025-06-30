import { ActivityIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function ActivityCard() {
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
        <div className="flex justify-between">
          <span>Animals Added (30d)</span>
          <span className="font-medium text-green-600">+15</span>
        </div>
        <div className="flex justify-between">
          <span>Vaccinations (7d)</span>
          <span className="font-medium text-blue-600">23</span>
        </div>
        <div className="flex justify-between">
          <span>Feed Orders (7d)</span>
          <span className="font-medium text-orange-600">8</span>
        </div>
        <div className="flex justify-between">
          <span>Active Users (24h)</span>
          <span className="font-medium text-purple-600">18</span>
        </div>
      </CardContent>
    </Card>
  );
}
