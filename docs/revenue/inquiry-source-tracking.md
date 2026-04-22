# Inquiry Source Tracking

## Purpose
Track which Battle Labs entry assets are producing actual commercial intent instead of treating all inquiries as one undifferentiated bucket.

## Current page tags
- `homepage-form`
- `async-teardown`
- `pilot-build`
- `reply-deck`

## Where the tag goes
Each inquiry now prepends the detail field with:

`Entry: <page-tag>`

That means Google Form responses can be filtered by the actual page that created the lead.

## Why this matters
- tells us whether the homepage form is worth keeping prominent
- shows whether teardown requests produce stronger buyer intent than generic inquiries
- shows whether pilot-build traffic is getting commercial movement
- separates product waitlist interest from service leads

## Operational use
When reviewing form submissions:
1. check the `Entry:` tag first
2. sort by page type
3. compare which page types create:
   - teardown requests
   - pilot requests
   - general inquiries
   - low-intent product interest

## Next reporting layer
Once real submissions start arriving, update the outbound scoreboard with:
- teardown requests from `async-teardown`
- pilot requests from `pilot-build`
- generic inquiries from `homepage-form`
- waitlist interest from `reply-deck`
