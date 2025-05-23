import SearchInputFeild from "@/components/custom-ui/search-input-feild";
import VaccinationBar from "../components/vaccination-bar";
import HealthMonitoringTable from "../health-table";
import { Button } from "@/components/ui/button";
import { CreateVaccineModel } from "../components/create-vaccine-model";

export const HealthMonitoring = () => {
  return (
    <div className="space-y-4 flex flex-col h-full">
      <div className="flex justify-center items-center gap-2">
        <CreateVaccineModel />
        <SearchInputFeild placeholder="Search..." />
        <Button className="h-full"> Add Health Record</Button>
      </div>
      <VaccinationBar />
      <HealthMonitoringTable />
    </div>
  );
};

export default HealthMonitoring;
