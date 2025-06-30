import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AgeDistributionChart } from "../charts/age-distribution.chart";

export function AgeDistributionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Age Distribution</CardTitle>
        <CardDescription>Age groups across population</CardDescription>
      </CardHeader>
      <CardContent>
        <AgeDistributionChart />
      </CardContent>
    </Card>
  );
}
