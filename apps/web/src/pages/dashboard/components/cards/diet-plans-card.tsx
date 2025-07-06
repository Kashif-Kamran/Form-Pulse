import { FileText, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useDietPlansStatus } from "@/hooks/api/dashboard.hook";

export function DietPlansCard() {
  const { dietPlansStatus, compliance, total, isLoading, error } =
    useDietPlansStatus();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-500" />
            Diet Plans
          </CardTitle>
          <CardDescription>Compliance overview</CardDescription>
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
            <FileText className="h-5 w-5 text-gray-500" />
            Diet Plans
          </CardTitle>
          <CardDescription>Compliance overview</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-red-500">Error loading diet plans data</p>
        </CardContent>
      </Card>
    );
  }

  const withDietPlan =
    dietPlansStatus.find((status) => status.status === "with_diet_plan")
      ?.count || 0;
  const withoutDietPlan =
    dietPlansStatus.find((status) => status.status === "without_diet_plan")
      ?.count || 0;

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
        {total === 0 ? (
          <p className="text-gray-500">No animals found</p>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <span>With Diet Plans</span>
              <span className="font-bold text-green-600">
                {withDietPlan} animals
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>No Diet Plans</span>
              <span className="font-bold text-red-600">
                {withoutDietPlan} animals
              </span>
            </div>
            <div>
              <Progress value={compliance} className="h-2" />
              <p className="text-sm text-gray-500 text-center mt-2">
                {compliance}% Compliance
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
