import { NextRequest, NextResponse } from "next/server";
import { quoteSchema } from "@/lib/quote-schema";
import { findOrCreateCustomer, createQuoteOrder } from "@/lib/hub-api";
import { sendOwnerNotification, sendCustomerConfirmation } from "@/lib/email";

// Simple in-memory rate limiter: max 5 submissions per IP per 15 minutes
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let rawData: unknown;

  try {
    rawData = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400 }
    );
  }

  // Validate incoming data
  const parsed = quoteSchema.safeParse(rawData);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Validation failed", errors: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Log submission without PII
  console.log(`[Quote] New request: material=${data.material}, qty=${data.quantity}, deadline=${data.deadline}`);

  // Attempt to wire into Hub
  try {
    const customer = await findOrCreateCustomer({
      name: data.name,
      email: data.email,
      phone: data.phone,
      notes: data.company ? `Company: ${data.company}` : undefined,
    });

    const order = await createQuoteOrder(customer.id, data);

    // Send emails (non-blocking — don't let email failure break the response)
    const emailData = { ...data, trackingCode: order.trackingCode };
    Promise.all([
      sendOwnerNotification(emailData),
      sendCustomerConfirmation(emailData),
    ]).catch((err) => console.error("[Email] Send failed:", err));

    return NextResponse.json(
      {
        success: true,
        trackingCode: order.trackingCode,
        message: "Quote request received! Your tracking code is below.",
      },
      { status: 200 }
    );
  } catch (err) {
    // Hub is unreachable or returned an error — degrade gracefully
    console.error("Hub integration failed:", err);

    // Still try to send notification email even if Hub is down
    const emailData = { ...data, trackingCode: null };
    Promise.all([
      sendOwnerNotification(emailData),
      sendCustomerConfirmation(emailData),
    ]).catch((emailErr) => console.error("[Email] Send failed:", emailErr));

    return NextResponse.json(
      {
        success: true,
        trackingCode: null,
        message: "Quote received — we'll be in touch within 24 hours.",
      },
      { status: 200 }
    );
  }
}
