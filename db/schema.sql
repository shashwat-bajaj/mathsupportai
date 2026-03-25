create extension if not exists pgcrypto;

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  stripe_customer_id text,
  plan text not null default 'free',
  status text not null default 'inactive',
  created_at timestamptz not null default now()
);

create table if not exists learner_sessions (
  id uuid primary key default gen_random_uuid(),
  email text,
  mode text,
  level text,
  prompt text not null,
  response text,
  created_at timestamptz not null default now()
);

create table if not exists learner_mistakes (
  id uuid primary key default gen_random_uuid(),
  email text,
  topic text,
  mistake_type text,
  example text,
  created_at timestamptz not null default now()
);

create table if not exists mastery_scores (
  id uuid primary key default gen_random_uuid(),
  email text,
  topic text not null,
  score numeric not null default 0,
  updated_at timestamptz not null default now(),
  unique (email, topic)
);
