# Post-Payment Ops

## Objective
Handle the first 10 minutes after payment with zero ambiguity.

## Immediate actions
1. mark lead as `won`
2. record:
   - price
   - offer
   - segment
   - entry page
3. confirm the buyer landed on the correct success URL:
   - `/success?offer=pilot-build`
   - `/success?offer=reply-deck`
4. send kickoff message
5. create proof folder or note for before/after capture

## Data to log
- client name
- payment date
- amount
- proposal used
- primary bottleneck
- expected delivery window

## Asset links to use
- [client-kickoff-message.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/client-kickoff-message.md>)
- [first-client-fulfillment-checklist.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/first-client-fulfillment-checklist.md>)
- [first-win-proof-pack.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/first-win-proof-pack.md>)

## Anti-drift rule
Do not let payment create scope expansion. The first post-payment message should reinforce:

> This pilot is scoped to solve one front-end problem cleanly, not to turn into a full rebuild.
