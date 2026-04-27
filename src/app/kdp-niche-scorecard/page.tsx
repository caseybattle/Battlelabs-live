import type { CSSProperties } from "react";
import type { Metadata } from "next";
import PayPalHostedButton from "@/components/paypal-hosted-button";
import MetricsPageView from "@/components/metrics-page-view";
import TrackedLink from "@/components/tracked-link";
import { buildTrackedCheckoutUrl } from "@/lib/checkout";
import { KDP_SCORECARD_OFFER } from "@/lib/kdp-scorecard";
import KdpScorecardWidget from "./scorecard-widget";

const checkoutUrl = process.env.NEXT_PUBLIC_KDP_SCORECARD_CHECKOUT_URL?.trim() ?? "";
const paypalClientId =
  process.env.NEXT_PUBLIC_KDP_SCORECARD_PAYPAL_CLIENT_ID?.trim() ??
  "BAAPf7AyT_PxWaBjzceuUyxXp528DaJC_qUQvsp0NMGavqVmEJZqNwKdy-7AsjwwP2tcQMdPPqdrScFCKk";
const paypalHostedButtonId =
  process.env.NEXT_PUBLIC_KDP_SCORECARD_PAYPAL_HOSTED_BUTTON_ID?.trim() ?? "XBV9JNJS6SPJE";
const trackedCheckoutUrl = buildTrackedCheckoutUrl(checkoutUrl, {
  source_page: "kdp-niche-scorecard",
  offer_name: "kdp-launch-report",
  entry_tag: "agent-product-foundry",
});
const hasPayPalHostedButton = Boolean(paypalClientId && paypalHostedButtonId);

const scoreDimensions = [
  ["Buyer intent", "Is there a clear person searching for this book or gift?"],
  ["Giftability", "Does the idea fit birthdays, holidays, grief, family, or milestone buying?"],
  ["Competition clarity", "Can the niche be positioned without copying crowded listings?"],
  ["Production simplicity", "Can the first version be built quickly without custom illustration?"],
  ["Evergreen demand", "Can the idea sell beyond one short trend window?"],
] as const;

export const metadata = {
  title: "KDP Niche Scorecard Generator - Free KDP Idea Test | Battlelabs",
  description:
    "Score a KDP niche idea by buyer intent, giftability, competition clarity, production simplicity, and evergreen demand before building a full book or launch report.",
  alternates: {
    canonical: "/kdp-niche-scorecard",
  },
} satisfies Metadata;

