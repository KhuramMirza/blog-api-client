import { z } from "zod";
export const loginsSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Min 6 characters"),
});
