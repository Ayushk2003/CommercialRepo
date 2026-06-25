import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getSupabaseAdmin } from "../../../lib/supabase";

function getTotal(items = []) {
  return items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0);
}

export async function POST(request) {
  const body = await request.json();
  const items = Array.isArray(body.items) ? body.items : [];
  const customer = body.customer || {};
  const total = getTotal(items);

  if (!items.length || total <= 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ error: "Razorpay server keys are not configured." }, { status: 500 });
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });

  const receipt = `vv_${Date.now()}`;
  const order = await razorpay.orders.create({
    amount: total * 100,
    currency: "INR",
    receipt,
    notes: {
      customer_name: customer.name || "Guest",
      customer_email: customer.email || ""
    }
  });

  const supabase = getSupabaseAdmin();
  let dbOrderId = null;

  if (supabase) {
    const { data, error } = await supabase
      .from("orders")
      .insert({
        razorpay_order_id: order.id,
        receipt,
        amount: total,
        currency: "INR",
        status: "created",
        customer,
        items
      })
      .select("id")
      .single();

    if (!error) {
      dbOrderId = data.id;
    }
  }

  return NextResponse.json({
    orderId: order.id,
    dbOrderId,
    amount: order.amount,
    currency: order.currency,
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID
  });
}
