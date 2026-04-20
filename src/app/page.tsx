import Link from "next/link";
import { InquiryForm } from "@/components/inquiry-form";

const tiers = [
  {
    name: "Starter System",
    price: "$500",
    description:
      "Landing page, lead capture, and follow-up automation for one offer.",
  },
  {
    name: "Growth System",
    price: "$1,500",
    description:
      "Full async sales funnel with content hooks, email follow-up, and CRM routing.",
  },
  {
    name: "Operator System",
    price: "$3,000+",
    description:
      "Custom multi-step automation stack for teams selling offers online.",
  },
] as const;

const outcomes = [
  "Offer page and CTA structure",
  "Email capture and follow-up logic",
  "Content hooks for outbound and social",
  "Simple reporting and handoff",
] as const;

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 md:px-10 md:py-16 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center rounded-full border border-[#f97316]/30 bg-[#f97316]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-[#ffb37a]">
              Battle Labs
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] md:text-7xl">
                AI automation systems that capture leads and close async
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-white/70">
                We build lean websites, follow-up flows, and agentic automations
                for coaches, consultants, creators, and digital product brands
                that want sales without calls.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center rounded-full bg-[#f97316] px-6 py-3 text-sm font-semibold text-black transition-transform duration-200 hover:-translate-y-0.5"
              >
                Start your system
              </Link>
              <Link
                href="https://www.theresetmethod.live/"
                className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/5"
              >
                See live proof-of-work
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                  Focus
                </p>
                <p className="mt-3 text-xl font-medium">
                  Async funnels for internet-first brands
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                  Delivery
                </p>
                <p className="mt-3 text-xl font-medium">
                  Scoped, built, and revised over email
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                  Goal
                </p>
                <p className="mt-3 text-xl font-medium">
                  More leads without bloated retainers
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,#f9731633,transparent_40%),linear-gradient(180deg,#151518,#0d0d0f)] p-6 shadow-[0_20px_90px_rgba(0,0,0,0.35)]">
            <p className="text-sm uppercase tracking-[0.28em] text-[#ffb37a]">
              What we build
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm text-white/45">Lead Capture System</p>
                <p className="mt-2 text-lg font-medium">
                  Landing page + form + async follow-up
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm text-white/45">Content Distribution Loop</p>
                <p className="mt-2 text-lg font-medium">
                  Hooks, drafts, and publishing support
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm text-white/45">Operator Layer</p>
                <p className="mt-2 text-lg font-medium">
                  Multi-step automations for real online offers
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                {tier.name}
              </p>
              <p className="mt-4 text-4xl font-semibold">{tier.price}</p>
              <p className="mt-4 text-sm leading-7 text-white/70">
                {tier.description}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-[#111114] p-6 md:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-white/45">
              Built for async selling
            </p>
            <h2 className="text-3xl font-semibold">
              One offer, one funnel, one follow-up loop
            </h2>
            <p className="max-w-xl text-sm leading-7 text-white/70">
              Battle Labs is not generic agency work. We turn your offer into a
              simple revenue system: a page that sells, a form that routes, and a
              follow-up path that keeps moving without calls.
            </p>
          </div>
          <div className="grid gap-3">
            {outcomes.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-sm text-white/80"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <InquiryForm />
      </section>
    </main>
  );
}
