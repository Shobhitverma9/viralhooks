import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const { name, whatsapp_number, amount } = await request.json();

    if (!name || !whatsapp_number) {
      return NextResponse.json({ error: "Name and WhatsApp number are required" }, { status: 400 });
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
      name,
      whatsapp_number,
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
