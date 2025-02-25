import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/custom-ui/form-feilds/input-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useCreateAnimal } from "@/hooks/api/animal.hook";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Validation Schema using Zod
const AnimalSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  breed: z.string().min(2, { message: "Breed must be at least 2 characters" }),
  species: z
    .string()
    .min(2, { message: "Species must be at least 2 characters" })
    .max(10, { message: "Species must be at most 10 characters long" }),
  age: z.coerce.number().min(0, { message: "Age must be a positive number" }),
  weight: z.coerce
    .number()
    .min(0, { message: "Weight must be a positive number" }),
});

type AnimalFormData = z.infer<typeof AnimalSchema>;

export function CreateAnimalModel() {
  const [open, setOpen] = useState(false);
  const form = useForm<AnimalFormData>({
    resolver: zodResolver(AnimalSchema),
    defaultValues: {
      name: "",
      breed: "",
      species: "",
      age: 0,
      weight: 0,
    },
  });

  const { mutateAsync: createAnimal } = useCreateAnimal();
  const { toast } = useToast();
  const handleSubmit = async (data: AnimalFormData) => {
    await createAnimal(data, {
      onSuccess: () => {
        toast({ title: "Animal Information Saved Successfully" });
      },
      onError: (error) => {
        toast({
          title: "Unable to save animal information",
          description: error.message,
          variant: "destructive",
        });
      },
    });
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-full">Add New Animal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="bg-primary rounded-md p-4 text-primary-foreground mt-4">
          <DialogTitle className="font-semibold">
            Create a New Animal Profile
          </DialogTitle>
          <DialogDescription className="hidden">
            Enter the details below and click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormControl>
                    <InputField placeholder="Enter Animal Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormControl>
                    <InputField placeholder="Enter Breed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="species"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormControl>
                    <InputField placeholder="Enter Species" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormControl>
                    <InputField
                      placeholder="Enter Age"
                      min={0}
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormControl>
                    <InputField
                      placeholder="Enter Weight (kg)"
                      type="number"
                      min={0}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="col-span-1 lg:col-span-2">
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
