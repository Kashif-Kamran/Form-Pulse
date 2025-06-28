import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { IFeedInventory } from "@repo/shared";
import FeedInventoryActions from "./feed-inventory-actions";

interface InventoryTableProps {
  results: IFeedInventory[];
  onEdit: (feedItem: IFeedInventory) => void;
  onDelete: (feedItem: IFeedInventory) => void;
  showActions?: boolean;
}

function InventoryTable({ results, onEdit, onDelete, showActions = true }: InventoryTableProps) {
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
              {showActions && <TableHead className="text-center">Action</TableHead>}
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
                  {showActions && (
                    <TableCell className="text-center">
                      <FeedInventoryActions
                        feedItem={item}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    </TableCell>
                  )}
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
