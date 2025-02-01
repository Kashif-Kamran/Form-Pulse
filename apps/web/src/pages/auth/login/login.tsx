import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import PasswordFeild from "@/components/custom-ui/form-feilds/password-field";

import InputField from "@/components/custom-ui/form-feilds/input-field";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER, VERIFY_OTP } from "@/constants/app-routes";

const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string(),
});

type LoginData = z.infer<typeof LoginSchema>;

export const Login = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { getValues, setError } = form;

  const handleForgotPassword = async () => {
    const email = getValues("email");
    const isValid = LoginSchema.pick({ email: true }).safeParse({ email });

    if (!isValid.success)
      return setError("email", {
        type: "manual",
        message: "Please enter a valid email address",
      });
    navigate(VERIFY_OTP(email));
  };

  const handleSubmit = (data: LoginData) => {
    console.log("Data ; ", data);
  };
  return (
    <div className="h-full flex bg-gray-200">
      <div className="w-[45%] h-full  flex items-center justify-center bg-white">
        <img src="/logo.png" alt="Logo not found" />
      </div>
      <div className="w-[55%] flex items-center justify-center ">
        <div className="border-[1px] border-black w-[60%] p-8 rounded-[15px] bg-white shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 ">Login</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-3"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormControl>
                      <InputField placeholder="Email Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormControl>
                      <PasswordFeild placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-right">
                Forgot Password?{" "}
                <Button
                  onClick={handleForgotPassword}
                  variant={"link"}
                  type="button"
                >
                  Reset Password
                </Button>
              </p>
              <Button className="w-full py-6" type="submit">
                Login
              </Button>

              <p className="text-center">
                Don't have an account?{" "}
                <Link to={REGISTER} className="text-primary">
                  Sign Up
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
