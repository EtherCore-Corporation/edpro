create table if not exists public.leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  city text not null,
  source text not null default 'website',
  user_agent text
);

create table if not exists public.bookings (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  company text not null,
  booking_date date not null,
  booking_time time not null,
  user_agent text
);

alter table public.leads enable row level security;
alter table public.bookings enable row level security;

create policy "deny direct anonymous leads writes" on public.leads
for all
using (false)
with check (false);

create policy "deny direct anonymous bookings writes" on public.bookings
for all
using (false)
with check (false);
