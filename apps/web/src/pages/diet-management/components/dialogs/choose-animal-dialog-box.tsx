import InputField from "@/components/custom-ui/form-feilds/input-field";
import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog";
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
import { CheckCircle } from "lucide-react";
import { useAnimals } from "@/hooks/api/animal.hook";
import { useState } from "react";
import { AnimalPublic } from "@repo/shared";

export function ChooseAnimalDialog({
  isOpen,
  onClose,
  onSelectAnimal,
  selectedAnimalId,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectAnimal: (animal: AnimalPublic) => void;
  selectedAnimalId?: string;
}) {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const { results: animals = [] } = useAnimals(query);

  const handleSearch = () => {
    setQuery(search);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] sm:max-h-[800px]">
        <DialogTitle className="bg-primary text-primary-foreground py-4 text-center rounded-md mt-4">
          Select Animal
        </DialogTitle>
        <div className="flex gap-4 mb-4">
          <InputField
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search animals..."
            className=""
          />
          <Button onClick={handleSearch} className="h-full">
            Search
          </Button>
        </div>
        <ScrollArea className="max-h-[400px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-white">
                <TableHead>Name</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Age</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {animals.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No animals found
                  </TableCell>
                </TableRow>
              )}
              {animals.map((animal) => (
                <TableRow key={animal.id}>
                  <TableCell>{animal.name}</TableCell>
                  <TableCell>{animal.weight}</TableCell>
                  <TableCell>{animal.age}</TableCell>
                  <TableCell className="text-center">
                    {animal.id === selectedAnimalId ? (
                      <div className="flex justify-center w-full">
                        <CheckCircle className="size-8 text-green-400" />
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          if (!animal.id || animal.id === selectedAnimalId)
                            return;
                          onSelectAnimal(animal);
                          onClose();
                        }}
                        disabled={animal.id === selectedAnimalId}
                        color={
                          animal.id === selectedAnimalId ? "green" : "zinc"
                        }
                      >
                        Select
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
