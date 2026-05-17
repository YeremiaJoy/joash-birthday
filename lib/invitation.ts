// lib/invitation.ts
import { readFileSync } from "fs";
import path from "path";

export interface Invitee {
  keyword: string; // KEYWORD from CSV (used in URL query)
  fullName: string; // NAMA LENGKAP from CSV
  adults: number;
  children: number;
}

function parseInvitees(): Invitee[] {
  const csvPath = path.join(process.cwd(), "public/file/invitation.csv");
  const content = readFileSync(csvPath, "utf-8");
  const lines = content.trim().split(/\r?\n/);
  const header = lines[0]?.split(",").map((h) => h.trim().toUpperCase()) ?? [];
  const idxKeyword = header.indexOf("KEYWORD");
  const idxFullName = header.indexOf("NAMA LENGKAP");
  const idxAdult = header.indexOf("ADULT") >= 0 ? header.indexOf("ADULT") : header.indexOf("ADULTS");
  const idxChildren = header.indexOf("CHILDREN");

  // Simple CSV line parser that respects quoted fields and commas inside quotes.
  function parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          // Escaped quote
          cur += '"';
          i++; // skip next quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === ',' && !inQuotes) {
        result.push(cur);
        cur = "";
      } else {
        cur += ch;
      }
    }
    result.push(cur);
    return result;
  }

  return lines.slice(1).map((line) => {
    const parts = parseCSVLine(line);
    const rawKeyword = parts[idxKeyword] ?? "";
    const rawFullName = parts[idxFullName] ?? "";
    const rawAdult = parts[idxAdult] ?? "0";
    const rawChildren = parts[idxChildren] ?? "0";

    return {
      keyword: rawKeyword.trim().replace(/^"|"$/g, ""),
      fullName: rawFullName.trim().replace(/^"|"$/g, ""),
      adults: parseInt(rawAdult.trim().replace(/^"|"$/g, ""), 10) || 0,
      children: parseInt(rawChildren.trim().replace(/^"|"$/g, ""), 10) || 0,
    };
  });
}

/** Returns the invitee matching the given keyword (case-insensitive), or null if not found. */
export function findInvitee(key: string): Invitee | null {
  if (!key) return null;
  const invitees = parseInvitees();
  const lower = key.toLowerCase();

  // Try matching KEYWORD first, then full name as fallback.
  return (
    invitees.find((i) => i.keyword.toLowerCase() === lower) ??
    invitees.find((i) => i.fullName.toLowerCase() === lower) ??
    null
  );
}
