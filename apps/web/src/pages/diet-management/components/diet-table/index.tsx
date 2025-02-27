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

function DietListTable() {
  // Temporary data for diet plans
  const results = [
    {
      id: "1",
      animal: "Lion",
      date: "2023-09-01",
      dietTimePeriod: "8:00 AM - 10:00 AM",
    },
    {
      id: "2",
      animal: "Elephant",
      date: "2023-09-02",
      dietTimePeriod: "9:00 AM - 11:00 AM",
    },
    {
      id: "3",
      animal: "Giraffe",
      date: "2023-09-03",
      dietTimePeriod: "7:00 AM - 9:00 AM",
    },
  ];

  // Row click handler (for example, to view details)
  const rowClick = (id: string) => {
    console.log("Row clicked:", id);
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white rounded-xl">
      <ScrollArea className="h-full">
        <Table>
          <TableHeader className="bg-[#E2E2E2]">
            <TableRow>
              <TableHead className="pl-6">Animal(s)</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Diet Time Period</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="flex-1">
            {results.length === 0 && (
              <TableRow>
                <TableCell className="p-4" colSpan={4}>
                  No Diet Plans Found
                </TableCell>
              </TableRow>
            )}
            {results.length > 0 &&
              results.map((plan) => (
                <TableRow key={plan.id} onClick={() => rowClick(plan.id)}>
                  <TableCell className="pl-6">{plan.animal}</TableCell>
                  <TableCell>{plan.date}</TableCell>
                  <TableCell>{plan.dietTimePeriod}</TableCell>
                  <TableCell className="p-0 text-center">
                    <Button
                      className="h-8 w-8 text-destructive hover:bg-destructive hover:text-destructive-foreground p-[6px]"
                      variant="ghost"
                      onClick={(e) => {
                        // Prevent row click when delete is clicked
                        e.stopPropagation();
                        console.log("Delete action for id:", plan.id);
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
}

export default DietListTable;
