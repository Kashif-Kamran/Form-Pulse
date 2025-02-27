import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { IFeedInventory } from "@repo/shared";

interface InventoryTableProps {
  results: IFeedInventory[];
}

function InventoryTable({ results }: InventoryTableProps) {
  return (
    <div className="flex flex-col overflow-hidden bg-white rounded-xl">
      <ScrollArea className="h-full">
        <Table>
          <TableHeader className="bg-[#E2E2E2]">
            <TableRow>
              <TableHead className="pl-6">Feed</TableHead>
              <TableHead>Used upto</TableHead>
              <TableHead>Remaining</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="flex-1">
            {results.length === 0 ? (
              <TableRow>
                <TableCell className="p-4">No Inventory Found</TableCell>
              </TableRow>
            ) : (
              results.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="pl-6">{item.name}</TableCell>
                  <TableCell>{item.usedStock}</TableCell>
                  <TableCell>{item.remainingStock}</TableCell>
                  <TableCell>{item.totalPrice}</TableCell>
                  <TableCell className="p-0 text-center">
                    <Button
                      className="h-8 w-8 text-destructive hover:bg-destructive hover:text-destructive-foreground p-[6px]"
                      variant="ghost"
                      onClick={() => console.log(`Deleting ${item.name}`)}
                    >
                      <Trash2Icon className="h-full w-full" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}

export default InventoryTable;
