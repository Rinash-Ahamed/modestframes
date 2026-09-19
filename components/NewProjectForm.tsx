"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/types";

export function NewProjectForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Couldn't create the project.");
      router.push(`/admin/dashboard/projects/${body.project.id}`);
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Couldn't create the project.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-6">
      <label className="block">
        <span className="text-xs text-stone">Client name(s) *</span>
        <input
          name="clientNames"
          required
          placeholder="e.g. Anika & Rohan"
          className="mt-2 w-full border border-bone/20 bg-transparent px-4 py-3 text-sm text-bone outline-none focus:border-silver"
        />
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs text-stone">Category *</span>
          <select
            name="category"
            required
            defaultValue=""
            className="mt-2 w-full border border-bone/20 bg-transparent px-4 py-3 text-sm text-bone outline-none focus:border-silver"
          >
            <option value="" disabled className="bg-charcoal">
              Select…
            </option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-charcoal">
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs text-stone">Shoot date *</span>
          <input
            name="shootDate"
            type="date"
            required
            className="mt-2 w-full border border-bone/20 bg-transparent px-4 py-3 text-sm text-bone outline-none focus:border-silver"
          />
        </label>
      </div>

      <label className="block max-w-xs">
        <span className="text-xs text-stone">Included selections</span>
        <input
          name="maxSelections"
          type="number"
          min={1}
          defaultValue={50}
          className="mt-2 w-full border border-bone/20 bg-transparent px-4 py-3 text-sm text-bone outline-none focus:border-silver"
        />
        <span className="mt-1 block text-xs text-smoke">How many final images this package includes.</span>
      </label>

      {status === "error" && <p className="font-editorial text-lg text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="border border-silver-dim px-7 py-3 text-sm text-silver transition-colors hover:border-silver hover:bg-silver hover:text-void disabled:opacity-50"
      >
        {status === "loading" ? "Creating…" : "Create project"}
      </button>
    </form>
  );
}
