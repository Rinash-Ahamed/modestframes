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
    <div className="mx-auto flex max-w-sm flex-col items-center border border-bone/10 bg-charcoal/60 px-8 py-14 text-center">
      <Lock size={20} className="text-silver" />
      <h1 className="mt-5 font-display text-3xl font-black tracking-tight text-bone">Studio Login</h1>
      <p className="font-editorial mt-3 text-lg leading-relaxed text-stone">
        Admin access for managing projects, uploads, and client selections.
      </p>
      <form onSubmit={onSubmit} className="mt-8 w-full">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-bone/20 bg-transparent px-4 py-3.5 text-center text-sm text-bone outline-none transition-colors focus:border-silver"
        />
        {status === "error" && <p className="font-editorial mt-3 text-lg text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={status === "loading" || !password}
          className="mt-5 w-full border border-silver-dim px-6 py-3.5 text-sm text-silver transition-colors duration-300 hover:border-silver hover:bg-silver hover:text-void disabled:opacity-40"
        >
          {status === "loading" ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
