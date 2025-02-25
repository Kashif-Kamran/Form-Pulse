import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AnimalPublic } from "@repo/shared";
import { Trash2Icon } from "lucide-react";

export interface AnimalListTableProps {
  results: AnimalPublic[];
}

function AnimalListTable({ results }: AnimalListTableProps) {
  return (
    <div className="flex flex-col overflow-hidden bg-white rounded-xl">
      <ScrollArea className="h-full">
        <Table>
          <TableHeader className="bg-[#E2E2E2]">
            <TableRow>
              <TableHead className="pl-6">Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Breed</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="flex-1">
            {results.length === 0 && (
              <TableRow>
                <TableCell className="p-4">No Animals Found</TableCell>
              </TableRow>
            )}
            {results.length > 0 &&
              results.map((animal) => (
                <TableRow key={animal.id}>
                  <TableCell className="pl-6">{animal.name}</TableCell>
                  <TableCell>{animal.age}</TableCell>
                  <TableCell>{animal.breed}</TableCell>
                  <TableCell>{animal.weight}</TableCell>
                  <TableCell className="p-0 text-center">
                    <Button
                      className="h-8 w-8 text-destructive hover:bg-destructive hover:text-destructive-foreground p-[6px]"
                      variant="ghost"
                      disabled
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
}

export default AnimalListTable;
