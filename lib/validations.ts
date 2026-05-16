// lib/validations.ts
import { z } from "zod";

export const rsvpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(6, "Phone number is required"),
  adult_attendees: z.number().int().min(1, "At least 1 adult is required"),
  child_attendees: z.number().int().min(0, "Cannot be negative"),
  will_attend: z.boolean({
    error: "Please select whether you will attend",
  }),
  message: z.string().optional(),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;
