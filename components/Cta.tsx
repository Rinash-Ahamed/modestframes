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
        "inline-flex items-center gap-3 border px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-500 ease-studio",
        variant === "default"
          ? "border-bone/30 text-bone hover:border-silver hover:text-silver"
          : "border-bone/50 text-bone hover:border-silver hover:text-silver",
        className
      )}
    >
      {children}
    </Link>
  );
}
