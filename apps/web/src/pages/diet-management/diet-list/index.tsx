import SearchInputFeild from "@/components/custom-ui/search-input-feild";
import NotifyNutritionistCard from "../components/notify-nutritionist-card";
import DietListTable from "../components/diet-table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CREATE_DIET_PLAN } from "@/constants/app-routes";

function AnimalList() {
  return (
    <div className="space-y-4 flex flex-col h-full">
      <div className="flex justify-center items-center gap-2">
        <SearchInputFeild placeholder="Search Animal..." />
        <Link className="h-full" to={CREATE_DIET_PLAN}>
          <Button className="h-full">Create Diet Plan</Button>
        </Link>
      </div>
      {/*  */}
      <NotifyNutritionistCard />
      <DietListTable />
    </div>
  );
}

export default AnimalList;
