import InventoryTable from "./components/inventory-table";
import SearchInputFeild from "@/components/custom-ui/search-input-feild";
import { useFeedInventory } from "@/hooks/api/feed-inventory.hook";
import { useCurrentUser } from "@/hooks/api/auth.hook";
import { CreateFeedInventoryItemModel } from "./components/create-Inventory-item-model";
import { UpdateFeedInventoryDialog } from "./components/update-feed-inventory-dialog";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { IFeedInventory, RoleType } from "@repo/shared";
import { useToast } from "@/hooks/use-toast";

function InventoryList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get current user for role-based access control
  const { data: currentUser } = useCurrentUser();

  const initialSearch = searchParams.get("q") || "";
  const [search, setSearch] = useState(initialSearch);
  const [query, setQuery] = useState(initialSearch);

  // Update dialog state
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedFeedItem, setSelectedFeedItem] = useState<IFeedInventory | null>(null);

  const { results = [] } = useFeedInventory(query);

  // Check if user is a caretaker
  const isCareTaker = currentUser?.role === RoleType.CareTaker;

  const handleSearch = () => {
    setQuery(search);
    if (search.trim()) {
      navigate(`?q=${encodeURIComponent(search)}`);
    } else {
      navigate("");
    }
  };

  const handleEdit = (feedItem: IFeedInventory) => {
    setSelectedFeedItem(feedItem);
    setUpdateDialogOpen(true);
  };

  const handleDelete = (feedItem: IFeedInventory) => {
    // TODO: Implement delete functionality with confirmation dialog
    toast({
      title: "Delete functionality not implemented yet",
      description: `Would delete ${feedItem.name}`,
      variant: "destructive",
    });
  };
  return (
    <div className="space-y-4 flex flex-col h-full ">
      <div className="flex flex-row justify-center items-center gap-4">
        <SearchInputFeild
          placeholder="Search Feed Item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={handleSearch}
        />
        {isCareTaker && <CreateFeedInventoryItemModel />}
      </div>
      <InventoryTable 
        results={results} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        showActions={isCareTaker}
      />
      
      {isCareTaker && (
        <UpdateFeedInventoryDialog
          feedItem={selectedFeedItem}
          open={updateDialogOpen}
          onOpenChange={setUpdateDialogOpen}
        />
      )}
    </div>
  );
}

export default InventoryList;
