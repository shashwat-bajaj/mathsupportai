# n8n automation ideas for MathSupport AI

Use n8n for operations, not as your main tutoring engine.

## Workflow 1: lead magnet onboarding
- Trigger: form submission or new waitlist signup
- Actions:
  - add user to CRM or Google Sheet
  - send welcome email
  - tag source (SEO, TikTok, Reddit, school outreach)
  - wait 24 hours
  - send first-study-plan email

## Workflow 2: inactive user win-back
- Trigger: daily cron
- Query users inactive for 7 days
- Send reminder with:
  - one practice problem
  - one mistake insight
  - one CTA to return

## Workflow 3: tutor escalation
- Trigger: low confidence or repeated wrong answers
- Create a task for manual review
- Notify a tutor or your support email

## Workflow 4: affiliate upsell
- Trigger: student studies SAT/ACT/AP/college algebra for 3+ sessions
- Send recommendation for relevant partner resource

## Workflow 5: payments recovery
- Trigger: failed subscription payment webhook
- Send a recovery email
- Wait 2 days
- Send second reminder
