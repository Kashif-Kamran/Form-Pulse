import * as z from "zod";
import { AnimalSchema } from "@/pages/diet-management/components/zod-schemas";
import { CreateAnimalHealthRecordReq } from "@repo/shared";

export const UserSchema = z.object({
  id: z.string().min(1, "Please select a veterinarian"),
  name: z.string().min(1, "Veterinarian name is required"),
  email: z.string().email("Valid email is required"),
  role: z.string().min(1, "Veterinarian role is required"),
});

export const MedicationDoseSchema = z.object({
  id: z.string().min(1, "Dose ID is required"),
  deliveryDate: z.date({
    required_error: "Delivery date is required",
    invalid_type_error: "Please select a valid delivery date",
  }),
  quantity: z.number({
    required_error: "Quantity is required",
    invalid_type_error: "Quantity must be a valid number",
  }).min(1, "Quantity must be at least 1"),
});

export const VaccinationSchema = z.object({
  id: z.string().min(1, "Please select a vaccine"),
  name: z.string().min(1, "Vaccine name is required"),
  type: z.string().min(1, "Vaccine type is required"),
});

export const HealthRecordSchema = z
  .object({
    animal: AnimalSchema,
    veterinarian: UserSchema,
    vaccinationType: z.string({
      required_error: "Vaccination type is required",
    }).min(1, "Please select a vaccination type"),
    vaccination: VaccinationSchema,
    medicationDoses: z
      .array(MedicationDoseSchema)
      .min(1, { message: "Please add at least one vaccination schedule" }),
  })
  .refine((data) => data.animal !== undefined, {
    message: "Please select an animal for this health record",
    path: ["animal"],
  })
  .refine((data) => data.veterinarian !== undefined, {
    message: "Please assign a veterinarian to this health record",
    path: ["veterinarian"],
  })
  .refine((data) => data.vaccination !== undefined, {
    message: "Please select a vaccine for this health record",
    path: ["vaccination"],
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

export const transformHealthRecordForBackend = (
  payload: HealthRecordFormType
): CreateAnimalHealthRecordReq => {
  return {
    animal: payload.animal.id,
    schedule: payload.medicationDoses.map((item) => ({
      dateTime: item.deliveryDate,
      quantity: item.quantity,
    })),
    vaccine: payload.vaccination.id,
    veterinarian: payload.veterinarian.id,
  };
};

export type HealthRecordFormType = z.infer<typeof HealthRecordSchema>;
