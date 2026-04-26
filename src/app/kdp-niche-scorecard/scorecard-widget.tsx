'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { calculateKdpScore, type KdpScoreInput } from "@/lib/kdp-scorecard";

type ScoreField = {
  key: keyof KdpScoreInput;
  label: string;
  helper: string;
};

const DEFAULT_INPUT: KdpScoreInput = {
  buyerIntent: 5,
  giftability: 5,
  competitionClarity: 4,
  productionSimplicity: 5,
  evergreenDemand: 4,
};

const FIELDS: ScoreField[] = [
  {
    key: "buyerIntent",
    label: "Buyer intent",
    helper: "Do you know who searches for this and why now?",
  },
  {
    key: "giftability",
    label: "Giftability",
    helper: "Does it map to an occasion, recipient, or emotional reason?",
  },
  {
    key: "competitionClarity",
    label: "Competition clarity",
    helper: "Can you position it without copying crowded listings?",
  },
  {
    key: "productionSimplicity",
    label: "Production simplicity",
    helper: "Can you ship a v1 without custom art or heavy research?",
  },
  {
    key: "evergreenDemand",
    label: "Evergreen demand",
    helper: "Will it still make sense 6–12 months from now?",
  },
];

const QUERY_KEYS: Record<keyof KdpScoreInput, string> = {
  buyerIntent: "bi",
  giftability: "g",
  competitionClarity: "cc",
  productionSimplicity: "ps",
  evergreenDemand: "ed",
};

function readRating(params: URLSearchParams, key: keyof KdpScoreInput): number | undefined {
  const raw = params.get(QUERY_KEYS[key]);
  if (!raw) return undefined;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) return undefined;
  if (parsed < 1 || parsed > 5) return undefined;
  return Math.round(parsed);
}

function buildShareUrl(baseHref: string, input: KdpScoreInput): string {
  const url = new URL(baseHref);
  for (const field of FIELDS) {
    url.searchParams.set(QUERY_KEYS[field.key], String(input[field.key]));
  }
  return url.toString();
}

