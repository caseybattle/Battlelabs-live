# Battle Labs Funnel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a conversion-focused `battlelabs.live` landing page that sells Battle Labs as an async AI automation service for coaches, consultants, creators, and digital product brands.

**Architecture:** Use a Next.js App Router site with a single homepage and a small client-side inquiry form component. Keep the first version statically renderable, with one shared content source and one test suite that locks key conversion copy and page structure before implementation changes.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Vitest, Testing Library

---

### Task 1: Scaffold the app shell

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`

- [ ] **Step 1: Scaffold the project with the official generator**

Run:

```bash
npx create-next-app@latest . --yes --force --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --use-npm
```

Expected: a Next.js App Router project is created in the repo root.

- [ ] **Step 2: Run the default testable baseline build**

Run:

```bash
npm run build
```

Expected: Next.js production build succeeds.

### Task 2: Lock the homepage requirements with failing tests

**Files:**
- Create: `src/app/page.test.tsx`
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Write the failing tests for the homepage**

```tsx
import { render, screen } from '@testing-library/react'
import HomePage from './page'

describe('HomePage', () => {
  it('shows the narrowed hero promise', () => {
    render(<HomePage />)

    expect(
      screen.getByRole('heading', {
        name: /ai automation systems that capture leads and close async/i,
      }),
    ).toBeInTheDocument()
  })

  it('shows the primary call to action', () => {
    render(<HomePage />)

    expect(
      screen.getByRole('link', { name: /start your system/i }),
    ).toBeInTheDocument()
  })

  it('shows the three offer tiers', () => {
    render(<HomePage />)

    expect(screen.getByText(/starter system/i)).toBeInTheDocument()
    expect(screen.getByText(/growth system/i)).toBeInTheDocument()
    expect(screen.getByText(/operator system/i)).toBeInTheDocument()
  })

  it('shows the async inquiry form heading', () => {
    render(<HomePage />)

    expect(
      screen.getByRole('heading', { name: /tell us what you want automated/i }),
    ).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Install the test dependencies**

Run:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
```

Expected: the test toolchain is installed successfully.

- [ ] **Step 3: Add the failing test config**

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

```ts
// src/test/setup.ts
import '@testing-library/jest-dom/vitest'
```

Add to `package.json`:

```json
"scripts": {
  "test": "vitest run"
}
```

- [ ] **Step 4: Run the tests to verify they fail**

Run:

```bash
npm test -- src/app/page.test.tsx
```

Expected: FAIL because the generated homepage does not contain the required Battle Labs content.

### Task 3: Implement the minimal Battle Labs funnel

**Files:**
- Create: `src/components/inquiry-form.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Build the minimal homepage structure to satisfy the tests**

Create:

```tsx
'use client'

// src/components/inquiry-form.tsx
import { useMemo, useState } from 'react'

const SERVICES = [
  'Lead Capture + Follow-Up',
  'Content + Distribution',
  'Website + Funnel Build',
  'Custom AI Automation',
] as const

export function InquiryForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [service, setService] = useState(SERVICES[0])
  const [details, setDetails] = useState('')

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Battle Labs inquiry: ${service}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nDetails:\n${details}`,
    )

    return `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@battlelabs.live'}?subject=${subject}&body=${body}`
  }, [details, email, name, service])

  return (
    <section id="contact" className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-semibold text-white">Tell us what you want automated</h2>
      <p className="mt-2 text-sm text-white/70">
        No calls. No meetings. Send the brief and we reply with the build scope.
      </p>
      <div className="mt-6 grid gap-4">
        <input
          aria-label="Your name"
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
        />
        <input
          aria-label="Email address"
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
        />
        <select
          aria-label="What do you need?"
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          value={service}
          onChange={(event) => setService(event.target.value)}
        >
          {SERVICES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <textarea
          aria-label="Tell us more"
          className="min-h-36 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          placeholder="Tell us more about your business, offer, and what you want automated..."
        />
        <a
          href={mailtoHref}
          className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 font-medium text-black"
        >
          Start your system
        </a>
      </div>
    </section>
  )
}
```

Replace `src/app/page.tsx` with:

```tsx
import Link from 'next/link'
import { InquiryForm } from '@/components/inquiry-form'

const tiers = [
  {
    name: 'Starter System',
    price: '$500',
    description: 'Landing page, lead capture, and follow-up automation for one offer.',
  },
  {
    name: 'Growth System',
    price: '$1,500',
    description: 'Full async sales funnel with content hooks, email follow-up, and CRM routing.',
  },
  {
    name: 'Operator System',
    price: '$3,000+',
    description: 'Custom multi-step automation stack for teams selling offers online.',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <section className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-16 md:px-10 lg:px-12">
        <div className="flex flex-col gap-6">
          <p className="text-sm uppercase tracking-[0.28em] text-[#f97316]">Battle Labs</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
            AI automation systems that capture leads and close async
          </h1>
          <p className="max-w-2xl text-lg text-white/70">
            We build lean websites, follow-up flows, and agentic automations for coaches,
            consultants, creators, and digital product brands that want sales without calls.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#contact"
              className="inline-flex items-center rounded-full bg-[#f97316] px-6 py-3 font-medium text-black"
            >
              Start your system
            </Link>
            <Link
              href="https://www.theresetmethod.live/"
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 font-medium text-white"
            >
              See a live proof-of-work
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <article key={tier.name} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">{tier.name}</p>
              <p className="mt-4 text-4xl font-semibold">{tier.price}</p>
              <p className="mt-4 text-sm leading-6 text-white/70">{tier.description}</p>
            </article>
          ))}
        </div>

        <section className="grid gap-6 rounded-3xl border border-white/10 bg-[#111114] p-6 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-semibold">Built for async selling</h2>
            <p className="mt-3 text-sm leading-6 text-white/70">
              We replace vague agency work with clear systems: one offer, one funnel, one follow-up
              loop, and one reporting path.
            </p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">Deliverables</p>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li>Offer page and CTA structure</li>
              <li>Email capture and follow-up logic</li>
              <li>Content hooks for outbound and social</li>
              <li>Simple reporting and handoff</li>
            </ul>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">Promise</p>
            <p className="mt-3 text-sm leading-6 text-white/80">
              No calls. No bloated retainers. We scope, build, and iterate through email and docs.
            </p>
          </div>
        </section>

        <InquiryForm />
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Run the tests to verify they pass**

Run:

```bash
npm test -- src/app/page.test.tsx
```

Expected: PASS.

- [ ] **Step 3: Run the production build**

Run:

```bash
npm run build
```

Expected: production build succeeds with no errors.

### Task 4: Prepare the first deployable commit

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add a short project README**

```md
# Battle Labs

Battle Labs is a conversion-focused landing page for async AI automation services.

## Local development

```bash
npm install
npm run dev
```

## Test

```bash
npm test
```

## Build

```bash
npm run build
```
```

- [ ] **Step 2: Commit the initial version**

Run:

```bash
git add .
git commit -m "feat: launch battle labs async sales funnel"
```

Expected: the repo has the first deployable commit.
