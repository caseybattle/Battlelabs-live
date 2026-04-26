import type { CSSProperties } from "react";
import Image from "next/image";
import { buildTrackedCheckoutUrl } from "@/lib/checkout";
import { memoryJournalProduct } from "@/lib/memory-journal-product";

const checkoutUrl = process.env.NEXT_PUBLIC_MEMORY_JOURNAL_CHECKOUT_URL?.trim() ?? "";
const trackedCheckoutUrl = buildTrackedCheckoutUrl(checkoutUrl, {
  source_page: "memory-journal-gift-kit",
  offer_name: memoryJournalProduct.sku,
  entry_tag: "agent-product-foundry",
});

export const metadata = {
  title: "Memory Journal Gift Launch Kit | Battlelabs",
  description:
    "An agent-built printable memory journal launch kit with a free sample, full interior, KDP scorecard, listing copy, and launch checklist.",
};

export default function MemoryJournalGiftKitPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <div style={heroCopyStyle}>
          <p style={eyebrowStyle}>Battlelabs Agent Product Foundry / SKU 001</p>
          <h1 style={titleStyle}>{memoryJournalProduct.angle}</h1>
          <p style={leadStyle}>{memoryJournalProduct.promise}</p>
          <div style={ctaRowStyle}>
            <a href={memoryJournalProduct.freeSamplePath} style={primaryLinkStyle}>
              Download Free Sample
            </a>
            {trackedCheckoutUrl ? (
              <a href={trackedCheckoutUrl} style={secondaryLinkStyle}>
                Buy Intro Kit ${memoryJournalProduct.introPrice}
              </a>
            ) : (
              <a href={memoryJournalProduct.previewPath} style={secondaryLinkStyle}>
                View Product Preview
              </a>
            )}
          </div>
          <p style={microcopyStyle}>
            Regular target price ${memoryJournalProduct.regularPrice}. Bundle path{" "}
            {memoryJournalProduct.bundlePriceRange}. Checkout activates when the PayPal, Payhip, or Gumroad
            link is added.
          </p>
        </div>
        <div style={heroVisualStyle}>
          <Image
            src={memoryJournalProduct.heroMockupPath}
            alt="Memory Journal Gift Launch Kit promotional preview"
            width={440}
            height={550}
            priority
            style={mockupImageStyle}
          />
        </div>
      </section>

      <section style={bandStyle}>
        <div style={sectionHeaderStyle}>
          <p style={eyebrowStyle}>What agents built</p>
          <h2 style={sectionTitleStyle}>A paid digital product, not a service offer</h2>
          <p style={sectionCopyStyle}>
            This SKU is designed to prove autonomous asset creation: generate the kit, publish the page,
            measure demand, and clone the format only if buyers signal interest.
          </p>
        </div>
        <div style={deliverableGridStyle}>
          {memoryJournalProduct.deliverables.map((deliverable) => (
            <article key={deliverable} style={tileStyle}>
              <span style={tileMarkerStyle}>Included</span>
              <h3 style={tileTitleStyle}>{deliverable}</h3>
            </article>
          ))}
        </div>
      </section>

      <section style={splitStyle}>
        <div>
          <p style={eyebrowStyle}>Download assets</p>
          <h2 style={sectionTitleStyle}>Free sample, paid preview, and launch files</h2>
          <p style={sectionCopyStyle}>
            The full paid interior is generated and ready for delivery. Public links below expose the sample,
            preview, and operational files needed for validation.
          </p>
        </div>
        <div style={assetListStyle}>
          {[
            ["Free sample PDF", memoryJournalProduct.freeSamplePath],
            ["Product preview PDF", memoryJournalProduct.previewPath],
            ["KDP scorecard CSV", memoryJournalProduct.scorecardPath],
            ["Launch checklist CSV", memoryJournalProduct.checklistPath],
            ["Listing copy markdown", memoryJournalProduct.listingCopyPath],
          ].map(([label, href]) => (
            <a key={href} href={href} style={assetLinkStyle}>
              <span>{label}</span>
              <strong>Open</strong>
            </a>
          ))}
        </div>
      </section>

      <section style={bandStyle}>
        <div style={sectionHeaderStyle}>
          <p style={eyebrowStyle}>Compliance and usage</p>
          <h2 style={sectionTitleStyle}>Built for marketplace-safe iteration</h2>
        </div>
        <div style={complianceGridStyle}>
          {memoryJournalProduct.compliance.map((item) => (
            <div key={item} style={complianceItemStyle}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section style={splitStyle}>
        <div>
          <p style={eyebrowStyle}>Metrics</p>
          <h2 style={sectionTitleStyle}>The controller tracks what matters</h2>
          <p style={sectionCopyStyle}>
            The product should be cloned only when the funnel proves useful demand. No sales means improve or
            kill the SKU instead of building more inventory blindly.
          </p>
        </div>
        <div style={metricsGridStyle}>
          {memoryJournalProduct.metrics.map((metric) => (
            <span key={metric} style={metricPillStyle}>
              {metric}
            </span>
          ))}
        </div>
      </section>

      <section style={finalCtaStyle}>
        <h2 style={finalTitleStyle}>Launch this SKU, then let data decide the next one.</h2>
        <p style={finalCopyStyle}>
          If the free sample pulls opt-ins or the checkout gets clicks, clone the format into another family
          recipient angle. If it stalls, the controller switches to a spreadsheet template or web-tool SKU.
        </p>
        <div style={ctaRowStyle}>
          <a href={memoryJournalProduct.freeSamplePath} style={primaryLinkStyle}>
            Get the Sample
          </a>
          {trackedCheckoutUrl ? (
            <a href={trackedCheckoutUrl} style={secondaryLinkStyle}>
              Buy the Kit
            </a>
          ) : (
            <span style={disabledCtaStyle}>Add checkout URL to sell this kit</span>
          )}
        </div>
      </section>
    </main>
  );
}

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  color: "#1f2a29",
  background: "#f8f1e7",
  fontFamily: "var(--font-geist-sans), sans-serif",
};

