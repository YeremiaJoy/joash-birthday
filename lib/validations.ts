// lib/validations.ts
import { z } from "zod";

export const rsvpSchema = z.object({
  name: z.string().min(2, "Nama harus minimal 2 karakter"),
  adult_attendees: z.number().int().min(1, "Minimal 1 orang dewasa wajib hadir"),
  child_attendees: z.number().int().min(0, "Tidak boleh negatif"),
  will_attend: z.boolean({
    error: "Mohon pilih apakah kamu bisa hadir",
  }),
  message: z.string().optional(),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;
