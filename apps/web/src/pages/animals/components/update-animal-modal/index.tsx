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
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateAnimal } from "@/hooks/api/animal.hook";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { AnimalPublic } from "@repo/shared";

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

interface UpdateAnimalModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal?: AnimalPublic;
}

export function UpdateAnimalModal({
  isOpen,
  onClose,
  animal,
}: UpdateAnimalModalProps) {
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

  const { mutateAsync: updateAnimal } = useUpdateAnimal();
  const { toast } = useToast();

  // Update form values when animal data changes
  useEffect(() => {
    if (animal) {
      form.reset({
        name: animal.name,
        breed: animal.breed,
        species: animal.species,
        age: animal.age,
        weight: animal.weight,
      });
    }
  }, [animal, form]);

  const handleSubmit = async (data: AnimalFormData) => {
    if (!animal?.id) return;

    try {
      await updateAnimal({ animalId: animal.id, payload: data });
      toast({
        title: "Animal Information Updated Successfully",
        variant: "default",
      });
      form.reset();
      onClose();
    } catch (error: any) {
      toast({
        title: "Unable to update animal information",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader className="bg-primary rounded-md p-4 text-primary-foreground mt-4">
          <DialogTitle className="font-semibold text-center">
            Update Animal Information
          </DialogTitle>
          <DialogDescription className="hidden">
            Update the details below and click save when you're done.
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
                  <Label className="mb-4 ">Name</Label>
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
                  <Label className="mb-4 ">Breed</Label>
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
                  <Label className="mb-4 ">Species</Label>
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
                  <Label className="mb-4 ">Age</Label>
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
                <FormItem className="space-y-">
                  <Label className="mb-4">Weight (kg)</Label>
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
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Update Animal</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
