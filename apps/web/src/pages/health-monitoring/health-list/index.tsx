import SearchInputFeild from "@/components/custom-ui/search-input-feild";
import VaccinationBar from "../components/vaccination-bar";
import HealthMonitoringTable from "../components/health-table";
import { Button } from "@/components/ui/button";
import { CreateVaccineModel } from "../components/create-vaccine-model";
import { Link } from "react-router-dom";
import { CREATE_HEALTH_RECORD } from "@/constants/app-routes";

export const HealthMonitoring = () => {
  return (
    <div className="space-y-4 flex flex-col h-full">
      <div className="flex justify-center items-center gap-2">
        <CreateVaccineModel />
        <SearchInputFeild placeholder="Search..." />
        <Link to={CREATE_HEALTH_RECORD} className="h-full">
          <Button className="h-full">Add Health Record</Button>
        </Link>
      </div>
      <VaccinationBar />
      <HealthMonitoringTable />
    </div>
  );
};

export default HealthMonitoring;
