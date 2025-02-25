import InputField from "@/components/custom-ui/form-feilds/input-field";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import AnimalListTable from "../components/tables/animal-list-table";
import { useAnimals } from "@/hooks/api/animal.hook";
import { CreateAnimalModel } from "../components/create-animal-model";
function AnimalList() {
  const { results = [] } = useAnimals();
  return (
    <div className="space-y-4 flex flex-col h-full">
      <InputField
        className="rounded-full bg-white pr-0 border-0 shadow-md"
        leftIcon={<SearchIcon />}
        placeholder="Search Animal..."
        rightIcon={
          <Button
            size={"icon"}
            className="rounded-r-full py-6 px-12 [&_svg]:size-none"
          >
            Search
          </Button>
        }
      />
      <AnimalListTable results={results} />
      <div className="pl-4">
        <CreateAnimalModel />
      </div>
    </div>
  );
}

export default AnimalList;
