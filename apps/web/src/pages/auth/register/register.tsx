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
import { useRegisterUser } from "@/hooks/api/auth.hook";

import InputField from "@/components/custom-ui/form-feilds/input-field";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN, VERIFY_OTP } from "@/constants/app-routes";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UserRoles } from "@/types/api/common";
import { useToast } from "@/hooks/use-toast";
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
  const { mutateAsync: registerUser } = useRegisterUser();
  const { toast } = useToast();
  const navigate = useNavigate();
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

  const handleSubmit = async (data: RegisterData) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
        name: data.username,
        roles: [data.role],
      };
      await registerUser(payload, {
        onSuccess: () => {
          toast({
            title: "Verification OTP has been sent on email.",
          });
          navigate(VERIFY_OTP(payload.email));
        },
        onError: (error) => {
          toast({ title: error.message, variant: "destructive" });
        },
      });
    } catch (error) {
      console.log("Error : ", error);
    }
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Roles</SelectLabel>
                            {Object.values(UserRoles)
                              .filter((role) => role !== UserRoles.Admin)
                              .map((role) => {
                                return (
                                  <SelectItem key={role} value={role}>
                                    {role}
                                  </SelectItem>
                                );
                              })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
