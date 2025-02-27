import SearchInputFeild from "@/components/custom-ui/search-input-feild";
import VaccinationBar from "../components/vaccination-bar";
import HealthMonitoringTable from "../health-table";

export const HealthMonitoring = () => {
  return (
    <div className="space-y-4 flex flex-col h-full">
      <div className="flex justify-center items-center gap-2">
      <SearchInputFeild placeholder="Search..." />
      </div>
        <VaccinationBar />
        <HealthMonitoringTable />
    </div>
  )
}

export default HealthMonitoring;
