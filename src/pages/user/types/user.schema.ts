import { z } from "zod";

export const userFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Invalid email address"),
  mobile: z
    .string()
    .trim()
    .length(10, "Mobile number must be exactly 10 digits")
    .regex(/^\d+$/, "Mobile number must contain only digits"),
  age: z.string().trim().min(1, "Age is required"),
  gender: z.string().min(1, "Please select a gender"),
  description: z.string().trim().optional(),
});

export type UserFormData = z.infer<typeof userFormSchema>;
