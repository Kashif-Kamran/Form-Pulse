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

function InventoryTable() {
  // Temporary inventory data
  const inventoryData = [
    {
      id: "1",
      feed: "Oats",
      usedUpto: "50 kg",
      remaining: "150 kg",
      totalPrice: "$200",
    },
    {
      id: "2",
      feed: "Hay",
      usedUpto: "30 kg",
      remaining: "70 kg",
      totalPrice: "$100",
    },
    {
      id: "3",
      feed: "Corn",
      usedUpto: "20 kg",
      remaining: "80 kg",
      totalPrice: "$80",
    },
  ];

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
            {inventoryData.length === 0 ? (
              <TableRow>
                <TableCell className="p-4">No Inventory Found</TableCell>
              </TableRow>
            ) : (
              inventoryData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="pl-6">{item.feed}</TableCell>
                  <TableCell>{item.usedUpto}</TableCell>
                  <TableCell>{item.remaining}</TableCell>
                  <TableCell>{item.totalPrice}</TableCell>
                  <TableCell className="p-0 text-center">
                    <Button
                      className="h-8 w-8 text-destructive hover:bg-destructive hover:text-destructive-foreground p-[6px]"
                      variant="ghost"
                      onClick={() => console.log(`Deleting ${item.feed}`)}
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
