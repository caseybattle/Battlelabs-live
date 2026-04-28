import type { Metadata } from "next";
import PayPalHostedButton from "@/components/paypal-hosted-button";
import MetricsPageView from "@/components/metrics-page-view";
import TrackedLink from "@/components/tracked-link";
import { buildTrackedCheckoutUrl } from "@/lib/checkout";
import { KDP_SCORECARD_OFFER } from "@/lib/kdp-scorecard";
import KdpScorecardWidget from "./scorecard-widget";
import styles from "./page.module.css";

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

const modules = [
  {
    number: "01",
    title: "Niche diagnosis",
    copy: "A plain-English call on why the idea is strong, weak, or testable, including the specific constraint holding it back.",
    tags: ["Score notes", "Risk flags", "Go/no-go call"],
  },
  {
    number: "02",
    title: "Positioning angles",
    copy: "Title, subtitle, and buyer-promise directions that make the book easier to explain without copying crowded listings.",
    tags: ["Title paths", "Buyer promise", "Gift use case"],
  },
  {
    number: "03",
    title: "Keyword clusters",
    copy: "Search terms grouped by buyer intent, gift occasion, recipient, and format so the listing has a sharper starting point.",
    tags: ["Intent groups", "Recipient terms", "Format terms"],
  },
  {
    number: "04",
    title: "Launch checklist",
    copy: "A focused execution path for sample pages, cover direction, listing description, compliance checks, and first organic placement.",
    tags: ["Listing steps", "Compliance pass", "Traffic test"],
  },
] as const;

export const metadata = {
  title: "KDP Niche Scorecard + $19 Launch Report | Battlelabs",
  description:
    "Score a KDP niche for demand, competition, giftability, and listing angle. Get a $19 KDP launch report with title paths, keyword clusters, risk flags, and a launch checklist.",
  alternates: {
    canonical: "/kdp-niche-scorecard",
  },
} satisfies Metadata;

function CheckoutButton({ compact = false }: { compact?: boolean }) {
  if (trackedCheckoutUrl) {
    return (
      <TrackedLink
        href={trackedCheckoutUrl}
        className={compact ? styles.checkoutLinkSmall : styles.primaryAction}
        event="checkout_click"
        page="/kdp-niche-scorecard"
      >
        Get the $19 report
      </TrackedLink>
    );
  }

  if (hasPayPalHostedButton) {
    return (
      <div className={compact ? styles.paypalCompact : styles.paypalButtonWrap}>
        <PayPalHostedButton
          clientId={paypalClientId}
          hostedButtonId={paypalHostedButtonId}
          label="Buy the KDP Launch Report with PayPal"
          metricEvent="checkout_click"
          metricPage="/kdp-niche-scorecard"
        />
      </div>
    );
  }

  return (
    <TrackedLink
      href="/products/kdp-niche-scorecard/paid-report-template.md"
      className={compact ? styles.checkoutLinkSmall : styles.primaryAction}
      event="free_sample_click"
      page="/kdp-niche-scorecard"
      meta={{ asset: "paid-report-template-preview" }}
    >
      Preview report template
    </TrackedLink>
  );
}

export default function KdpNicheScorecardPage() {
  return (
    <main className={styles.page}>
      <MetricsPageView page="/kdp-niche-scorecard" />

      <section className={styles.hero}>
        <nav className={styles.nav} aria-label="KDP scorecard navigation">
          <a className={styles.brand} href="https://battlelabs.co">
            <span className={styles.brandMark}>BL</span>
            <span>Battlelabs.co</span>
          </a>
          <div className={styles.navLinks}>
            <a href="#scorecard">KDP Scorecard</a>
            <a href="#buy">$19 Launch Report</a>
          </div>
        </nav>

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Agent-built launch intelligence</p>
            <h1 className={styles.heroTitle}>
              <span>Stop guessing.</span>
              <em>Ship the cleaner KDP angle.</em>
            </h1>
            <p className={styles.lead}>
              Score a KDP niche for demand, competition, giftability, and listing angle before you
              build the wrong book. The $19 report turns the signal into title paths, keyword
              clusters, risk flags, and a launch checklist.
            </p>

            <div className={styles.heroActions} id="buy">
              <CheckoutButton />
              <TrackedLink
                href="#scorecard"
                className={styles.secondaryAction}
                event="free_sample_click"
                page="/kdp-niche-scorecard"
                meta={{ asset: "scorecard-anchor" }}
              >
                Run free scorecard
              </TrackedLink>
            </div>

            <div className={styles.stats} aria-label="Product proof points">
              <div>
                <strong>93</strong>
                <span>Example niche signal</span>
              </div>
              <div>
                <strong>4</strong>
                <span>Report sections</span>
              </div>
              <div>
                <strong>$19</strong>
                <span>Instant report price</span>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual} aria-label="KDP launch report preview">
            <div className={styles.reportStage}>
              <div className={`${styles.paper} ${styles.paperBack}`} />
              <div className={`${styles.paper} ${styles.paperMiddle}`} />
              <div className={styles.paperFront}>
                <div className={styles.paperTop}>
                  <span>Scorecard</span>
                  <span className={styles.paperBurst} aria-hidden="true" />
                </div>
                <h2 className={styles.paperTitle}>Strong enough to test</h2>
                <div className={styles.meters} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div className={styles.lines} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className={styles.priceSeal}>
                <strong>$19</strong>
                <span>Secure checkout</span>
                <div className={styles.paymentRail}>
                  <span>PayPal</span>
                  <span>Visa</span>
                  <span>MC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.inside}>
        <div className={styles.insideWrap}>
          <div>
            <p className={styles.eyebrow}>What the buyer gets</p>
            <h2 className={styles.insideTitle}>
              A decision file,
              <em> not a generic PDF.</em>
            </h2>
            <p className={styles.bodyCopy}>
              The paid report is framed to make the niche easier to judge, explain, and launch. It
              does not promise Amazon rankings; it gives the buyer a cleaner go or no-go file.
            </p>

            <div className={styles.noteCard}>
              <div className={styles.noteCardGrid}>
                <div className={styles.notePanel}>
                  <span className={styles.notePanelStrong}>Inside the file</span>
                  <h3 className={styles.notePanelTitle}>Decision first.</h3>
                  <p className={styles.notePanelCopy}>
                    Score notes, title paths, keyword clusters, and launch steps are packaged to
                    help the buyer move fast without inventing the next step from scratch.
                  </p>
                </div>
                <div className={styles.noteBars} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.modules}>
            {modules.map((module) => (
              <article key={module.number} className={styles.module}>
                <div className={styles.moduleNumber}>{module.number}</div>
                <div className={styles.moduleBody}>
                  <h3 className={styles.moduleTitle}>{module.title}</h3>
                  <p className={styles.moduleCopy}>{module.copy}</p>
                  <div className={styles.tags}>
                    {module.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.scorecardShell} id="scorecard">
        <div className={styles.scorecardSection}>
          <div>
            <p className={styles.eyebrow}>Free scorecard</p>
            <h2 className={styles.scorecardTitle}>Run the quick signal check before you buy.</h2>
            <p className={styles.scorecardCopy}>
              Use the sliders to score your idea across buyer intent, giftability, competition
              clarity, production simplicity, and evergreen demand. If the signal is weak, skip the
              report and choose a sharper niche.
            </p>
            <TrackedLink
              href="/products/kdp-niche-scorecard/free-sample.md"
              className={styles.sampleLink}
              event="free_sample_click"
              page="/kdp-niche-scorecard"
            >
              Open the free sample
            </TrackedLink>
          </div>
          <KdpScorecardWidget />
        </div>
      </section>

      <section className={styles.offer}>
        <div>
          <p className={styles.eyebrow}>The paid file</p>
          <h2 className={styles.offerTitle}>One idea in. One launch file out.</h2>
          <p className={styles.bodyCopy}>
            The $19 launch report is for creators who want a packaged next step: the score
            breakdown, title angles, keyword clusters, listing starter copy, risk flags, and a
            launch checklist in one downloadable kit.
          </p>
        </div>

        <div className={styles.offerPanel}>
          <ul className={styles.offerList}>
            <li>Niche score breakdown with weak-point notes</li>
            <li>Title and subtitle angles for the selected buyer</li>
            <li>Keyword clusters grouped by intent, recipient, and format</li>
            <li>Listing description starter copy and launch checklist</li>
            <li>License, refund, and AI-use disclosure notes</li>
          </ul>
          <CheckoutButton compact />
        </div>
      </section>

      <section className={styles.faqBand}>
        <div className={styles.faq}>
          <div>
            <p className={styles.eyebrow}>FAQ</p>
            <h2 className={styles.faqTitle}>Built for fast product validation, not magic outcomes.</h2>
          </div>
          <div className={styles.faqGrid}>
            <article className={styles.faqItem}>
              <h3>Does this predict KDP sales?</h3>
              <p>{KDP_SCORECARD_OFFER.disclaimer}</p>
            </article>
            <article className={styles.faqItem}>
              <h3>Is this custom publishing advice?</h3>
              <p>
                No. It is a self-serve planning report and template pack for making a faster
                publish, revise, or skip decision.
              </p>
            </article>
            <article className={styles.faqItem}>
              <h3>Can I publish the generated copy directly?</h3>
              <p>
                Review and edit before publishing. You are responsible for originality, platform
                rules, trademark checks, and any required AI-content disclosure.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
