# Reply Handling Playbook

## Objective
Move a prospect from reply to the next useful step without long custom back-and-forth.

## Core rule
Every reply should push toward one of these:
- async teardown
- pilot proposal
- payment link
- disqualification

Do not let the conversation drift into vague consulting.

## Reply Type: "Sounds interesting"
Use when the prospect is curious but not specific yet.

Response:

Hi {{first_name}},

The clean next step is a short async teardown so I can point to the front-end leak directly instead of guessing.

You can send me the page and the main bottleneck here:
`battlelabs.live/async-teardown`

If it is a fit, I’ll map the first change I would make and what a pilot build would look like.

Casey

## Reply Type: "Can you explain more?"
Use when they want detail but have not committed.

Response:

Hi {{first_name}},

What I am usually fixing is one of three things:
- weak lead capture
- messy inquiry routing
- no real follow-up after interest

The fastest way to make this concrete is an async teardown of your current page and path.

If you want, send the page and the bottleneck here:
`battlelabs.live/async-teardown`

Casey

## Reply Type: "How much does this cost?"
Use when price comes up before scope.

Response:

Hi {{first_name}},

For the first-fit projects, I keep the pilot narrow on purpose.

Most Battle Labs pilot builds start in the `$250-$500` range depending on how much of the front-end flow needs to be tightened.

If you want, I can scope the smallest version I would start with and keep the whole process async.

Casey

## Reply Type: "What would you change?"
Use when they are ready for diagnosis.

Response:

Hi {{first_name}},

The easiest next step is for me to send a short async teardown with:
- what is working
- where the likely leak is
- one change to make first
- what I would build if we move forward

If you want that, send the page and bottleneck here:
`battlelabs.live/async-teardown`

Casey

## Reply Type: "We already have a site"
Use when they assume this is just web design.

Response:

Hi {{first_name}},

That is fine. I am not assuming the answer is a full rebuild.

The pilot is usually about tightening the front-end system around the site you already have:
- CTA clarity
- inquiry flow
- follow-up
- routing

If you want, I can scope the smallest fix instead of proposing a bigger build.

Casey

## Reply Type: "I do not want calls"
Use when they are wary of sales calls.

Response:

Hi {{first_name}},

That is exactly how I work.

Battle Labs is built around async flow: forms, email, Loom, scoped proposals, and focused builds without calls being the default.

If you want to keep it moving, the easiest next step is the async teardown:
`battlelabs.live/async-teardown`

Casey

## Reply Type: "Not right now"
Use when timing is the issue.

Response:

Hi {{first_name}},

Understood.

The main issue I noticed was around `{{observed_gap}}`, so when the timing is better that is where I would start.

If useful, I can still send the short async teardown now so you have it when you are ready.

Casey

## Reply Type: "Send the proposal"
Use when they want the offer directly.

Response:

Hi {{first_name}},

Perfect.

I scoped the smallest pilot build I would start with based on the issue we talked through. The goal is to fix the highest-leverage bottleneck first without turning this into a giant project.

`{{proposal_path_or_summary}}`

If it looks right, the next step is the payment link and a simple async kickoff.

Casey

## Disqualify Fast
Mark `lost` when:
- they clearly need a full agency/team
- they want calls as the required sales process
- they want very broad work at pilot pricing
- the page or offer is too undeveloped for a front-end fix to matter
