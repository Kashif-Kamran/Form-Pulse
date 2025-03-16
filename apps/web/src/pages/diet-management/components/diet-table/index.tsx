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
import { AnimalDietPlanPublic } from "@repo/shared";
import { formatDateDifference, formatDateToString } from "@/lib/moment";

interface DietListTableProps {
  results: AnimalDietPlanPublic[];
}

function DietListTable({ results }: DietListTableProps) {
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
              <TableHead></TableHead>
              <TableHead></TableHead>
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
              results.map((dietPlan) => (
                <TableRow
                  key={dietPlan.id}
                  onClick={() => rowClick(dietPlan.id)}
                >
                  <TableCell className="pl-6">{dietPlan.animal.name}</TableCell>
                  <TableCell>
                    {formatDateToString(dietPlan.startTime)}
                  </TableCell>
                  <TableCell>
                    {formatDateDifference(dietPlan.startTime, dietPlan.endTime)}
                  </TableCell>
                  <TableCell className="text-end">
                    <Button variant={"link"}>Edit</Button>
                  </TableCell>
                  <TableCell className="p-0 text-center">
                    <Button
                      className="h-8 w-8 text-destructive hover:bg-destructive hover:text-destructive-foreground p-[6px]"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Delete action for id:", dietPlan.id);
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
