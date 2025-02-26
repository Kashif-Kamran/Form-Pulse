import AnimalListTable from "../components/tables/animal-list-table";
import { useAnimals } from "@/hooks/api/animal.hook";
import { CreateAnimalModel } from "../components/create-animal-model";
import SearchInputFeild from "@/components/custom-ui/search-input-feild";
function AnimalList() {
  const { results = [] } = useAnimals();
  return (
    <div className="space-y-4 flex flex-col h-full">
      <div className="flex items-center gap-4">
        <SearchInputFeild placeholder="Search Animals" />
        <CreateAnimalModel />
      </div>
      <AnimalListTable results={results} />
    </div>
  );
}

export default AnimalList;
