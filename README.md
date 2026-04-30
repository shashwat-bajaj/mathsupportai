# TutoVera

TutoVera is a calm AI learning platform with subject branches for Math, Physics, Chemistry, and Biology.

The product is designed around the idea of **“Tutoring you can trust”** — clear explanations, guided learning, parent support, saved history, and subject-specific tutor behavior inside one connected platform.

## Current status

TutoVera is currently in free beta.

Active subject branches:

- Math
- Physics
- Chemistry
- Biology

Each active subject branch includes:

- Student workspace
- Parent workspace
- Subject-filtered history
- Subject-specific prompts and tutor behavior
- Shared account, settings, and saved history foundation

## Product structure

TutoVera is built as one connected platform rather than separate cloned apps for each subject.

The current route structure includes:

- `/` — TutoVera homepage
- `/math` — Math branch homepage
- `/physics` — Physics branch homepage
- `/chemistry` — Chemistry branch homepage
- `/biology` — Biology branch homepage
- `/[subject]/tutor` — student workspace
- `/[subject]/parents` — parent workspace
- `/[subject]/history` — subject-filtered history
- `/[subject]/about` — subject-specific about page
- `/history` — global saved history
- `/account` — account page
- `/settings` — learning and display preferences
- `/pricing` — global beta pricing page
- `/privacy` — privacy policy
- `/terms` — terms of use
- `/contact` — feedback/contact page

Some legacy compatibility routes remain intentionally so older links do not break.

## Core features

### Student workspaces

Student workspaces are built for direct subject help, follow-up questions, explanations, diagnosis, practice prompts, and saved learning sessions.

Examples:

- Math: solving, graphing, algebra, calculus, statistics, mistake diagnosis
- Physics: concepts, formulas, variables, units, word problems
- Chemistry: reactions, balancing, stoichiometry, molarity, conversions
- Biology: vocabulary, systems, processes, comparisons, review

### Parent workspaces

Parent workspaces are designed for adults helping a child learn.

They focus on:

- simpler explanations
- parent-friendly talking points
- likely-mistake guidance
- child-level examples
- practice prompts
- guided support without jumping straight to the final answer

### Saved history

Signed-in users can save and revisit sessions.

History is available through:

- global history at `/history`
- subject-specific history at `/math/history`, `/physics/history`, `/chemistry/history`, and `/biology/history`

### Settings

Users can manage:

- theme preference
- translation language
- student default learner level
- student default tutor mode
- parent default learner level

### Answer tools

Tutor responses support:

- markdown formatting
- tables
- math rendering through KaTeX
- read aloud
- translation
- graph rendering for supported Math graph requests

## Tech stack

- Next.js App Router
- React
- Supabase Auth
- Supabase database
- Gemini API
- React Markdown
- Remark GFM
- Remark Math
- Rehype KaTeX
- Vercel Analytics
- Vercel Speed Insights
- Three.js / React Three Fiber dependencies reserved for future visual tools

## Local development

Install dependencies:

```bash
npm install