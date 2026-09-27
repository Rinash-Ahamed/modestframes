import Link from "next/link";
import clsx from "clsx";

export function Cta({
  href,
  children,
  variant = "default",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "light";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center gap-3 border px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-300 ease-studio active:scale-[0.98]",
        variant === "default"
          ? "border-bone/40 bg-bone/[0.04] text-bone hover:border-bone hover:bg-bone/10 hover:text-silver shadow-sm"
          : "border-bone/60 bg-bone/[0.08] text-bone hover:border-bone hover:bg-bone/15 hover:text-silver",
        className
      )}
    >
      {children}
    </Link>
  );
}
