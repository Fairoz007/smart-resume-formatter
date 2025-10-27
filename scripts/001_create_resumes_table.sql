-- Create resumes table
create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  template_id text not null default 'modern',
  content jsonb not null default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create resume_versions table for tracking changes
create table if not exists public.resume_versions (
  id uuid primary key default gen_random_uuid(),
  resume_id uuid not null references public.resumes(id) on delete cascade,
  content jsonb not null,
  version_number integer not null,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.resumes enable row level security;
alter table public.resume_versions enable row level security;

-- RLS Policies for resumes
create policy "Users can view their own resumes"
  on public.resumes for select
  using (auth.uid() = user_id);

create policy "Users can insert their own resumes"
  on public.resumes for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own resumes"
  on public.resumes for update
  using (auth.uid() = user_id);

create policy "Users can delete their own resumes"
  on public.resumes for delete
  using (auth.uid() = user_id);

-- RLS Policies for resume_versions
create policy "Users can view versions of their resumes"
  on public.resume_versions for select
  using (
    exists (
      select 1 from public.resumes
      where resumes.id = resume_versions.resume_id
      and resumes.user_id = auth.uid()
    )
  );

create policy "Users can insert versions for their resumes"
  on public.resume_versions for insert
  with check (
    exists (
      select 1 from public.resumes
      where resumes.id = resume_versions.resume_id
      and resumes.user_id = auth.uid()
    )
  );
