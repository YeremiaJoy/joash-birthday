// app/joash-admin/page.tsx
import { supabase } from "@/lib/supabase";
import PrintButton from "@/components/PrintButton";

// Always fetch fresh data on each request — RSVPs change over time.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "RSVP Admin — Joash's 1st Birthday",
  robots: { index: false, follow: false },
};

interface RsvpRow {
  id: string;
  name: string;
  adult_attendees: number;
  child_attendees: number;
  valid_for: number;
  will_attend: boolean;
  message: string | null;
  submitted_at: string | null;
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
}

export default async function AdminPage() {
  const { data, error } = await supabase
    .from("rsvp")
    .select(
      "id, name, adult_attendees, child_attendees, valid_for, will_attend, message, submitted_at"
    )
    .order("submitted_at", { ascending: false });

  const rows = (data ?? []) as RsvpRow[];

  const attending = rows.filter((r) => r.will_attend);
  const notAttending = rows.filter((r) => !r.will_attend);

  const totalAdults = attending.reduce((sum, r) => sum + r.adult_attendees, 0);
  const totalChildren = attending.reduce(
    (sum, r) => sum + r.child_attendees,
    0
  );
  const totalGuests = totalAdults + totalChildren;

  return (
    <main className="min-h-screen bg-ocean-foam text-ocean-deep p-6 md:p-10 print:p-0 print:bg-white">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-8 print:mb-6">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl text-ocean-deep">
              RSVP Dashboard 🎂
            </h1>
            <p className="text-sm text-ocean-deep/70 mt-1">
              Joash Jidly Yakobus&apos;s 1st Birthday — July 11, 2026
            </p>
          </div>
          <PrintButton />
        </header>

        {error && (
          <div className="mb-6 rounded-xl bg-ocean-coral/15 border border-ocean-coral/40 px-4 py-3 text-sm text-ocean-deep print:hidden">
            Failed to load RSVPs: {error.message}
          </div>
        )}

        {/* Summary cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 print:grid-cols-5 print:gap-2">
          <SummaryCard label="Responses" value={rows.length} />
          <SummaryCard label="Attending" value={attending.length} accent />
          {/* <SummaryCard label="Not Attending" value={notAttending.length} /> */}
          <SummaryCard label="Adults" value={totalAdults} />
          <SummaryCard label="Children" value={totalChildren} />
        </section>

        <p className="mb-6 text-sm text-ocean-deep/70 print:mb-4">
          Total guests expected:{" "}
          <span className="font-bold text-ocean-deep">{totalGuests}</span> (
          {totalAdults} adult{totalAdults !== 1 ? "s" : ""} + {totalChildren}{" "}
          child{totalChildren !== 1 ? "ren" : ""})
        </p>

        <RsvpTable
          title="✅ Attending"
          type="attending"
          rows={attending}
          emptyText="No one has confirmed attendance yet."
        />

        <RsvpTable
          title="❌ Not Attending"
          type="not-attending"
          rows={notAttending}
          emptyText="No regrets received yet."
        />
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 print:rounded-lg print:border-gray-300 ${
        accent
          ? "bg-ocean-teal/20 border-ocean-teal/50"
          : "bg-white border-ocean-shallow"
      }`}
    >
      <div className="text-2xl md:text-3xl font-bold font-heading text-ocean-deep">
        {value}
      </div>
      <div className="text-xs md:text-sm text-ocean-deep/70">{label}</div>
    </div>
  );
}

function RsvpTable({
  title,
  type,
  rows,
  emptyText,
}: {
  title: string;
  type: "attending" | "not-attending";
  rows: RsvpRow[];
  emptyText: string;
}) {
  return (
    <section className="mb-10 print:mb-6 break-inside-avoid">
      <h2 className="font-heading text-2xl text-ocean-deep mb-3">
        {title}{" "}
        <span className="text-base text-ocean-deep/60 font-body">
          ({rows.length})
        </span>
      </h2>

      {rows.length === 0 ? (
        <p className="text-sm text-ocean-deep/60 italic">{emptyText}</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-ocean-shallow bg-white print:rounded-none print:border-gray-300">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-ocean-sky text-left text-ocean-deep print:bg-gray-100">
                <th className="px-4 py-2 font-semibold">Name</th>
                {type === "attending" && (
                  <>
                    <th className="px-4 py-2 font-semibold text-center">Adults</th>
                    <th className="px-4 py-2 font-semibold text-center">
                      Children
                    </th>
                    <th className="px-4 py-2 font-semibold text-center">Total</th>
                  </>
                )}
                <th className="px-4 py-2 font-semibold">Message</th>
                <th className="px-4 py-2 font-semibold">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-ocean-shallow/60 align-top print:border-gray-200"
                >
                  <td className="px-4 py-2 font-medium">{r.name}</td>
                  {type === "attending" && (
                    <>
                      <td className="px-4 py-2 text-center">{r.adult_attendees}</td>
                      <td className="px-4 py-2 text-center">{r.child_attendees}</td>
                      <td className="px-4 py-2 text-center font-semibold">
                        {r.adult_attendees + r.child_attendees}
                      </td>
                    </>
                  )}
                  <td className="px-4 py-2 text-ocean-deep/80 max-w-xs">
                    {r.message || "—"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-ocean-deep/70">
                    {formatDate(r.submitted_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
