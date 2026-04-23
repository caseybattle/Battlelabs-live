# Follow-Up Status Update Rules

## Purpose
Keep the master queue accurate once follow-ups begin, so the scoreboard reflects real outbound movement.

## After first touch
- set `status` to `contacted`
- set `last_touch_date` to the send date
- keep `next_action` as follow-up unless a reply comes in

## After 48-hour follow-up
- keep `status` as `contacted` if there is no reply
- update `last_touch_date`
- set `next_action` to `final follow-up` unless a reply comes in

## After final follow-up
- if there is still no reply, keep the lead in the queue but move `next_action` to `hold`
- only revisit after new proof, new offer framing, or a stronger reason to re-open

## If they reply
- curiosity only: set `status` to `replied`
- request for teardown or detail: set `status` to `qualified`
- request for scope or price: set `status` to `proposal sent` once the pilot scope is shared
- clear no: set `status` to `lost`

## Notes discipline
Every update should log one of:
- reply quality
- objection
- timing issue
- fit issue
- page or offer clue

## Why this matters
Cold outbound usually wins on follow-up, not first-touch volume. If status updates are messy, the scoreboard stops being trustworthy.
