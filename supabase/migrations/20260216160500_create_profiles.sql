create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  subscription_status text not null default 'free',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_subscription_status_check
    check (subscription_status in ('free', 'active', 'trialing', 'past_due', 'canceled', 'unpaid'))
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id);

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user_profile();
