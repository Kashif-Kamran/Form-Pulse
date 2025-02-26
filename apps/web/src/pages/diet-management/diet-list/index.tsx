import SearchInputFeild from "@/components/custom-ui/search-input-feild";
import NotifyNutritionistCard from "../components/notify-nutritionist-card";
import DietListTable from "../components/diet-table";
import { Button } from "@/components/ui/button";

function AnimalList() {
  return (
    <div className="space-y-4 flex flex-col h-full">
      <div className="flex justify-center items-center gap-2">
        <SearchInputFeild placeholder="Search Animal..." />
        <Button className="h-full"> Create Diet Plan</Button>
      </div>
      <NotifyNutritionistCard />
      <DietListTable />
    </div>
  );
}

export default AnimalList;
