import type { CSSProperties } from "react";
import type { Metadata } from "next";
import TrackedLink from "@/components/tracked-link";
import MetricsPageView from "@/components/metrics-page-view";
import {
  buildKdpReportDeliveryUrl,
  isValidKdpReportDeliveryAccess,
  KDP_REPORT_DELIVERY,
  normalizeSearchParam,
} from "@/lib/kdp-delivery";

type DeliveryPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const supportEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@battlelabs.live";

export const metadata = {
  title: "KDP Launch Report Delivery | Battlelabs",
  description: "Private delivery page for the Battlelabs KDP Launch Report Kit.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
} satisfies Metadata;

export default async function KdpLaunchReportDeliveryPage({ searchParams }: DeliveryPageProps) {
  const params = (await searchParams) ?? {};
  const access = normalizeSearchParam(params.access);
  const hasAccess = isValidKdpReportDeliveryAccess(access);
  const returnUrl = buildKdpReportDeliveryUrl();

  return (
    <main style={pageStyle}>
      <MetricsPageView page="/kdp-launch-report-delivery" />
      <section style={panelStyle}>
        <p style={eyebrowStyle}>Battlelabs Digital Delivery</p>
        {hasAccess ? (
          <>
            <h1 style={titleStyle}>Your KDP Launch Report Kit is ready.</h1>
            <p style={copyStyle}>
              Download the ZIP below, then save a local copy. The package includes the report,
              keyword clusters, checklist, listing copy starter, license terms, and source files.
            </p>

            <div style={downloadCardStyle}>
              <div>
                <p style={labelStyle}>Product</p>
                <h2 style={cardTitleStyle}>{KDP_REPORT_DELIVERY.productName}</h2>
                <p style={mutedStyle}>
                  SKU {KDP_REPORT_DELIVERY.sku} / ZIP size {KDP_REPORT_DELIVERY.expectedBytes} bytes
                </p>
              </div>
              <TrackedLink
                href={KDP_REPORT_DELIVERY.directDownloadUrl}
                style={downloadButtonStyle}
                page="/kdp-launch-report-delivery"
                event="download_click"
                meta={{ sku: KDP_REPORT_DELIVERY.sku }}
              >
                Download ZIP
              </TrackedLink>
            </div>

            <div style={noteGridStyle}>
              <div style={noteStyle}>
                <h3 style={noteTitleStyle}>If the download does not start</h3>
                <p style={noteCopyStyle}>
                  Open the Drive viewer and use the download icon there. Some browsers ask for
                  confirmation before downloading ZIP files from Drive.
                </p>
                <a href={KDP_REPORT_DELIVERY.viewerUrl} style={inlineLinkStyle}>
                  Open Drive viewer
                </a>
              </div>
              <div style={noteStyle}>
                <h3 style={noteTitleStyle}>Receipt backup</h3>
                <p style={noteCopyStyle}>
                  Keep your PayPal receipt. If this page is closed or blocked, email the receipt to{" "}
                  <a href={`mailto:${supportEmail}`} style={inlineLinkStyle}>
                    {supportEmail}
                  </a>{" "}
                  and the file can be re-sent.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 style={titleStyle}>Delivery link needs order access.</h1>
            <p style={copyStyle}>
              This page is for buyers returning from PayPal after checkout. If you already paid,
              return from the PayPal confirmation screen or email your PayPal receipt to{" "}
              <a href={`mailto:${supportEmail}`} style={inlineLinkStyle}>
                {supportEmail}
              </a>
              .
            </p>
            <div style={lockedCardStyle}>
              <p style={labelStyle}>PayPal return URL to configure</p>
              <code style={codeStyle}>{returnUrl}</code>
            </div>
            <a href="/kdp-niche-scorecard" style={secondaryButtonStyle}>
              Back to KDP Scorecard
            </a>
          </>
        )}
      </section>
    </main>
  );
}

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: "36px 20px",
  background: "radial-gradient(circle at top left, rgba(200,169,126,0.2), transparent 35%), #05080d",
  color: "#f8f2ea",
  fontFamily: "var(--font-geist-sans), sans-serif",
};

const panelStyle: CSSProperties = {
  width: "100%",
  maxWidth: 880,
  padding: "clamp(24px, 5vw, 46px)",
  borderRadius: 8,
  border: "1px solid rgba(200,169,126,0.2)",
  background: "linear-gradient(145deg, rgba(10,15,22,0.96), rgba(7,9,12,0.96))",
  boxShadow: "0 26px 90px rgba(0,0,0,0.35)",
};

const eyebrowStyle: CSSProperties = {
  margin: "0 0 18px",
  color: "#c8a97e",
  fontSize: 12,
  fontWeight: 850,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};

const titleStyle: CSSProperties = {
  margin: "0 0 18px",
  maxWidth: 760,
  fontSize: "clamp(2.25rem, 6vw, 4.8rem)",
  lineHeight: 0.98,
  letterSpacing: 0,
};

const copyStyle: CSSProperties = {
  maxWidth: 720,
  margin: "0 0 28px",
  color: "rgba(248,242,234,0.78)",
  fontSize: 18,
  lineHeight: 1.7,
};

const downloadCardStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: 18,
  alignItems: "center",
  padding: 22,
  borderRadius: 8,
  border: "1px solid rgba(200,169,126,0.22)",
  background: "rgba(255,255,255,0.04)",
};

const lockedCardStyle: CSSProperties = {
  display: "grid",
  gap: 10,
  marginBottom: 22,
  padding: 18,
  borderRadius: 8,
  border: "1px solid rgba(200,169,126,0.16)",
  background: "rgba(255,255,255,0.035)",
};

const labelStyle: CSSProperties = {
  margin: "0 0 8px",
  color: "#c8a97e",
  fontSize: 12,
  fontWeight: 850,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

const cardTitleStyle: CSSProperties = {
  margin: 0,
  color: "#fffaf3",
  fontSize: 26,
  lineHeight: 1.15,
};

const mutedStyle: CSSProperties = {
  margin: "10px 0 0",
  color: "rgba(248,242,234,0.62)",
  lineHeight: 1.6,
};

const downloadButtonStyle: CSSProperties = {
  display: "inline-flex",
  minHeight: 50,
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 20px",
  borderRadius: 8,
  background: "#ef493b",
  color: "#ffffff",
  fontWeight: 850,
  textDecoration: "none",
  whiteSpace: "nowrap",
};

const secondaryButtonStyle: CSSProperties = {
  display: "inline-flex",
  minHeight: 48,
  alignItems: "center",
  justifyContent: "center",
  padding: "13px 18px",
  borderRadius: 8,
  border: "1px solid rgba(200,169,126,0.35)",
  color: "#f8f2ea",
  fontWeight: 780,
  textDecoration: "none",
};

const noteGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 14,
  marginTop: 18,
};

const noteStyle: CSSProperties = {
  padding: 18,
  borderRadius: 8,
  border: "1px solid rgba(200,169,126,0.14)",
  background: "rgba(255,255,255,0.025)",
};

const noteTitleStyle: CSSProperties = {
  margin: "0 0 8px",
  color: "#fffaf3",
  fontSize: 18,
};

const noteCopyStyle: CSSProperties = {
  margin: "0 0 10px",
  color: "rgba(248,242,234,0.72)",
  lineHeight: 1.65,
};

const inlineLinkStyle: CSSProperties = {
  color: "#c8a97e",
  fontWeight: 800,
};

const codeStyle: CSSProperties = {
  display: "block",
  overflowWrap: "anywhere",
  color: "#fffaf3",
  lineHeight: 1.6,
  fontSize: 14,
};
