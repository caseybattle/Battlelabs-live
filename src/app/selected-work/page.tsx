import type { CSSProperties } from "react";

const workItems = [
  {
    kicker: "Live Project",
    title: "The Reset Method",
    body:
      "A live digital product site with real product pages, Gumroad checkout, affiliate links, and a visible path from landing page to purchase.",
    bullets: [
      "Digital product landing pages",
      "Gumroad checkout handoff",
      "Amazon affiliate links",
      "Live public site",
    ],
    href: "https://www.theresetmethod.live/",
    linkLabel: "View The Reset Method",
  },
  {
    kicker: "Client Work",
    title: "Websites for service businesses and creators",
    body:
      "Sites built for salon clients and creator-style businesses, shaped around the offer, brand feel, and customer path instead of generic templates.",
    bullets: [
      "Service business website builds",
      "Creator brand presentation",
      "Offer clarity and page structure",
      "Custom front-end implementation",
    ],
    href: "https://battlelabs.co/",
    linkLabel: "View Battle Labs Co",
  },
  {
    kicker: "Automation",
    title: "Connected workflows that reduce manual steps",
    body:
      "Practical automations connecting forms, Stripe, Canva, social posting, landing pages, and follow-up logic into usable business workflows.",
    bullets: [
      "Form and inquiry routing",
      "Stripe-connected flows",
      "Canva and content workflow support",
      "Social posting automation",
    ],
    href: "/async-teardown",
    linkLabel: "Request an async teardown",
  },
];

export default function SelectedWorkPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <div style={eyebrowStyle}>Selected Work</div>
        <h1 style={titleStyle}>Real projects, real systems, and no inflated claims</h1>
        <p style={copyStyle}>
          This is the clearest picture of the kind of work Battle Labs can actually build: live product flows,
          client websites, and connected automations that reduce manual steps.
        </p>
      </section>

      <section style={gridStyle}>
        {workItems.map((item) => (
          <article key={item.title} style={cardStyle}>
            <span style={kickerStyle}>{item.kicker}</span>
            <h2 style={cardTitleStyle}>{item.title}</h2>
            <p style={cardCopyStyle}>{item.body}</p>
            <div style={bulletListStyle}>
              {item.bullets.map((bullet) => (
                <div key={bullet} style={bulletStyle}>
                  {bullet}
                </div>
              ))}
            </div>
            <a
              href={item.href}
              {...(item.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              style={linkStyle}
            >
              {item.linkLabel}
            </a>
          </article>
        ))}
      </section>

      <section style={ctaWrapStyle}>
        <div style={ctaCardStyle}>
          <h2 style={ctaTitleStyle}>If the bottleneck is already obvious, move straight into diagnosis.</h2>
          <p style={ctaCopyStyle}>
            Use the async teardown if you want a tighter read on what is broken in the site, flow, or follow-up
            path before committing to a build.
          </p>
          <div style={ctaActionsStyle}>
            <a href="/async-teardown" style={primaryLinkStyle}>
              Request Async Teardown
            </a>
            <a href="/pilot-build" style={ghostLinkStyle}>
              View Pilot Build
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  padding: "72px 24px 96px",
  background: "radial-gradient(circle at top, rgba(200,169,126,0.18), transparent 40%), #090909",
  color: "#f5f0ea",
  fontFamily: "var(--font-geist-sans), sans-serif",
};

const heroStyle: CSSProperties = {
  maxWidth: 900,
  margin: "0 auto 40px",
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
  fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
  lineHeight: 1.04,
  marginBottom: 18,
  fontWeight: 700,
};

const copyStyle: CSSProperties = {
  maxWidth: 720,
  fontSize: 18,
  lineHeight: 1.75,
  color: "rgba(245,240,234,0.76)",
};

const gridStyle: CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 20,
};

const cardStyle: CSSProperties = {
  padding: 28,
  borderRadius: 24,
  border: "1px solid rgba(200,169,126,0.14)",
  background: "rgba(12,12,12,0.9)",
  boxShadow: "0 24px 80px rgba(0,0,0,0.22)",
};

const kickerStyle: CSSProperties = {
  display: "inline-block",
  marginBottom: 14,
  fontSize: 12,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#c8a97e",
};

const cardTitleStyle: CSSProperties = {
  fontFamily: "var(--font-geist-sans), sans-serif",
  fontSize: 26,
  lineHeight: 1.2,
  marginBottom: 12,
};

const cardCopyStyle: CSSProperties = {
  color: "rgba(245,240,234,0.72)",
  lineHeight: 1.72,
  fontSize: 15,
};

const bulletListStyle: CSSProperties = {
  display: "grid",
  gap: 10,
  marginTop: 18,
};

const bulletStyle: CSSProperties = {
  padding: "12px 14px",
  borderRadius: 14,
  border: "1px solid rgba(200,169,126,0.1)",
  background: "rgba(255,255,255,0.03)",
  color: "rgba(245,240,234,0.9)",
  fontSize: 14,
};

const linkStyle: CSSProperties = {
  display: "inline-flex",
  marginTop: 18,
  color: "#c8a97e",
  textDecoration: "none",
  fontWeight: 700,
};

const ctaWrapStyle: CSSProperties = {
  maxWidth: 1200,
  margin: "28px auto 0",
};

const ctaCardStyle: CSSProperties = {
  padding: 28,
  borderRadius: 24,
  border: "1px solid rgba(200,169,126,0.14)",
  background: "rgba(12,12,12,0.88)",
};

const ctaTitleStyle: CSSProperties = {
  fontSize: 28,
  marginBottom: 10,
};

const ctaCopyStyle: CSSProperties = {
  maxWidth: 720,
  fontSize: 16,
  lineHeight: 1.7,
  color: "rgba(245,240,234,0.72)",
};

const ctaActionsStyle: CSSProperties = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  marginTop: 18,
};

const primaryLinkStyle: CSSProperties = {
  display: "inline-flex",
  padding: "14px 18px",
  borderRadius: 16,
  background: "#c8a97e",
  color: "#090909",
  textDecoration: "none",
  fontWeight: 700,
};

const ghostLinkStyle: CSSProperties = {
  display: "inline-flex",
  padding: "14px 18px",
  borderRadius: 16,
  border: "1px solid rgba(200,169,126,0.2)",
  color: "#f5f0ea",
  textDecoration: "none",
  fontWeight: 700,
};
