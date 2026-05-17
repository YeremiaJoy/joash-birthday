// app/api/rsvp/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rsvpSchema } from "@/lib/validations";
import { findInvitee } from "@/lib/invitation";

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

  const { name, adult_attendees, child_attendees, will_attend, message } =
    parsed.data;

  // Validate name against the invitation list
  const invitee = findInvitee(name);
  if (!invitee) {
    return NextResponse.json(
      { error: "Your name is not on the invitation list." },
      { status: 403 }
    );
  }

  if (adult_attendees > invitee.adults) {
    return NextResponse.json(
      { error: `Maximum ${invitee.adults} adult${invitee.adults !== 1 ? "s" : ""} allowed for this invitation.` },
      { status: 422 }
    );
  }

  if (child_attendees > invitee.children) {
    return NextResponse.json(
      { error: `Maximum ${invitee.children} child${invitee.children !== 1 ? "ren" : ""} allowed for this invitation.` },
      { status: 422 }
    );
  }

  const valid_for = invitee.adults + invitee.children;

  const { error } = await supabase.from("rsvp").insert({
    name,
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
