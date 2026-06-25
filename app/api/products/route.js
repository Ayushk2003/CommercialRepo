import { NextResponse } from "next/server";
import { fallbackProducts } from "../../../lib/products";
import { getSupabaseAdmin } from "../../../lib/supabase";

export async function GET() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json({ products: fallbackProducts, source: "fallback" });
  }

  const { data, error } = await supabase
    .from("products")
    .select("id,name,type,fit,price,color,bg,shape,tag")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ products: fallbackProducts, source: "fallback", error: error.message });
  }

  return NextResponse.json({ products: data?.length ? data : fallbackProducts, source: data?.length ? "supabase" : "fallback" });
}
