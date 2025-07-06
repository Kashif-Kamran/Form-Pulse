import { SyringeIcon, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useVaccinationStatus } from "@/hooks/api/dashboard.hook";

export function VaccinationStatusCard() {
  const { vaccinationStatus, isLoading, error } = useVaccinationStatus();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SyringeIcon className="h-5 w-5 text-gray-500" />
            Vaccination Status
          </CardTitle>
          <CardDescription>Veterinarian, Admin</CardDescription>
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
            <SyringeIcon className="h-5 w-5 text-gray-500" />
            Vaccination Status
          </CardTitle>
          <CardDescription>Veterinarian, Admin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-red-500">Error loading vaccination status</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-400";
      case "overdue":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "pending":
        return "Pending";
      case "overdue":
        return "Overdue";
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SyringeIcon className="h-5 w-5 text-gray-500" />
          Vaccination Status
        </CardTitle>
        <CardDescription>Veterinarian, Admin</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {vaccinationStatus.map((item) => (
          <div key={item.status} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${getStatusColor(item.status)}`}
              />
              <span>{getStatusLabel(item.status)}</span>
            </div>
            <div className="flex items-center gap-3">
              <Progress value={item.percentage} className="w-24 h-2" />
              <span className="font-medium">{item.count}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
