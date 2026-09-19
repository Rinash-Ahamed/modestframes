"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Inquiry } from "@/lib/types";

export function InquiryRow({ inquiry }: { inquiry: Inquiry }) {
  const [status, setStatus] = useState(inquiry.status);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function updateStatus(next: Inquiry["status"]) {
    setStatus(next);
    setSaving(true);
    await fetch(`/api/admin/inquiries/${inquiry.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <article className="grid gap-5 px-5 py-5 md:grid-cols-12 md:items-start md:gap-5 md:px-6">
      <div className="md:col-span-3">
        <p className="font-display text-base font-bold text-bone">{inquiry.name}</p>
        <p className="mt-1 font-mono text-[10px] text-smoke">{inquiry.email}</p>
        {inquiry.phone && <p className="mt-1 font-mono text-[10px] text-stone">{inquiry.phone}</p>}
      </div>
      <div className="md:col-span-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-stone">{inquiry.category}</p>
        {inquiry.eventDate && <p className="mt-1 font-mono text-[10px] text-smoke">{inquiry.eventDate}</p>}
      </div>
      <p className="font-editorial text-base leading-relaxed text-stone md:col-span-5">{inquiry.message}</p>
      <div className="md:col-span-2">
        <select
          value={status}
          disabled={saving}
          onChange={(e) => updateStatus(e.target.value as Inquiry["status"])}
          className="admin-field py-2"
        >
          <option value="new" className="bg-charcoal">New</option>
          <option value="responded" className="bg-charcoal">Responded</option>
          <option value="archived" className="bg-charcoal">Archived</option>
        </select>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-smoke">{new Date(inquiry.createdAt).toLocaleDateString("en-IN")}</p>
      </div>
    </article>
  );
}
