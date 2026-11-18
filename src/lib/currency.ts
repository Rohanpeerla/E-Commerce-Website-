/**
 * Format a number as Indian Rupees (₹)
 * Uses the Indian numbering system (lakhs / crores).
 */
export function formatINR(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
