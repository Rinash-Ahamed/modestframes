import { NextRequest, NextResponse } from "next/server";
import { updateInquiryStatus } from "@/lib/db";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body?.status || !["new", "responded", "archived"].includes(body.status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }
  updateInquiryStatus(id, body.status);
  return NextResponse.json({ ok: true });
}
