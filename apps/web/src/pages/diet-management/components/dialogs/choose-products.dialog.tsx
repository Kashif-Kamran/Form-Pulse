import InputField from "@/components/custom-ui/form-feilds/input-field";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useState } from "react";
import { FeedItemPublic } from "@repo/shared";
import { useFeedInventory } from "@/hooks/api/feed-inventory.hook";

function ChooseFeedItemDialog({
  onSelectItem,
  selectedItemId,
}: {
  onSelectItem: (animal: FeedItemPublic) => void;
  selectedItemId?: string;
}) {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { results: feedItems = [] } = useFeedInventory(query);

  const handleSearch = () => {
    setQuery(search);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button>Feed Item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] sm:max-h-[800px]">
        <DialogTitle className="bg-primary text-primary-foreground py-4 text-center rounded-md mt-4">
          Select Feed Item
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
                <TableHead>Item name</TableHead>
                <TableHead>Used Quantity</TableHead>
                <TableHead>Remaining Quantity</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No animals found
                  </TableCell>
                </TableRow>
              )}
              {feedItems.map((feedItem) => (
                <TableRow key={feedItem.id}>
                  <TableCell>{feedItem.name}</TableCell>
                  <TableCell>{feedItem.usedStock}</TableCell>
                  <TableCell>{feedItem.remainingStock}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      onClick={() => {
                        if (!feedItem.id || feedItem.id === selectedItemId)
                          return;
                        onSelectItem(feedItem);
                        setIsOpen(false);
                      }}
                      disabled={feedItem.id === selectedItemId}
                      color={feedItem.id === selectedItemId ? "green" : "zinc"}
                    >
                      Select
                    </Button>
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

export default ChooseFeedItemDialog;
