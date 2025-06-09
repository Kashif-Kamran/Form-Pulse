import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { PopulatedAnimalHealthRecord } from "@repo/shared";

export interface HealthMonitoringTableProps {
  results: PopulatedAnimalHealthRecord[];
}

const HealthMonitoringTable = ({ results }: HealthMonitoringTableProps) => {
  // const handleDelete = (id: number) => {
  //   setAnimals(animals.filter((animal) => animal.id !== id));
  // };

  // const getStatusColor = (status: string) => {
  //   if (status === "Add") return "text-green-500";
  //   if (status === "Vaccinated") return "text-blue-500";
  //   return "text-red-500"; // For "Remaining" numbers
  // };

  // const rowClick = (id: number) => {
  //   console.log("Row clicked:", id);
  // };

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
                    <Button
                      className="h-8 w-8 text-destructive hover:bg-destructive hover:text-destructive-foreground p-[6px]"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        // handleDelete(item.id);
                      }}
                    >
                      <Trash2Icon className="h-full w-full" />
                    </Button>
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
