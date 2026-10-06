// Waitlist sign-ups for Drop 001.
// TODO: send to a real list (Shopify customers, Klaviyo, or a form service) before
// sharing the site publicly. Until then, sign-ups are only kept in this browser.

const KEY = "ff-waitlist";

export async function joinWaitlist(email: string, product?: string): Promise<void> {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) ?? "[]") as unknown[];
    list.push({ email, product, at: new Date().toISOString() });
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {}
}
