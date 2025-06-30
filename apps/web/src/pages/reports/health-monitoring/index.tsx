import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Healthy", value: 60 },
  { name: "Not Vaccinated", value: 20 },
  { name: "Sick", value: 10 },
  { name: "Vaccinated", value: 10 },
];

const COLORS = ["#4CAF50", "#F44336", "#FF9800", "#2196F3"];

export function HealthMonitoring() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Monitoring</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}