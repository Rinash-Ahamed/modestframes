"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, LogOut } from "lucide-react";
import clsx from "clsx";

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

  const isActive = (href: string) =>
    href === "/admin/dashboard" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-bone/10 bg-void/90 backdrop-blur-xl">
      <div className="container-studio grid h-[72px] grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
        <Link href="/admin/dashboard" className="flex w-fit items-center gap-3" aria-label="ModestFrames admin overview">
          <Image src="/icon.png" alt="" width={512} height={512} className="h-8 w-8 brightness-200" />
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-smoke sm:inline">Studio desk</span>
        </Link>

        <nav className="hidden h-full items-center gap-8 md:flex" aria-label="Admin navigation">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "relative flex h-full items-center font-mono text-[10px] uppercase tracking-[0.14em] transition-colors",
                isActive(link.href) ? "text-bone" : "text-smoke hover:text-bone"
              )}
            >
              {link.label}
              {isActive(link.href) && <span className="absolute inset-x-0 bottom-0 h-px bg-bone" />}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-4">
          <Link
            href="/"
            target="_blank"
            className="hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-smoke transition-colors hover:text-bone sm:flex"
          >
            View site <ArrowUpRight size={13} />
          </Link>
          <button
            type="button"
            onClick={logout}
            aria-label="Sign out"
            className="flex h-9 w-9 items-center justify-center border border-bone/10 text-stone transition-colors hover:border-bone/30 hover:text-bone"
          >
            <LogOut size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <nav className="container-studio flex gap-7 overflow-x-auto border-t border-bone/10 md:hidden" aria-label="Admin navigation">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "relative py-3 font-mono text-[10px] uppercase tracking-[0.14em]",
              isActive(link.href) ? "text-bone" : "text-smoke"
            )}
          >
            {link.label}
            {isActive(link.href) && <span className="absolute inset-x-0 bottom-0 h-px bg-bone" />}
          </Link>
        ))}
      </nav>
    </header>
  );
}
