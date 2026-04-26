"use client";

import { startTransition, useState, type CSSProperties, type FormEvent } from "react";

type SubmissionState = "idle" | "submitting" | "success" | "error";

type KickoffClientProps = {
  offer: string;
};

export function KickoffClient({ offer }: KickoffClientProps) {
  const [state, setState] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const website = String(formData.get("website") ?? "").trim();
    const bottleneck = String(formData.get("bottleneck") ?? "").trim();
    const assets = String(formData.get("assets") ?? "").trim();
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
          service: offer === "reply-deck" ? "custom" : "business-automation",
          pageType: `kickoff-${offer}`,
          details: [
            "Paid kickoff submission",
            `Offer: ${offer}`,
            website ? `Current URL or flow: ${website}` : "",
            bottleneck ? `Main bottleneck: ${bottleneck}` : "",
            assets ? `Assets or tools: ${assets}` : "",
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
      <section style={panelStyle}>
        <div style={eyebrowStyle}>Battle Labs Kickoff</div>
        <h1 style={titleStyle}>Send the assets and context that keep the build moving</h1>
        <p style={copyStyle}>
          This intake is for paid work only. Keep it tight, send the current links and bottleneck, and the build stays
          focused on one clean win first.
        </p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input name="name" required placeholder="Your name" style={inputStyle} />
          <input name="email" type="email" required placeholder="Email address" style={inputStyle} />
          <input name="website" placeholder="Current page, funnel, or workflow URL" style={inputStyle} />
          <input name="bottleneck" required placeholder="The one bottleneck to fix first" style={inputStyle} />
          <textarea
            name="assets"
            rows={4}
            placeholder="Tools, forms, assets, or accounts already involved"
            style={inputStyle}
          />
          <textarea
            name="notes"
            rows={5}
            placeholder="Anything that should be preserved, avoided, or prioritized"
            style={inputStyle}
          />
          <button type="submit" disabled={state === "submitting"} style={buttonStyle}>
            {state === "submitting" ? "Sending..." : "Send Kickoff Details"}
          </button>
        </form>

        {state === "success" ? (
          <p style={successStyle}>
            Kickoff details received. Casey can now move into delivery without another clarification round.
          </p>
        ) : null}

        {state === "error" ? <p style={errorStyle}>{errorMessage}</p> : null}
      </section>
    </main>
  );
}

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: "32px 20px",
  background: "radial-gradient(circle at top, rgba(200,169,126,0.18), transparent 40%), #090909",
  color: "#f5f0ea",
  fontFamily: "var(--font-geist-sans), sans-serif",
};

const panelStyle: CSSProperties = {
  width: "100%",
  maxWidth: 780,
  padding: 32,
  borderRadius: 28,
  border: "1px solid rgba(200,169,126,0.16)",
  background: "rgba(12,12,12,0.9)",
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
  fontSize: "clamp(2.2rem, 6vw, 4rem)",
  lineHeight: 1.05,
  marginBottom: 16,
  fontWeight: 700,
};

const copyStyle: CSSProperties = {
  color: "rgba(245,240,234,0.76)",
  lineHeight: 1.7,
  fontSize: 17,
  marginBottom: 24,
};

const formStyle: CSSProperties = {
  display: "grid",
  gap: 14,
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

const errorStyle: CSSProperties = {
  marginTop: 16,
  color: "#f3b0a1",
  lineHeight: 1.7,
};
