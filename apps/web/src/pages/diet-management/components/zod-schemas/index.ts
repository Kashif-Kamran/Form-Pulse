import { CreateDietPlanReq } from "@repo/shared";
import { z } from "zod";

export const AnimalSchema = z.object({
  id: z.string().nonempty(),
  name: z.string(),
  species: z.string(),
  breed: z.string(),
  age: z.number(),
  weight: z.number(),
});

export type AnimalData = z.infer<typeof AnimalSchema>;

const FeedItemSchema = z.object({
  feed: z.object({
    id: z.string(),
    name: z.string(),
    remainingStock: z.number(),
    usedStock: z.number(),
    totalPrice: z.number(),
  }),
  quantity: z.number(),
});
export const DietPlanSchema = z
  .object({
    animal: AnimalSchema,
    startTime: z.date(),
    endTime: z.date(),
    recipes: z
      .array(FeedItemSchema)
      .min(1, { message: "At least one recipe is required" }),
  })
  .refine((data) => data.animal !== undefined, {
    message: "Animal is required",
    path: ["animal"],
  })
  .refine((data) => data.endTime >= data.startTime, {
    message: "EndTime should not be less than startTime",
    path: ["endTime"],
  });

export const transformDietPlanForBackend = (
  data: DietPlanData
): CreateDietPlanReq => {
  return {
    startTime: data.startTime,
    endTime: data.endTime,
    recipes: data.recipes.map((recipe) => ({
      feed: recipe.feed.id,
      quantity: recipe.quantity,
    })),
  };
};

export type DietPlanData = z.infer<typeof DietPlanSchema>;
