import { HealthMonitoring } from "./health-monitoring";
import { Appointments } from "./appointments";
import { Animals } from "./animals";


export default function ReportsPage() {
  return (

    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HealthMonitoring className="col-span-1" />
        <Animals className="col-span-1" />
      </div>
      <Appointments className="col-span-1" />
    </div>

  );}