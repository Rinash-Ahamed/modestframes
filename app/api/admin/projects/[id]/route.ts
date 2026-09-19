import { NextRequest, NextResponse } from "next/server";
import { getProjectById, saveProject, deleteProject } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  if (body.status && ["uploading", "ready", "selected", "delivered"].includes(body.status)) {
    project.status = body.status;
  }
  if (body.maxSelections && Number(body.maxSelections) > 0) {
    project.maxSelections = Number(body.maxSelections);
  }
  if (body.coverImageId !== undefined) {
    project.coverImageId = body.coverImageId;
  }

  saveProject(project);
  return NextResponse.json({ ok: true, project });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const uploadDir = path.join(process.cwd(), "public", "uploads", project.id);
  if (fs.existsSync(uploadDir)) {
    fs.rmSync(uploadDir, { recursive: true, force: true });
  }

  deleteProject(project.id);
  return NextResponse.json({ ok: true });
}
