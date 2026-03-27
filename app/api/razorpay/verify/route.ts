import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const PAYMENTS_FILE = path.join(process.cwd(), "data", "payments.json");

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, telegram_username } = await request.json();

    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Create data dir if not exists (redundancy)
      const dataDir = path.dirname(PAYMENTS_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Save to payments.json
      let payments = [];
      if (fs.existsSync(PAYMENTS_FILE)) {
        payments = JSON.parse(fs.readFileSync(PAYMENTS_FILE, "utf-8"));
      }
      
      payments.push({
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        telegram_username,
        timestamp: new Date().toISOString(),
      });
      
      fs.writeFileSync(PAYMENTS_FILE, JSON.stringify(payments, null, 2));

      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
