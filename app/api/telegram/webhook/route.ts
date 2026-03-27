import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PAYMENTS_FILE = path.join(process.cwd(), "data", "payments.json");

export async function POST(request: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const body = await request.json();

  // Telegram Join Request update
  if (body.chat_join_request) {
    const { from, chat } = body.chat_join_request;
    const username = from.username?.toLowerCase();
    const telegram_id = from.id.toString();

    try {
      // Check if user has paid
      const payments = JSON.parse(fs.readFileSync(PAYMENTS_FILE, "utf-8"));
      const paidUser = payments.find((p: any) => 
        (p.telegram_username?.replace("@", "").toLowerCase() === username?.replace("@", "")) || 
        (p.telegram_id === telegram_id)
      );

      if (paidUser) {
        // Approve request
        await fetch(`https://api.telegram.org/bot${token}/approveChatJoinRequest`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chat.id,
            user_id: from.id,
          }),
        });
        return NextResponse.json({ ok: true, message: "User approved" });
      }
    } catch (err) {
      console.error("Webhook lookup error:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
