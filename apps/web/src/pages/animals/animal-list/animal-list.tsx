import { useState } from "react";
import { useAnimals } from "@/hooks/api/animal.hook";
import { useSearchParams, useNavigate } from "react-router-dom";
import AnimalListTable from "../components/tables/animal-list-table";
import { CreateAnimalModel } from "../components/create-animal-model";
import SearchInputField from "@/components/custom-ui/search-input-feild";

function AnimalList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialSearch = searchParams.get("q") || "";
  const [search, setSearch] = useState(initialSearch);
  const [query, setQuery] = useState(initialSearch);

  const { results = [] } = useAnimals(query);

  const handleSearch = () => {
    setQuery(search);
    if (search.trim()) {
      navigate(`?q=${encodeURIComponent(search)}`);
    } else {
      navigate("");
    }
  };
  return (
    <div className="space-y-4 flex flex-col h-full">
      <div className="flex items-center gap-4">
        <SearchInputField
          placeholder="Search Animals"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={handleSearch} // Triggers query update
        />
        <CreateAnimalModel />
      </div>
      <AnimalListTable results={results} />
    </div>
  );
}

export default AnimalList;
