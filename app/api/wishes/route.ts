// app/api/wishes/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("rsvp")
    .select("name, message, submitted_at")
    .not("message", "is", null)
    .neq("message", "")
    .order("submitted_at", { ascending: false });

  if (error) {
    console.error("Supabase select error:", error.message);
    return NextResponse.json(
      { error: "Failed to load wishes." },
      { status: 500 }
    );
  }

  return NextResponse.json(data ?? []);
}
