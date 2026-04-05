const HUB_API_URL = process.env.HUB_API_URL ?? "http://localhost:3001";
const HUB_API_SECRET = process.env.HUB_API_SECRET ?? "";

function hubHeaders(extra?: Record<string, string>): Record<string, string> {
  return { "Content-Type": "application/json", "x-api-key": HUB_API_SECRET, ...extra };
}

// ---- Types ----

export interface HubCustomer {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
  createdAt: string;
}

export interface HubOrder {
  id: number;
  customerId: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  trackingCode: string;
  dueDate?: string;
  quotedPrice?: number;
  notes?: string;
}

export interface CustomerInput {
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
}

export interface OrderInput {
  customerId: number;
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: string;
  quotedPrice?: number;
  notes?: string;
}

// ---- Deadline → priority mapping ----

function mapDeadlineToPriority(deadline: string): string {
  const lower = deadline.toLowerCase();
  if (lower.includes("asap")) return "urgent";
  if (lower.includes("1 week") || lower.includes("one week")) return "high";
  if (lower.includes("2 week") || lower.includes("two week")) return "normal";
  if (lower.includes("no rush")) return "low";
  return "normal";
}

// ---- API functions ----

/**
 * Find an existing customer by email, or create a new one.
 * Returns the customer record.
 */
export async function findOrCreateCustomer(
  data: CustomerInput
): Promise<HubCustomer> {
  // If we have an email, search for existing customer first
  if (data.email) {
    const listRes = await fetch(`${HUB_API_URL}/api/customers`, {
      method: "GET",
      headers: hubHeaders(),
    });

    if (listRes.ok) {
      const customers: HubCustomer[] = await listRes.json();
      const existing = customers.find(
        (c) => c.email?.toLowerCase() === data.email?.toLowerCase()
      );
      if (existing) return existing;
    }
  }

  // Create new customer
  const createRes = await fetch(`${HUB_API_URL}/api/customers`, {
    method: "POST",
    headers: hubHeaders(),
    body: JSON.stringify(data),
  });

  if (!createRes.ok) {
    const errorText = await createRes.text().catch(() => "unknown error");
    throw new Error(
      `Hub customer creation failed (${createRes.status}): ${errorText}`
    );
  }

  return createRes.json();
}

/**
 * Create a quote order in the Hub.
 * Returns the order record including auto-generated trackingCode.
 */
export async function createQuoteOrder(
  customerId: number,
  formData: {
    material: string;
    quantity: number;
    description: string;
    deadline: string;
    notes?: string;
    name: string;
    email?: string;
    company?: string;
    phone?: string;
  }
): Promise<HubOrder> {
  const priority = mapDeadlineToPriority(formData.deadline);

  const noteLines = [
    `Material: ${formData.material}`,
    `Quantity: ${formData.quantity}`,
    `Deadline: ${formData.deadline}`,
    formData.company ? `Company: ${formData.company}` : null,
    formData.phone ? `Phone: ${formData.phone}` : null,
    formData.notes ? `Additional notes: ${formData.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const payload: OrderInput = {
    customerId,
    title: `Quote: ${formData.material} - ${formData.quantity}`,
    description: formData.description,
    status: "quote",
    priority,
    notes: noteLines,
  };

  const res = await fetch(`${HUB_API_URL}/api/orders`, {
    method: "POST",
    headers: hubHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "unknown error");
    throw new Error(
      `Hub order creation failed (${res.status}): ${errorText}`
    );
  }

  return res.json();
}
