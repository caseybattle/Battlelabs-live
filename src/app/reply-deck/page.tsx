"use client";

import { startTransition, useState, type CSSProperties, type FormEvent } from "react";
import { buildTrackedCheckoutUrl } from "@/lib/checkout";

type SubmissionState = "idle" | "submitting" | "success" | "error";
const replyDeckCheckoutUrl = process.env.NEXT_PUBLIC_REPLY_DECK_CHECKOUT_URL?.trim() ?? "";
const trackedReplyDeckCheckoutUrl = buildTrackedCheckoutUrl(replyDeckCheckoutUrl, {
  source_page: "reply-deck",
  offer_name: "reply-deck",
  entry_tag: "reply-deck-page",
});

export default function ReplyDeckPage() {
  const [state, setState] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const business = String(formData.get("business") ?? "").trim();
    const problem = String(formData.get("problem") ?? "").trim();

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          service: "custom",
          pageType: "reply-deck",
          details: [
            "Reply Deck waitlist",
            business ? `Business: ${business}` : "",
            problem ? `Current follow-up gap: ${problem}` : "",
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
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(200,169,126,0.18), transparent 40%), #0a0a0a",
        color: "#f5f0ea",
        padding: "64px 24px",
        fontFamily: "var(--font-geist-sans), sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 28,
          alignItems: "start",
        }}
      >
        <section
          style={{
            padding: 32,
            borderRadius: 28,
            border: "1px solid rgba(200,169,126,0.16)",
            background: "rgba(15,15,15,0.84)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.28)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              padding: "8px 14px",
              borderRadius: 999,
              border: "1px solid rgba(200,169,126,0.18)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontSize: 12,
              color: "#c8a97e",
              marginBottom: 18,
            }}
          >
            Microproduct Experiment 01
          </div>
          <h1
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
              lineHeight: 1.05,
              marginBottom: 16,
              fontWeight: 700,
            }}
          >
            Reply Deck
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: "rgba(245,240,234,0.78)",
              marginBottom: 24,
              maxWidth: 620,
            }}
          >
            A lightweight follow-up starter system for businesses that already
            get inquiries but do not have a clean way to route, qualify, and
            reply to them consistently.
          </p>
          <div
            style={{
              display: "grid",
              gap: 12,
              marginBottom: 24,
            }}
          >
            {[
              "Inquiry flow audit checklist",
              "5-message async follow-up sequence",
              "Form-field template for better lead quality",
              "Qualification rubric and pipeline starter",
            ].map((item) => (
              <div
                key={item}
                style={{
                  padding: "14px 16px",
                  borderRadius: 16,
                  border: "1px solid rgba(200,169,126,0.1)",
                  background: "rgba(255,255,255,0.03)",
                  color: "rgba(245,240,234,0.88)",
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              color: "rgba(245,240,234,0.64)",
              fontSize: 14,
            }}
          >
            <span>Target price: $19-$39</span>
            <span>Built for async buyers</span>
            <span>Separate micro-brand test</span>
          </div>
          {trackedReplyDeckCheckoutUrl ? (
            <div
              style={{
                marginTop: 20,
                padding: "18px 20px",
                borderRadius: 18,
                border: "1px solid rgba(200,169,126,0.12)",
                background: "rgba(200,169,126,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#c8a97e",
                  marginBottom: 8,
                }}
              >
                Checkout ready
              </div>
              <strong
                style={{
                  display: "block",
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                Buy the first release instead of joining the waitlist
              </strong>
              <p
                style={{
                  color: "rgba(245,240,234,0.7)",
                  lineHeight: 1.7,
                  marginBottom: 12,
                }}
              >
                The payment link is live, so buyers can go straight from interest to checkout.
              </p>
              <a href={trackedReplyDeckCheckoutUrl} style={checkoutLinkStyle}>
                Buy Reply Deck
              </a>
            </div>
          ) : null}
        </section>

        <section
          style={{
            padding: 32,
            borderRadius: 28,
            border: "1px solid rgba(200,169,126,0.16)",
            background: "rgba(9,9,9,0.9)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.28)",
          }}
        >
          <h2
            style={{
              fontSize: 28,
              marginBottom: 10,
            }}
          >
            Join the waitlist
          </h2>
          <p
            style={{
              color: "rgba(245,240,234,0.7)",
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            This is the first controlled microproduct test under the $100K
            plan. If enough buyers signal demand, it graduates from waitlist to
            checkout.
          </p>
          {trackedReplyDeckCheckoutUrl ? (
            <p
              style={{
                color: "rgba(200,169,126,0.92)",
                lineHeight: 1.7,
                marginBottom: 20,
              }}
            >
              Checkout is live on this page now, so the form stays useful for lower-intent interest and questions.
            </p>
          ) : null}

          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: 14 }}
          >
            <input
              name="name"
              required
              placeholder="Your name"
              style={inputStyle}
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email address"
              style={inputStyle}
            />
            <input
              name="business"
              placeholder="Business or brand"
              style={inputStyle}
            />
            <textarea
              name="problem"
              placeholder="What is breaking in your follow-up right now?"
              rows={5}
              style={inputStyle}
            />
            <button
              type="submit"
              disabled={state === "submitting"}
              style={{
                border: 0,
                borderRadius: 16,
                padding: "16px 18px",
                fontSize: 16,
                fontWeight: 700,
                cursor: state === "submitting" ? "wait" : "pointer",
                background:
                  "linear-gradient(135deg, rgba(200,169,126,1), rgba(168,137,96,1))",
                color: "#0a0a0a",
              }}
            >
              {state === "submitting" ? "Sending..." : "Join the Waitlist"}
            </button>
          </form>

          {state === "success" ? (
            <p
              style={{
                marginTop: 16,
                color: "#c8a97e",
                lineHeight: 1.7,
              }}
            >
              You are on the list. Casey will use this signal to decide whether
              Reply Deck moves from experiment to paid launch.
            </p>
          ) : null}

          {state === "error" ? (
            <p
              style={{
                marginTop: 16,
                color: "#f3b0a1",
                lineHeight: 1.7,
              }}
            >
              {errorMessage}
            </p>
          ) : null}
        </section>
      </div>
    </main>
  );
}

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

const checkoutLinkStyle: CSSProperties = {
  display: "inline-flex",
  padding: "12px 16px",
  borderRadius: 14,
  background: "#c8a97e",
  color: "#090909",
  fontWeight: 700,
  textDecoration: "none",
};
