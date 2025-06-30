import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useSpeciesDistribution } from "@/hooks/api/dashboard.hook";
import { Loader2 } from "lucide-react";

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f97316",
  "#ef4444",
  "#6b7280",
];

type SpeciesDistributionItem = {
  species: string;
  count: number;
  percentage: number;
};

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}

export function SpeciesDistributionChart() {
  const { speciesDistribution, total, isLoading, isError } =
    useSpeciesDistribution();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError || speciesDistribution.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No data available
      </div>
    );
  }

  // Transform data and add colors
  const chartData: ChartDataItem[] = speciesDistribution.map(
    (item: SpeciesDistributionItem, index: number) => ({
      name: item.species,
      value: item.count,
      color: COLORS[index % COLORS.length],
    })
  );

  return (
    <div className="flex items-center justify-center -mt-4">
      <div className="w-1/2 h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              innerRadius={70}
              fill="#8884d8"
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry: ChartDataItem, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold">{total}</span>
          <span className="text-sm text-gray-500">Animals</span>
        </div>
      </div>
      <div className="w-1/2 space-y-2 pl-4">
        {chartData.map((entry: ChartDataItem) => (
          <div
            key={entry.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span>{entry.name}</span>
            </div>
            <span className="font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
