"use client";

import { useEffect, useId, useMemo, useState, type CSSProperties } from "react";
import { loadPayPalSdk } from "@/lib/paypal-sdk";

type PayPalCreateOrderActions = {
  order: {
    create: (payload: unknown) => Promise<string> | string;
  };
};

type PayPalApproveActions = {
  order: {
    capture: () => Promise<unknown>;
  };
};

type PayPalCheckoutButtonsProps = {
  clientId: string;
  amountUsd: number;
  itemName: string;
  onCaptured?: (captureId: string) => void;
};

export default function PayPalCheckoutButtons({
  clientId,
  amountUsd,
  itemName,
  onCaptured,
}: PayPalCheckoutButtonsProps) {
  const generatedId = useId();
  const containerId = useMemo(
    () => `paypal-checkout-buttons-${generatedId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [generatedId],
  );
  const [status, setStatus] = useState<"loading" | "ready" | "captured" | "error">("loading");
  const [captureId, setCaptureId] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function renderButtons() {
      try {
        await loadPayPalSdk(clientId);

        if (cancelled) {
          return;
        }

        if (!window.paypal?.Buttons) {
          throw new Error("PayPal Buttons API is unavailable.");
        }

        const container = document.getElementById(containerId);
        if (!container) {
          throw new Error("PayPal container is missing.");
        }

        container.innerHTML = "";

        const buttons = window.paypal.Buttons({
          style: { layout: "vertical", shape: "rect", label: "paypal" },
          createOrder: (_data: unknown, actions: PayPalCreateOrderActions) =>
            actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: itemName,
                  amount: {
                    currency_code: "USD",
                    value: amountUsd.toFixed(2),
                  },
                },
              ],
            }),
          onApprove: async (_data: unknown, actions: PayPalApproveActions) => {
            const details = await actions.order.capture();
            const captured = details as {
              id?: string;
              purchase_units?: Array<{
                payments?: { captures?: Array<{ id?: string }> };
              }>;
            };
            const nextCaptureId =
              captured.purchase_units?.[0]?.payments?.captures?.[0]?.id?.trim() ?? captured.id?.trim() ?? "";

            if (!cancelled) {
              setCaptureId(nextCaptureId);
              setStatus("captured");
              onCaptured?.(nextCaptureId);
            }
          },
          onError: () => {
            if (!cancelled) {
              setStatus("error");
            }
          },
        });

        await buttons.render(`#${containerId}`);

        if (!cancelled) {
          setStatus("ready");
        }
      } catch {
        if (!cancelled) {
          setStatus("error");
        }
      }
    }

    renderButtons();

    return () => {
      cancelled = true;
    };
  }, [amountUsd, clientId, containerId, itemName, onCaptured]);

  return (
    <div style={wrapperStyle} aria-label="PayPal checkout buttons">
      <div id={containerId} style={buttonContainerStyle} />
      {status === "loading" ? <span style={hintStyle}>Loading secure PayPal checkout...</span> : null}
      {status === "captured" ? (
        <span style={successStyle}>
          Payment captured{captureId ? ` (ID: ${captureId})` : ""}. Thanks — grab your files below.
        </span>
      ) : null}
      {status === "error" ? (
        <span style={errorStyle}>PayPal checkout did not load. Refresh the page and try again.</span>
      ) : null}
    </div>
  );
}

const wrapperStyle: CSSProperties = {
  display: "grid",
  gap: 10,
  minWidth: 260,
};

const buttonContainerStyle: CSSProperties = {
  minHeight: 48,
};

const hintStyle: CSSProperties = {
  color: "rgba(245,240,234,0.72)",
  fontSize: 13,
  lineHeight: 1.4,
};

const successStyle: CSSProperties = {
  color: "#c8a97e",
  fontSize: 13,
  lineHeight: 1.4,
  fontWeight: 700,
};

const errorStyle: CSSProperties = {
  color: "#f3b0a1",
  fontSize: 13,
  lineHeight: 1.4,
  fontWeight: 700,
};
