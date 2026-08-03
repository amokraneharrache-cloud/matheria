"use client";

import { Printer } from "lucide-react";

type PrintButtonProps = {
  label: string;
};

export function PrintButton({ label }: PrintButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 font-bold text-white shadow-sm hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 sm:w-auto print:hidden"
    >
      <Printer className="h-5 w-5" aria-hidden="true" />
      {label}
    </button>
  );
}
