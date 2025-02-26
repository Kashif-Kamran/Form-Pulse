import InputField from "@/components/custom-ui/form-feilds/input-field";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateAnimalModel } from "../animals/components/create-animal-model";
import DietManagementTable from "@/pages/animals/components/tables/diet-management-table"; // Adjust the import path as needed

// Sample data for the DietManagementTable
const sampleDietData = [
  {
    id: "1",
    animals: ["Baby Horse", "Foal"],
    date: "2025-02-26",
    dietTimePeriod: "1 Month",
  },
  {
    id: "2",
    animals: ["Colt"],
    date: "2025-03-01",
    dietTimePeriod: "2 Weeks",
  },
];

const AssignTaskToNutritionist = () => {
  return (
    <div className="w-[100%] mx-auto bg-gray-50 rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Assign Task To Nutritionist</h2>
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <textarea
            className="w-full min-h-[150px] border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Please provide a diet plan for the baby horse before monday..."
          />
        </div>
        <div className="flex flex-col gap-4 min-h-[150px] justify-between">
          <select
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
          >
            <option value="Select Nutritionist">Select Nutritionist</option>
          </select>
          <Button className="w-full bg-green-700 text-white rounded py-3 hover:bg-green-800 h-12">
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
};

const DietManagement = () => {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
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
        <CreateAnimalModel />
      </div>
      <AssignTaskToNutritionist />
      <DietManagementTable results={sampleDietData} className="mt-6" />
    </div>
  );
};

export default DietManagement;