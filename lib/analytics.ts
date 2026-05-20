export type LeadSubmittedPayload = {
  service: string;
  vehicleSize: string;
  tier?: string | null;
};

export function trackLeadSubmitted(payload: LeadSubmittedPayload): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  try {
    window.gtag("event", "lead_submitted", {
      form_name: "shine_society_quote_form",
      ...payload,
    });
  } catch {
    /* never let analytics crash the form */
  }
}
