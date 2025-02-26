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
import { Trash2Icon } from "lucide-react";

// Define the interface for the diet management data
export interface DietManagementItem {
  id: string;
  animals: string[];
  date: string;
  dietTimePeriod: string;
}

// Props interface for the table
export interface DietManagementTableProps {
  results: DietManagementItem[];
  className?: string; // Add className as an optional prop
}

function DietManagementTable({ results, className }: DietManagementTableProps) {
  return (
    <div className={`flex flex-col overflow-hidden bg-white rounded-xl ${className}`}>
      <ScrollArea className="h-full">
        <Table>
          <TableHeader className="bg-[#E2E2E2]">
            <TableRow>
              <TableHead className="pl-6">Animal(s)</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Diet Time Period</TableHead>
              <TableHead className="text-center">Diet Delete</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="flex-1">
            {results.length === 0 && (
              <TableRow>
                <TableCell className="p-4">No Diet Plans Found</TableCell>
              </TableRow>
            )}
            {results.length > 0 &&
              results.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="pl-6">
                    {item.animals.join(", ")}
                  </TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.dietTimePeriod}</TableCell>
                  <TableCell className="p-0 text-center">
                    <Button
                      className="h-8 w-8 text-destructive hover:bg-destructive hover:text-destructive-foreground p-[6px]"
                      variant="ghost"
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

export default DietManagementTable;