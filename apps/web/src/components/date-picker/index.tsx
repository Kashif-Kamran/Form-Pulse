import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "../ui/label";

export interface DatePickerProps {
  label?: React.ReactNode;
  placeholder?: string;
  selectedDate?: Date;
  onSelectDate?: (date: Date) => void;
  buttonProps?: ButtonProps;
  calendarProps?: CalendarProps;
  className?: string;
}

function DatePicker({
  label,
  placeholder = "Pick a date",
  selectedDate: controlledDate,
  onSelectDate,
  buttonProps,
  calendarProps,
  className,
}: DatePickerProps) {
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    undefined
  );
  const date = controlledDate !== undefined ? controlledDate : internalDate;
  const { className: buttonClassName, ...remainingButtonProps } =
    buttonProps || {};
  const handleSelectDate = (selected: Date | [Date, Date] | undefined) => {
    if (!selected || Array.isArray(selected)) return;
    if (onSelectDate) {
      onSelectDate(selected);
    }
    setInternalDate(selected);
  };

  return (
    <div className={className}>
      {label && <Label className="block mb-2">{label}</Label>}
      <Popover>
        <PopoverTrigger className="flex-1 " asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground",
              buttonClassName
            )}
            {...remainingButtonProps}
          >
            <CalendarIcon className="mr-2" />
            {date ? (
              format(date, "PPP")
            ) : (
              <span className="font-medium">{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            {...calendarProps}
            mode="single"
            selected={date}
            onSelect={handleSelectDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
export default DatePicker;
