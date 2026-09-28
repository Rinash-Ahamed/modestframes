"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "motion/react";

export function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useSearchParams();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Incorrect studio password.");
      router.push(params.get("from") || "/admin/dashboard");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Couldn't sign in.");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto flex w-full max-w-md flex-col items-center overflow-hidden rounded-[24px] border border-bone/15 bg-charcoal/90 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12"
    >
      {/* Subtle top inner border highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bone/25 to-transparent" />

      {/* Security Badge */}
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-bone/20 bg-void/80 text-bone shadow-inner transition-transform duration-300 hover:scale-105">
        <Lock size={18} strokeWidth={1.5} />
      </div>

      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-stone">
        Private Administration
      </p>

      <h1 className="mt-2 font-display text-4xl font-black tracking-tight text-bone">
        Studio <span className="heading-lean">Access</span>
      </h1>

      <p className="font-editorial mt-3 max-w-xs text-base leading-relaxed text-stone">
        Admin dashboard for managing client galleries, uploads, and selections.
      </p>

      <form onSubmit={onSubmit} className="mt-8 w-full">
        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Studio password"
            autoComplete="current-password"
            className="w-full rounded-xl border border-bone/20 bg-void/80 px-4 py-3.5 text-center font-mono text-base text-bone placeholder:font-mono placeholder:text-sm placeholder:text-stone/40 shadow-inner transition-all duration-300 focus:border-bone/60 focus:bg-void focus:outline-none focus:ring-1 focus:ring-bone/40"
          />
        </div>

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center justify-center gap-2 font-mono text-xs text-red-400"
          >
            <AlertCircle size={14} strokeWidth={1.75} />
            <span>{error}</span>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={status === "loading" || !password}
          className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-bone bg-bone px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-void shadow-md transition-all duration-300 hover:border-bone hover:bg-transparent hover:text-bone hover:shadow-lg active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              <span>Verifying…</span>
            </>
          ) : (
            <>
              <span>Enter Dashboard</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </form>

      {/* Return to website link */}
      <Link
        href="/"
        className="mt-8 font-mono text-[10px] uppercase tracking-[0.15em] text-stone transition-colors hover:text-silver"
      >
        ← Return to website
      </Link>
    </motion.div>
  );
}

export default AdminLoginForm;
