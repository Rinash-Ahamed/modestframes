import Link from "next/link";
import { CATEGORY_INFO } from "@/lib/site";
import { studio } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-void">
      <div className="container-studio grid gap-12 py-16 md:grid-cols-4 md:py-24">
        <div className="md:col-span-2">
          <p className="font-display font-black text-2xl uppercase tracking-[0.14em] text-bone">{studio.name}</p>
          <p className="mt-4 max-w-sm font-editorial text-xl italic leading-snug text-stone">{studio.tagline}</p>
          <p className="font-editorial mt-8 text-lg text-stone">
            {studio.city}, {studio.region} - available for travel
          </p>
          <div className="mt-7 flex gap-4">
            <a
              href={studio.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center border border-graphite font-mono text-[9px] text-smoke transition-colors duration-300 hover:border-bone hover:text-bone"
            >
              IG
            </a>
            <a
              href={studio.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center border border-graphite font-mono text-[9px] text-smoke transition-colors duration-300 hover:border-bone hover:text-bone"
            >
              WA
            </a>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-smoke">Coverage</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {CATEGORY_INFO.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/portfolio/${c.slug}`}
                  className="font-mono text-[11px] uppercase tracking-[0.08em] text-stone transition-colors hover:text-silver"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-smoke">Studio</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            <li>
              <Link href="/studio" className="font-mono text-[11px] uppercase tracking-[0.08em] text-stone transition-colors hover:text-silver">
                About
              </Link>
            </li>
            <li>
              <Link href="/process" className="font-mono text-[11px] uppercase tracking-[0.08em] text-stone transition-colors hover:text-silver">
                Process
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="font-mono text-[11px] uppercase tracking-[0.08em] text-stone transition-colors hover:text-silver">
                Client Gallery
              </Link>
            </li>
            <li>
              <Link href="/contact" className="font-mono text-[11px] uppercase tracking-[0.08em] text-stone transition-colors hover:text-silver">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-studio flex flex-col gap-3 border-t border-bone/10 py-6 font-mono text-[10px] text-smoke md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {studio.fullName}. All rights reserved.</p>
        <Link href="/admin/login" className="text-smoke transition-colors hover:text-stone">
          Studio Login
        </Link>
      </div>
    </footer>
  );
}
