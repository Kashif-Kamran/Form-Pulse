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
import { Link } from "react-router-dom";
import { LOGIN } from "@/constants/app-routes";

const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(20, { message: "Username must be at most 20 characters" })
      .regex(/^[a-zA-Z0-9_]*$/, {
        message: "Only alphanumeric characters and underscore are allowed",
      }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string(),
    confirmPassword: z.string(),
    role: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password must be same",
    path: ["confirmPassword"],
  });

type RegisterData = z.infer<typeof RegisterSchema>;

export const Register = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
  });

  const handleSubmit = (data: RegisterData) => {
    console.log("Data ; ", data);
  };
  return (
    <div className="h-full flex bg-gray-200">
      <div className="w-[45%] h-full  flex items-center justify-center bg-white">
        <img src="/logo.png" alt="Logo not found" />
      </div>
      <div className="w-[55%] flex items-center justify-center ">
        <div className="border-[1px] border-black w-[60%] p-8 rounded-[15px] bg-white shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 ">Sign Up</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-3"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormControl>
                      <InputField placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormControl>
                      <PasswordFeild
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputField placeholder="Role" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full py-6" type="submit">
                Sign Up
              </Button>

              <p className="text-center">
                Already have an account?{" "}
                <Link to={LOGIN} className="text-primary">
                  Login
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
