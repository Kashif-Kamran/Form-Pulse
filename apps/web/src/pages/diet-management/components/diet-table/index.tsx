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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2Icon, Edit, MoreHorizontal } from "lucide-react";
import { AnimalDietPlanPublic } from "@repo/shared";
import { formatDateDifference, formatDateToString } from "@/lib/moment";
import { useNavigate } from "react-router-dom";
import { EDIT_DIET_PLAN } from "@/constants/app-routes";

interface DietListTableProps {
  results: AnimalDietPlanPublic[];
}

interface DietPlanActionsProps {
  dietPlan: AnimalDietPlanPublic;
}

function DietPlanActions({ dietPlan }: DietPlanActionsProps) {
  const navigate = useNavigate();
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(EDIT_DIET_PLAN(dietPlan.id));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Delete action for id:", dietPlan.id);
    // TODO: Implement delete functionality
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
          <Trash2Icon className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DietListTable({ results }: DietListTableProps) {
  // Row click handler (for example, to view details)
  console.log("Results:", results);
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
              <TableHead>Start Date</TableHead>
              <TableHead>Diet Time Period</TableHead>
              <TableHead>Doses per day</TableHead>
              <TableHead>Caretaker</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="flex-1">
            {results.length === 0 && (
              <TableRow>
                <TableCell className="p-4" colSpan={6}>
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
                  <TableCell>{dietPlan.noOfTimesPerDay}</TableCell>
                  <TableCell>{dietPlan.careTaker?.name || 'N/A'}</TableCell>
                  <TableCell className="text-center">
                    <DietPlanActions dietPlan={dietPlan} />
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
