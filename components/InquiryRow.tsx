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
    <div className="grid gap-3 py-6 sm:grid-cols-12 sm:items-start sm:gap-4">
      <div className="sm:col-span-3">
        <p className="font-editorial text-lg text-bone">{inquiry.name}</p>
        <p className="font-editorial text-base text-stone">{inquiry.email}</p>
        {inquiry.phone && <p className="font-editorial text-base text-stone">{inquiry.phone}</p>}
      </div>
      <div className="sm:col-span-2">
        <p className="font-editorial text-base text-stone">{inquiry.category}</p>
        {inquiry.eventDate && <p className="font-editorial text-base text-smoke">{inquiry.eventDate}</p>}
      </div>
      <p className="font-editorial text-lg leading-relaxed text-stone sm:col-span-5">{inquiry.message}</p>
      <div className="sm:col-span-2">
        <select
          value={status}
          disabled={saving}
          onChange={(e) => updateStatus(e.target.value as Inquiry["status"])}
          className="w-full border border-bone/20 bg-transparent px-2 py-1.5 text-xs text-bone outline-none focus:border-silver"
        >
          <option value="new" className="bg-charcoal">New</option>
          <option value="responded" className="bg-charcoal">Responded</option>
          <option value="archived" className="bg-charcoal">Archived</option>
        </select>
        <p className="font-editorial mt-1 text-[11px] text-smoke">{new Date(inquiry.createdAt).toLocaleDateString("en-IN")}</p>
      </div>
    </div>
  );
}
