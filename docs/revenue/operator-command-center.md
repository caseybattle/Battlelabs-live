# Battle Labs Operator Command Center

## Purpose
Use this file as the fastest way to run the first real outbound cycle without hunting through the repo.

## Core live assets
- Homepage: [battlelabs.live](https://battlelabs.live)
- Async teardown: [battlelabs.live/async-teardown](https://battlelabs.live/async-teardown)
- Pilot build: [battlelabs.live/pilot-build](https://battlelabs.live/pilot-build)
- Product experiment: [battlelabs.live/reply-deck](https://battlelabs.live/reply-deck)

## First 10 prospects to operate
| Priority | Segment | Prospect | First-touch asset | Teardown | Proposal | Best next move |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | coaches-consultants | Sarah Raanan | [outreach-personalized-coaches.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/outreach-personalized-coaches.md>) | [sarah-raanan.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/teardowns/sarah-raanan.md>) | [sarah-raanan-pilot.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/proposals/sarah-raanan-pilot.md>) | Send first-touch email, then move to teardown if she engages. |
| 2 | coaches-consultants | Jonathan Dunnett | [outreach-personalized-coaches.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/outreach-personalized-coaches.md>) | [jonathan-dunnett.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/teardowns/jonathan-dunnett.md>) | [jonathan-dunnett-pilot.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/proposals/jonathan-dunnett-pilot.md>) | Push the softer-entry-path angle first. |
| 3 | coaches-consultants | Mr. CTO | [outreach-personalized-coaches.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/outreach-personalized-coaches.md>) | [mr-cto.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/teardowns/mr-cto.md>) | [mr-cto-pilot.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/proposals/mr-cto-pilot.md>) | Lead with routing/qualification, not generic automation. |
| 4 | creators-course-businesses | Creator Engines | [outreach-personalized-creators.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/outreach-personalized-creators.md>) | [creator-engines.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/teardowns/creator-engines.md>) | [creator-engines-pilot.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/proposals/creator-engines-pilot.md>) | Best creator test for async segmentation before calls. |
| 5 | coaches-consultants | Lillian So | [outreach-personalized-coaches.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/outreach-personalized-coaches.md>) | none yet | none yet | Send first-touch and create teardown only if positive reply. |
| 6 | coaches-consultants | Speak as a Leader | [outreach-personalized-round-2.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/outreach-personalized-round-2.md>) | none yet | none yet | Test speaker-coach language versus Jonathan. |
| 7 | coaches-consultants | Lindsay Maloney | [outreach-personalized-round-2.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/outreach-personalized-round-2.md>) | none yet | none yet | Strong fit for softer async entry angle. |
| 8 | creators-course-businesses | Full Time Creator | [outreach-personalized-creators.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/outreach-personalized-creators.md>) | [full-time-creator.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/teardowns/full-time-creator.md>) | [full-time-creator-pilot.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/proposals/full-time-creator-pilot.md>) | Best proof-heavy creator target. |
| 9 | creators-course-businesses | Your Course Creation Lab | [outreach-personalized-creators.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/outreach-personalized-creators.md>) | [your-course-creation-lab.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/teardowns/your-course-creation-lab.md>) | [your-course-creation-lab-pilot.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/proposals/your-course-creation-lab-pilot.md>) | Best creator-stage segmentation test. |
| 10 | creators-course-businesses | Shay Johnson | [outreach-personalized-creators.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/outreach-personalized-creators.md>) | none yet | none yet | Good hybrid creator/coach path. |

## Daily operating sequence
1. Open [master-outbound-queue.csv](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/master-outbound-queue.csv>)
2. Send first-touch messages for the current priority batch
3. Update `status` to `contacted` and set `last_touch_date`
4. If a lead replies, use [reply-handling-playbook.md](</C:/Users/casba/OneDrive/Desktop/Codex 1 Million/Battlelabs-live/docs/revenue/reply-handling-playbook.md>)
5. If they want detail, use the teardown file
6. If they want scope, use the proposal file
7. If they want to move, route them to [battlelabs.live/pilot-build](https://battlelabs.live/pilot-build)

## If there is no reply data yet
- keep using the coach segment as the control group
- use creators as the comparison group
- do not add a third segment until one of these two shows clearer commercial movement

## Biggest remaining blocker
- payment rails still need user-controlled account setup before a real close can complete
