import InventoryTable from "./components/inventory-table";
import SearchInputFeild from "@/components/custom-ui/search-input-feild";
import { useFeedInventory } from "@/hooks/api/feed-inventory.hook";
import { CreateFeedInventoryItemModel } from "./components/create-Inventory-item-model";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

function InventoryList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialSearch = searchParams.get("q") || "";
  const [search, setSearch] = useState(initialSearch);
  const [query, setQuery] = useState(initialSearch);

  const { results = [] } = useFeedInventory(query);

  const handleSearch = () => {
    setQuery(search);
    if (search.trim()) {
      navigate(`?q=${encodeURIComponent(search)}`);
    } else {
      navigate("");
    }
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
        <CreateFeedInventoryItemModel />
      </div>
      <InventoryTable results={results} />
    </div>
  );
}

export default InventoryList;
