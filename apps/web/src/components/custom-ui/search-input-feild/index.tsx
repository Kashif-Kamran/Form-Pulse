import InputField from "../form-feilds/input-field";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

interface SearchInputFeildProps {
  placeholder?: string;
}

function SearchInputFeild({ placeholder = "Search" }: SearchInputFeildProps) {
  return (
    <InputField
      className="rounded-full bg-white pr-0 border-0 shadow-md"
      leftIcon={<SearchIcon />}
      placeholder={placeholder}
      rightIcon={
        <Button
          size={"icon"}
          className="rounded-r-full py-6 px-12 [&_svg]:size-none"
        >
          Search
        </Button>
      }
    />
  );
}

export default SearchInputFeild;
