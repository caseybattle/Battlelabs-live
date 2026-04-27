import type { CSSProperties } from "react";
import type { Metadata } from "next";
import MetricsPageView from "@/components/metrics-page-view";
import TrackedLink from "@/components/tracked-link";
import { buildTrackedCheckoutUrl } from "@/lib/checkout";
import { kdpCoverDirectionBrief } from "@/lib/kdp-cover-direction-brief";

const checkoutUrl = process.env.NEXT_PUBLIC_KDP_COVER_DIRECTION_BRIEF_CHECKOUT_URL?.trim() ?? "";
const trackedCheckoutUrl = buildTrackedCheckoutUrl(checkoutUrl, {
  source_page: "kdp-cover-direction-brief",
  offer_name: kdpCoverDirectionBrief.sku,
  entry_tag: "agent-product-foundry",
});

export const metadata = {
  title: "KDP Cover Direction Brief (Free Prompt + $9 Workbook) | Battlelabs",
  description:
    "A free cover direction prompt plus a $9 cover brief workbook to turn a rough KDP idea into clearer audience signals, typography direction, color constraints, imagery cues, and a thumbnail test checklist.",
  alternates: {
    canonical: "/kdp-cover-direction-brief",
  },
} satisfies Metadata;

export default function KdpCoverDirectionBriefPage() {
  return (
    <main style={pageStyle}>
      <MetricsPageView page="/kdp-cover-direction-brief" />

      <section style={heroStyle}>
        <div style={heroCopyStyle}>
          <p style={eyebrowStyle}>Battlelabs Agent Product Foundry / {kdpCoverDirectionBrief.sku}</p>
          <h1 style={titleStyle}>{kdpCoverDirectionBrief.angle}</h1>
          <p style={leadStyle}>{kdpCoverDirectionBrief.promise}</p>
          <p style={disclaimerStyle}>{kdpCoverDirectionBrief.disclaimer}</p>

          <div style={ctaRowStyle}>
            <TrackedLink
              href={kdpCoverDirectionBrief.freeChecklistPath}
              style={primaryLinkStyle}
              event="free_sample_click"
              page="/kdp-cover-direction-brief"
            >
              Open free prompt
            </TrackedLink>
            {trackedCheckoutUrl ? (
              <TrackedLink
                href={trackedCheckoutUrl}
                style={secondaryLinkStyle}
                event="checkout_click"
                page="/kdp-cover-direction-brief"
              >
                Buy workbook ${kdpCoverDirectionBrief.introPrice}
              </TrackedLink>
            ) : (
              <TrackedLink
                href={kdpCoverDirectionBrief.previewPath}
                style={secondaryLinkStyle}
                event="download_click"
                page="/kdp-cover-direction-brief"
                meta={{ asset: "paid-brief-template-preview" }}
              >
                Preview workbook template
              </TrackedLink>
            )}
          </div>

          <p style={microcopyStyle}>
            Regular target price ${kdpCoverDirectionBrief.regularPrice}. Checkout activates when{" "}
            <code style={inlineCodeStyle}>{kdpCoverDirectionBrief.checkoutEnvVar}</code> is set.
          </p>
        </div>

        <aside style={heroAsideStyle} aria-label="Quick cover direction check">
          <p style={asideLabelStyle}>Quick cover check</p>
          <ol style={asideListStyle}>
            <li>Would a buyer understand the category at thumbnail size?</li>
            <li>Is the title readable at small size (contrast + hierarchy)?</li>
            <li>Does the cover signal the recipient or use case?</li>
            <li>Are you using cues without copying competitor covers?</li>
            <li>Is it compliant and original (trademarks + AI disclosure)?</li>
          </ol>
          <TrackedLink
            href={kdpCoverDirectionBrief.freeChecklistPath}
            style={asideLinkStyle}
            event="free_sample_click"
            page="/kdp-cover-direction-brief"
            meta={{ asset: "free-cover-prompt" }}
          >
            Use the full prompt →
          </TrackedLink>
        </aside>
      </section>

      <section style={bandStyle}>
        <div style={sectionHeaderStyle}>
          <p style={eyebrowStyle}>What you get</p>
          <h2 style={sectionTitleStyle}>A cover brief you can hand to a designer</h2>
          <p style={sectionCopyStyle}>
            This is a planning aid for clarity and compliance. It does not promise rankings, approvals, or
            sales.
          </p>
        </div>
        <div style={deliverableGridStyle}>
          {kdpCoverDirectionBrief.deliverables.map((deliverable) => (
            <article key={deliverable} style={tileStyle}>
              <span style={tileMarkerStyle}>Included</span>
              <h3 style={tileTitleStyle}>{deliverable}</h3>
            </article>
          ))}
        </div>
      </section>

      <section style={splitStyle}>
        <div>
          <p style={eyebrowStyle}>Compliance and originality</p>
          <h2 style={sectionTitleStyle}>Category cues without imitation</h2>
          <p style={sectionCopyStyle}>
            Use the worksheets to produce original direction. Do not copy competitor covers. Check trademarks
            and platform rules before publishing.
          </p>
        </div>
        <div style={complianceListStyle}>
          {kdpCoverDirectionBrief.compliance.map((rule) => (
            <div key={rule} style={complianceItemStyle}>
              {rule}
            </div>
          ))}
        </div>
      </section>

      <section style={finalCtaStyle}>
        <h2 style={finalTitleStyle}>Already have the niche?</h2>
        <p style={finalCopyStyle}>
          If your niche is solid but your cover feels generic, the next step is usually a clearer cover brief.
          If you are still deciding the niche, start with the scorecard instead.
        </p>
        <div style={ctaRowStyle}>
          <TrackedLink
            href="/kdp-niche-scorecard"
            style={secondaryLinkStyle}
            event="download_click"
            page="/kdp-cover-direction-brief"
            meta={{ link: "kdp-niche-scorecard" }}
          >
            Use the niche scorecard
          </TrackedLink>
          <TrackedLink
            href="/kdp-listing-copy-pack"
            style={secondaryLinkStyle}
            event="download_click"
            page="/kdp-cover-direction-brief"
            meta={{ link: "kdp-listing-copy-pack" }}
          >
            Improve listing copy
          </TrackedLink>
          <TrackedLink
            href={kdpCoverDirectionBrief.freeChecklistPath}
            style={primaryLinkStyle}
            event="free_sample_click"
            page="/kdp-cover-direction-brief"
          >
            Start with the free prompt
          </TrackedLink>
        </div>
      </section>
    </main>
  );
}

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, rgba(237,245,255,0.82) 0%, #ffffff 55%)",
  color: "#1f2a35",
};

