import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Plate } from "@/components/Plate";
import { HeroPlate } from "@/components/HeroPlate";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { CATEGORY_INFO, studio } from "@/lib/site";

export function generateStaticParams() {
  return CATEGORY_INFO.map((c) => ({ category: c.slug }));
}

function getCategory(slug: string) {
  return CATEGORY_INFO.find((c) => c.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return {
    title: `${cat.name} Photography - ${studio.fullName}`,
    description: cat.description,
  };
}

// A varied, non-uniform arrangement so each category page reads like a
// laid-out spread rather than a repeated grid component.
const TILE_CLASSES = [
  "aspect-[4/5] sm:col-span-2 sm:row-span-2",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[3/4] sm:col-span-2",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-[3/4] sm:col-span-2",
];

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const otherCategories = CATEGORY_INFO.filter((c) => c.slug !== cat.slug);
  const plates = Array.from({ length: 9 }).map((_, i) => (cat.plate + i * 2) % 14 || 14);
  const index = CATEGORY_INFO.findIndex((c) => c.slug === cat.slug) + 1;

  return (
    <>
      <Nav />
      <main>
        <section className="relative flex min-h-[75vh] items-end overflow-hidden bg-void">
          <HeroPlate index={cat.plate} alt={`${cat.name} photography`} />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
          <div className="absolute inset-0 [box-shadow:inset_0_0_160px_50px_rgba(8,8,8,0.6)]" />
          <div className="container-studio relative z-10 pb-16 pt-40">
            <Reveal>
              <Link href="/portfolio" className="font-mono tracking-[0.04em] text-xs text-stone hover:text-silver">
                ← All coverage
              </Link>
              <div className="mt-6 flex items-baseline gap-5">
                <h1 className="text-balance font-display text-6xl font-black tracking-tight text-bone md:text-7xl">{cat.name}</h1>
                <span className="hidden font-display text-2xl italic text-smoke sm:inline">
                  N&deg; 0{index}
                </span>
              </div>
              <p className="font-editorial mt-5 max-w-xl text-lg leading-relaxed text-stone">{cat.description}</p>
            </Reveal>
          </div>
        </section>

        <section className="container-studio py-16 md:py-24">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {plates.map((p, i) => (
              <Reveal
                key={i}
                delay={(i % 4) * 0.04}
                className={`plate-frame overflow-hidden ${TILE_CLASSES[i % TILE_CLASSES.length]}`}
              >
                <Plate
                  index={p}
                  alt={`${cat.name} sample ${i + 1}`}
                  className="h-full w-full"
                  sizes="(min-width: 640px) 25vw, 50vw"
                />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-t border-bone/10 bg-charcoal py-20 text-center md:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-stone">
              Considering {cat.name.toLowerCase()} coverage?
            </p>
            <h2 className="mx-auto mt-4 max-w-xl text-balance font-display text-3xl font-black tracking-tight text-bone md:text-4xl">
              Let&rsquo;s see if your date is free.
            </h2>
            <div className="mt-8 flex justify-center">
              <Cta href="/contact">Check availability</Cta>
            </div>
          </Reveal>
        </section>

        <section className="container-studio py-16 md:py-24">
          <Reveal className="mb-8">
            <h2 className="font-display text-2xl font-black tracking-tight text-bone">Other coverage</h2>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            {otherCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/portfolio/${c.slug}`}
                className="font-mono tracking-[0.04em] border border-bone/15 px-4 py-2 text-xs text-stone transition-colors hover:border-silver-dim hover:text-silver"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
