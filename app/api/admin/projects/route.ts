import { NextRequest, NextResponse } from "next/server";
import { saveProject, getProjectBySlug } from "@/lib/db";
import { makeId, makeAccessCode, slugify } from "@/lib/id";
import { CATEGORIES } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body?.clientNames || !body?.category || !body?.shootDate) {
    return NextResponse.json({ error: "Client names, category, and shoot date are required." }, { status: 400 });
  }
  if (!CATEGORIES.includes(body.category)) {
    return NextResponse.json({ error: "Invalid category." }, { status: 400 });
  }

  let slug = slugify(body.clientNames);
  let attempt = 0;
  while (getProjectBySlug(slug)) {
    attempt += 1;
    slug = `${slugify(body.clientNames)}-${attempt + 1}`;
  }

  const project = {
    id: makeId(),
    slug,
    clientNames: String(body.clientNames).slice(0, 200),
    category: body.category,
    shootDate: String(body.shootDate),
    accessCode: makeAccessCode(),
    status: "uploading" as const,
    maxSelections: Number(body.maxSelections) > 0 ? Number(body.maxSelections) : 50,
    coverImageId: null,
    images: [],
    selections: [],
    selectionNote: "",
    selectionSubmittedAt: null,
    createdAt: new Date().toISOString(),
  };

  saveProject(project);
  return NextResponse.json({ ok: true, project });
}
