import { NextRequest, NextResponse } from "next/server";
import { getProjectById, saveProject } from "@/lib/db";
import { makeId } from "@/lib/id";
import fs from "fs";
import path from "path";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/avif"]);
const MAX_BYTES = 25 * 1024 * 1024; // 25MB per file

function extFor(mime: string, name: string) {
  const fromName = path.extname(name).toLowerCase();
  if (fromName) return fromName;
  const map: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/svg+xml": ".svg",
    "image/avif": ".avif",
  };
  return map[mime] || "";
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const formData = await req.formData();
  const files = formData.getAll("files").filter((f): f is File => f instanceof File);

  if (files.length === 0) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", project.id);
  fs.mkdirSync(uploadDir, { recursive: true });

  const saved: { id: string; filename: string; url: string; uploadedAt: string }[] = [];
  const skipped: string[] = [];

  for (const file of files) {
    if (!ALLOWED.has(file.type) || file.size > MAX_BYTES) {
      skipped.push(file.name);
      continue;
    }
    const id = makeId();
    const ext = extFor(file.type, file.name) || ".jpg";
    const storedName = `${id}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(uploadDir, storedName), buffer);

    const entry = {
      id,
      filename: file.name,
      url: `/uploads/${project.id}/${storedName}`,
      uploadedAt: new Date().toISOString(),
    };
    project.images.push(entry);
    saved.push(entry);
  }

  if (!project.coverImageId && project.images[0]) {
    project.coverImageId = project.images[0].id;
  }
  if (project.status === "uploading" && project.images.length > 0) {
    project.status = "ready";
  }

  saveProject(project);

  return NextResponse.json({ ok: true, saved: saved.length, skipped });
}
