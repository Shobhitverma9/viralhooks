import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat_id = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chat_id) {
    return NextResponse.json({ error: "Missing Telegram config" }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/createChatInviteLink`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id,
        creates_join_request: true,
      }),
    });

    const data = await response.json();
    if (!data.ok) throw new Error(data.description);

    return NextResponse.json({ invite_link: data.result.invite_link });
  } catch (error: any) {
    console.error("Telegram Invite Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
