"use client";

import { useEffect, useId, useMemo, useState, type CSSProperties } from "react";

type PayPalHostedButtonProps = {
  clientId: string;
  hostedButtonId: string;
  label: string;
};

declare global {
  interface Window {
    paypal?: {
      HostedButtons?: (config: { hostedButtonId: string }) => {
        render: (selector: string) => Promise<void> | void;
      };
    };
  }
}

const SCRIPT_ID = "paypal-hosted-buttons-sdk";

function loadPayPalScript(clientId: string): Promise<void> {
  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

  if (existing) {
    return new Promise((resolve, reject) => {
      if (window.paypal?.HostedButtons) {
        resolve();
        return;
      }

      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("PayPal script failed to load.")), {
        once: true,
      });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(
      clientId,
    )}&components=hosted-buttons&enable-funding=venmo&currency=USD`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("PayPal script failed to load."));
    document.body.appendChild(script);
  });
}

export default function PayPalHostedButton({ clientId, hostedButtonId, label }: PayPalHostedButtonProps) {
  const generatedId = useId();
  const containerId = useMemo(
    () => `paypal-container-${hostedButtonId}-${generatedId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [generatedId, hostedButtonId],
  );
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function renderButton() {
      try {
        await loadPayPalScript(clientId);

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
    <div style={wrapperStyle} aria-label={label}>
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