export default function KdpNicheScorecardPage() {
  return (
    <main style={pageStyle}>
      <MetricsPageView page="/kdp-niche-scorecard" />
      <section style={heroStyle}>
        <div style={heroCopyStyle}>
          <p style={eyebrowStyle}>Battlelabs Agent Product Foundry / SKU 002</p>
          <h1 style={titleStyle}>KDP Niche Scorecard Generator</h1>
          <p style={leadStyle}>
            A free planning tool for deciding whether a book, journal, or printable niche is worth
            testing before you spend hours building the full asset.
          </p>
          <div style={ctaRowStyle}>
            <TrackedLink
              href="/products/kdp-niche-scorecard/free-sample.md"
              style={primaryLinkStyle}
              event="free_sample_click"
              page="/kdp-niche-scorecard"
            >
              Open Free Sample
            </TrackedLink>
            {trackedCheckoutUrl ? (
              <TrackedLink
                href={trackedCheckoutUrl}
                style={secondaryLinkStyle}
                event="checkout_click"
                page="/kdp-niche-scorecard"
              >
                {KDP_SCORECARD_OFFER.checkoutLabel}
              </TrackedLink>
            ) : hasPayPalHostedButton ? (
              <PayPalHostedButton
                clientId={paypalClientId}
                hostedButtonId={paypalHostedButtonId}
                label="Buy the KDP Launch Report with PayPal"
                metricEvent="checkout_click"
                metricPage="/kdp-niche-scorecard"
              />
            ) : (
              <TrackedLink
                href="/products/kdp-niche-scorecard/paid-report-template.md"
                style={secondaryLinkStyle}
                event="free_sample_click"
                page="/kdp-niche-scorecard"
                meta={{ asset: "paid-report-template-preview" }}
              >
                Preview Report Template
              </TrackedLink>
            )}
          </div>
          <p style={microcopyStyle}>
            Intro report price {KDP_SCORECARD_OFFER.price}. Regular target price{" "}
            {KDP_SCORECARD_OFFER.regularPrice}. Checkout activates when the payment link is added.
          </p>
          <p style={microcopyStyle}>
            Already have a niche idea?{" "}
            <TrackedLink
              href="/kdp-listing-copy-pack"
              event="download_click"
              page="/kdp-niche-scorecard"
              meta={{ target: "kdp-listing-copy-pack" }}
            >
              Use the free listing angle checklist
            </TrackedLink>
            .
          </p>
        </div>

        <KdpScorecardWidget />
      </section>

      <section style={bandStyle}>
        <div style={sectionHeaderStyle}>
          <p style={eyebrowStyle}>Free tool logic</p>
          <h2 style={sectionTitleStyle}>Five dimensions decide whether to build, test, or skip</h2>
          <p style={sectionCopyStyle}>
            The scorecard is intentionally simple. It turns a vague idea into a visible quality gate
            so agents can build only the niches with enough buyer intent and production leverage.
          </p>
          <p style={rubricLinkStyle}>
            Prefer the checklist version?{" "}
            <a href="/kdp-niche-scorecard/checklist" style={inlineLinkStyle}>
              Read the scoring checklist
            </a>
            .
          </p>
        </div>
        <div style={dimensionGridStyle}>
          {scoreDimensions.map(([title, copy], index) => (
            <article key={title} style={dimensionStyle}>
              <span style={dimensionNumberStyle}>{index + 1}</span>
              <h3 style={dimensionTitleStyle}>{title}</h3>
              <p style={dimensionCopyStyle}>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={splitStyle}>
        <div>
          <p style={eyebrowStyle}>Paid report</p>
          <h2 style={sectionTitleStyle}>Turn a score into a launch-ready decision file</h2>
          <p style={sectionCopyStyle}>
            The paid report is built for creators who want the next step packaged: keyword clusters,
            title angles, listing copy starters, cover direction, and a launch checklist.
          </p>
        </div>
        <div style={deliverableListStyle}>
          {[
            "Niche score breakdown with weak-point notes",
            "Title and subtitle angles for the selected buyer",
            "Keyword clusters and positioning prompts",
            "Listing description starter copy",
            "Cover/mockup direction and launch checklist",
          ].map((item) => (
            <div key={item} style={deliverableStyle}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section style={faqBandStyle}>
        <div style={sectionHeaderStyle}>
          <p style={eyebrowStyle}>FAQ</p>
          <h2 style={sectionTitleStyle}>Built for fast product validation, not magic outcomes</h2>
        </div>
        <div style={faqGridStyle}>
          <article style={faqItemStyle}>
            <h3 style={faqTitleStyle}>Does this predict KDP sales?</h3>
            <p style={faqCopyStyle}>{KDP_SCORECARD_OFFER.disclaimer}</p>
          </article>
          <article style={faqItemStyle}>
            <h3 style={faqTitleStyle}>Is the report custom software?</h3>
            <p style={faqCopyStyle}>
              No. It is a self-serve planning report and template pack for making a faster publish,
              revise, or skip decision.
            </p>
          </article>
          <article style={faqItemStyle}>
            <h3 style={faqTitleStyle}>Can I publish the generated copy directly?</h3>
            <p style={faqCopyStyle}>
              Review and edit before publishing. You are responsible for originality, platform rules,
              trademark checks, and any required AI-content disclosure.
            </p>
          </article>
        </div>
      </section>

      <section style={finalCtaStyle}>
        <h2 style={finalTitleStyle}>Score the niche first. Build only after the signal is strong.</h2>
        <p style={finalCopyStyle}>
          Battlelabs clones product formats only after measurable buyer signals appear: sample clicks,
          checkout clicks, direct requests, sales, or low-refund demand.
        </p>
        <div style={ctaRowStyle}>
          <a href="/products/kdp-niche-scorecard/free-sample.md" style={primaryLinkStyle}>
            Read Free Sample
          </a>
          {trackedCheckoutUrl ? (
            <a href={trackedCheckoutUrl} style={secondaryLinkStyle}>
              Buy Launch Report
            </a>
          ) : hasPayPalHostedButton ? (
            <PayPalHostedButton
              clientId={paypalClientId}
              hostedButtonId={paypalHostedButtonId}
              label="Buy the KDP Launch Report with PayPal"
            />
          ) : (
            <span style={disabledCtaStyle}>Add checkout URL to sell this report</span>
          )}
        </div>
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
  minHeight: "88vh",
  maxWidth: 1180,
  margin: "0 auto",
  padding: "72px 24px 48px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
  gap: 32,
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
  color: "#173f35",
  fontSize: "clamp(3rem, 8vw, 6.4rem)",
  lineHeight: 0.94,
  letterSpacing: 0,
  fontWeight: 850,
};

const leadStyle: CSSProperties = {
  maxWidth: 620,
  margin: "0 0 28px",
  color: "#3e5d55",
  fontSize: 21,
  lineHeight: 1.55,
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
  fontWeight: 820,
};

const secondaryLinkStyle: CSSProperties = {
  display: "inline-flex",
  minHeight: 48,
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 17px",
  borderRadius: 8,
  border: "1px solid #b4432d",
  color: "#173f35",
  fontWeight: 820,
  background: "#ffffff",
};

const disabledCtaStyle: CSSProperties = {
  display: "inline-flex",
  minHeight: 48,
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 17px",
  borderRadius: 8,
  border: "1px dashed rgba(23,63,53,0.45)",
  color: "#3e5d55",
  fontWeight: 760,
};

const microcopyStyle: CSSProperties = {
  marginTop: 16,
  maxWidth: 600,
  color: "#66746d",
  fontSize: 14,
  lineHeight: 1.6,
};

const bandStyle: CSSProperties = {
  padding: "70px 24px",
  background: "#ffffff",
};

const sectionHeaderStyle: CSSProperties = {
  maxWidth: 840,
  margin: "0 auto 30px",
  textAlign: "center",
};

const sectionTitleStyle: CSSProperties = {
  margin: "0 0 14px",
  color: "#173f35",
  fontSize: "clamp(2rem, 4vw, 3.35rem)",
  lineHeight: 1.04,
  letterSpacing: 0,
};

const sectionCopyStyle: CSSProperties = {
  margin: 0,
  color: "#51655e",
  fontSize: 17,
  lineHeight: 1.7,
};

const rubricLinkStyle: CSSProperties = {
  margin: "14px 0 0",
  color: "#51655e",
  fontSize: 15,
  lineHeight: 1.7,
};

const inlineLinkStyle: CSSProperties = {
  color: "#173f35",
  fontWeight: 800,
  textDecoration: "underline",
  textUnderlineOffset: 4,
};

const dimensionGridStyle: CSSProperties = {
  maxWidth: 1180,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 14,
};

const dimensionStyle: CSSProperties = {
  minHeight: 210,
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
  margin: "18px 0 10px",
  color: "#173f35",
  fontSize: 22,
  lineHeight: 1.15,
};

const dimensionCopyStyle: CSSProperties = {
  margin: 0,
  color: "#51655e",
  lineHeight: 1.55,
};

const splitStyle: CSSProperties = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "70px 24px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 310px), 1fr))",
  gap: 32,
  alignItems: "start",
};

const deliverableListStyle: CSSProperties = {
  display: "grid",
  gap: 10,
};

const deliverableStyle: CSSProperties = {
  padding: "17px 18px",
  borderRadius: 8,
  background: "#ffffff",
  border: "1px solid rgba(23,63,53,0.12)",
  color: "#173f35",
  fontWeight: 760,
  lineHeight: 1.45,
};

const faqBandStyle: CSSProperties = {
  padding: "70px 24px",
  background: "#173f35",
};

const faqGridStyle: CSSProperties = {
  maxWidth: 1180,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 14,
};

const faqItemStyle: CSSProperties = {
  padding: 22,
  borderRadius: 8,
  background: "#ffffff",
};

const faqTitleStyle: CSSProperties = {
  margin: "0 0 10px",
  color: "#173f35",
  fontSize: 22,
};

const faqCopyStyle: CSSProperties = {
  margin: 0,
  color: "#51655e",
  lineHeight: 1.6,
};

const finalCtaStyle: CSSProperties = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "62px 24px 86px",
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
  maxWidth: 720,
  margin: "0 0 26px",
  color: "#51655e",
  fontSize: 18,
  lineHeight: 1.65,
};
