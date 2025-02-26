import { Option } from "@/components/custom-ui/generic-dropdown";

export const convertToOptions = (items: string[]): Option<number>[] => {
  return items.map((item, index) => ({
    label: item,
    value: index,
  }));
};

export const getYearsOptions = (): Option<number>[] => {
  const startYear = 1970;
  const currentYear = new Date().getFullYear();
  const options: Option<number>[] = [];
  for (let year = startYear; year <= currentYear; year++) {
    options.push({ label: year.toString(), value: year });
  }
  return options.reverse();
};
