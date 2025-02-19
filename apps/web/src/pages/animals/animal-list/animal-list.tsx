import InputField from "@/components/custom-ui/form-feilds/input-field";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import AnimalListTable from "./components/tables/animal-list-table";
function AnimalList() {
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
      <AnimalListTable />
      <div className="pl-4">
        <Button className="py-5"> Add New Entry</Button>
      </div>
    </div>
  );
}

export default AnimalList;
