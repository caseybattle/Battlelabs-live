export type OfferConfig = {
  eyebrow: string;
  title: string;
  body: string;
  nextSteps: string[];
  kickoffHref: string;
};

export const offerConfigs: Record<string, OfferConfig> = {
  "pilot-build": {
    eyebrow: "Payment Received",
    title: "Your Battle Labs pilot build is locked in",
    body:
      "Payment is in. The next move is a clean async kickoff so the first bottleneck gets fixed without scope drift.",
    nextSteps: [
      "Reply with the current page, funnel, or workflow you want fixed first.",
      "Send any relevant assets, access notes, or brand constraints.",
      "State the one bottleneck that matters most so the pilot stays focused.",
    ],
    kickoffHref: "/kickoff?offer=pilot-build",
  },
  "reply-deck": {
    eyebrow: "Purchase Confirmed",
    title: "Reply Deck is on the way",
    body:
      "Your order is in. The next step is a short async handoff so the follow-up starter system matches the business you are actually running.",
    nextSteps: [
      "Reply with your current inquiry flow or intake form.",
      "Share the main follow-up gap you want the starter system to address.",
      "Watch for the delivery note and implementation instructions in email.",
    ],
    kickoffHref: "/kickoff?offer=reply-deck",
  },
  default: {
    eyebrow: "Payment Received",
    title: "Your purchase is confirmed",
    body:
      "The payment went through. The next move is a fast async handoff so Battle Labs can turn the purchase into a concrete result instead of another loose thread.",
    nextSteps: [
      "Reply with the current page, workflow, or problem you need solved.",
      "Share any files, links, or notes that will speed up delivery.",
      "Keep the scope narrow so the first win lands quickly.",
    ],
    kickoffHref: "/kickoff",
  },
};

export function normalizeOffer(value: string | null | undefined): string {
  return value?.trim().toLowerCase() || "default";
}

export function getOfferConfig(value: string | null | undefined): OfferConfig {
  return offerConfigs[normalizeOffer(value)] ?? offerConfigs.default;
}
