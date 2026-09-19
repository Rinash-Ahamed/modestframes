"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";

export function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useSearchParams();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Couldn't sign in.");
      router.push(params.get("from") || "/admin/dashboard");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Couldn't sign in.");
    }
  }

  return (
    <div className="admin-panel mx-auto flex w-full max-w-md flex-col items-center px-7 py-12 text-center sm:px-10">
      <div className="flex h-11 w-11 items-center justify-center border border-bone/15 text-bone">
        <Lock size={17} strokeWidth={1.5} />
      </div>
      <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.18em] text-smoke">Private administration</p>
      <h1 className="mt-2 font-display text-4xl font-black tracking-tight text-bone">Studio login</h1>
      <p className="mt-3 max-w-xs font-editorial text-lg leading-relaxed text-stone">
        Admin access for managing projects, uploads, and client selections.
      </p>
      <form onSubmit={onSubmit} className="mt-8 w-full">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="admin-field py-3.5 text-center"
        />
        {status === "error" && <p className="font-editorial mt-3 text-lg text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={status === "loading" || !password}
          className="mt-4 w-full border border-bone bg-bone px-6 py-3.5 font-mono text-[9px] uppercase tracking-[0.12em] text-void transition-colors hover:bg-transparent hover:text-bone disabled:opacity-40"
        >
          {status === "loading" ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
