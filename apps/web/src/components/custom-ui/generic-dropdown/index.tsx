import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Option<T> = {
  label: string;
  value: T;
};

type DropdownProps<T extends string | number> = {
  options: Option<T>[];
  placeholder: string;
  onValueChange: (value: T) => void;
  className?: string;
};

function GenericDropdown<T extends string | number>({
  options,
  placeholder,
  onValueChange,
  className = "w-[180px] border-white text-white",
}: DropdownProps<T>) {
  const handleChange = (value: string) => {
    const selected = options.find((o) => o.value.toString() === value);
    if (selected) {
      onValueChange(selected.value);
    }
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              key={option.value.toString()}
              value={option.value.toString()}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default GenericDropdown;
