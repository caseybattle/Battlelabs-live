# Battlelabs Self-Improvement Eval Gates

## Purpose

Battlelabs uses self-improvement as an eval-gated product loop, not unrestricted recursive code modification.

Agents may propose changes to product pages, scoring logic, distribution assets, and fulfillment templates. A change is accepted only if it passes deterministic checks and improves the next measurable constraint.

## Current Approved Loop

1. Inspect dashboard metrics and task queue.
2. Pick the weakest active product constraint.
3. Propose one narrow improvement.
4. Apply the smallest patch.
5. Run:

```powershell
npm test
npm run lint
npm run build
npm run eval:products
```

6. Commit only if all checks pass.
7. Update the task queue or dashboard next action.

## Hard Stops

Agents may not:
- spend money,
- create or fund wallets,
- use paid APIs,
- send cold outbound at scale,
- publish earnings, ranking, or sales guarantees,
- remove disclaimers,
- bypass tests, lint, build, or product evals,
- modify payment settings without an explicit checkout-link instruction.

## Approved Improvement Targets

For the KDP Niche Scorecard funnel, agents may improve:
- headline clarity,
- CTA wording,
- free sample usefulness,
- paid report template quality,
- organic distribution copy,
- FAQ objections,
- scorecard weights when tests are updated to defend the change,
- dashboard next actions.

## Promotion Rules

Keep a change if:
- all evals pass,
- no hard stop is violated,
- the change makes the offer clearer, safer, faster to ship, or more measurable.

Improve again if:
- users click the page but not the sample,
- users click the sample but not checkout,
- checkout clicks happen but no sales,
- questions reveal missing FAQ or product clarity.

Clone only if:
- sales occur,
- checkout clicks repeat,
- direct buyer requests appear,
- or free sample clicks exceed 5% from targeted traffic.

Kill if:
- no sample clicks or checkout clicks appear after targeted organic distribution,
- the product needs custom explanation to sell,
- or compliance risk rises faster than buyer signal.

## Autonomous Runner Instruction

The scheduled runner should treat `npm run eval:products` as the product-foundry gate. If it fails, the next task is to repair the failed check before expanding the funnel.
