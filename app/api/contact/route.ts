import { NextRequest, NextResponse } from "next/server";
import { addInquiry } from "@/lib/db";
import { makeId } from "@/lib/id";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || !body.name || !body.email || !body.phone || !body.message) {
    return NextResponse.json({ error: "Name, email, phone, and message are required." }, { status: 400 });
  }

  const eventDate = String(body.eventDate || "").slice(0, 50);
  const studioDateParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const studioDate = ["year", "month", "day"]
    .map((part) => studioDateParts.find(({ type }) => type === part)?.value)
    .join("-");

  if (eventDate && (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate) || eventDate < studioDate)) {
    return NextResponse.json({ error: "Event date cannot be in the past." }, { status: 400 });
  }

  addInquiry({
    id: makeId(),
    name: String(body.name).slice(0, 200),
    email: String(body.email).slice(0, 200),
    phone: String(body.phone || "").slice(0, 50),
    category: body.category || "Not sure",
    eventDate,
    message: String(body.message).slice(0, 4000),
    createdAt: new Date().toISOString(),
    status: "new",
  });

  return NextResponse.json({ ok: true });
}
