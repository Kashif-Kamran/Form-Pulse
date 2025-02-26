import InventoryTable from "./components/inventory-table";
import { months } from "@/constants/datetime-constants";
import GenericDropdown from "@/components/custom-ui/generic-dropdown";
import {
  convertToOptions,
  getYearsOptions,
} from "./helpers/generic-dropdown-options.hepers";

function InventoryList() {
  const yearOptions = getYearsOptions();
  const monthsOptions = convertToOptions(months);
  return (
    <div className="space-y-4 flex flex-col h-full ">
      <div className="flex flex-row justify-center items-center gap-4 bg-primary rounded-md p-2">
        <GenericDropdown
          options={monthsOptions}
          placeholder="Select Month"
          onValueChange={(value) => {
            console.log(value);
          }}
        />
        <GenericDropdown
          options={yearOptions}
          placeholder="Select Year"
          onValueChange={(value) => {
            console.log(value);
          }}
        />
      </div>
      <InventoryTable />
    </div>
  );
}

export default InventoryList;
