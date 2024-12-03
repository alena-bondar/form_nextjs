import { z } from "zod";

export const initialValuesMenuItem = {
  title: "",
  link: "",
};

export const menuItemSchema = z.object({
  title: z.string().min(5, { message: "Must be 5 or more characters long" }),
  link: z.string().url(),
});

export type FormData = z.infer<typeof menuItemSchema>;
