import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LOGIN } from "@/constants/app-routes";
import { useVerifyOtp } from "@/hooks/api/auth.hook";
import { useToast } from "@/hooks/use-toast";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const VerifyOtp = () => {
  const [value, setValue] = useState<string>("");
  const { mutateAsync: verifyOtp } = useVerifyOtp();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { email } = useParams<{ email: string }>();

  const handleContinue = async () => {
    try {
      if (!email)
        return toast({
          title: "Invalid email, please enter valid email in location path",
          variant: "destructive",
        });
      if (isNaN(Number(value)))
        return toast({
          title: "Otp should be a 6 digit number",
          variant: "destructive",
        });

      const payload = { otp: Number(value), email };
      console.log(payload);
      await verifyOtp(payload, {
        onSuccess: (data) => {
          toast({ title: data.message });
          navigate(LOGIN);
        },
      });
    } catch (error: any) {
      await toast({
        title: error?.message ?? "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-full flex bg-gray-200">
      <div className="w-[45%] h-full  flex items-center justify-center bg-white">
        <img src="/logo.png" alt="Logo not found" />
      </div>
      <div className="w-[55%] flex items-center justify-center ">
        <div className="border-[1px] border-black w-[60%] p-8 rounded-[15px] bg-white shadow-lg ">
          <h2 className="text-2xl font-bold text-center mb-6 ">
            Reset Password
          </h2>
          <h1 className="text-center mb-2">
            Enter the OTP sent to <strong>{email}</strong>
          </h1>
          <div className=" flex flex-col items-center">
            <InputOTP
              value={value}
              onChange={(value) => setValue(value)}
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <p className="text-center">
            Don't have an account?{" "}
            <Button className="m-0 p-0 text-md" variant={"link"}>
              Resend
            </Button>
          </p>
          <Button className="w-full py-6" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
