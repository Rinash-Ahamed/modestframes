import { NextRequest, NextResponse } from "next/server";
import { getProjectById, saveProject } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string; imageId: string }> }) {
  const { id, imageId } = await params;
  const project = getProjectById(id);
  if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const image = project.images.find((i) => i.id === imageId);
  if (!image) return NextResponse.json({ error: "Image not found." }, { status: 404 });

  const filePath = path.join(process.cwd(), "public", image.url);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  project.images = project.images.filter((i) => i.id !== imageId);
  project.selections = project.selections.filter((sid) => sid !== imageId);
  if (project.coverImageId === imageId) {
    project.coverImageId = project.images[0]?.id || null;
  }

  saveProject(project);
  return NextResponse.json({ ok: true });
}
