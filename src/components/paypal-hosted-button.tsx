"use client";

import { useEffect, useId, useMemo, useState, type CSSProperties } from "react";
import { loadPayPalSdk } from "@/lib/paypal-sdk";
import { trackMetricEvent, type MetricEventName } from "@/lib/metrics-client";

type PayPalHostedButtonProps = {
  clientId: string;
  hostedButtonId: string;
  label: string;
  metricEvent?: MetricEventName;
  metricPage?: string;
};

export default function PayPalHostedButton({
  clientId,
  hostedButtonId,
  label,
  metricEvent,
  metricPage,
}: PayPalHostedButtonProps) {
  const generatedId = useId();
  const containerId = useMemo(
    () => `paypal-container-${hostedButtonId}-${generatedId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [generatedId, hostedButtonId],
  );
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const shouldTrack = Boolean(metricEvent && metricPage);

  useEffect(() => {
    let cancelled = false;

    async function renderButton() {
      try {
        await loadPayPalSdk(clientId);

        if (cancelled) {
          return;
        }

        const container = document.getElementById(containerId);
        if (!container || !window.paypal?.HostedButtons) {
          throw new Error("PayPal hosted button API is unavailable.");
        }

        container.innerHTML = "";
        await window.paypal.HostedButtons({ hostedButtonId }).render(`#${containerId}`);

        if (!cancelled) {
          setStatus("ready");
        }
      } catch {
        if (!cancelled) {
          setStatus("error");
        }
      }
    }

    renderButton();

    return () => {
      cancelled = true;
    };
  }, [clientId, containerId, hostedButtonId]);

  return (
    <div
      style={wrapperStyle}
      aria-label={label}
      onClickCapture={() => {
        if (!shouldTrack) return;
        trackMetricEvent({ event: metricEvent as MetricEventName, page: metricPage as string });
      }}
    >
      <div id={containerId} style={buttonContainerStyle} />
      {status === "loading" ? <span style={hintStyle}>Loading secure PayPal checkout...</span> : null}
      {status === "error" ? (
        <span style={errorStyle}>PayPal checkout did not load. Refresh the page and try again.</span>
      ) : null}
    </div>
  );
}

const wrapperStyle: CSSProperties = {
  display: "grid",
  gap: 8,
  minWidth: 220,
};

const buttonContainerStyle: CSSProperties = {
  minHeight: 48,
};

const hintStyle: CSSProperties = {
  color: "#667169",
  fontSize: 13,
  lineHeight: 1.4,
};

const errorStyle: CSSProperties = {
  color: "#8d2f21",
  fontSize: 13,
  lineHeight: 1.4,
  fontWeight: 700,
};
