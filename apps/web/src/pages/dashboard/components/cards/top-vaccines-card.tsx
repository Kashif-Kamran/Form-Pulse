import { SyringeIcon, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useTopVaccines } from "@/hooks/api/dashboard.hook";

export function TopVaccinesCard() {
  const { topVaccines, isLoading, error } = useTopVaccines();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SyringeIcon className="h-5 w-5 text-gray-500" />
            Top Vaccines
          </CardTitle>
          <CardDescription>Most administered vaccines</CardDescription>
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
            Top Vaccines
          </CardTitle>
          <CardDescription>Most administered vaccines</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-red-500">Error loading top vaccines</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SyringeIcon className="h-5 w-5 text-gray-500" />
          Top Vaccines
        </CardTitle>
        <CardDescription>Most administered vaccines</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {topVaccines.length === 0 ? (
          <p className="text-gray-500">No vaccination data available</p>
        ) : (
          topVaccines.slice(0, 5).map((vaccine) => (
            <div key={vaccine.vaccineId} className="flex justify-between">
              <span>{vaccine.vaccineName}</span>
              <span className="font-medium">{vaccine.count}</span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
