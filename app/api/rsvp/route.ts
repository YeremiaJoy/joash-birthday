// app/api/rsvp/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rsvpSchema } from "@/lib/validations";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = rsvpSchema.safeParse(body);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Validation failed";
    return NextResponse.json({ error: firstError }, { status: 422 });
  }

  const { name, phone, adult_attendees, child_attendees, valid_for, will_attend, message } =
    parsed.data;

  const { error } = await supabase.from("rsvp").insert({
    name,
    phone,
    adult_attendees,
    child_attendees,
    valid_for,
    will_attend,
    message: message || null,
  });

  if (error) {
    console.error("Supabase insert error:", error.message);
    return NextResponse.json(
      { error: "Failed to save your RSVP. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
