# AKRAM INTERIOR — All Phases

Phase 1: Supabase Auth + protected admin.
Phase 2: Projects + cover and multiple gallery photo uploads.
Phase 3: Services CRUD, ordering, publish/hide.
Phase 4: Homepage hero + stats editor.
Phase 5: Enquiries + contact/social settings.
Phase 6: Responsive CMS/public UI.

## Setup
1. Create Supabase project.
2. Run `supabase-schema.sql` in SQL Editor.
3. Create admin user under Authentication > Users.
4. Copy `.env.local` to `.env.local`, add URL and anon key.
5. Run `npm install` and `npm run dev`.
6. Visit `/admin/login`.

Do not put a Supabase service_role key in the frontend environment.
