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

// Validation Schema using Zod for Feed Inventory Item
const FeedInventoryItemSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  totalQuentity: z.coerce
    .number()
    .min(0, { message: "Total Quantity must be a positive number" }),
  totalPrice: z.coerce
    .number()
    .min(0, { message: "Total Price must be a positive number" }),
});

type FeedInventoryItemData = z.infer<typeof FeedInventoryItemSchema>;

export function CreateFeedInventoryItemModel() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createNewFeedInventory } = useCreateFeedInventory();
  const form = useForm<FeedInventoryItemData>({
    resolver: zodResolver(FeedInventoryItemSchema),
    defaultValues: {
      name: "",
      totalQuentity: 0,
      totalPrice: 0,
    },
  });

  const { toast } = useToast();

  const handleSubmit = async (data: FeedInventoryItemData) => {
    try {
      console.log("Feed Inventory Item Data:", data);
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
      <DialogContent className="sm:max-w-[500px]">
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
            {/* Feed Inventory Item Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <Label className="">Name</Label>
                  <FormControl>
                    <InputField placeholder="Enter Feed Item Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Total Quantity */}
            <FormField
              control={form.control}
              name="totalQuentity"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <Label className="">Total Quantity</Label>
                  <FormControl>
                    <InputField
                      placeholder="Enter Total Quantity"
                      type="number"
                      min={0}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Total Price */}
            <FormField
              control={form.control}
              name="totalPrice"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <Label className="">Total Price</Label>
                  <FormControl>
                    <InputField
                      placeholder="Enter Total Price"
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
