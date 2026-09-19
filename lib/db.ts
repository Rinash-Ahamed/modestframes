import fs from "fs";
import path from "path";
import { Database, Inquiry, Project } from "./types";

/**
 * File-backed data store.
 *
 * This keeps the whole app runnable on the free tier with zero external
 * services: no database to provision, no API keys to configure. It is a
 * perfectly good store for a self-hosted deployment (a VPS, a small
 * always-on box) where the filesystem persists.
 *
 * On serverless hosts (Vercel, Netlify) the filesystem is read-only /
 * ephemeral in production, so writes made here will not persist between
 * deployments. For that environment, swap this module for Supabase:
 * mirror the same function signatures (getProjects, getProject,
 * saveProjects) but call `supabase.from('projects')...` instead of
 * touching the filesystem, and point image uploads at Supabase Storage
 * instead of /public/uploads. Nothing outside this file needs to change.
 */

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "projects.json");

function ensureDb(): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_PATH)) {
    const empty: Database = { projects: [], inquiries: [] };
    fs.writeFileSync(DB_PATH, JSON.stringify(empty, null, 2));
  }
}

export function readDb(): Database {
  ensureDb();
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  try {
    const parsed = JSON.parse(raw) as Database;
    if (!parsed.inquiries) parsed.inquiries = [];
    if (!parsed.projects) parsed.projects = [];
    return parsed;
  } catch {
    return { projects: [], inquiries: [] };
  }
}

export function writeDb(db: Database): void {
  ensureDb();
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

export function getProjects(): Project[] {
  return readDb().projects.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getProjectById(id: string): Project | undefined {
  return readDb().projects.find((p) => p.id === id);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return readDb().projects.find((p) => p.slug === slug);
}

export function getProjectByAccessCode(code: string): Project | undefined {
  return readDb().projects.find((p) => p.accessCode.toLowerCase() === code.toLowerCase().trim());
}

export function saveProject(project: Project): void {
  const db = readDb();
  const idx = db.projects.findIndex((p) => p.id === project.id);
  if (idx >= 0) db.projects[idx] = project;
  else db.projects.push(project);
  writeDb(db);
}

export function deleteProject(id: string): void {
  const db = readDb();
  db.projects = db.projects.filter((p) => p.id !== id);
  writeDb(db);
}

export function getInquiries(): Inquiry[] {
  return readDb().inquiries.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function addInquiry(inquiry: Inquiry): void {
  const db = readDb();
  db.inquiries.push(inquiry);
  writeDb(db);
}

export function updateInquiryStatus(id: string, status: Inquiry["status"]): void {
  const db = readDb();
  const found = db.inquiries.find((i) => i.id === id);
  if (found) found.status = status;
  writeDb(db);
}
