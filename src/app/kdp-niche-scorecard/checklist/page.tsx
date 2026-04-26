import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { calculateKdpScore, KDP_SCORECARD_OFFER } from "@/lib/kdp-scorecard";

export const metadata: Metadata = {
  title: "KDP Niche Scorecard Checklist - Free Checklist | Battlelabs",
  description:
    "A plain-English KDP niche checklist: score buyer intent, giftability, competition clarity, production simplicity, and evergreen demand before building a full book or launch report.",
};

const sample = calculateKdpScore({
  buyerIntent: 5,
  giftability: 5,
  competitionClarity: 4,
  productionSimplicity: 5,
  evergreenDemand: 4,
});

const dimensions = [
  {
    title: "Buyer intent",
    question: "Is there a specific person searching for this book, and why now?",
    strong: "You can name the buyer and the moment: “first-time dog owner training log” or “grandparent memory prompts for a 70th birthday.”",
    weak: "The buyer is “everyone” and the promise is generic: “blank journal” or “daily planner.”",
  },
  {
    title: "Giftability",
    question: "Does the idea naturally fit an occasion, recipient, or emotional reason to buy?",
    strong: "It maps to occasions (birthday, holiday, grief, retirement) or recipient roles (dad, grandma, new mom).",
    weak: "It has no recipient/occasion angle and competes on vague self-improvement.",
  },
  {
    title: "Competition clarity",
    question: "Can you position it without copying crowded listings?",
    strong: "The listing promise is unique and specific; you can explain the difference in one sentence.",
    weak: "You can only compete with broad keywords, generic covers, or price.",
  },
  {
    title: "Production simplicity",
    question: "Can you ship a first version quickly without custom illustration or heavy research?",
    strong: "The interior is a clean template: prompts, checklists, trackers, grids, or structured exercises.",
    weak: "It requires bespoke art, long-form original writing, or a complex data workflow before it’s useful.",
  },
  {
    title: "Evergreen demand",
    question: "Will the idea still make sense 6–12 months from now?",
    strong: "It solves an ongoing need (keepsakes, routines, family history, practice logs).",
    weak: "It depends on a short trend window or a momentary meme.",
  },
] as const;

const steps = [
  "Pick one narrow angle (buyer + occasion + format).",
  "Score each dimension 1–5 fast (no overthinking).",
  "If the score is Weak, narrow the buyer or gift angle before building.",
  "If the score is Test, build a free sample + one organic post before expanding.",
  "If the score is Strong, ship a minimal version and test messaging with organic placements.",
] as const;

export default function KdpNicheScorecardChecklistPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <div style={heroCopyStyle}>
          <p style={eyebrowStyle}>Battlelabs Agent Product Foundry / SKU 002</p>
          <h1 style={titleStyle}>KDP niche checklist (5-factor scorecard)</h1>
          <p style={leadStyle}>
            A plain-English checklist for validating a KDP book idea before you spend time building the
            cover, interior, and launch assets.
          </p>
          <div style={ctaRowStyle}>
            <a href="/kdp-niche-scorecard" style={primaryLinkStyle}>
              Use the free scorecard tool
            </a>
            <a href="/products/kdp-niche-scorecard/free-sample.md" style={secondaryLinkStyle}>
              Open free sample
            </a>
          </div>
          <p style={microcopyStyle}>{KDP_SCORECARD_OFFER.disclaimer}</p>
        </div>

        <aside style={scoreCardStyle} aria-label="Example checklist score">
          <span style={scoreLabelStyle}>Example checklist score</span>
          <strong style={scoreNumberStyle}>{sample.score}</strong>
          <span style={scoreBandStyle}>{sample.band} niche</span>
          <div style={meterOuterStyle}>
            <div style={{ ...meterInnerStyle, width: `${sample.score}%` }} />
          </div>
          <ul style={recommendationListStyle}>
            {sample.recommendations.map((recommendation) => (
              <li key={recommendation}>{recommendation}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section style={bandStyle}>
        <div style={sectionHeaderStyle}>
          <p style={eyebrowStyle}>Checklist</p>
          <h2 style={sectionTitleStyle}>Score the idea on five dimensions</h2>
          <p style={sectionCopyStyle}>
            Rate each dimension from 1–5. The goal is to expose weak points early, not to predict Amazon
            rankings.
          </p>
        </div>
        <div style={dimensionGridStyle}>
          {dimensions.map((dimension, index) => (
            <article key={dimension.title} style={dimensionStyle}>
              <span style={dimensionNumberStyle}>{index + 1}</span>
              <h3 style={dimensionTitleStyle}>{dimension.title}</h3>
              <p style={dimensionQuestionStyle}>{dimension.question}</p>
              <div style={calloutGridStyle}>
                <div style={calloutStrongStyle}>
                  <span style={calloutLabelStyle}>Strong</span>
                  <p style={calloutCopyStyle}>{dimension.strong}</p>
                </div>
                <div style={calloutWeakStyle}>
                  <span style={calloutLabelStyle}>Weak</span>
                  <p style={calloutCopyStyle}>{dimension.weak}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={splitStyle}>
        <div>
          <p style={eyebrowStyle}>How to use it</p>
          <h2 style={sectionTitleStyle}>A fast go/no-go routine</h2>
          <p style={sectionCopyStyle}>
            The score is not a prediction. It is a structured pause before you build a full product.
          </p>
        </div>
        <ol style={stepsStyle}>
          {steps.map((step) => (
            <li key={step} style={stepStyle}>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section style={finalCtaStyle}>
        <h2 style={finalTitleStyle}>Want the interactive version?</h2>
        <p style={finalCopyStyle}>
          Use the free scorecard tool to score an idea and copy a shareable link for feedback or tracking.
        </p>
        <a href="/kdp-niche-scorecard" style={primaryLinkStyle}>
          Open the free scorecard tool
        </a>
      </section>
    </main>
  );
}

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  background: "#f7f8f3",
  color: "#1f2b26",
  fontFamily: "var(--font-geist-sans), sans-serif",
};

const heroStyle: CSSProperties = {
  minHeight: "78vh",
  maxWidth: 1180,
  margin: "0 auto",
  padding: "72px 24px 48px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
  gap: 36,
  alignItems: "center",
};

const heroCopyStyle: CSSProperties = {
  maxWidth: 690,
};

const eyebrowStyle: CSSProperties = {
  margin: "0 0 14px",
  color: "#b4432d",
  fontSize: 12,
  fontWeight: 850,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const titleStyle: CSSProperties = {
  margin: "0 0 20px",
  fontSize: "clamp(2.9rem, 7vw, 5.8rem)",
  lineHeight: 0.92,
  fontWeight: 860,
  color: "#173f35",
};

const leadStyle: CSSProperties = {
  maxWidth: 620,
  margin: "0 0 26px",
  color: "#3e5d55",
  fontSize: 20,
  lineHeight: 1.58,
};

const ctaRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  alignItems: "center",
};

const primaryLinkStyle: CSSProperties = {
  display: "inline-flex",
  minHeight: 48,
  alignItems: "center",
  justifyContent: "center",
  padding: "13px 18px",
  borderRadius: 8,
  background: "#173f35",
  color: "#ffffff",
  fontWeight: 830,
  textDecoration: "none",
};

const secondaryLinkStyle: CSSProperties = {
  display: "inline-flex",
  minHeight: 48,
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 17px",
  borderRadius: 8,
  border: "1px solid rgba(180,67,45,0.7)",
  color: "#173f35",
  fontWeight: 830,
  background: "#ffffff",
  textDecoration: "none",
};

const microcopyStyle: CSSProperties = {
  marginTop: 16,
  maxWidth: 640,
  color: "#66746d",
  fontSize: 14,
  lineHeight: 1.65,
};

const scoreCardStyle: CSSProperties = {
  padding: 28,
  borderRadius: 8,
  background: "#ffffff",
  border: "1px solid rgba(23,63,53,0.12)",
  boxShadow: "0 24px 70px rgba(23,63,53,0.14)",
};

const scoreLabelStyle: CSSProperties = {
  display: "block",
  color: "#66746d",
  fontSize: 13,
  fontWeight: 820,
  textTransform: "uppercase",
};

const scoreNumberStyle: CSSProperties = {
  display: "block",
  marginTop: 12,
  color: "#173f35",
  fontSize: 92,
  lineHeight: 0.9,
};

const scoreBandStyle: CSSProperties = {
  display: "block",
  marginTop: 8,
  color: "#b4432d",
  fontWeight: 850,
  fontSize: 20,
};

const meterOuterStyle: CSSProperties = {
  height: 12,
  marginTop: 22,
  overflow: "hidden",
  borderRadius: 999,
  background: "#e6ece5",
};

const meterInnerStyle: CSSProperties = {
  height: "100%",
  borderRadius: 999,
  background: "#2e7a68",
};

const recommendationListStyle: CSSProperties = {
  margin: "22px 0 0",
  paddingLeft: 20,
  color: "#3e5d55",
  lineHeight: 1.65,
};

const bandStyle: CSSProperties = {
  padding: "72px 24px",
  background: "#ffffff",
};

const sectionHeaderStyle: CSSProperties = {
  maxWidth: 900,
  margin: "0 auto 30px",
  textAlign: "center",
};

const sectionTitleStyle: CSSProperties = {
  margin: "0 0 14px",
  color: "#173f35",
  fontSize: "clamp(2rem, 4vw, 3.25rem)",
  lineHeight: 1.04,
  letterSpacing: 0,
};

const sectionCopyStyle: CSSProperties = {
  margin: 0,
  color: "#51655e",
  fontSize: 17,
  lineHeight: 1.7,
};

const dimensionGridStyle: CSSProperties = {
  maxWidth: 1180,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 16,
};

const dimensionStyle: CSSProperties = {
  padding: 22,
  borderRadius: 8,
  background: "#f7f8f3",
  border: "1px solid rgba(23,63,53,0.1)",
};

const dimensionNumberStyle: CSSProperties = {
  display: "inline-flex",
  width: 34,
  height: 34,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 999,
  background: "#173f35",
  color: "#ffffff",
  fontWeight: 850,
};

const dimensionTitleStyle: CSSProperties = {
  margin: "18px 0 8px",
  color: "#173f35",
  fontSize: 22,
  lineHeight: 1.15,
};

const dimensionQuestionStyle: CSSProperties = {
  margin: "0 0 16px",
  color: "#51655e",
  lineHeight: 1.55,
};

const calloutGridStyle: CSSProperties = {
  display: "grid",
  gap: 10,
};

const calloutStrongStyle: CSSProperties = {
  padding: 14,
  borderRadius: 8,
  background: "#ffffff",
  border: "1px solid rgba(46,122,104,0.3)",
};

const calloutWeakStyle: CSSProperties = {
  padding: 14,
  borderRadius: 8,
  background: "#ffffff",
  border: "1px solid rgba(180,67,45,0.3)",
};

const calloutLabelStyle: CSSProperties = {
  display: "block",
  marginBottom: 8,
  fontSize: 12,
  fontWeight: 840,
  textTransform: "uppercase",
  color: "#173f35",
  letterSpacing: "0.08em",
};

const calloutCopyStyle: CSSProperties = {
  margin: 0,
  color: "#3e5d55",
  lineHeight: 1.55,
};

const splitStyle: CSSProperties = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "72px 24px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
  gap: 36,
  alignItems: "start",
};

const stepsStyle: CSSProperties = {
  margin: 0,
  paddingLeft: 22,
  display: "grid",
  gap: 12,
  color: "#173f35",
  lineHeight: 1.65,
  fontWeight: 650,
};

const stepStyle: CSSProperties = {
  padding: "14px 16px",
  borderRadius: 8,
  background: "#ffffff",
  border: "1px solid rgba(23,63,53,0.12)",
};

const finalCtaStyle: CSSProperties = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "58px 24px 92px",
};

const finalTitleStyle: CSSProperties = {
  maxWidth: 900,
  margin: "0 0 16px",
  color: "#173f35",
  fontSize: "clamp(2.4rem, 6vw, 5rem)",
  lineHeight: 1,
  letterSpacing: 0,
};

const finalCopyStyle: CSSProperties = {
  maxWidth: 760,
  margin: "0 0 26px",
  color: "#51655e",
  fontSize: 18,
  lineHeight: 1.65,
};

