"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export function AccessGate({ redirectSlug }: { redirectSlug?: string }) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/gallery/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Couldn't verify that code.");
      setStatus("idle");
      router.push(`/gallery/${redirectSlug || body.slug}`);
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Couldn't verify that code.");
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center border border-bone/10 bg-charcoal/60 px-8 py-16 text-center">
      <Lock size={18} className="text-silver" />
      <h1 className="mt-6 font-display text-3xl font-black tracking-tight text-bone">Your private gallery</h1>
      <p className="font-editorial mt-3 text-lg leading-relaxed text-stone">
        Enter the access code from your studio email to view and select your proofs.
      </p>
      <form onSubmit={onSubmit} className="mt-8 w-full">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="e.g. ANIKA26"
          autoCapitalize="characters"
          className="font-mono w-full border-b border-bone/25 bg-transparent px-2 py-3.5 text-center text-sm uppercase tracking-[0.3em] text-bone outline-none transition-colors focus:border-silver"
        />
        {status === "error" && <p className="font-editorial mt-3 text-lg text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={status === "loading" || !code}
          className="font-mono mt-8 w-full border border-bone/30 px-6 py-3.5 text-xs uppercase tracking-[0.18em] text-bone transition-all duration-500 ease-studio hover:border-silver hover:text-silver disabled:opacity-40"
        >
          {status === "loading" ? "Checking…" : "View my gallery"}
        </button>
      </form>
    </div>
  );
}
