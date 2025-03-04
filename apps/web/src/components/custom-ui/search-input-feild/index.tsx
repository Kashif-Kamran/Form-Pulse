import InputField from "../form-feilds/input-field";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

interface SearchInputFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
}

function SearchInputField({
  placeholder = "Search",
  value = "",
  onChange,
  onSearch,
}: SearchInputFieldProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  return (
    <InputField
      className="rounded-full bg-white pr-0 border-0 shadow-md"
      leftIcon={<SearchIcon />}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      rightIcon={
        <Button
          size={"icon"}
          onClick={onSearch}
          className="rounded-r-full py-6 px-12 [&_svg]:size-none"
        >
          Search
        </Button>
      }
    />
  );
}

export default SearchInputField;
