import { CreateDietPlanReq } from "@repo/shared";
import { z } from "zod";

export const AnimalSchema = z.object({
  id: z.string().min(1, "Animal selection is required"),
  name: z.string().min(1, "Animal name is required"),
  species: z.string().min(1, "Animal species is required"),
  breed: z.string().min(1, "Animal breed is required"),
  age: z.number().min(0, "Animal age must be a positive number"),
  weight: z.number().min(0, "Animal weight must be a positive number"),
});

export type AnimalData = z.infer<typeof AnimalSchema>;

const FeedItemSchema = z.object({
  feed: z.object({
    id: z.string().min(1, "Feed item ID is required"),
    name: z.string().min(1, "Feed item name is required"),
    remainingStock: z.number().min(0, "Remaining stock must be non-negative"),
    usedStock: z.number().min(0, "Used stock must be non-negative"),
    totalPrice: z.number().min(0, "Total price must be non-negative"),
  }),
  perTimeQuantity: z.number().min(1, "Per-time quantity must be at least 1"),
  quantity: z.number().min(1, "Total quantity must be at least 1"),
});

export const DietPlanSchema = z
  .object({
    animal: AnimalSchema,
    startTime: z.date({
      required_error: "Start date is required",
      invalid_type_error: "Please select a valid start date",
    }),
    endTime: z.date({
      required_error: "End date is required",
      invalid_type_error: "Please select a valid end date",
    }),
    noOfTimesPerDay: z
      .number({
        required_error: "Times per day is required",
        invalid_type_error: "Times per day must be a valid number",
      })
      .min(1, { message: "Times per day must be at least 1" }),
    careTaker: z.object({
      id: z.string().min(1, "Please select a care taker for this diet plan"),
      _id: z.string().min(1, "Please select a care taker for this diet plan"),
      name: z.string().min(1, "Care taker must have a valid name"),
      role: z.string().min(1, "Care taker must have a valid role"),
    }),
    recipes: z
      .array(FeedItemSchema)
      .min(1, { message: "Please add at least one recipe to the diet plan" }),
  })
  .refine((data) => data.animal !== undefined, {
    message:
      "Please select an animal for the diet plan. Click 'Select Animal' to choose from available animals.",
    path: ["animal"],
  })
  .refine((data) => data.endTime >= data.startTime, {
    message:
      "End date must be the same as or after the start date. Please select a valid end date.",
    path: ["endTime"],
  })
  .refine(
    (data) => data.recipes.every((recipe) => recipe.perTimeQuantity > 0),
    {
      message:
        "All recipes must have a per-time quantity greater than 0. Please check your recipe quantities.",
      path: ["recipes"],
    }
  )
  .refine(
    (data) => {
      // Check if any recipe has insufficient stock
      return data.recipes.every((recipe) => {
        const totalRequired = recipe.quantity;
        return recipe.feed.remainingStock >= totalRequired;
      });
    },
    {
      message:
        "One or more recipes require more feed than available in stock. Please adjust quantities or choose different feeds.",
      path: ["recipes"],
    }
  );

export const transformDietPlanForBackend = (
  data: DietPlanData
): CreateDietPlanReq => {
  return {
    startTime: data.startTime,
    endTime: data.endTime,
    noOfTimesPerDay: data.noOfTimesPerDay,
    careTaker: data.careTaker._id,
    recipes: data.recipes.map((recipe) => ({
      feed: recipe.feed.id,
      perTimeQuantity: recipe.perTimeQuantity,
    })),
  };
};

export type DietPlanData = z.infer<typeof DietPlanSchema>;
