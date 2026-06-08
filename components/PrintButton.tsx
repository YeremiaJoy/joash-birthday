// components/PrintButton.tsx
"use client";

/**
 * Triggers the browser's print dialog, from which the user can choose
 * "Save as PDF". Keeps the admin page dependency-free — no PDF library needed.
 * Print-specific layout is handled by Tailwind `print:` utilities on the page.
 */
export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden inline-flex items-center gap-2 rounded-full bg-ocean-deep px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-ocean-deep/90 active:scale-95"
    >
      📄 Export as PDF
    </button>
  );
}
