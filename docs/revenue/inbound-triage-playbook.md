# Inbound Triage Playbook

## Objective
Turn every incoming Battle Labs submission into the correct next action without manual re-deciding the flow each time.

## Triage order
1. Identify the `Entry:` tag from the Google Form submission
2. Check the problem description for urgency and fit
3. Decide whether the lead should go to:
   - teardown
   - pilot proposal
   - product waitlist/nurture
   - disqualify

## Entry-type routing

### `homepage-form`
Default assumption:
- the lead knows they need help, but has not chosen the exact path yet

Default next step:
- reply with a clarifying async message
- if the problem is obvious, route to teardown
- if the problem is already sharply defined, route to pilot scope

### `async-teardown`
Default assumption:
- the lead is interested enough to let Battle Labs diagnose the issue

Default next step:
- send the teardown
- if they agree with the diagnosis, send the pilot proposal

### `pilot-build`
Default assumption:
- the lead has enough clarity to consider a scoped paid project

Default next step:
- send scoped pilot proposal or payment handoff
- if scope is still fuzzy, send one short clarifier before proposal

### `reply-deck`
Default assumption:
- the lead is lower-intent or product-curious unless they clearly describe a business problem that fits service work

Default next step:
- keep in product/nurture bucket unless they sound like a service fit

## Fast-fit questions
Use these silently when reading the submission:
- is there a real business and live offer already?
- is the bottleneck specific enough to fix?
- does the problem sound like lead capture, routing, follow-up, or page clarity?
- does this sound like a pilot or a full custom project?

## Disqualify fast if
- they need a full team/agency immediately
- they want broad undefined work at pilot pricing
- the business is too undeveloped for a front-end fix to matter
- they require calls as the main process
