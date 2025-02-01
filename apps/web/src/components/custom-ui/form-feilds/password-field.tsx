import InputField, { InputFieldProps } from "./input-field";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";

const TogglePasswordButton = ({
  showPassword,
  toggleShowPassword,
}: {
  showPassword: boolean;
  toggleShowPassword: () => void;
}) => {
  return (
    <Button
      className="p-0 m-0"
      variant={"ghost"}
      type="button"
      onClick={toggleShowPassword}
    >
      {showPassword ? (
        <EyeIcon className="text-muted-foreground" />
      ) : (
        <EyeOffIcon className="text-muted-foreground" />
      )}
    </Button>
  );
};

type PasswordFeildProps = Omit<
  InputFieldProps,
  "leftIcon" | "rightIcon" | "type"
>;

const PasswordFeild = React.forwardRef<HTMLInputElement, PasswordFeildProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
      <InputField
        rightIcon={
          <TogglePasswordButton
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword(!showPassword)}
          />
        }
        {...props}
        type={showPassword ? "text" : "password"}
        ref={ref}
      />
    );
  }
);

PasswordFeild.displayName = "PasswordFeild";

export default PasswordFeild;
