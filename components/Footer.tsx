import Link from "next/link";
import Image from "next/image";
import { CATEGORY_INFO } from "@/lib/site";
import { studio } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-void">
      <div className="container-studio grid gap-12 py-16 md:grid-cols-4 md:py-24">
        <div className="md:col-span-2">
          <Link href="/" aria-label="ModestFrames home" className="group flex w-fit items-center gap-4">
            <Image
              src="/icon.png"
              alt=""
              width={512}
              height={512}
              className="h-12 w-12 shrink-0 brightness-200 transition-[filter] duration-300 group-hover:brightness-[2.5]"
            />
            <Image
              src="/typeface-nav.png"
              alt="ModestFrames by Mad"
              width={1200}
              height={293}
              className="h-auto w-[190px] brightness-150 transition-[filter] duration-300 group-hover:brightness-200 sm:w-[220px]"
            />
          </Link>
          <p className="mt-4 max-w-sm font-editorial text-xl italic leading-snug text-stone">{studio.tagline}</p>
          <p className="font-editorial mt-8 text-lg text-stone">
            {studio.city}, {studio.region} - available for travel
          </p>
          <div className="mt-7 flex gap-3">
            <a
              href={studio.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center border border-graphite text-smoke transition-colors duration-300 hover:border-bone hover:text-bone"
            >
              {/* Instagram — Simple Icons path, currentColor fill */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-[14px] w-[14px]" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a
              href={studio.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center border border-graphite text-smoke transition-colors duration-300 hover:border-bone hover:text-bone"
            >
              {/* WhatsApp — Simple Icons path, currentColor fill */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-[14px] w-[14px]" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
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
        <p>&copy; {new Date().getFullYear()} {studio.fullName}. All rights reserved.</p>
        <Link href="/admin/login" className="text-smoke transition-colors hover:text-stone">
          Studio Login
        </Link>
      </div>
    </footer>
  );
}
