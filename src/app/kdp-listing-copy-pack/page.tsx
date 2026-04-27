import type { CSSProperties } from "react";
import type { Metadata } from "next";
import MetricsPageView from "@/components/metrics-page-view";
import TrackedLink from "@/components/tracked-link";
import { buildTrackedCheckoutUrl } from "@/lib/checkout";
import { kdpListingCopyPack } from "@/lib/kdp-listing-copy-pack";

const checkoutUrl = process.env.NEXT_PUBLIC_KDP_LISTING_COPY_PACK_CHECKOUT_URL?.trim() ?? "";
const trackedCheckoutUrl = buildTrackedCheckoutUrl(checkoutUrl, {
  source_page: "kdp-listing-copy-pack",
  offer_name: kdpListingCopyPack.sku,
  entry_tag: "agent-product-foundry",
});

export const metadata = {
  title: "KDP Listing Copy Pack (Free Checklist + $9 Workbook) | Battlelabs",
  description:
    "A free listing angle checklist plus a $9 KDP listing copy workbook to turn a rough book idea into clearer titles, bullets, description copy, keyword clusters, and compliance reminders.",
  alternates: {
    canonical: "/kdp-listing-copy-pack",
  },
} satisfies Metadata;

export default function KdpListingCopyPackPage() {
  return (
    <main style={pageStyle}>
      <MetricsPageView page="/kdp-listing-copy-pack" />

      <section style={heroStyle}>
        <div style={heroCopyStyle}>
          <p style={eyebrowStyle}>Battlelabs Agent Product Foundry / {kdpListingCopyPack.sku}</p>
          <h1 style={titleStyle}>{kdpListingCopyPack.angle}</h1>
          <p style={leadStyle}>{kdpListingCopyPack.promise}</p>
          <p style={disclaimerStyle}>{kdpListingCopyPack.disclaimer}</p>

          <div style={ctaRowStyle}>
            <TrackedLink
              href={kdpListingCopyPack.freeChecklistPath}
              style={primaryLinkStyle}
              event="free_sample_click"
              page="/kdp-listing-copy-pack"
            >
              Open free checklist
            </TrackedLink>
            {trackedCheckoutUrl ? (
              <TrackedLink
                href={trackedCheckoutUrl}
                style={secondaryLinkStyle}
                event="checkout_click"
                page="/kdp-listing-copy-pack"
              >
                Buy workbook ${kdpListingCopyPack.introPrice}
              </TrackedLink>
            ) : (
              <TrackedLink
                href={kdpListingCopyPack.previewPath}
                style={secondaryLinkStyle}
                event="download_click"
                page="/kdp-listing-copy-pack"
                meta={{ asset: "paid-workbook-template-preview" }}
              >
                Preview workbook template
              </TrackedLink>
            )}
          </div>

          <p style={microcopyStyle}>
            Regular target price ${kdpListingCopyPack.regularPrice}. Checkout activates when{" "}
            <code style={inlineCodeStyle}>{kdpListingCopyPack.checkoutEnvVar}</code> is set.
          </p>
        </div>

        <aside style={heroAsideStyle} aria-label="Quick checklist preview">
          <p style={asideLabelStyle}>Quick angle check</p>
          <ol style={asideListStyle}>
            <li>Who is the buyer or recipient?</li>
            <li>What is the use case or occasion?</li>
            <li>What outcome does the buyer want?</li>
            <li>What format is it (journal, workbook, planner, etc.)?</li>
            <li>What makes it different (without copying listings)?</li>
            <li>Is it compliant and original?</li>
          </ol>
          <TrackedLink
            href={kdpListingCopyPack.freeChecklistPath}
            style={asideLinkStyle}
            event="free_sample_click"
            page="/kdp-listing-copy-pack"
            meta={{ asset: "free-checklist" }}
          >
            Use the full checklist →
          </TrackedLink>
        </aside>
      </section>

      <section style={bandStyle}>
        <div style={sectionHeaderStyle}>
          <p style={eyebrowStyle}>What you get</p>
          <h2 style={sectionTitleStyle}>Cleaner listing copy before you publish</h2>
          <p style={sectionCopyStyle}>
            This is a template pack and workbook for clarity. It is not marketplace policy advice, and it does
            not promise rankings or sales.
          </p>
        </div>
        <div style={deliverableGridStyle}>
          {kdpListingCopyPack.deliverables.map((deliverable) => (
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
          <h2 style={sectionTitleStyle}>Built for marketplace-safe iteration</h2>
          <p style={sectionCopyStyle}>
            Use the worksheets to create original copy. Do not paste competitor listings. Check trademarks and
            follow platform rules before publishing.
          </p>
        </div>
        <div style={complianceListStyle}>
          {kdpListingCopyPack.compliance.map((item) => (
            <div key={item} style={complianceItemStyle}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section style={finalCtaStyle}>
        <h2 style={finalTitleStyle}>Already scoring niches?</h2>
        <p style={finalCopyStyle}>
          If you’re using the niche scorecard, the next bottleneck is usually explaining the idea clearly.
        </p>
        <div style={ctaRowStyle}>
          <TrackedLink
            href="/kdp-niche-scorecard"
            style={secondaryLinkStyle}
            event="download_click"
            page="/kdp-listing-copy-pack"
            meta={{ target: "kdp-niche-scorecard" }}
          >
            Open the KDP niche scorecard
          </TrackedLink>
          <TrackedLink
            href={kdpListingCopyPack.freeChecklistPath}
            style={primaryLinkStyle}
            event="free_sample_click"
            page="/kdp-listing-copy-pack"
          >
            Start with the free checklist
          </TrackedLink>
        </div>
      </section>
    </main>
  );
}

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, rgba(246,242,232,0.86) 0%, #ffffff 55%)",
  color: "#243d37",
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
  color: "#a4563b",
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
  color: "#36584c",
  fontSize: 20,
  lineHeight: 1.6,
  maxWidth: 680,
};

const disclaimerStyle: CSSProperties = {
  margin: "0 0 28px",
  color: "#51655e",
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
  background: "#243d37",
  color: "#f8f1e7",
  fontWeight: 820,
};

const secondaryLinkStyle: CSSProperties = {
  display: "inline-flex",
  minHeight: 48,
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 17px",
  borderRadius: 8,
  border: "1px solid #a4563b",
  color: "#243d37",
  fontWeight: 820,
  background: "rgba(255,255,255,0.32)",
};

const microcopyStyle: CSSProperties = {
  marginTop: 16,
  maxWidth: 640,
  color: "#667169",
  fontSize: 14,
  lineHeight: 1.6,
};

const inlineCodeStyle: CSSProperties = {
  padding: "2px 6px",
  borderRadius: 6,
  border: "1px solid rgba(36,61,55,0.18)",
  background: "rgba(255,255,255,0.62)",
  fontSize: 13,
};

const heroAsideStyle: CSSProperties = {
  borderRadius: 10,
  border: "1px solid rgba(36,61,55,0.14)",
  background: "#ffffff",
  padding: 22,
  boxShadow: "0 24px 70px rgba(36,61,55,0.12)",
};

const asideLabelStyle: CSSProperties = {
  margin: "0 0 12px",
  color: "#66746d",
  fontSize: 12,
  fontWeight: 820,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const asideListStyle: CSSProperties = {
  margin: 0,
  paddingLeft: 18,
  color: "#36584c",
  lineHeight: 1.7,
  fontSize: 14,
};

const asideLinkStyle: CSSProperties = {
  display: "inline-flex",
  marginTop: 14,
  color: "#243d37",
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
  color: "#243d37",
  fontSize: "clamp(2rem, 4vw, 3.2rem)",
  lineHeight: 1.04,
  letterSpacing: 0,
};

const sectionCopyStyle: CSSProperties = {
  margin: 0,
  color: "#526158",
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
  border: "1px solid rgba(36,61,55,0.12)",
  background: "#f8f1e7",
};

const tileMarkerStyle: CSSProperties = {
  display: "block",
  marginBottom: 16,
  color: "#a4563b",
  fontSize: 12,
  fontWeight: 800,
  textTransform: "uppercase",
};

const tileTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: 18,
  lineHeight: 1.35,
  color: "#243d37",
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
  background: "#243d37",
  color: "#f8f1e7",
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
  color: "#243d37",
  letterSpacing: 0,
};

const finalCopyStyle: CSSProperties = {
  maxWidth: 720,
  margin: "0 0 22px",
  color: "#526158",
  fontSize: 18,
  lineHeight: 1.65,
};

