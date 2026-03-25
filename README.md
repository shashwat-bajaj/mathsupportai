# MathSupport AI Starter

A practical starter for launching a paid AI math support website.

## Recommended architecture

- **Frontend + app server:** Next.js (App Router) on Vercel
- **Auth + database:** Supabase
- **Payments:** Stripe Checkout + customer portal
- **AI:** OpenAI Responses API
- **Optional symbolic verification:** FastAPI + SymPy microservice
- **Automation:** n8n for onboarding, re-engagement, CRM, lead capture, and human tutor handoffs

## What is included

- Landing page
- Login page (Supabase client-side auth)
- Basic tutor UI
- Chat API route using OpenAI Responses API
- Stripe checkout route
- Stripe webhook route
- Suggested Supabase schema
- Optional Python math-checker microservice using SymPy

## Local setup

1. Create a Supabase project.
2. In Supabase SQL editor, run `db/schema.sql`.
3. Create a Stripe product and recurring price.
4. Create an OpenAI API key.
5. Copy `.env.example` to `.env.local` and fill values.
6. Install dependencies:

```bash
npm install
```

7. Run the Next.js app:

```bash
npm run dev
```

8. For symbolic checking, create a Python virtual environment inside `math-checker/`:

```bash
cd math-checker
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

## Deployment

### Web app
Deploy the Next.js app to Vercel.

### Python checker
Deploy `math-checker/` to Railway, Render, or Fly.io.

## Environment variables
See `.env.example`.

## Production sequence

### Week 1
- Landing page
- Tutor page
- OpenAI integration
- Free usage cap

### Week 2
- Supabase auth
- Stripe subscriptions
- Email capture and onboarding

### Week 3
- Mistake tracking
- Mastery dashboard
- SEO pages for algebra/calculus/statistics

### Week 4+
- Symbolic checker
- Image input / worksheet upload
- School / tutor partnerships
- Affiliate and sponsored tools

## Important note
This starter is meant to get you to a serious MVP quickly. For a hardened paid launch, add:
- server-side auth enforcement
- rate limiting at the edge
- abuse detection
- logging/monitoring
- subscription middleware
- tests and evals
