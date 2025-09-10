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
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { useCreateFeedInventory } from "@/hooks/api/feed-inventory.hook";

// Updated Zod schema without nutrition fields
export const FeedInventoryItemSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" }),

  totalQuentity: z
    .number({
      required_error: "Total Quantity is required",
      invalid_type_error: "Total Quantity must be a valid number",
    })
    .min(0, { message: "Total Quantity must be a positive number" }),

  totalPrice: z
    .number({
      required_error: "Total Price is required",
      invalid_type_error: "Total Price must be a valid number",
    })
    .min(0, { message: "Total Price must be a positive number" }),

  description: z.string().optional(),
});

type FeedInventoryItemData = z.infer<typeof FeedInventoryItemSchema>;

export function CreateFeedInventoryItemModel() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createNewFeedInventory } = useCreateFeedInventory();
  const { toast } = useToast();

  const form = useForm<FeedInventoryItemData>({
    resolver: zodResolver(FeedInventoryItemSchema),
    defaultValues: {
      name: "",
      totalQuentity: undefined,
      totalPrice: undefined,
      description: "",
    },
  });

  const handleSubmit = async (data: FeedInventoryItemData) => {
    try {
      await createNewFeedInventory(data);
      toast({ title: "Feed Inventory Item created successfully" });
    } catch (error: any) {
      toast({
        title: "Error creating Feed Inventory Item",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      form.reset();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-full">New Feed Item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader className="bg-primary rounded-md p-4 text-primary-foreground mt-4">
          <DialogTitle className="font-semibold text-center">
            Create a New Feed Inventory Item
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
            {/* Basic Fields */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <Label>Name *</Label>
                  <FormControl>
                    <InputField placeholder="Enter Feed Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalQuentity"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <Label>Total Quantity *</Label>
                  <FormControl>
                    <InputField
                      placeholder="Enter Quantity"
                      type="number"
                      min={0}
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === "" ? undefined : Number(value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalPrice"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <Label>Total Price *</Label>
                  <FormControl>
                    <InputField
                      placeholder="Enter Price"
                      type="number"
                      min={0}
                      step="0.01"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === "" ? undefined : Number(value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Optional Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-1 lg:col-span-2 space-y-0">
                  <Label>Description (optional)</Label>
                  <FormControl>
                    <InputField
                      placeholder="Describe this feed item..."
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
