import { useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/custom-ui/form-feilds/input-field";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  VaccineTypes,
  VaccineTypeValues,
} from "@repo/shared/dist/cjs/types/enum.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateVaccine } from "@/hooks/api/vaccine.hook";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const VACCINE_TYPES = Object.values(VaccineTypes) as [string, ...string[]];

const VaccineSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  type: z.enum(VACCINE_TYPES, {
    errorMap: () => ({ message: "Please select a valid vaccine type" }),
  }),
});

type VaccineFormData = z.infer<typeof VaccineSchema>;

export function VaccineForm() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createVaccine } = useCreateVaccine();
  const { toast } = useToast();
  const form = useForm<VaccineFormData>({
    resolver: zodResolver(VaccineSchema),
    defaultValues: {
      name: "",
      type: "",
    },
  });

  const handleSubmit = async (data: VaccineFormData) => {
    try {
      await createVaccine(
        {
          name: data.name,
          type: data.type as VaccineTypeValues,
        },
        {
          onSuccess: () => {
            toast({ title: "Vaccine Information Saved Successfully" });
          },
          onError: (error) => {
            toast({
              title: "Unable to save vaccine information",
              description: error.message,
              variant: "destructive",
            });
          },
        }
      );
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error creating vaccine:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-1 gap-4 py-4"
      >
        {/* Vaccine Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <Label className="mb-4">Vaccine Name</Label>
              <FormControl>
                <InputField placeholder="Enter Vaccine Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Vaccine Type Dropdown */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <Label className="mb-4">Vaccine Type</Label>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Vaccine Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {VACCINE_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-end">
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </Form>
  );
}
