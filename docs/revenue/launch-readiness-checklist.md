# Launch Readiness Checklist

## Battle Labs revenue system is ready when:

### Site layer
- homepage live
- async teardown live
- pilot build live
- reply deck live
- inquiry source tagging live

### Sales layer
- outbound batches prepared
- first-touch emails prepared
- follow-ups prepared
- teardown briefs prepared
- pilot proposals prepared
- reply-handling playbook prepared

### Delivery layer
- kickoff message prepared
- fulfillment checklist prepared
- proof pack prepared

### Learning layer
- scoreboard exists
- master queue exists
- segment review rubric exists
- touch review template exists

### Payment layer
- at least one live pilot payment link exists
- success confirmation URL is set to the right Battle Labs route for that offer

## Current blocker
As of April 24, 2026, the only major missing piece is the live payment link setup.

## Next action once payment is live
- replace placeholder references in payment messages with the real URL
- point Stripe confirmation or redirect URLs to:
  - `/success?offer=pilot-build`
  - `/success?offer=reply-deck`
- test one internal payment flow
- begin real send cycle and log responses in the master queue
