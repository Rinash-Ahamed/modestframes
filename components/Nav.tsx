"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const LINKS = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/studio", label: "Studio" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

const menuVariants = {
  hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  visible: { transition: { delayChildren: 0.16, staggerChildren: 0.07 } },
};

const menuItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <motion.header
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-bone/10 bg-void/88 backdrop-blur-xl"
          : "border-transparent bg-gradient-to-b from-void/70 to-transparent"
      )}
    >
      <div className="container-studio grid h-[76px] grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
        <Link href="/" aria-label="ModestFrames home" className="group w-fit">
          <Image
            src="/typeface-nav.png"
            alt="ModestFrames by Mad"
            width={1200}
            height={293}
            priority
            className="h-auto w-[150px] brightness-150 transition-[filter] duration-300 group-hover:brightness-200 sm:w-[176px]"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex lg:gap-11" aria-label="Main navigation">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "relative py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300",
                isActive(link.href) ? "text-bone" : "text-stone hover:text-bone"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="public-nav-active"
                  className="absolute inset-x-0 -bottom-0.5 h-px bg-bone"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end">
          <Link
            href="/gallery"
            className={clsx(
              "hidden border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-300 md:block",
              isActive("/gallery")
                ? "border-bone bg-bone text-void"
                : "border-bone/25 text-stone hover:border-bone hover:text-bone"
            )}
          >
            Client Gallery
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center text-bone md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-x-0 bottom-0 top-[76px] flex bg-void/98 backdrop-blur-xl md:hidden"
          >
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="container-studio flex flex-1 flex-col justify-center gap-5 pb-20"
            >
              {[{ href: "/", label: "Home" }, ...LINKS].map((link) => (
                <motion.div key={link.href} variants={menuItemVariants} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
                  <Link
                    href={link.href}
                    className={clsx(
                      "font-display text-[clamp(2.35rem,12vw,4.5rem)] font-bold leading-none tracking-tight transition-colors",
                      isActive(link.href) ? "text-bone" : "text-stone hover:text-bone"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={menuItemVariants} className="mt-6">
                <Link
                  href="/gallery"
                  className="inline-flex border border-bone/30 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-bone"
                >
                  Client Gallery
                </Link>
              </motion.div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-bone/55"
        style={{ scaleX: smoothProgress }}
      />
    </motion.header>
  );
}
