"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import PayPalCheckoutButtons from "@/components/paypal-checkout-buttons";
import { memoryJournalProduct } from "@/lib/memory-journal-product";

const paypalClientId =
  process.env.NEXT_PUBLIC_KDP_SCORECARD_PAYPAL_CLIENT_ID?.trim() ??
  "BAAPf7AyT_PxWaBjzceuUyxXp528DaJC_qUQvsp0NMGavqVmEJZqNwKdy-7AsjwwP2tcQMdPPqdrScFCKk";

export default function CheckoutClient() {
  const [captured, setCaptured] = useState(false);

  return (
    <main style={pageStyle}>
      <section style={panelStyle}>
        <p style={eyebrowStyle}>Battlelabs Agent Product Foundry / SKU 001</p>
        <h1 style={titleStyle}>Checkout: {memoryJournalProduct.name}</h1>
        <p style={copyStyle}>
          This is a small paid validation step. After payment, the download links below stay available.
          No earnings or ranking results are guaranteed.
        </p>

        <div style={priceRowStyle}>
          <div>
            <span style={labelStyle}>Intro price</span>
            <strong style={priceStyle}>${memoryJournalProduct.introPrice}</strong>
          </div>
          <div>
            <span style={labelStyle}>Regular target</span>
            <strong style={priceStyle}>${memoryJournalProduct.regularPrice}</strong>
          </div>
        </div>

        <div style={checkoutBoxStyle}>
          <span style={labelStyle}>Pay with PayPal</span>
          <PayPalCheckoutButtons
            clientId={paypalClientId}
            amountUsd={memoryJournalProduct.introPrice}
            itemName={memoryJournalProduct.name}
            onCaptured={() => {
              setCaptured(true);
            }}
          />
          <p style={finePrintStyle}>
            Digital download. Refunds are available within 7 days if the files cannot be accessed or the
            product is materially different from the description. No refunds for completed downloads used
            to create or publish derivative products.
          </p>
        </div>

        <div style={assetBoxStyle}>
          <span style={labelStyle}>{captured ? "Downloads unlocked" : "Downloads"}</span>
          <div style={assetGridStyle}>
            {[
              ["Full interior PDF", memoryJournalProduct.fullInteriorPath],
              ["KDP scorecard CSV", memoryJournalProduct.scorecardPath],
              ["Launch checklist CSV", memoryJournalProduct.checklistPath],
              ["Listing copy markdown", memoryJournalProduct.listingCopyPath],
              ["Product preview PDF", memoryJournalProduct.previewPath],
            ].map(([label, href]) => (
              <a key={href} href={href} style={assetLinkStyle}>
                <span>{label}</span>
                <strong>Download</strong>
              </a>
            ))}
          </div>
          <p style={finePrintStyle}>
            Marketplace compliance still applies: disclose AI-generated content when required, and do not
            use trademarks, copied listings, fake reviews, or income claims.
          </p>
        </div>

        <a href="/memory-journal-gift-kit" style={backLinkStyle}>
          Back to landing page
        </a>
      </section>
    </main>
  );
}

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  background: "radial-gradient(circle at top, rgba(200,169,126,0.18), transparent 45%), #090909",
  color: "#f5f0ea",
  padding: "72px 24px",
  fontFamily: "var(--font-geist-sans), sans-serif",
};

const panelStyle: CSSProperties = {
  maxWidth: 820,
  margin: "0 auto",
  padding: 32,
  borderRadius: 28,
  border: "1px solid rgba(200,169,126,0.16)",
  background: "rgba(12,12,12,0.9)",
  boxShadow: "0 24px 80px rgba(0,0,0,0.28)",
};

const eyebrowStyle: CSSProperties = {
  margin: "0 0 14px",
  color: "#c8a97e",
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
};

const titleStyle: CSSProperties = {
  margin: "0 0 16px",
  fontSize: "clamp(2.4rem, 6vw, 3.6rem)",
  lineHeight: 1.06,
  fontWeight: 760,
};

const copyStyle: CSSProperties = {
  margin: "0 0 22px",
  color: "rgba(245,240,234,0.76)",
  lineHeight: 1.7,
  fontSize: 16,
};

const labelStyle: CSSProperties = {
  display: "block",
  marginBottom: 8,
  fontSize: 12,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#c8a97e",
};

const priceRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 18,
  marginBottom: 22,
};

const priceStyle: CSSProperties = {
  display: "block",
  fontSize: 22,
  fontWeight: 760,
};

const checkoutBoxStyle: CSSProperties = {
  padding: 22,
  borderRadius: 20,
  border: "1px solid rgba(200,169,126,0.14)",
  background: "rgba(255,255,255,0.04)",
};

const assetBoxStyle: CSSProperties = {
  marginTop: 16,
  padding: 22,
  borderRadius: 20,
  border: "1px solid rgba(200,169,126,0.14)",
  background: "rgba(255,255,255,0.03)",
};

const assetGridStyle: CSSProperties = {
  display: "grid",
  gap: 10,
};

const assetLinkStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  padding: "14px 16px",
  borderRadius: 16,
  border: "1px solid rgba(200,169,126,0.14)",
  background: "rgba(0,0,0,0.2)",
  color: "#f5f0ea",
  textDecoration: "none",
  fontWeight: 650,
};

const finePrintStyle: CSSProperties = {
  marginTop: 14,
  color: "rgba(245,240,234,0.66)",
  lineHeight: 1.7,
  fontSize: 13,
};

const backLinkStyle: CSSProperties = {
  display: "inline-flex",
  marginTop: 22,
  padding: "12px 16px",
  borderRadius: 14,
  border: "1px solid rgba(200,169,126,0.24)",
  color: "#f5f0ea",
  textDecoration: "none",
  fontWeight: 700,
};

