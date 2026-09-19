import { NextRequest, NextResponse } from "next/server";
import { getProjectBySlug, saveProject } from "@/lib/db";
import { hasGalleryAccess } from "@/lib/galleryAuth";

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return NextResponse.json({ error: "Gallery not found." }, { status: 404 });
  if (!(await hasGalleryAccess(project.id))) {
    return NextResponse.json({ error: "Access code required." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body || !Array.isArray(body.imageIds)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const validIds = new Set(project.images.map((i) => i.id));
  const selections = body.imageIds.filter((id: string) => validIds.has(id));

  project.selections = selections;
  if (typeof body.note === "string") project.selectionNote = body.note.slice(0, 2000);

  if (body.submit) {
    project.selectionSubmittedAt = new Date().toISOString();
    project.status = "selected";
  }

  saveProject(project);

  return NextResponse.json({
    ok: true,
    selections: project.selections,
    submitted: !!project.selectionSubmittedAt,
  });
}
