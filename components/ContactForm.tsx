"use client";

import { useState, FormEvent } from "react";
import { CATEGORIES } from "@/lib/types";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const now = new Date();
  const today = new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-silver-dim/60 p-8">
        <p className="font-editorial text-2xl italic text-bone">Message received.</p>
        <p className="font-editorial mt-3 text-lg leading-relaxed text-stone">
          Thank you for reaching out. We reply to every enquiry within two working days - usually sooner.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" required />
        <Field label="Event date (if known)" name="eventDate" type="date" min={today} />
      </div>

      <label className="block">
        <span className="text-xs text-stone">What are you enquiring about?</span>
        <select
          name="category"
          defaultValue="Not sure"
          className="mt-2 w-full border border-bone/20 bg-transparent px-4 py-3 text-sm text-bone outline-none transition-colors focus:border-silver"
        >
          <option className="bg-charcoal">Not sure</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-charcoal">
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-xs text-stone">Tell us about your day</span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-none border border-bone/20 bg-transparent px-4 py-3 text-sm text-bone outline-none transition-colors focus:border-silver"
          placeholder="Venue, guest count, timings - whatever you know so far."
        />
      </label>

      {status === "error" && <p className="font-editorial text-lg text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="font-mono border border-bone/30 px-8 py-3.5 text-xs uppercase tracking-[0.18em] text-bone transition-all duration-500 ease-studio hover:border-silver hover:text-silver disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  min?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs text-stone">
        {label}
        {required && " *"}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        min={min}
        className="mt-2 w-full border border-bone/20 bg-transparent px-4 py-3 text-sm text-bone outline-none transition-colors focus:border-silver"
      />
    </label>
  );
}