export default function KdpScorecardWidget() {
  const [input, setInput] = useState<KdpScoreInput>(() => {
    if (typeof window === "undefined") {
      return DEFAULT_INPUT;
    }

    const params = new URLSearchParams(window.location.search);
    const next: KdpScoreInput = { ...DEFAULT_INPUT };

    for (const field of FIELDS) {
      const rating = readRating(params, field.key);
      if (rating) {
        next[field.key] = rating;
      }
    }

    return next;
  });
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const shareInputRef = useRef<HTMLInputElement | null>(null);

  const score = useMemo(() => calculateKdpScore(input), [input]);
  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return buildShareUrl(window.location.href, input);
  }, [input]);

  useEffect(() => {
    const url = new URL(window.location.href);
    for (const field of FIELDS) {
      url.searchParams.set(QUERY_KEYS[field.key], String(input[field.key]));
    }
    window.history.replaceState(null, "", url.toString());
  }, [input]);

  const handleChange = useCallback((key: keyof KdpScoreInput, value: number) => {
    setCopyStatus("idle");
    setInput((current) => ({ ...current, [key]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setCopyStatus("idle");
    setInput(DEFAULT_INPUT);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyStatus("copied");
    } catch {
      const inputEl = shareInputRef.current;
      if (!inputEl) {
        setCopyStatus("failed");
        return;
      }

      inputEl.focus();
      inputEl.select();
      const success = document.execCommand("copy");
      setCopyStatus(success ? "copied" : "failed");
    }
  }, [shareUrl]);

  return (
    <aside style={panelStyle} aria-label="KDP niche scorecard widget">
      <div style={panelHeaderStyle}>
        <span style={panelLabelStyle}>Score your idea (1–5)</span>
        <button type="button" onClick={handleReset} style={resetButtonStyle}>
          Reset
        </button>
      </div>

      <div style={scoreBlockStyle}>
        <span style={scoreLabelStyle}>Score</span>
        <strong style={scoreNumberStyle}>{score.score}</strong>
        <span style={scoreBandStyle}>{score.band} niche</span>
        <div style={meterOuterStyle} aria-hidden="true">
          <div style={{ ...meterInnerStyle, width: `${score.score}%` }} />
        </div>
      </div>

      <div style={sliderGridStyle}>
        {FIELDS.map((field) => (
          <div key={field.key} style={sliderRowStyle}>
            <div style={sliderCopyStyle}>
              <span style={sliderLabelStyle}>{field.label}</span>
              <span style={sliderHelperStyle}>{field.helper}</span>
            </div>
            <div style={sliderControlStyle}>
              <input
                aria-label={`${field.label} rating`}
                type="range"
                min={1}
                max={5}
                step={1}
                value={input[field.key]}
                onChange={(event) => handleChange(field.key, Number(event.target.value))}
                style={sliderStyle}
              />
              <span style={sliderValueStyle}>{input[field.key]}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={recommendationStyle}>
        <span style={recommendationLabelStyle}>Next move</span>
        <ul style={recommendationListStyle}>
          {score.recommendations.map((recommendation) => (
            <li key={recommendation}>{recommendation}</li>
          ))}
        </ul>
      </div>

      <div style={shareStyle}>
        <span style={shareLabelStyle}>Shareable link</span>
        <div style={shareRowStyle}>
          <input ref={shareInputRef} readOnly value={shareUrl} style={shareInputStyle} />
          <button type="button" onClick={handleCopy} style={copyButtonStyle}>
            {copyStatus === "copied" ? "Copied" : "Copy"}
          </button>
        </div>
        {copyStatus === "failed" ? <p style={shareHintStyle}>Copy manually from the box.</p> : null}
      </div>
    </aside>
  );
}

const panelStyle: CSSProperties = {
  padding: 28,
  borderRadius: 8,
  background: "#ffffff",
  border: "1px solid rgba(23,63,53,0.12)",
  boxShadow: "0 24px 70px rgba(23,63,53,0.14)",
  display: "grid",
  gap: 18,
};

const panelHeaderStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
};

const panelLabelStyle: CSSProperties = {
  color: "#66746d",
  fontSize: 13,
  fontWeight: 820,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const resetButtonStyle: CSSProperties = {
  borderRadius: 999,
  border: "1px solid rgba(23,63,53,0.2)",
  background: "#ffffff",
  color: "#173f35",
  padding: "8px 14px",
  fontWeight: 780,
  cursor: "pointer",
};

const scoreBlockStyle: CSSProperties = {
  display: "grid",
  gap: 8,
  paddingBottom: 12,
  borderBottom: "1px solid rgba(23,63,53,0.12)",
};

const scoreLabelStyle: CSSProperties = {
  color: "#66746d",
  fontSize: 12,
  fontWeight: 820,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const scoreNumberStyle: CSSProperties = {
  color: "#173f35",
  fontSize: 78,
  lineHeight: 0.92,
  margin: 0,
};

const scoreBandStyle: CSSProperties = {
  color: "#b4432d",
  fontWeight: 850,
  fontSize: 18,
};

const meterOuterStyle: CSSProperties = {
  height: 12,
  marginTop: 8,
  overflow: "hidden",
  borderRadius: 999,
  background: "#e6ece5",
};

const meterInnerStyle: CSSProperties = {
  height: "100%",
  borderRadius: 999,
  background: "#2e7a68",
};

const sliderGridStyle: CSSProperties = {
  display: "grid",
  gap: 14,
};

const sliderRowStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  gap: 10,
  padding: 14,
  borderRadius: 8,
  background: "#f7f8f3",
  border: "1px solid rgba(23,63,53,0.1)",
};

const sliderCopyStyle: CSSProperties = {
  display: "grid",
  gap: 4,
};

const sliderLabelStyle: CSSProperties = {
  color: "#173f35",
  fontWeight: 820,
};

const sliderHelperStyle: CSSProperties = {
  color: "#51655e",
  fontSize: 13,
  lineHeight: 1.45,
};

const sliderControlStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const sliderStyle: CSSProperties = {
  width: "100%",
  accentColor: "#173f35",
};

const sliderValueStyle: CSSProperties = {
  width: 24,
  textAlign: "center",
  color: "#173f35",
  fontWeight: 840,
};

const recommendationStyle: CSSProperties = {
  padding: 16,
  borderRadius: 8,
  border: "1px solid rgba(23,63,53,0.12)",
  background: "#ffffff",
  display: "grid",
  gap: 10,
};

const recommendationLabelStyle: CSSProperties = {
  color: "#66746d",
  fontSize: 12,
  fontWeight: 820,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const recommendationListStyle: CSSProperties = {
  margin: 0,
  paddingLeft: 18,
  color: "#3e5d55",
  lineHeight: 1.6,
};

const shareStyle: CSSProperties = {
  display: "grid",
  gap: 10,
};

const shareLabelStyle: CSSProperties = {
  color: "#66746d",
  fontSize: 12,
  fontWeight: 820,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const shareRowStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: 10,
  alignItems: "center",
};

const shareInputStyle: CSSProperties = {
  width: "100%",
  borderRadius: 8,
  border: "1px solid rgba(23,63,53,0.2)",
  padding: "12px 12px",
  fontSize: 13,
  color: "#173f35",
  background: "#ffffff",
};

const copyButtonStyle: CSSProperties = {
  borderRadius: 8,
  border: "1px solid rgba(23,63,53,0.2)",
  background: "#173f35",
  color: "#ffffff",
  padding: "12px 14px",
  fontWeight: 840,
  cursor: "pointer",
};

const shareHintStyle: CSSProperties = {
  margin: 0,
  color: "#51655e",
  fontSize: 13,
  lineHeight: 1.5,
};
