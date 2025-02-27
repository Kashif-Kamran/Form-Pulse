import InventoryTable from "./components/inventory-table";
import SearchInputFeild from "@/components/custom-ui/search-input-feild";
import { useFeedInventory } from "@/hooks/api/feed-inventory.hook";
import { CreateFeedInventoryItemModel } from "./components/create-Inventory-item-model";

function InventoryList() {
  const { results = [] } = useFeedInventory();
  return (
    <div className="space-y-4 flex flex-col h-full ">
      <div className="flex flex-row justify-center items-center gap-4">
        <SearchInputFeild placeholder="Search Feed Item..." />
        <CreateFeedInventoryItemModel />
      </div>
      <InventoryTable results={results} />
    </div>
  );
}

export default InventoryList;
