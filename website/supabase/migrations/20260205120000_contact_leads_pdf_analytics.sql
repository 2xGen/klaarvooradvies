-- Run in Supabase: SQL Editor > New query > paste > Run
-- Service role (server) bypasses RLS; no public policies = browser anon cannot read/write.

create extension if not exists "pgcrypto";

-- Contact page form (no secrets)
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  message text not null
);

-- Hypotheek situatieschets: opt-in adviseur + contactgegevens (from /api/hypotheek-lead)
create table if not exists public.hypotheek_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  notes text,
  zoekt_hypotheek_advies text,
  estimated_max double precision,
  aanleiding text,
  tijdlijn text,
  gross_income double precision,
  interest_rate double precision,
  study_monthly double precision,
  has_partner boolean,
  advisor_contact_consent boolean not null default true,
  consent_recorded_at timestamptz
);

-- One row per successful PDF download from the wizard (for counts / funnel)
create table if not exists public.situatieschets_pdf_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  has_partner boolean,
  advisor_opt_in boolean not null default false,
  lead_eligible boolean not null default false
);

create index if not exists situatieschets_pdf_events_created_at_idx
  on public.situatieschets_pdf_events (created_at desc);

alter table public.contact_submissions enable row level security;
alter table public.hypotheek_leads enable row level security;
alter table public.situatieschets_pdf_events enable row level security;

-- Count PDFs created:
--   select count(*) from public.situatieschets_pdf_events;
-- With advisor intent:
--   select count(*) from public.situatieschets_pdf_events where advisor_opt_in;
