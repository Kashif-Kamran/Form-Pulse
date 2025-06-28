import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { PopulatedAnimalHealthRecord } from "@repo/shared";
import HealthRecordActions from "./health-record-actions";
import { useNavigate } from "react-router-dom";
import { EDIT_HEALTH_RECORD } from "@/constants/app-routes";

export interface HealthMonitoringTableProps {
  results: PopulatedAnimalHealthRecord[];
}

const HealthMonitoringTable = ({ results }: HealthMonitoringTableProps) => {
  const navigate = useNavigate();

  const handleEdit = (healthRecord: PopulatedAnimalHealthRecord) => {
    navigate(EDIT_HEALTH_RECORD(healthRecord.id.toString()));
  };

  const handleDelete = (healthRecord: PopulatedAnimalHealthRecord) => {
    // TODO: Implement delete functionality
    console.log('Delete health record:', healthRecord.id);
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white rounded-xl">
      <ScrollArea className="h-full">
        <Table>
          <TableHeader className="bg-[#E2E2E2]">
            <TableRow>
              <TableHead className="pl-6">Animal</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Breed</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Vaccination Status</TableHead>
              <TableHead>Vaccine Type</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="flex-1">
            {results.length === 0 && (
              <TableRow>
                <TableCell className="p-4" colSpan={7}>
                  No Animals Found
                </TableCell>
              </TableRow>
            )}
            {results.length > 0 &&
              results.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="pl-6">{item.animal.name}</TableCell>
                  <TableCell>{item.animal.age}</TableCell>
                  <TableCell>{item.animal.breed}</TableCell>
                  <TableCell>{item.animal.weight}</TableCell>
                  <TableCell className={"text-red-500"}>
                    {"Not Defined"}
                  </TableCell>
                  <TableCell>{item.vaccine.name}</TableCell>
                  <TableCell className="p-0 text-center">
                    <HealthRecordActions
                      healthRecord={item}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default HealthMonitoringTable;
