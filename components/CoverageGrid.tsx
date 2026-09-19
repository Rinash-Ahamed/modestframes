import Link from "next/link";
import { CATEGORY_INFO } from "@/lib/site";
import { Plate } from "./Plate";

// Aspect + column-span pattern deliberately varied so the wall reads as a
// curated hang of prints at different sizes, not a repeated card grid.
const LAYOUT = [
  { span: "md:col-span-2", aspect: "aspect-[4/5]" },
  { span: "md:col-span-1", aspect: "aspect-[3/4]" },
  { span: "md:col-span-1", aspect: "aspect-square" },
  { span: "md:col-span-1", aspect: "aspect-[3/4]" },
  { span: "md:col-span-2", aspect: "aspect-[16/10]" },
  { span: "md:col-span-1", aspect: "aspect-square" },
  { span: "md:col-span-1", aspect: "aspect-[3/4]" },
  { span: "md:col-span-1", aspect: "aspect-[3/4]" },
  { span: "md:col-span-1", aspect: "aspect-square" },
];

export function CoverageGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-3">
      {CATEGORY_INFO.map((c, i) => {
        const { span, aspect } = LAYOUT[i % LAYOUT.length];
        return (
          <Link key={c.slug} href={`/portfolio/${c.slug}`} className={`group block ${span}`}>
            <div className={`plate-frame overflow-hidden ${aspect}`}>
              <Plate
                index={c.plate}
                alt={`${c.name} photography`}
                className="h-full w-full transition-transform duration-[1400ms] ease-studio group-hover:scale-[1.035]"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <div className="mt-4 border-t border-bone/10 pt-4">
              <div>
                <span className="font-display text-3xl font-bold tracking-tight text-bone transition-colors duration-300 group-hover:text-silver">
                  {c.name}
                </span>
                <p className="font-editorial mt-1 max-w-[26ch] text-lg leading-relaxed text-stone">{c.short}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
