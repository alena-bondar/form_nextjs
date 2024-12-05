import { z } from "zod";

export const menuItemSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Must be 5 or more characters" })
    .max(50, { message: "Must be no more than 50 characters" }),
  link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type FormData = z.infer<typeof menuItemSchema>;
