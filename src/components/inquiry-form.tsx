"use client";

import { useMemo, useState } from "react";

const services = [
  "Lead Capture + Follow-Up",
  "Content + Distribution",
  "Website + Funnel Build",
  "Custom AI Automation",
] as const;

export function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState<(typeof services)[number]>(
    services[0],
  );
  const [details, setDetails] = useState("");

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Battle Labs inquiry: ${service}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nDetails:\n${details}`,
    );
    const targetEmail =
      process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@battlelabs.live";

    return `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  }, [details, email, name, service]);

  return (
    <section
      id="contact"
      className="grid gap-6 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,#151518,#0c0c0e)] p-6 lg:grid-cols-[0.9fr_1.1fr]"
    >
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.28em] text-[#ffb37a]">
          Async inquiry
        </p>
        <h2 className="text-3xl font-semibold">
          Tell us what you want automated
        </h2>
        <p className="max-w-lg text-sm leading-7 text-white/70">
          No sales calls. No back-and-forth chaos. Send the brief, and we reply
          with the build path, timeline, and next step.
        </p>
        <div className="rounded-3xl border border-white/10 bg-black/25 p-4 text-sm text-white/75">
          Best fit: coaches, consultants, creators, and digital product brands
          selling online.
        </div>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2 text-sm text-white/70">
          <span>Your name</span>
          <input
            aria-label="Your name"
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition-colors focus:border-[#f97316]"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
          />
        </label>
        <label className="grid gap-2 text-sm text-white/70">
          <span>Email address</span>
          <input
            aria-label="Email address"
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition-colors focus:border-[#f97316]"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
          />
        </label>
        <label className="grid gap-2 text-sm text-white/70">
          <span>What do you need?</span>
          <select
            aria-label="What do you need?"
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition-colors focus:border-[#f97316]"
            value={service}
            onChange={(event) =>
              setService(event.target.value as (typeof services)[number])
            }
          >
            {services.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm text-white/70">
          <span>Tell us more</span>
          <textarea
            aria-label="Tell us more"
            className="min-h-36 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition-colors focus:border-[#f97316]"
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            placeholder="Offer, audience, channels, current bottleneck, and what you want automated..."
          />
        </label>
        <a
          href={mailtoHref}
          className="inline-flex items-center justify-center rounded-full bg-[#f97316] px-6 py-3 text-sm font-semibold text-black transition-transform duration-200 hover:-translate-y-0.5"
        >
          Send async inquiry
        </a>
      </div>
    </section>
  );
}
