// lib/rsvp.ts
import { supabase } from "./supabase";

/**
 * Returns true if an RSVP row already exists for the given full name.
 *
 * The RSVP is always stored under the invitee's full name (see app/api/rsvp/route.ts),
 * so an exact match is reliable. Fails open on a transient DB error so a legitimate
 * guest is never blocked from seeing the form by an infrastructure hiccup.
 */
export async function hasExistingRsvp(fullName: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("rsvp")
    .select("name")
    .eq("name", fullName)
    .limit(1);

  if (error) {
    console.error("Supabase RSVP check error:", error.message);
    return false;
  }

  return (data?.length ?? 0) > 0;
}
