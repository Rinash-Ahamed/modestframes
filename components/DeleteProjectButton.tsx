"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export function DeleteProjectButton({ projectId, clientNames }: { projectId: string; clientNames: string }) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function onDelete() {
    if (!confirm(`Delete the project for ${clientNames}? This removes all uploaded images and cannot be undone.`)) {
      return;
    }
    setBusy(true);
    await fetch(`/api/admin/projects/${projectId}`, { method: "DELETE" });
    router.push("/admin/dashboard/projects");
    router.refresh();
  }

  return (
    <button
      onClick={onDelete}
      disabled={busy}
      className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.08em] text-smoke transition-colors hover:text-red-400"
    >
      <Trash2 size={13} /> {busy ? "Deleting…" : "Delete project"}
    </button>
  );
}