const heroStyle: CSSProperties = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "78px 24px 48px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
  gap: 32,
  alignItems: "start",
};

const heroCopyStyle: CSSProperties = {
  maxWidth: 720,
};

const eyebrowStyle: CSSProperties = {
  margin: "0 0 14px",
  color: "#2f5fa7",
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

const titleStyle: CSSProperties = {
  margin: "0 0 18px",
  fontSize: "clamp(2.8rem, 6vw, 5.8rem)",
  lineHeight: 0.95,
  fontWeight: 860,
  letterSpacing: 0,
};

const leadStyle: CSSProperties = {
  margin: "0 0 16px",
  color: "#31475f",
  fontSize: 20,
  lineHeight: 1.6,
  maxWidth: 680,
};

const disclaimerStyle: CSSProperties = {
  margin: "0 0 28px",
  color: "#51606f",
  fontSize: 14,
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
  background: "#1f2a35",
  color: "#eef6ff",
  fontWeight: 820,
};

const secondaryLinkStyle: CSSProperties = {
  display: "inline-flex",
  minHeight: 48,
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 17px",
  borderRadius: 8,
  border: "1px solid rgba(47,95,167,0.62)",
  color: "#1f2a35",
  fontWeight: 820,
  background: "rgba(255,255,255,0.32)",
};

const microcopyStyle: CSSProperties = {
  marginTop: 16,
  maxWidth: 640,
  color: "#637282",
  fontSize: 14,
  lineHeight: 1.6,
};

const inlineCodeStyle: CSSProperties = {
  padding: "2px 6px",
  borderRadius: 6,
  border: "1px solid rgba(31,42,53,0.18)",
  background: "rgba(255,255,255,0.62)",
  fontSize: 13,
};

const heroAsideStyle: CSSProperties = {
  borderRadius: 10,
  border: "1px solid rgba(31,42,53,0.12)",
  background: "#ffffff",
  padding: 22,
  boxShadow: "0 24px 70px rgba(31,42,53,0.1)",
};

const asideLabelStyle: CSSProperties = {
  margin: "0 0 12px",
  color: "#657587",
  fontSize: 12,
  fontWeight: 820,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const asideListStyle: CSSProperties = {
  margin: 0,
  paddingLeft: 18,
  color: "#31475f",
  lineHeight: 1.7,
  fontSize: 14,
};

const asideLinkStyle: CSSProperties = {
  display: "inline-flex",
  marginTop: 14,
  color: "#1f2a35",
  fontWeight: 820,
};

const bandStyle: CSSProperties = {
  padding: "72px 24px",
  background: "#ffffff",
};

const sectionHeaderStyle: CSSProperties = {
  maxWidth: 860,
  margin: "0 auto 28px",
  textAlign: "center",
};

const sectionTitleStyle: CSSProperties = {
  margin: "0 0 14px",
  color: "#1f2a35",
  fontSize: "clamp(2rem, 4vw, 3.2rem)",
  lineHeight: 1.04,
  letterSpacing: 0,
};

const sectionCopyStyle: CSSProperties = {
  margin: 0,
  color: "#556474",
  fontSize: 17,
  lineHeight: 1.7,
};

const deliverableGridStyle: CSSProperties = {
  maxWidth: 1180,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 14,
};

const tileStyle: CSSProperties = {
  minHeight: 160,
  padding: 22,
  borderRadius: 8,
  border: "1px solid rgba(31,42,53,0.1)",
  background: "rgba(237,245,255,0.78)",
};

const tileMarkerStyle: CSSProperties = {
  display: "block",
  marginBottom: 16,
  color: "#2f5fa7",
  fontSize: 12,
  fontWeight: 800,
  textTransform: "uppercase",
};

const tileTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: 18,
  lineHeight: 1.35,
  color: "#1f2a35",
};

const splitStyle: CSSProperties = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "72px 24px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
  gap: 28,
  alignItems: "start",
};

const complianceListStyle: CSSProperties = {
  display: "grid",
  gap: 10,
};

const complianceItemStyle: CSSProperties = {
  padding: 18,
  borderRadius: 8,
  background: "#1f2a35",
  color: "#eef6ff",
  lineHeight: 1.6,
};

const finalCtaStyle: CSSProperties = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "40px 24px 92px",
};

const finalTitleStyle: CSSProperties = {
  margin: "0 0 14px",
  fontSize: "clamp(2.2rem, 5vw, 4.2rem)",
  lineHeight: 1,
  color: "#1f2a35",
  letterSpacing: 0,
};

const finalCopyStyle: CSSProperties = {
  maxWidth: 720,
  margin: "0 0 22px",
  color: "#556474",
  fontSize: 18,
  lineHeight: 1.65,
};