const heroStyle: CSSProperties = {
  minHeight: "92vh",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
  gap: 36,
  alignItems: "center",
  maxWidth: 1180,
  margin: "0 auto",
  padding: "72px 24px 48px",
};

const heroCopyStyle: CSSProperties = {
  maxWidth: 680,
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
  margin: "0 0 20px",
  fontSize: "clamp(3rem, 8vw, 6.8rem)",
  lineHeight: 0.92,
  fontWeight: 850,
  color: "#243d37",
  letterSpacing: 0,
};

const leadStyle: CSSProperties = {
  maxWidth: 620,
  margin: "0 0 28px",
  color: "#36584c",
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
  background: "#243d37",
  color: "#f8f1e7",
  fontWeight: 800,
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
  fontWeight: 800,
  background: "rgba(255,255,255,0.32)",
};

const disabledCtaStyle: CSSProperties = {
  display: "inline-flex",
  minHeight: 48,
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 17px",
  borderRadius: 8,
  border: "1px dashed rgba(36,61,55,0.4)",
  color: "#36584c",
  fontWeight: 700,
};

const microcopyStyle: CSSProperties = {
  marginTop: 16,
  maxWidth: 600,
  color: "#667169",
  fontSize: 14,
  lineHeight: 1.6,
};

const heroVisualStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
};

const mockupImageStyle: CSSProperties = {
  width: "min(100%, 440px)",
  height: "auto",
  borderRadius: 8,
  boxShadow: "0 24px 70px rgba(36,61,55,0.22)",
};

const bandStyle: CSSProperties = {
  padding: "70px 24px",
  background: "#ffffff",
};

const sectionHeaderStyle: CSSProperties = {
  maxWidth: 820,
  margin: "0 auto 28px",
  textAlign: "center",
};

const sectionTitleStyle: CSSProperties = {
  margin: "0 0 14px",
  color: "#243d37",
  fontSize: "clamp(2rem, 4vw, 3.4rem)",
  lineHeight: 1.02,
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
  minHeight: 148,
  padding: 22,
  borderRadius: 8,
  border: "1px solid rgba(36,61,55,0.12)",
  background: "#f8f1e7",
};

const tileMarkerStyle: CSSProperties = {
  display: "block",
  marginBottom: 18,
  color: "#a4563b",
  fontSize: 12,
  fontWeight: 800,
  textTransform: "uppercase",
};

const tileTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: 22,
  lineHeight: 1.2,
  color: "#243d37",
};

const splitStyle: CSSProperties = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "70px 24px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
  gap: 36,
  alignItems: "start",
};

const assetListStyle: CSSProperties = {
  display: "grid",
  gap: 10,
};

const assetLinkStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 18,
  alignItems: "center",
  padding: "17px 18px",
  borderRadius: 8,
  border: "1px solid rgba(36,61,55,0.12)",
  background: "#ffffff",
  color: "#243d37",
};

const complianceGridStyle: CSSProperties = {
  maxWidth: 1060,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 12,
};

const complianceItemStyle: CSSProperties = {
  padding: 18,
  borderRadius: 8,
  background: "#243d37",
  color: "#f8f1e7",
  lineHeight: 1.55,
};

const metricsGridStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
};

const metricPillStyle: CSSProperties = {
  padding: "11px 13px",
  borderRadius: 999,
  background: "#ffffff",
  border: "1px solid rgba(36,61,55,0.12)",
  color: "#36584c",
  fontWeight: 750,
};

const finalCtaStyle: CSSProperties = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "58px 24px 84px",
};

const finalTitleStyle: CSSProperties = {
  maxWidth: 880,
  margin: "0 0 16px",
  fontSize: "clamp(2.4rem, 6vw, 5rem)",
  lineHeight: 0.98,
  color: "#243d37",
  letterSpacing: 0,
};

const finalCopyStyle: CSSProperties = {
  maxWidth: 720,
  margin: "0 0 26px",
  color: "#526158",
  fontSize: 18,
  lineHeight: 1.65,
};
