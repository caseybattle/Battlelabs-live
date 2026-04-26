import type { Metadata } from "next";
import CheckoutClient from "./ui";

export const metadata = {
  title: "Checkout - Memory Journal Gift Launch Kit | Battlelabs",
  description: "Pay $9 for the intro kit and download the Memory Journal Gift Launch Kit assets.",
} satisfies Metadata;

export default function MemoryJournalCheckoutPage() {
  return <CheckoutClient />;
}

