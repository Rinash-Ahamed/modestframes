"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import clsx from "clsx";
import { studio } from "@/lib/site";

const LINKS = [
  { href: "/admin/dashboard", label: "Overview" },
  { href: "/admin/dashboard/projects", label: "Projects" },
  { href: "/admin/dashboard/inquiries", label: "Enquiries" },
];

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-bone/10 bg-charcoal">
      <div className="container-studio flex h-16 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/admin/dashboard" className="font-display text-xl italic text-bone">
            {studio.name} Studio
          </Link>
          <nav className="hidden items-center gap-6 sm:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "text-sm transition-colors",
                  pathname === l.href ? "text-silver" : "text-stone hover:text-bone"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/" className="hidden text-xs text-smoke hover:text-stone sm:block">
            View public site ↗
          </Link>
          <button onClick={logout} className="flex items-center gap-1.5 text-sm text-stone hover:text-bone">
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </div>
      <nav className="container-studio flex gap-6 border-t border-bone/10 py-3 sm:hidden">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={clsx("text-sm", pathname === l.href ? "text-silver" : "text-stone")}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
