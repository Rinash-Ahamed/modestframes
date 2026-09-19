"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API unavailable - fail silently, value is still visible
    }
  }

  return (
    <div>
      <p className="admin-label">{label}</p>
      <button
        type="button"
        onClick={copy}
        className="flex items-center gap-2 border border-bone/15 bg-void/40 px-3 py-2 font-mono text-xs text-bone transition-colors hover:border-bone/40"
      >
        <span className="max-w-[220px] truncate">{value}</span>
        {copied ? <Check size={14} className="text-silver" /> : <Copy size={14} className="text-stone" />}
      </button>
    </div>
  );
}
