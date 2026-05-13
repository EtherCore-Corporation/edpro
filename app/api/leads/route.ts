import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { leadSchema } from "@/lib/validation";
import { getFallbackStore } from "@/lib/fallback-store";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent");

    try {
      const supabase = getSupabaseAdmin();
      const { error } = await supabase.from("leads").insert({
        name: parsed.data.name,
        phone: parsed.data.phone,
        city: parsed.data.city,
        source: parsed.data.source ?? "website",
        user_agent: userAgent,
      });

      if (error) throw error;

      return NextResponse.json({ ok: true, source: "supabase" }, { status: 201 });
    } catch {
      const store = getFallbackStore();
      store.leads.push({
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        name: parsed.data.name,
        phone: parsed.data.phone,
        city: parsed.data.city,
        source: parsed.data.source ?? "website",
        userAgent,
      });

      return NextResponse.json({ ok: true, source: "fallback" }, { status: 201 });
    }
  } catch {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
