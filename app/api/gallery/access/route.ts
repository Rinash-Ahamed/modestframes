import { NextRequest, NextResponse } from "next/server";
import { getProjectByAccessCode } from "@/lib/db";
import { sign, verify } from "@/lib/session";

const COOKIE = "modestframes_gallery";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const code = body?.code ? String(body.code).trim() : "";

  if (!code) {
    return NextResponse.json({ error: "Enter your access code." }, { status: 400 });
  }

  const project = getProjectByAccessCode(code);
  if (!project) {
    return NextResponse.json({ error: "That code doesn't match a gallery. Double-check and try again." }, { status: 404 });
  }

  const existing = (await verify<{ ids: string[] }>(req.cookies.get(COOKIE)?.value)) || { ids: [] };
  const ids = Array.from(new Set([...existing.ids, project.id]));
  const token = await sign({ ids });

  const res = NextResponse.json({ ok: true, slug: project.slug });
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
    path: "/",
  });
  return res;
}
