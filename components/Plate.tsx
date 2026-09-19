import Image from "next/image";
import clsx from "clsx";

/**
 * Renders a placeholder "plate" standing in for real portfolio photography.
 * Swap the `src` for real shoot images at deploy time - every call site in
 * this project reads from /public/placeholders or an uploaded project image,
 * so replacing imagery is a matter of pointing these at real files.
 */
export function Plate({
  index,
  alt,
  className,
  priority,
  sizes = "100vw",
}: {
  index: number;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const plate = ((index - 1) % 14) + 1;
  return (
    <div className={clsx("relative overflow-hidden bg-ash", className)}>
      <Image
        src={`/placeholders/plate-${plate}.svg`}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

export function PlateBySrc({
  src,
  alt,
  className,
  priority,
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={clsx("relative overflow-hidden bg-ash", className)}>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
    </div>
  );
}
