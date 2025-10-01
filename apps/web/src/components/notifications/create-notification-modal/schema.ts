import { z } from "zod";
import { NotificationTypes, NotificationPriorities } from "@repo/shared";

export const CreateNotificationSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),

  description: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 5, {
      message: "Description must be at least 5 characters if provided",
    })
    .refine((val) => !val || val.length <= 1000, {
      message: "Description must not exceed 1000 characters",
    }),

  type: z.nativeEnum(NotificationTypes, {
    required_error: "Please select a notification type",
  }),

  priority: z.nativeEnum(NotificationPriorities, {
    required_error: "Please select a priority level",
  }),

  recipient: z.object({
    id: z.string().min(1, "Please select a recipient"),
    name: z.string().min(1, "Recipient name is required"),
    email: z.string().email("Valid email is required"),
    role: z.string().min(1, "Recipient role is required"),
  }),

  animal: z
    .object({
      id: z.string().min(1, "Animal ID is required"),
      name: z.string().min(1, "Animal name is required"),
      breed: z.string().min(1, "Animal breed is required"),
      age: z.number().min(0, "Animal age must be valid"),
      weight: z.number().min(0, "Animal weight must be valid"),
    })
    .optional(),

  dueDate: z
    .date()
    .optional()
    .refine((date) => !date || date > new Date(), {
      message: "Due date must be in the future",
    }),
});

export type CreateNotificationFormData = z.infer<
  typeof CreateNotificationSchema
>;

// Transform function to match the API payload structure
export const transformNotificationForBackend = (
  formData: CreateNotificationFormData
) => {
  return {
    title: formData.title,
    description: formData.description,
    type: formData.type,
    priority: formData.priority,
    recipient: formData.recipient.id,
    animal: formData.animal?.id,
    dueDate: formData.dueDate,
  };
};
