import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const { telegram_username, amount } = await request.json();

    if (!telegram_username) {
      return NextResponse.json({ error: "Telegram username is required" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "data", "payments.json");
    
    // Read existing payments
    let payments = [];
    try {
      const data = await fs.readFile(filePath, "utf-8");
      payments = JSON.parse(data);
    } catch (error) {
      // File might not exist or be empty, handled by default empty array
    }

    // Add new payment record
    const newRecord = {
      telegram_username,
      amount,
      status: "pending_verification",
      timestamp: new Date().toISOString(),
      method: "UPI_WORKAROUND"
    };

    payments.push(newRecord);

    // Save back to file
    await fs.writeFile(filePath, JSON.stringify(payments, null, 2));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Payment Record Error:", error);
    return NextResponse.json({ error: "Failed to record payment" }, { status: 500 });
  }
}
