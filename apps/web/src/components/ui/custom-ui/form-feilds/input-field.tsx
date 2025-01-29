import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import React from "react";

export interface InputFieldProps extends InputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  errorText?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (inputFeildProps: InputFieldProps, ref) => {
    const {
      leftIcon,
      rightIcon,
      label,
      errorText,
      className,
      ...inputPropsWithoutClassName
    } = inputFeildProps;
    const inputContainerStyles = cn(
      "flex justify-center items-center gap-2 rounded-md px-4 border-2 border-muted px-[14px] py-[8px] shadow-sm text-md transition-all duration-300",
      errorText
        ? "border-destructive-foreground focus-within:border-destructive"
        : "focus-within:border-primary",
      className
    );

    return (
      <div className="flex flex-col gap-[6px] w-full transition-all duration-300">
        {label && <Label className="">{label}</Label>}
        <div className={inputContainerStyles}>
          {leftIcon && (
            <div className="flex justify-center items-center text-muted-foreground">
              {leftIcon}
            </div>
          )}

          <Input
            {...inputPropsWithoutClassName}
            ref={ref}
            className="h-full flex-1 border-0 rounded-none px-0 mx-0 text-inherit text-md"
          />

          {rightIcon && (
            <div className="flex justify-center items-center text-muted-foreground">
              {rightIcon}
            </div>
          )}
          {!rightIcon && errorText && <Info className="text-destructive" />}
        </div>
        {errorText && (
          <Label className="text-destructive text-sm">{errorText}</Label>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
