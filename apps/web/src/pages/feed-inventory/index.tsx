import InventoryTable from "./components/inventory-table";
import SearchInputFeild from "@/components/custom-ui/search-input-feild";
import { Button } from "@/components/ui/button";
import { useFeedInventory } from "@/hooks/api/feed-inventory.hook";

function InventoryList() {
  const { results = [] } = useFeedInventory();
  return (
    <div className="space-y-4 flex flex-col h-full ">
      <div className="flex flex-row justify-center items-center gap-4">
        <SearchInputFeild placeholder="Search Feed Item..." />
        <Button className="h-full">Add New Feed Item</Button>
      </div>
      <InventoryTable results={results} />
    </div>
  );
}

export default InventoryList;
