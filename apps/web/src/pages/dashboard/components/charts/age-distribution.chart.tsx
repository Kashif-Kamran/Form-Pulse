import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAgeDistribution } from "@/hooks/api/dashboard.hook";
import { Loader2 } from "lucide-react";

type AgeDistributionItem = {
  ageGroup: string;
  count: number;
  percentage: number;
  minAge: number;
  maxAge: number;
};

interface ChartDataItem {
  name: string;
  value: number;
  fullName: string;
}

export function AgeDistributionChart() {
  const { ageDistribution, isLoading, isError } = useAgeDistribution();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError || ageDistribution.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No data available
      </div>
    );
  }

  // Transform data for the chart
  const chartData: ChartDataItem[] = ageDistribution.map(
    (item: AgeDistributionItem) => ({
      name: item.ageGroup.replace(/\s*\([^)]*\)/, ""), // Remove parentheses for cleaner display
      value: item.count,
      fullName: item.ageGroup,
    })
  );

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
            contentStyle={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
            }}
            labelFormatter={(label, payload) => {
              const item = payload?.[0]?.payload;
              return item?.fullName || label;
            }}
          />
          <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
