const SCRIPT_ID = "paypal-sdk";

declare global {
  interface Window {
    paypal?: {
      HostedButtons?: (config: { hostedButtonId: string }) => {
        render: (selector: string) => Promise<void> | void;
      };
      Buttons?: (config: unknown) => {
        render: (selector: string) => Promise<void> | void;
      };
    };
  }
}

export function loadPayPalSdk(clientId: string): Promise<void> {
  const trimmedClientId = clientId.trim();
  if (!trimmedClientId) {
    return Promise.reject(new Error("PayPal clientId is required."));
  }

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

  if (existing) {
    return new Promise((resolve, reject) => {
      if (window.paypal?.HostedButtons || window.paypal?.Buttons) {
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
      trimmedClientId,
    )}&components=buttons,hosted-buttons&enable-funding=venmo&currency=USD`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("PayPal script failed to load."));
    document.body.appendChild(script);
  });
}

