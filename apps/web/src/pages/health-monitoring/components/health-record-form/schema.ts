import * as z from "zod";
import { AnimalSchema } from "@/pages/diet-management/components/zod-schemas";

export const UserSchema = z.object({
  id: z.string().nonempty(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
});

export const MedicationDoseSchema = z.object({
  id: z.string(),
  deliveryDate: z.date(),
  quantity: z.number(),
});

export const VaccinationSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
});

export const HealthRecordSchema = z
  .object({
    animal: AnimalSchema,
    veterinarian: UserSchema,
    vaccinationType: z.string(),
    vaccination: VaccinationSchema,
    medicationDoses: z
      .array(MedicationDoseSchema)
      .min(1, { message: "At least one medication dose is required" }),
  })
  .refine((data) => data.animal !== undefined, {
    message: "Animal is required",
    path: ["animal"],
  })
  .refine((data) => data.veterinarian !== undefined, {
    message: "Veterinarian is required",
    path: ["veterinarian"],
  });

// export const transformDietPlanForBackend = (
//   data: DietPlanData
// ): CreateDietPlanReq => {
//   return {
//     startTime: data.startTime,
//     endTime: data.endTime,
//     recipes: data.recipes.map((recipe) => ({
//       feed: recipe.feed.id,
//       quantity: recipe.quantity,
//     })),
//   };
// };

export type HealthRecordFormType = z.infer<typeof HealthRecordSchema>;
