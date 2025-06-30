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
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { useUpdateFeedInventory } from "@/hooks/api/feed-inventory.hook";
import { IFeedInventory } from "@repo/shared";

// Use the same schema as create
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

  protein: z
    .number({
      required_error: "Protein is required",
      invalid_type_error: "Protein must be a valid number",
    })
    .min(0, { message: "Protein must be 0 or more" })
    .max(100, { message: "Protein must be at most 100%" }),

  carbs: z
    .number({
      required_error: "Carbs is required",
      invalid_type_error: "Carbs must be a valid number",
    })
    .min(0, { message: "Carbs must be 0 or more" })
    .max(100, { message: "Carbs must be at most 100%" }),

  fats: z
    .number({
      required_error: "Fats is required",
      invalid_type_error: "Fats must be a valid number",
    })
    .min(0, { message: "Fats must be 0 or more" })
    .max(100, { message: "Fats must be at most 100%" }),

  fiber: z
    .number({
      required_error: "Fiber is required",
      invalid_type_error: "Fiber must be a valid number",
    })
    .min(0, { message: "Fiber must be 0 or more" })
    .max(100, { message: "Fiber must be at most 100%" }),

  calories: z
    .number({
      required_error: "Calories is required",
      invalid_type_error: "Calories must be a valid number",
    })
    .min(0, { message: "Calories must be a positive number" }),

  description: z.string().optional(),
});

type FeedInventoryItemData = z.infer<typeof FeedInventoryItemSchema>;

interface UpdateFeedInventoryDialogProps {
  feedItem: IFeedInventory | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateFeedInventoryDialog({
  feedItem,
  open,
  onOpenChange,
}: UpdateFeedInventoryDialogProps) {
  const { mutateAsync: updateFeedInventory } = useUpdateFeedInventory();
  const { toast } = useToast();

  const form = useForm<FeedInventoryItemData>({
    resolver: zodResolver(FeedInventoryItemSchema),
    defaultValues: {
      name: "",
      totalQuentity: undefined,
      totalPrice: undefined,
      protein: undefined,
      carbs: undefined,
      fats: undefined,
      fiber: undefined,
      calories: undefined,
      description: "",
    },
  });

  // Populate form when feedItem changes
  useEffect(() => {
    if (feedItem && open) {
      form.setValue("name", feedItem.name);
      // Calculate total quantity from remaining + used stock
      const totalQuantity = feedItem.remainingStock + feedItem.usedStock;
      form.setValue("totalQuentity", totalQuantity);
      form.setValue("totalPrice", feedItem.totalPrice);
      form.setValue("protein", feedItem.nutritionInfo.protein);
      form.setValue("carbs", feedItem.nutritionInfo.carbs);
      form.setValue("fats", feedItem.nutritionInfo.fats);
      form.setValue("fiber", feedItem.nutritionInfo.fiber);
      form.setValue("calories", feedItem.nutritionInfo.calories);
      form.setValue("description", feedItem.description || "");
    }
  }, [feedItem, open, form]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  const handleSubmit = async (data: FeedInventoryItemData) => {
    if (!feedItem) return;

    try {
      await updateFeedInventory({
        feedItemId: feedItem.id,
        payload: data,
      });
      toast({ title: "Feed Inventory Item updated successfully" });
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error updating Feed Inventory Item",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader className="bg-primary rounded-md p-4 text-primary-foreground mt-4">
          <DialogTitle className="font-semibold text-center">
            Update Feed Inventory Item
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

            {/* Nutrition Fields */}
            <FormField
              control={form.control}
              name="protein"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <Label>Protein (%) *</Label>
                  <FormControl>
                    <InputField
                      type="number"
                      min={0}
                      max={100}
                      step="0.1"
                      placeholder="0-100"
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
              name="carbs"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <Label>Carbohydrates (%) *</Label>
                  <FormControl>
                    <InputField
                      type="number"
                      min={0}
                      max={100}
                      step="0.1"
                      placeholder="0-100"
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
              name="fats"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <Label>Fats (%) *</Label>
                  <FormControl>
                    <InputField
                      type="number"
                      min={0}
                      max={100}
                      step="0.1"
                      placeholder="0-100"
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
              name="fiber"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <Label>Fiber (%) *</Label>
                  <FormControl>
                    <InputField
                      type="number"
                      min={0}
                      max={100}
                      step="0.1"
                      placeholder="0-100"
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
              name="calories"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <Label>Calories (kcal/kg) *</Label>
                  <FormControl>
                    <InputField
                      type="number"
                      min={0}
                      placeholder="Enter calories"
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
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Update changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
