import { AlertTriangle, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useHealthAlerts } from "@/hooks/api/dashboard.hook";

export function HealthAlertsCard() {
  const { healthAlerts, isLoading, error } = useHealthAlerts();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Health Alerts
          </CardTitle>
          <CardDescription>Urgent attention needed</CardDescription>
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
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Health Alerts
          </CardTitle>
          <CardDescription>Urgent attention needed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-red-500">Error loading health alerts</p>
        </CardContent>
      </Card>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          dot: "bg-red-500",
          text: "text-red-800",
          subText: "text-red-700",
        };
      case "medium":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          dot: "bg-yellow-500",
          text: "text-yellow-800",
          subText: "text-yellow-700",
        };
      case "low":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          dot: "bg-blue-500",
          text: "text-blue-800",
          subText: "text-blue-700",
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          dot: "bg-gray-500",
          text: "text-gray-800",
          subText: "text-gray-700",
        };
    }
  };

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
        {healthAlerts.length === 0 ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <span className="h-2 w-2 bg-green-500 rounded-full mt-1.5" />
              <div>
                <p className="font-semibold text-green-800">All Good!</p>
                <p className="text-sm text-green-700">
                  No health alerts at this time
                </p>
              </div>
            </div>
          </div>
        ) : (
          healthAlerts.map((alert, index) => {
            const colors = getSeverityColor(alert.severity);
            return (
              <div
                key={index}
                className={`${colors.bg} border ${colors.border} rounded-lg p-3`}
              >
                <div className="flex items-start gap-2">
                  <span
                    className={`h-2 w-2 ${colors.dot} rounded-full mt-1.5`}
                  />
                  <div>
                    <p className={`font-semibold ${colors.text}`}>
                      {alert.message}
                    </p>
                    <p className={`text-sm ${colors.subText}`}>
                      {alert.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
