import { useState } from "react";
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

interface Animal {
  id: number;
  name: string;
  age: string;
  breed: string;
  weight: string;
  status: string;
  vaccine: string;
}

export interface HealthMonitoringTableProps {
  results: PopulatedAnimalHealthRecord[];
}

const HealthMonitoringTable = ({ results }: HealthMonitoringTableProps) => {
  const [animals, setAnimals] = useState<Animal[]>([
    {
      id: 1,
      name: "Camel 1",
      age: "7 Yrs",
      breed: "Breed",
      weight: "90 kgs",
      status: "Add",
      vaccine: "Anti-MERS",
    },
    {
      id: 2,
      name: "Camel 2",
      age: "7 Yrs",
      breed: "Breed",
      weight: "92 kgs",
      status: "2 Remaining",
      vaccine: "Anti-MERS",
    },
    {
      id: 3,
      name: "Camel 3",
      age: "5 Yrs",
      breed: "Breed",
      weight: "88 kgs",
      status: "Vaccinated",
      vaccine: "Anti-MERS",
    },
    {
      id: 4,
      name: "Horse 1",
      age: "7 Yrs",
      breed: "Breed",
      weight: "82 kgs",
      status: "2 Remaining",
      vaccine: "Anti-MERS",
    },
    {
      id: 5,
      name: "Horse 2",
      age: "8 Yrs",
      breed: "Breed",
      weight: "91 kgs",
      status: "3 Remaining",
      vaccine: "Anti-MERS",
    },
    {
      id: 6,
      name: "Horse 3",
      age: "8 Yrs",
      breed: "Breed",
      weight: "91 kgs",
      status: "3 Remaining",
      vaccine: "Anti-MERS",
    },
  ]);

  const handleDelete = (id: number) => {
    setAnimals(animals.filter((animal) => animal.id !== id));
  };

  const getStatusColor = (status: string) => {
    if (status === "Add") return "text-green-500";
    if (status === "Vaccinated") return "text-blue-500";
    return "text-red-500"; // For "Remaining" numbers
  };

  const rowClick = (id: number) => {
    console.log("Row clicked:", id);
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
            {animals.length === 0 && (
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
