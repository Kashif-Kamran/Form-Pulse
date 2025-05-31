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
import { useState } from "react";
import { IVaccine } from "@repo/shared";
import { useVaccines } from "@/hooks/api/vaccine.hook";

export function ChooseVaccineDialog({
  isOpen,
  onClose,
  onSelectUser,
  selectedUserId,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (animal: IVaccine) => void;
  selectedUserId?: string;
}) {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const { results: vaccines = [] } = useVaccines(query);

  const handleSearch = () => {
    console.log("Value : ", search);
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
            className="w-full"
          />

          <Button onClick={handleSearch} className="h-full w-1/3">
            Search
          </Button>
        </div>
        <ScrollArea className="max-h-[400px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-white">
                <TableHead>Name</TableHead>
                <TableHead>type</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vaccines.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No animals found
                  </TableCell>
                </TableRow>
              )}
              {vaccines.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.type}</TableCell>
                  <TableCell className="text-center">
                    {user.id === selectedUserId ? (
                      <div className="flex justify-center w-full">
                        <CheckCircle className="size-8 text-green-400" />
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          if (!user.id || user.id === selectedUserId) return;
                          onSelectUser(user);
                          onClose();
                        }}
                        disabled={user.id === selectedUserId}
                        color={user.id === selectedUserId ? "green" : "zinc"}
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
