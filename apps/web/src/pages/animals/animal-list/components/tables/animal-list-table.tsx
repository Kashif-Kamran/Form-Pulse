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

const animals = [
  {
    id: 1,
    name: "Charlie",
    age: 10,
    breed: "Australian Shepherd",
    weight: "110 kg",
  },
  { id: 2, name: "Bella", age: 5, breed: "Labrador", weight: "25 kg" },
  { id: 3, name: "Max", age: 7, breed: "German Shepherd", weight: "30 kg" },
  { id: 4, name: "Lucy", age: 3, breed: "Bulldog", weight: "20 kg" },
  { id: 5, name: "Cooper", age: 6, breed: "Poodle", weight: "15 kg" },
  { id: 6, name: "Daisy", age: 8, breed: "Beagle", weight: "18 kg" },
  { id: 7, name: "Rocky", age: 9, breed: "Boxer", weight: "28 kg" },
  { id: 8, name: "Luna", age: 4, breed: "Corgi", weight: "12 kg" },
  { id: 9, name: "Milo", age: 2, breed: "Pug", weight: "10 kg" },
  {
    id: 10,
    name: "Sadie",
    age: 11,
    breed: "Golden Retriever",
    weight: "32 kg",
  },
  { id: 6, name: "Daisy", age: 8, breed: "Beagle", weight: "18 kg" },
  { id: 7, name: "Rocky", age: 9, breed: "Boxer", weight: "28 kg" },
  { id: 8, name: "Luna", age: 4, breed: "Corgi", weight: "12 kg" },
  { id: 9, name: "Milo", age: 2, breed: "Pug", weight: "10 kg" },
  { id: 6, name: "Daisy", age: 8, breed: "Beagle", weight: "18 kg" },
  { id: 7, name: "Rocky", age: 9, breed: "Boxer", weight: "28 kg" },
  { id: 8, name: "Luna", age: 4, breed: "Corgi", weight: "12 kg" },
  { id: 9, name: "Milo", age: 2, breed: "Pug", weight: "10 kg" },
  { id: 6, name: "Daisy", age: 8, breed: "Beagle", weight: "18 kg" },
  { id: 7, name: "Rocky", age: 9, breed: "Boxer", weight: "28 kg" },
  { id: 8, name: "Luna", age: 4, breed: "Corgi", weight: "12 kg" },
  { id: 9, name: "Milo", age: 2, breed: "Pug", weight: "10 kg" },
  { id: 6, name: "Daisy", age: 8, breed: "Beagle", weight: "18 kg" },
  { id: 7, name: "Rocky", age: 9, breed: "Boxer", weight: "28 kg" },
  { id: 8, name: "Luna", age: 4, breed: "Corgi", weight: "12 kg" },
  { id: 9, name: "Milo", age: 2, breed: "Pug", weight: "10 kg" },
  { id: 6, name: "Daisy", age: 8, breed: "Beagle", weight: "18 kg" },
  { id: 7, name: "Rocky", age: 9, breed: "Boxer", weight: "28 kg" },
  { id: 8, name: "Luna", age: 4, breed: "Corgi", weight: "12 kg" },
  { id: 9, name: "Milo", age: 2, breed: "Pug", weight: "10 kg" },
  { id: 6, name: "Daisy", age: 8, breed: "Beagle", weight: "18 kg" },
  { id: 7, name: "Rocky", age: 9, breed: "Boxer", weight: "28 kg" },
  { id: 8, name: "Luna", age: 4, breed: "Corgi", weight: "12 kg" },
  { id: 9, name: "Milo", age: 2, breed: "Pug", weight: "10 kg" },
  { id: 6, name: "Daisy", age: 8, breed: "Beagle", weight: "18 kg" },
  { id: 7, name: "Rocky", age: 9, breed: "Boxer", weight: "28 kg" },
  { id: 8, name: "Luna", age: 4, breed: "Corgi", weight: "12 kg" },
  { id: 9, name: "Milo", age: 2, breed: "Pug", weight: "10 kg" },
  { id: 6, name: "Daisy", age: 8, breed: "Beagle", weight: "18 kg" },
  { id: 7, name: "Rocky", age: 9, breed: "Boxer", weight: "28 kg" },
  { id: 8, name: "Luna", age: 4, breed: "Corgi", weight: "12 kg" },
  { id: 9, name: "Milo", age: 2, breed: "Pug", weight: "10 kg" },
  { id: 6, name: "Daisy", age: 8, breed: "Beagle", weight: "18 kg" },
  { id: 7, name: "Rocky", age: 9, breed: "Boxer", weight: "28 kg" },
  { id: 8, name: "Luna", age: 4, breed: "Corgi", weight: "12 kg" },
  { id: 9, name: "Milo", age: 2, breed: "Pug", weight: "10 kg" },
  { id: 6, name: "Daisy", age: 8, breed: "Beagle", weight: "18 kg" },
  { id: 7, name: "Rocky", age: 9, breed: "Boxer", weight: "28 kg" },
  { id: 8, name: "Luna", age: 4, breed: "Corgi", weight: "12 kg" },
  { id: 9, name: "Milo", age: 2, breed: "Pug", weight: "10 kg" },
];

function AnimalListTable() {
  return (
    <div className="flex flex-col overflow-hidden bg-white rounded-xl">
      <ScrollArea className="h-full">
        <Table>
          <TableHeader className="bg-[#E2E2E2]">
            <TableHead className="pl-6">Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Breed</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableHeader>
          <TableBody className="flex-1">
            {animals.map((animal) => (
              <TableRow key={animal.id}>
                <TableCell className="pl-6">{animal.name}</TableCell>
                <TableCell>{animal.age}</TableCell>
                <TableCell>{animal.breed}</TableCell>
                <TableCell>{animal.weight}</TableCell>
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

export default AnimalListTable;
