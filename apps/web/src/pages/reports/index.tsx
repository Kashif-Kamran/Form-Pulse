// src/app/reports/index.tsx
import { HealthMonitoring } from "./health-monitoring";
import { Animals } from "./animals";
import { Appointments } from "./appointments";

export default function ReportsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <HealthMonitoring />
        <Appointments />
        <Animals />
      </div>
    </div>
  );
}