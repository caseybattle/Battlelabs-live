# Payment Link Rollout Checklist

## Before creating links
- confirm Stripe account is active
- confirm payout destination
- confirm business display name
- confirm customer email collection is enabled

## Create in this order
1. `Battle Labs Pilot Build`
2. `Battle Labs Lead Capture Pilot`
3. `Reply Deck`

## After link creation
- save each payment URL in a secure ops note
- update proposal handoff messages with the real payment link
- update close-and-kickoff playbook to reference the real link
- test the post-payment flow once before using it in live sales

## What to verify in a test payment
- customer name/email captured correctly
- internal metadata or notes preserved
- confirmation message makes sense
- kickoff message is ready to send immediately after payment

## Where links will be used
- pilot proposal handoff
- payment handoff messages
- close-and-kickoff playbook
- Reply Deck product page once product checkout is live

## Do not do yet
- subscriptions
- too many service variants
- coupon logic
- complex upsells

The goal is first payment, not elaborate billing architecture.
