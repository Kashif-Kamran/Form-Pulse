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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ANIMAL_DETAIL } from "@/constants/app-routes";
import { useDeleteAnimalById } from "@/hooks/api/animal.hook";
import { useToast } from "@/hooks/use-toast";
import { AnimalPublic } from "@repo/shared";
import { Trash2Icon, Edit2Icon, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface AnimalListTableProps {
  results: AnimalPublic[];
  onEdit: (animal: AnimalPublic) => void;
}

function AnimalListTable({ results, onEdit }: AnimalListTableProps) {
  const { mutateAsync: deleteAnimalById } = useDeleteAnimalById();
  const { toast } = useToast();
  const navigate = useNavigate();
  function rowClick(animalId: string) {
    navigate(ANIMAL_DETAIL(animalId));
  }
  function handleDelete(animalId: string) {
    deleteAnimalById(
      { animalId },
      {
        onSuccess: () => {
          toast({
            title: "Animal deleted Successfully",
            variant: "default",
          });
        },
        onError: (error) => {
          toast({
            title: "Unable to Delete Animal",
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  }

  function handleEdit(animal: AnimalPublic) {
    onEdit(animal);
  }
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
                <TableRow key={animal.id} onClick={() => rowClick(animal.id)}>
                  <TableCell className="pl-6">{animal.name}</TableCell>
                  <TableCell>{animal.age}</TableCell>
                  <TableCell>{animal.breed}</TableCell>
                  <TableCell>{animal.weight}</TableCell>
                  <TableCell className="p-0 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="h-8 w-8 p-0"
                          variant="ghost"
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(event) => {
                            event.stopPropagation();
                            handleEdit(animal);
                          }}
                          className="cursor-pointer"
                        >
                          <Edit2Icon className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDelete(animal.id);
                          }}
                          className="cursor-pointer text-destructive focus:text-destructive"
                        >
                          <Trash2Icon className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
