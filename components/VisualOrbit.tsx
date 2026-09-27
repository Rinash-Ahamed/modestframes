"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useState, useRef } from "react";

const images = [
  {
    src: "/gallery/01.jpg",
    title: "Timeless Vows",
  },
  {
    src: "/gallery/02.jpg",
    title: "Quiet Moments",
  },
  {
    src: "/gallery/03.jpg",
    title: "Wedding Stories",
  },
  {
    src: "/gallery/04.jpg",
    title: "Golden Hour",
  },
  {
    src: "/gallery/05.jpg",
    title: "Forever Begins",
  },
  {
    src: "/gallery/06.jpg",
    title: "Unspoken Love",
  },
  {
    src: "/gallery/07.jpg",
    title: "Sacred Moments",
  },
  {
    src: "/gallery/08.jpg",
    title: "Together",
  },
  {
    src: "/gallery/09.jpg",
    title: "Celebrations",
  },
  {
    src: "/gallery/10.jpg",
    title: "Endless Story",
  },
];

const CARD_WIDTH = 310;
const CARD_HEIGHT = 330;
const GAP = 42;
const STEP = CARD_WIDTH + GAP;

export function VisualOrbit() {
  const [active, setActive] = useState(4);
  const sectionRef = useRef<HTMLElement>(null);
  const prevScroll = useRef<number | null>(null);

  const x = useMotionValue(-active * STEP);

  const smoothX = useSpring(x, {
    stiffness: 170,
    damping: 26,
    mass: 0.8,
  });

  // Page scroll creates smooth horizontal spinning as user scrolls the website
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (prevScroll.current !== null) {
      const delta = latest - prevScroll.current;
      const currentVal = x.get();
      const minX = -(images.length - 1) * STEP;
      const maxX = 0;
      const nextVal = currentVal - delta * STEP * 3.0;
      x.set(Math.max(minX - 60, Math.min(maxX + 60, nextVal)));

      const newActive = Math.max(
        0,
        Math.min(images.length - 1, Math.round(-nextVal / STEP))
      );
      setActive(newActive);
    }
    prevScroll.current = latest;
  });

  const moveTo = (index: number) => {
    const target = Math.max(0, Math.min(images.length - 1, index));
    setActive(target);
    x.set(-target * STEP);
  };

  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 5) {
      const currentVal = x.get();
      const minX = -(images.length - 1) * STEP;
      const maxX = 0;
      const nextVal = currentVal - delta * 0.8;
      x.set(Math.max(minX - 60, Math.min(maxX + 60, nextVal)));

      const newActive = Math.max(
        0,
        Math.min(images.length - 1, Math.round(-nextVal / STEP))
      );
      setActive(newActive);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[580px] overflow-hidden bg-void pt-10 pb-16 text-bone md:pt-14 md:pb-20"
    >
      {/* Ambient background - soft wide white ambient wash (no spiral or circular rings) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_45%_at_50%_40%,rgba(255,255,255,0.03),transparent)]" />

      <div className="container-studio relative z-10">
        {/* Header - No frames counter */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.42em] text-stone">
            Selected Collection
          </p>

          <h2 className="mt-2 font-display text-4xl font-black tracking-tight text-bone md:text-5xl">
            Visual <span className="heading-lean">Stories</span>
          </h2>

          <p className="font-editorial mt-2 text-base text-stone/80">
            A curated selection of unscripted moments.
          </p>
        </div>

        {/* Carousel Stage - clean margin without dead space */}
        <div
          onWheel={handleWheel}
          className="relative mt-10 h-[380px] md:mt-12 md:h-[400px]"
          style={{
            perspective: "1600px",
          }}
        >
          <motion.div
            drag="x"
            dragElastic={0.08}
            dragMomentum
            dragConstraints={{
              left: -(images.length - 1) * STEP,
              right: 0,
            }}
            onDragEnd={(_, info) => {
              const projected =
                active - (info.offset.x + info.velocity.x * 0.1) / STEP;

              moveTo(Math.round(projected));
            }}
            className="absolute left-1/2 top-1/2 flex -translate-y-1/2 cursor-grab active:cursor-grabbing"
            style={{
              x: smoothX,
              transformStyle: "preserve-3d",
            }}
          >
            {images.map((image, index) => (
              <OrbitCard
                key={image.src}
                image={image}
                index={index}
                active={active}
                x={smoothX}
                onClick={() => moveTo(index)}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom atmosphere */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-[60%] -translate-x-1/2 bg-white/[0.025] blur-[70px]" />
    </section>
  );
}

function OrbitCard({
  image,
  index,
  active,
  x,
  onClick,
}: {
  image: {
    src: string;
    title: string;
  };
  index: number;
  active: number;
  x: MotionValue<number>;
  onClick: () => void;
}) {
  const [imgSrc, setImgSrc] = useState(image.src);
  const cardCenter = -index * STEP;

  const distance = useTransform(
    x,
    [
      cardCenter - STEP * 3,
      cardCenter - STEP * 2,
      cardCenter - STEP,
      cardCenter,
      cardCenter + STEP,
      cardCenter + STEP * 2,
      cardCenter + STEP * 3,
    ],
    [-3, -2, -1, 0, 1, 2, 3]
  );

  const rotateY = useTransform(
    distance,
    [-3, -2, -1, 0, 1, 2, 3],
    [-65, -52, -25, 0, 25, 52, 65]
  );

  const scale = useTransform(
    distance,
    [-3, -2, -1, 0, 1, 2, 3],
    [0.65, 0.75, 0.9, 1, 0.9, 0.75, 0.65]
  );

  const z = useTransform(
    distance,
    [-3, -2, -1, 0, 1, 2, 3],
    [-500, -320, -130, 80, -130, -320, -500]
  );

  const opacity = useTransform(
    distance,
    [-3, -2, -1, 0, 1, 2, 3],
    [0, 0.28, 0.72, 1, 0.72, 0.28, 0]
  );

  const brightness = useTransform(
    distance,
    [-3, -2, -1, 0, 1, 2, 3],
    [0.2, 0.35, 0.65, 1, 0.65, 0.35, 0.2]
  );

  return (
    <motion.div
      onClick={onClick}
      className="relative shrink-0 overflow-hidden rounded-[22px] border border-white/[0.08] bg-neutral-900 shadow-2xl"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginRight: GAP,
        rotateY,
        scale,
        opacity,
        z,
        transformStyle: "preserve-3d",
        filter: useTransform(brightness, (value) => `brightness(${value})`),
      }}
    >
      <Image
        src={imgSrc}
        alt={image.title}
        fill
        draggable={false}
        className="pointer-events-none select-none object-cover"
        sizes="310px"
        onError={() => {
          setImgSrc(`/placeholders/plate-${(index % 14) + 1}.svg`);
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />

      <div className="absolute bottom-0 left-0 p-5">
        <p className="font-editorial text-[17px] italic text-white">
          {image.title}
        </p>
      </div>

      {active === index && (
        <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-white/20" />
      )}
    </motion.div>
  );
}

export default VisualOrbit;
