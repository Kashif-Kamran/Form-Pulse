import { z } from "zod";

// Create Zod Animal Schema

export const AnimalSchema = z.object({
  id: z.string().nonempty(),
  name: z.string(),
  species: z.string(),
  breed: z.string(),
  age: z.number(),
  weight: z.number(),
});

export type AnimalData = z.infer<typeof AnimalSchema>;

export type CreateNewFeedItem = {
  name: string;
  totalQuentity: number;
  totalPrice: number;
};

export const FeedItemSchema = z.object({
  feed: z.object({
    id: z.string(),
    name: z.string(),
    remainingStock: z.number(),
    usedStock: z.number(),
    totalPrice: z.number(),
  }),
  quantity: z.number(),
});

export const DietPlanSchema = z.object({
  animal: AnimalSchema,
  startTime: z.date(),
  endTime: z.date(),
  recipes: z.array(FeedItemSchema),
});

export type DietPlanData = z.infer<typeof DietPlanSchema>;
