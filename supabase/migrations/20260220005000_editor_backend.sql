alter table public.profiles
  add column if not exists role text not null default 'member',
  add constraint profiles_role_check check (role in ('member', 'admin'));

create table if not exists public.ai_generations (
  id uuid primary key default gen_random_uuid(),
  brief_id uuid,
  topic text not null,
  seed_links jsonb not null default '[]'::jsonb,
  notes text,
  recency_window_days int not null default 14,
  extracted_sources jsonb not null default '[]'::jsonb,
  citations jsonb not null default '[]'::jsonb,
  prompt_version text not null,
  provider text not null,
  model text not null,
  output jsonb,
  status text not null default 'queued' check (status in ('queued', 'running', 'succeeded', 'failed')),
  error text,
  tokens_in int,
  tokens_out int,
  created_at timestamptz not null default now()
);

create table if not exists public.briefs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  publish_date date,
  cover_image text,
  content jsonb not null default '{}'::jsonb,
  needs_review boolean not null default true,
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id),
  archived boolean not null default false,
  ai_generation_id uuid references public.ai_generations(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.ai_generations
  add constraint ai_generations_brief_id_fkey
  foreign key (brief_id) references public.briefs(id) on delete set null;

create index if not exists briefs_status_idx on public.briefs(status);
create index if not exists briefs_publish_date_idx on public.briefs(publish_date desc);
create index if not exists briefs_needs_review_idx on public.briefs(needs_review) where archived = false;
create index if not exists ai_generations_status_idx on public.ai_generations(status);
create index if not exists ai_generations_brief_id_idx on public.ai_generations(brief_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists briefs_updated_at on public.briefs;
create trigger briefs_updated_at
  before update on public.briefs
  for each row execute procedure public.set_updated_at();

alter table public.briefs enable row level security;
alter table public.ai_generations enable row level security;

create policy "Public can read published briefs"
  on public.briefs
  for select
  using (status = 'published' and archived = false);

create policy "Admin full access briefs"
  on public.briefs
  for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "Admin full access ai generations"
  on public.ai_generations
  for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );
