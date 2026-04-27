"use client";

import { startTransition, useState, type CSSProperties, type FormEvent } from "react";
import { buildTrackedCheckoutUrl } from "@/lib/checkout";

type SubmissionState = "idle" | "submitting" | "success" | "error";

type PilotBuildClientProps = {
  source: string;
};

const pilotCheckoutUrl = process.env.NEXT_PUBLIC_PILOT_BUILD_CHECKOUT_URL?.trim() ?? "";
const trackedPilotCheckoutUrl = buildTrackedCheckoutUrl(pilotCheckoutUrl, {
  source_page: "pilot-build",
  offer_name: "battle-labs-pilot-build",
  entry_tag: "pilot-build-page",
});

function getSourceLabel(source: string): string {
  switch (source) {
    case "homepage-proof":
      return "You came from the homepage proof section.";
    case "selected-work-cta":
      return "You came from the Selected Work call-to-action.";
    case "selected-work-client-sites":
      return "You came from the client-sites proof card.";
    default:
      return "";
  }
}

export function PilotBuildClient({ source }: PilotBuildClientProps) {
  const [state, setState] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const sourceLabel = getSourceLabel(source);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const website = String(formData.get("website") ?? "").trim();
    const priority = String(formData.get("priority") ?? "").trim();
    const notes = String(formData.get("notes") ?? "").trim();

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          service: "business-automation",
          pageType: "pilot-build",
          details: [
            "Pilot build request",
            source !== "direct" ? `Source: ${source}` : "",
            website ? `Website: ${website}` : "",
            priority ? `Priority: ${priority}` : "",
            notes ? `Notes: ${notes}` : "",
          ]
            .filter(Boolean)
            .join(" | "),
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      startTransition(() => {
        setState("success");
        event.currentTarget.reset();
      });
    } catch {
      setState("error");
      setErrorMessage("Something broke on submit. Email Casey at casbattle19@gmail.com instead.");
    }
  }

  return (
    <main style={pageStyle}>
      <div style={gridStyle}>
        <section style={panelStyle}>
          <div style={eyebrowStyle}>Battle Labs Pilot Build</div>
          <h1 style={titleStyle}>Turn the teardown into a scoped async pilot build</h1>
          <p style={copyStyle}>
            This is the fastest path from diagnosis to implementation. The pilot build is for businesses
            that already know where the front-end leak is and want a tighter system without a bloated project.
          </p>

          <div style={stackStyle}>
            <div style={cardStyle}>
              <span style={labelStyle}>Best fit</span>
              <strong style={strongStyle}>Lead capture + follow-up cleanup</strong>
              <p style={smallCopyStyle}>
                Landing page, inquiry routing, and follow-up logic tightened into one cleaner async flow.
              </p>
            </div>
            <div style={cardStyle}>
              <span style={labelStyle}>Typical scope</span>
              <strong style={strongStyle}>One bottleneck, one focused build</strong>
              <p style={smallCopyStyle}>
                The pilot is intentionally narrow so it can ship fast and prove value before expanding scope.
              </p>
            </div>
            <div style={cardStyle}>
              <span style={labelStyle}>Price range</span>
              <strong style={strongStyle}>$250-$500 for the right first-fit project</strong>
              <p style={smallCopyStyle}>
                Higher-tier work stays separate. The pilot is the low-friction first step into a Battle Labs system build.
              </p>
            </div>
          </div>

          {trackedPilotCheckoutUrl ? (
            <div style={checkoutCardStyle}>
              <span style={labelStyle}>Checkout ready</span>
              <strong style={strongStyle}>Skip the back-and-forth and reserve the pilot now</strong>
              <p style={smallCopyStyle}>
                If the scope is already obvious, use the live payment link and move straight into async kickoff.
              </p>
              <a href={trackedPilotCheckoutUrl} style={checkoutLinkStyle}>
                Reserve the Pilot Build
              </a>
            </div>
          ) : null}

          <div style={deliverablesStyle}>
            <h2 style={subheadStyle}>What a pilot can include</h2>
            <div style={bulletGridStyle}>
              {[
                "Landing page or hero rewrite",
                "Cleaner inquiry form and routing",
                "Follow-up email sequence",
                "Simple automation connection",
                "Async handoff notes or Loom",
              ].map((item) => (
                <div key={item} style={bulletCardStyle}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={panelStyle}>
          <h2 style={subheadStyle}>Request a pilot build</h2>
          <p style={copyStyle}>
            If the teardown already made the problem obvious, use this form instead of starting over. The goal is
            to scope the smallest build that fixes the highest-leverage bottleneck.
          </p>
          {sourceLabel ? <p style={checkoutNoteStyle}>{sourceLabel}</p> : null}
          {trackedPilotCheckoutUrl ? (
            <p style={checkoutNoteStyle}>
              Want to move faster? The live checkout link on this page goes straight to payment and async kickoff.
            </p>
          ) : null}

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14, marginTop: 20 }}>
            <input name="name" required placeholder="Your name" style={inputStyle} />
            <input name="email" type="email" required placeholder="Email address" style={inputStyle} />
            <input name="website" type="url" placeholder="Website or landing page URL" style={inputStyle} />
            <select name="priority" required style={inputStyle}>
              <option value="">What is the main bottleneck?</option>
              <option value="lead-capture">Lead capture</option>
              <option value="follow-up">Follow-up</option>
              <option value="inquiry-routing">Inquiry routing</option>
              <option value="website-clarity">Website clarity</option>
              <option value="checkout-flow">Checkout or handoff flow</option>
            </select>
            <textarea
              name="notes"
              rows={5}
              placeholder="What do you want fixed first, and what should happen after the build is live?"
              style={inputStyle}
            />
            <button type="submit" disabled={state === "submitting"} style={buttonStyle}>
              {state === "submitting" ? "Sending..." : "Request Pilot Build"}
            </button>
          </form>

          {state === "success" ? (
            <p style={successStyle}>
              Pilot request received. Casey can now move straight into scoping instead of restarting the conversation.
            </p>
          ) : null}

          {state === "error" ? <p style={errorStyle}>{errorMessage}</p> : null}
        </section>
      </div>

      <section style={{ ...panelStyle, maxWidth: 1120, margin: "28px auto 0" }}>
        <div style={eyebrowStyle}>Pilot Build FAQ</div>
        <div style={faqGridStyle}>
          {[
            {
              question: "How much does a pilot cost?",
              answer:
                "Most first-fit pilot builds start in the $250-$500 range depending on how much of the front-end flow needs to be tightened.",
            },
            {
              question: "How long does it take?",
              answer:
                "Typical turnaround is 72 hours to 5 days once the scope is narrow and the required assets or access are ready.",
            },
            {
              question: "Do we need a call?",
              answer:
                "No. Battle Labs is designed to run async through forms, email, Loom, scoped proposals, and payment links.",
            },
            {
              question: "What is not included?",
              answer:
                "A pilot is not a full rebuild, rebrand, or custom app project. It is one focused fix first.",
            },
          ].map((item) => (
            <article key={item.question} style={faqCardStyle}>
              <h3 style={faqQuestionStyle}>{item.question}</h3>
              <p style={faqAnswerStyle}>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  background: "radial-gradient(circle at top, rgba(200,169,126,0.2), transparent 40%), #090909",
  color: "#f5f0ea",
  padding: "64px 24px",
  fontFamily: "var(--font-geist-sans), sans-serif",
};

const gridStyle: CSSProperties = {
  maxWidth: 1120,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 28,
  alignItems: "start",
};

const panelStyle: CSSProperties = {
  padding: 32,
  borderRadius: 28,
  border: "1px solid rgba(200,169,126,0.16)",
  background: "rgba(12,12,12,0.88)",
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
  fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
  lineHeight: 1.05,
  marginBottom: 18,
  fontWeight: 700,
};

const subheadStyle: CSSProperties = {
  fontSize: 28,
  marginBottom: 10,
};

const copyStyle: CSSProperties = {
  color: "rgba(245,240,234,0.76)",
  lineHeight: 1.7,
  fontSize: 17,
};

const stackStyle: CSSProperties = {
  display: "grid",
  gap: 12,
  marginTop: 24,
};

const cardStyle: CSSProperties = {
  padding: "16px 18px",
  borderRadius: 18,
  border: "1px solid rgba(200,169,126,0.1)",
  background: "rgba(255,255,255,0.03)",
};

const checkoutCardStyle: CSSProperties = {
  ...cardStyle,
  marginTop: 16,
  background: "rgba(200,169,126,0.08)",
};

const labelStyle: CSSProperties = {
  display: "block",
  marginBottom: 8,
  fontSize: 12,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#c8a97e",
};

const strongStyle: CSSProperties = {
  display: "block",
  fontSize: 18,
  marginBottom: 8,
};

const smallCopyStyle: CSSProperties = {
  color: "rgba(245,240,234,0.68)",
  lineHeight: 1.7,
  fontSize: 14,
};

const checkoutLinkStyle: CSSProperties = {
  display: "inline-flex",
  marginTop: 14,
  padding: "12px 16px",
  borderRadius: 14,
  background: "#c8a97e",
  color: "#090909",
  fontWeight: 700,
  textDecoration: "none",
};

const deliverablesStyle: CSSProperties = {
  marginTop: 28,
};

const bulletGridStyle: CSSProperties = {
  display: "grid",
  gap: 12,
  marginTop: 18,
};

const bulletCardStyle: CSSProperties = {
  padding: "14px 16px",
  borderRadius: 16,
  border: "1px solid rgba(200,169,126,0.1)",
  background: "rgba(255,255,255,0.03)",
  color: "rgba(245,240,234,0.9)",
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 16,
  border: "1px solid rgba(200,169,126,0.14)",
  background: "rgba(255,255,255,0.03)",
  color: "#f5f0ea",
  fontSize: 15,
  outline: "none",
};

const buttonStyle: CSSProperties = {
  border: 0,
  borderRadius: 16,
  padding: "16px 18px",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
  background: "linear-gradient(135deg, rgba(200,169,126,1), rgba(168,137,96,1))",
  color: "#0a0a0a",
};

const successStyle: CSSProperties = {
  marginTop: 16,
  color: "#c8a97e",
  lineHeight: 1.7,
};

const checkoutNoteStyle: CSSProperties = {
  marginTop: 12,
  color: "rgba(200,169,126,0.92)",
  lineHeight: 1.7,
};

const errorStyle: CSSProperties = {
  marginTop: 16,
  color: "#f3b0a1",
  lineHeight: 1.7,
};

const faqGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
  marginTop: 18,
};

const faqCardStyle: CSSProperties = {
  padding: "18px 18px",
  borderRadius: 18,
  border: "1px solid rgba(200,169,126,0.1)",
  background: "rgba(255,255,255,0.03)",
};

const faqQuestionStyle: CSSProperties = {
  fontSize: 18,
  marginBottom: 10,
};

const faqAnswerStyle: CSSProperties = {
  color: "rgba(245,240,234,0.7)",
  lineHeight: 1.7,
  fontSize: 14,
};
