import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { bookingSchema } from "@/lib/validation";
import { getFallbackStore } from "@/lib/fallback-store";

export const dynamic = "force-dynamic";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  if (!date || !dateRegex.test(date)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("bookings")
      .select("booking_time")
      .eq("booking_date", date);

    if (error) throw error;

    const takenSlots = (data ?? [])
      .map((row) => String(row.booking_time).slice(0, 5))
      .filter(Boolean);

    return NextResponse.json({ takenSlots }, { status: 200 });
  } catch {
    const store = getFallbackStore();
    const takenSlots = store.bookings
      .filter((item) => item.bookingDate === date)
      .map((item) => item.bookingTime);

    return NextResponse.json({ takenSlots, source: "fallback" }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent");

    try {
      const supabase = getSupabaseAdmin();
      const { error } = await supabase.from("bookings").insert({
        name: parsed.data.name,
        phone: parsed.data.phone,
        company: parsed.data.company,
        booking_date: parsed.data.bookingDate,
        booking_time: parsed.data.bookingTime,
        user_agent: userAgent,
      });

      if (error) throw error;

      return NextResponse.json({ ok: true, source: "supabase" }, { status: 201 });
    } catch {
      const store = getFallbackStore();
      store.bookings.push({
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        name: parsed.data.name,
        phone: parsed.data.phone,
        company: parsed.data.company,
        bookingDate: parsed.data.bookingDate,
        bookingTime: parsed.data.bookingTime,
        userAgent,
      });

      return NextResponse.json({ ok: true, source: "fallback" }, { status: 201 });
    }
  } catch {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
