-- Create shared_resumes table for public sharing
create table if not exists public.shared_resumes (
  id uuid primary key default gen_random_uuid(),
  resume_id uuid not null references public.resumes(id) on delete cascade,
  share_token text not null unique,
  created_at timestamp with time zone default now(),
  expires_at timestamp with time zone
);

-- Enable RLS
alter table public.shared_resumes enable row level security;

-- RLS Policies
create policy "Users can view their own shares"
  on public.shared_resumes for select
  using (
    exists (
      select 1 from public.resumes
      where resumes.id = shared_resumes.resume_id
      and resumes.user_id = auth.uid()
    )
  );

create policy "Users can create shares for their resumes"
  on public.shared_resumes for insert
  with check (
    exists (
      select 1 from public.resumes
      where resumes.id = shared_resumes.resume_id
      and resumes.user_id = auth.uid()
    )
  );

create policy "Users can delete their shares"
  on public.shared_resumes for delete
  using (
    exists (
      select 1 from public.resumes
      where resumes.id = shared_resumes.resume_id
      and resumes.user_id = auth.uid()
    )
  );

-- Allow public access to view shared resumes
create policy "Anyone can view shared resumes"
  on public.resumes for select
  using (
    exists (
      select 1 from public.shared_resumes
      where shared_resumes.resume_id = resumes.id
      and (shared_resumes.expires_at is null or shared_resumes.expires_at > now())
    )
  );
