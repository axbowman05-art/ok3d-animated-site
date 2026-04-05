import { z } from "zod";

export const quoteSchema = z.object({
  name: z.string().min(2, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Valid email required").max(254, "Email is too long"),
  company: z.string().max(200, "Company name is too long").optional(),
  phone: z.string().max(30, "Phone number is too long").optional(),
  material: z.string().min(1, "Please select a material").max(100),
  quantity: z.number().int().min(1, "Enter at least 1 part").max(10000, "Contact us directly for bulk orders over 10,000 parts"),
  description: z.string().min(10, "Please describe your project").max(2000, "Description is too long"),
  deadline: z.string().min(1, "Please select a deadline").max(50),
  notes: z.string().max(1000, "Notes are too long").optional(),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;
