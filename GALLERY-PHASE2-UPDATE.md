# AKRAM INTERIOR — Gallery Update

This version updates Phase 2 gallery behavior.

## What changed
- Public project pages now show a clickable cover photo and all project photos.
- Clicking any photo opens a full-screen lightbox.
- Previous / next navigation works with buttons and keyboard arrows.
- Escape closes the gallery.
- Photo counter is shown.
- Gallery order is based on `sort_order`.
- Admin gallery uploads now receive unique sequential sort_order values.
- Admin gallery thumbnails can be opened in a new tab.
- Admin can set any uploaded photo as the project cover.
- Admin can delete individual gallery photos.
- Existing `.env.local` is intentionally NOT included in this ZIP.

## Apply to your local project
1. Stop `npm run dev` with Ctrl+C.
2. Back up your current project folder.
3. Extract this ZIP over the project folder and replace the existing source files.
4. Keep your existing `.env.local`.
5. You can keep your existing `node_modules`; no reinstall is required if dependencies have not changed.
6. Start:
   npm run dev
7. Test:
   http://localhost:3000/admin/projects
   and a public project:
   http://localhost:3000/projects/<your-project-slug>

No Supabase SQL migration is required for this update.
