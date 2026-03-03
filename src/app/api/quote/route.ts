import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Log to console (Resend integration can be added later)
    console.log("=== New Quote Request ===");
    console.log(JSON.stringify(data, null, 2));
    console.log("========================");

    return NextResponse.json(
      { success: true, message: "Quote request received" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to process quote request" },
      { status: 500 }
    );
  }
}
