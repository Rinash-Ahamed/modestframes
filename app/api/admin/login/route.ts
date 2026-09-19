import { NextRequest, NextResponse } from "next/server";
import { sign } from "@/lib/session";
import crypto from "crypto";

const COOKIE = "modestframes_admin";
const MAX_AGE = 60 * 60 * 12; // 12 hours

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const password = body?.password ? String(body.password) : "";
  const expected = process.env.ADMIN_PASSWORD || "modestframes-admin";

  if (!password || !safeEqual(password, expected)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await sign({ admin: true, at: Date.now() });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(COOKIE);
  return res;
}
