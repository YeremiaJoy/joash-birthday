// lib/invitation.ts
import { readFileSync } from "fs";
import path from "path";

export interface Invitee {
  name: string;
  adults: number;
  children: number;
}

function parseInvitees(): Invitee[] {
  const csvPath = path.join(process.cwd(), "public/file/invitation.csv");
  const content = readFileSync(csvPath, "utf-8");
  const lines = content.trim().split(/\r?\n/);
  // skip header line
  return lines.slice(1).map((line) => {
    const parts = line.split(",");
    return {
      name: parts[0]?.trim() ?? "",
      adults: parseInt(parts[1]?.trim() ?? "0", 10),
      children: parseInt(parts[2]?.trim() ?? "0", 10),
    };
  });
}

/** Returns the invitee matching the given name (case-insensitive), or null if not found. */
export function findInvitee(name: string): Invitee | null {
  if (!name) return null;
  const invitees = parseInvitees();
  return invitees.find((i) => i.name.toLowerCase() === name.toLowerCase()) ?? null;
}
