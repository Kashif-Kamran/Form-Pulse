import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SpeciesDistributionChart } from "../charts/species-distribution.chart";

export function SpeciesDistributionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Species Distribution</CardTitle>
        <CardDescription>Admin, Veterinarian</CardDescription>
      </CardHeader>
      <CardContent>
        <SpeciesDistributionChart />
      </CardContent>
    </Card>
  );
}
