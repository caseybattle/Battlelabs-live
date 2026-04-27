"use client";

import { startTransition, useState, type CSSProperties, type FormEvent } from "react";

type SubmissionState = "idle" | "submitting" | "success" | "error";

type AsyncTeardownClientProps = {
  source: string;
};

function getSourceLabel(source: string): string {
  switch (source) {
    case "homepage-proof":
      return "You came from the homepage proof section.";
    case "selected-work-cta":
      return "You came from the Selected Work call-to-action.";
    case "selected-work-reset-method":
      return "You came from the Reset Method proof card.";
    case "selected-work-automation":
      return "You came from the automation proof card.";
    default:
      return "";
  }
}

export function AsyncTeardownClient({ source }: AsyncTeardownClientProps) {
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
    const offer = String(formData.get("offer") ?? "").trim();
    const bottleneck = String(formData.get("bottleneck") ?? "").trim();

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          service: "lead-capture",
          pageType: "async-teardown",
          details: [
            "Async teardown request",
            source !== "direct" ? `Source: ${source}` : "",
            website ? `Website: ${website}` : "",
            offer ? `Offer: ${offer}` : "",
            bottleneck ? `Bottleneck: ${bottleneck}` : "",
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
          "radial-gradient(circle at top, rgba(200,169,126,0.22), transparent 40%), #090909",
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
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 28,
          alignItems: "start",
        }}
      >
        <section style={panelStyle}>
          <div style={eyebrowStyle}>Battle Labs Async Teardown</div>
          <h1
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4.6rem)",
              lineHeight: 1.04,
              marginBottom: 18,
              fontWeight: 700,
            }}
          >
            Get a focused teardown of your lead capture and follow-up flow
          </h1>
          <p style={bodyCopyStyle}>
            This is built for founders, creators, coaches, consultants, and
            small service businesses that know something is leaking between page
            visit, inquiry, and follow-up.
          </p>
          <div style={{ display: "grid", gap: 12, marginTop: 24 }}>
            {[
              "What is working right now",
              "Where the likely conversion leak is",
              "One change to make first",
              "What Battle Labs would build if the fit is right",
            ].map((item) => (
              <div key={item} style={bulletCardStyle}>
                {item}
              </div>
            ))}
          </div>
          <p
            style={{
              ...bodyCopyStyle,
              marginTop: 20,
              fontSize: 14,
            }}
          >
            No call required. This is an async-first entry point for the service
            engine, not a giant audit process.
          </p>
        </section>

        <section style={panelStyle}>
          <h2 style={{ fontSize: 28, marginBottom: 10 }}>Request the teardown</h2>
          <p style={bodyCopyStyle}>
            Send the page and the bottleneck. If the fit is right, the teardown
            turns into a scoped pilot build instead of a vague conversation.
          </p>
          {sourceLabel ? <p style={sourceNoteStyle}>{sourceLabel}</p> : null}

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14, marginTop: 20 }}>
            <input name="name" required placeholder="Your name" style={inputStyle} />
            <input
              name="email"
              type="email"
              required
              placeholder="Email address"
              style={inputStyle}
            />
            <input
              name="website"
              type="url"
              placeholder="Website or landing page URL"
              style={inputStyle}
            />
            <input
              name="offer"
              placeholder="What are you selling right now?"
              style={inputStyle}
            />
            <textarea
              name="bottleneck"
              rows={5}
              placeholder="Where do you think the breakdown is happening: weak CTA, bad form, no follow-up, messy routing, low-quality leads, something else?"
              style={inputStyle}
            />
            <button type="submit" disabled={state === "submitting"} style={buttonStyle}>
              {state === "submitting" ? "Sending..." : "Request Async Teardown"}
            </button>
          </form>

          {state === "success" ? (
            <p style={{ marginTop: 16, color: "#c8a97e", lineHeight: 1.7 }}>
              Request received. Casey can now respond with a focused async
              teardown instead of starting from scratch.
            </p>
          ) : null}

          {state === "error" ? (
            <p style={{ marginTop: 16, color: "#f3b0a1", lineHeight: 1.7 }}>
              {errorMessage}
            </p>
          ) : null}
        </section>
      </div>
    </main>
  );
}

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

const bodyCopyStyle: CSSProperties = {
  color: "rgba(245,240,234,0.76)",
  lineHeight: 1.7,
  fontSize: 17,
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

const sourceNoteStyle: CSSProperties = {
  marginTop: 12,
  color: "rgba(200,169,126,0.92)",
  lineHeight: 1.7,
  fontSize: 14,
};
