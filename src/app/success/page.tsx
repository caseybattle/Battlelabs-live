import type { CSSProperties } from "react";

type SuccessPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type OfferConfig = {
  eyebrow: string;
  title: string;
  body: string;
  nextSteps: string[];
  kickoffHref: string;
};

const offerConfigs: Record<string, OfferConfig> = {
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

function getSearchParam(
  value: string | string[] | undefined,
): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = (await searchParams) ?? {};
  const offer = getSearchParam(params.offer).trim().toLowerCase();
  const config = offerConfigs[offer] ?? offerConfigs.default;

  return (
    <main style={pageStyle}>
      <section style={panelStyle}>
        <div style={eyebrowStyle}>{config.eyebrow}</div>
        <h1 style={titleStyle}>{config.title}</h1>
        <p style={copyStyle}>{config.body}</p>

        <div style={cardStyle}>
          <h2 style={subheadStyle}>What happens next</h2>
          <div style={listStyle}>
            {config.nextSteps.map((step) => (
              <div key={step} style={listItemStyle}>
                {step}
              </div>
            ))}
          </div>
        </div>

        <a href={config.kickoffHref} style={ctaStyle}>
          Send kickoff details now
        </a>

        <div style={supportStyle}>
          Need to send context now? Email{" "}
          <a href="mailto:casbattle19@gmail.com" style={linkStyle}>
            casbattle19@gmail.com
          </a>
          .
        </div>
      </section>
    </main>
  );
}

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: "32px 20px",
  background: "radial-gradient(circle at top, rgba(200,169,126,0.18), transparent 40%), #090909",
  color: "#f5f0ea",
  fontFamily: "var(--font-geist-sans), sans-serif",
};

const panelStyle: CSSProperties = {
  width: "100%",
  maxWidth: 760,
  padding: 32,
  borderRadius: 28,
  border: "1px solid rgba(200,169,126,0.16)",
  background: "rgba(12,12,12,0.9)",
  boxShadow: "0 24px 80px rgba(0,0,0,0.28)",
};

const eyebrowStyle: CSSProperties = {
  display: "inline-flex",
  padding: "8px 14px",
  borderRadius: 999,
  border: "1px solid rgba(200,169,126,0.18)",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  fontSize: 12,
  color: "#c8a97e",
  marginBottom: 18,
};

const titleStyle: CSSProperties = {
  fontSize: "clamp(2.2rem, 6vw, 4rem)",
  lineHeight: 1.05,
  marginBottom: 16,
  fontWeight: 700,
};

const copyStyle: CSSProperties = {
  color: "rgba(245,240,234,0.76)",
  lineHeight: 1.7,
  fontSize: 17,
  marginBottom: 24,
};

const cardStyle: CSSProperties = {
  padding: 22,
  borderRadius: 20,
  border: "1px solid rgba(200,169,126,0.1)",
  background: "rgba(255,255,255,0.03)",
};

const subheadStyle: CSSProperties = {
  fontSize: 24,
  marginBottom: 14,
};

const listStyle: CSSProperties = {
  display: "grid",
  gap: 12,
};

const listItemStyle: CSSProperties = {
  padding: "14px 16px",
  borderRadius: 16,
  border: "1px solid rgba(200,169,126,0.08)",
  background: "rgba(255,255,255,0.02)",
  color: "rgba(245,240,234,0.88)",
  lineHeight: 1.7,
};

const supportStyle: CSSProperties = {
  marginTop: 22,
  color: "rgba(245,240,234,0.72)",
  lineHeight: 1.7,
};

const ctaStyle: CSSProperties = {
  display: "inline-flex",
  marginTop: 20,
  padding: "14px 18px",
  borderRadius: 16,
  background: "#c8a97e",
  color: "#090909",
  textDecoration: "none",
  fontWeight: 700,
};

const linkStyle: CSSProperties = {
  color: "#c8a97e",
};
