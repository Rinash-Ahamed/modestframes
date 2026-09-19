import fs from "fs";
import path from "path";

const OUT_DIR = path.join(process.cwd(), "public", "placeholders");
fs.mkdirSync(OUT_DIR, { recursive: true });

// Tonal pairs kept within the void/charcoal/graphite/stone palette so every
// placeholder reads as part of the same considered set, not random noise.
const tones = [
  ["#0a0a0a", "#1d1d1d"],
  ["#131313", "#292929"],
  ["#0c0c0c", "#232323"],
  ["#151515", "#2d2d2d"],
  ["#0a0a0a", "#222222"],
  ["#121212", "#292929"],
  ["#0d0d0d", "#1e1e1e"],
  ["#0e0e0e", "#252525"],
  ["#0a0a0a", "#1a1a1a"],
  ["#121212", "#292929"],
  ["#0b0b0b", "#1e1e1e"],
  ["#111111", "#242424"],
  ["#0b0b0b", "#1d1d1d"],
  ["#121212", "#262626"],
];

function svgFor(i, [c1, c2], w, h) {
  const angle = (i * 37) % 360;
  const rad = (angle * Math.PI) / 180;
  const x2 = 50 + 50 * Math.cos(rad);
  const y2 = 50 + 50 * Math.sin(rad);
  const x1 = 50 - 50 * Math.cos(rad);
  const y1 = 50 - 50 * Math.sin(rad);
  const showMarker = false;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g${i}" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="v${i}" cx="50%" cy="45%" r="75%">
      <stop offset="55%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.45"/>
    </radialGradient>
    <filter id="n${i}">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="noise"/>
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.04 0"/>
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g${i})"/>
  <rect width="${w}" height="${h}" filter="url(#n${i})"/>
  <rect width="${w}" height="${h}" fill="url(#v${i})"/>
  ${showMarker ? `<circle cx="${w * 0.82}" cy="${h * 0.22}" r="${Math.min(w, h) * 0.012}" fill="#8e8e8e" opacity="0.55"/>` : ""}
</svg>`;
}

const sizes = [
  [1600, 2000],
  [1600, 1067],
  [1600, 1600],
];

let count = 0;
tones.forEach((tone, i) => {
  const [w, h] = sizes[i % sizes.length];
  const svg = svgFor(i, tone, w, h);
  fs.writeFileSync(path.join(OUT_DIR, `plate-${i + 1}.svg`), svg);
  count++;
});

console.log(`Generated ${count} placeholder plates in public/placeholders/`);
