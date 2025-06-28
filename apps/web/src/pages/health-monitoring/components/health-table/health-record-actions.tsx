import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditIcon, EllipsisVertical, Trash2Icon } from "lucide-react";
import { PopulatedAnimalHealthRecord } from "@repo/shared";

interface HealthRecordActionsProps {
  healthRecord: PopulatedAnimalHealthRecord;
  onEdit: (healthRecord: PopulatedAnimalHealthRecord) => void;
  onDelete: (healthRecord: PopulatedAnimalHealthRecord) => void;
}

function HealthRecordActions({ healthRecord, onEdit, onDelete }: HealthRecordActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-8 w-8 p-0"
        >
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => onEdit(healthRecord)}
          className="cursor-pointer"
        >
          <EditIcon className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onDelete(healthRecord)}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <Trash2Icon className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default HealthRecordActions;
