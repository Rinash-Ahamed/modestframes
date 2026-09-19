// Seeds a demo project so the private gallery + admin dashboard have
// something to show immediately. Safe to delete data/projects.json and
// re-run `node scripts/seed.mjs` at any time.
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "projects.json");

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const now = new Date().toISOString();

const demoImages = Array.from({ length: 24 }).map((_, i) => ({
  id: `demo-img-${i + 1}`,
  filename: `frame-${String(i + 1).padStart(2, "0")}.jpg`,
  url: `/placeholders/plate-${(i % 14) + 1}.svg`,
  uploadedAt: now,
}));

const db = {
  projects: [
    {
      id: "demo-anika-rohan",
      slug: "anika-and-rohan",
      clientNames: "Anika & Rohan",
      category: "Wedding",
      shootDate: "2026-11-14",
      accessCode: "ANIKA26",
      status: "ready",
      maxSelections: 60,
      coverImageId: "demo-img-3",
      images: demoImages,
      selections: ["demo-img-2", "demo-img-7"],
      selectionNote: "",
      selectionSubmittedAt: null,
      createdAt: now,
    },
  ],
};

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
console.log("Seeded demo project → access code ANIKA26 (slug: anika-and-rohan)");
