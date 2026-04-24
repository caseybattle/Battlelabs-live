# Stripe Setup Spec

## Objective
Make Battle Labs payment-ready with the smallest possible Stripe setup that still supports:
- pilot sales
- simple tracking
- async kickoff

## Recommended first products

### 1. Battle Labs Pilot Build
- type: one-time payment link
- public name: `Battle Labs Pilot Build`
- price: start at `$350`
- use for: scoped first-fit pilot projects

### 2. Battle Labs Lead Capture Pilot
- type: one-time payment link
- public name: `Battle Labs Lead Capture Pilot`
- price: start at `$450`
- use for: stronger-fit projects where the lead capture problem is already obvious

### 3. Reply Deck
- type: one-time payment link
- public name: `Reply Deck`
- price: start at `$29`
- use for: microproduct experiment when checkout is ready

## Minimum checkout requirements
- payment link URL
- confirmation page URL or post-payment message
- customer email captured
- metadata or internal notes tying payment back to:
  - segment
  - entry page
  - proposal name
  - pilot bottleneck

## Metadata to track
If Stripe metadata is available, use:
- `offer_name`
- `entry_tag`
- `segment`
- `proposal_id`
- `primary_bottleneck`

## Initial pricing rule
- do not create more than 2 service payment links before the first win
- keep one core pilot price and one higher pilot price
- only add variants after real closes create evidence for it

## Confirmation message
After payment, the customer should see or receive:

> Payment is in. Next step is the async kickoff. Send the current page or flow, any relevant assets, and the exact bottleneck you want fixed first.

## Why this setup
This keeps the system simple:
- one main pilot link
- one slightly higher-intent pilot link
- one low-ticket product link

That is enough to start collecting real buying behavior without overbuilding checkout infrastructure.
