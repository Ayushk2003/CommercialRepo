import crypto from "crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../../lib/supabase";

export async function POST(request) {
  const body = await request.json();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: "Missing Razorpay payment details." }, { status: 400 });
  }

  if (!process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ error: "Razorpay secret is not configured." }, { status: 500 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const verified = expectedSignature === razorpay_signature;
  const supabase = getSupabaseAdmin();

  if (supabase) {
    await supabase
      .from("orders")
      .update({
        status: verified ? "paid" : "payment_failed",
        razorpay_payment_id,
        razorpay_signature
      })
      .eq("razorpay_order_id", razorpay_order_id);
  }

  return NextResponse.json({ verified });
}
