# CampusConnect

A student project for discovering internships, campus jobs, research opportunities, and campus events. Built with Next.js, React, TypeScript, and NextAuth.

## Run in VS Code

Open a terminal inside `campus-connect` and run:

```sh
npm install
npm run dev
```

Open http://localhost:3000. Visitors are redirected to `/login`; successful sign-in opens `/dashboard`. The dashboard and account pages check the session on the server. Stop the server with Ctrl+C.

## Current functionality

- Sample opportunities with keyword, type, location, and work arrangement filters.
- Sample events with keyword, category, and date filters.
- Listing details in keyboard-accessible dialogs.
- Bookmarked opportunities and events.
- Application statuses: Saved, Applied, Interview, Accepted, Rejected.
- Editable student profile, accessible from the avatar on desktop and mobile.
- Browser-local persistence. Data is stored under a separate browser-local key for each signed-in email. It does not sync between devices and is not a secure database.
- Dedicated login page, protected dashboard, and account page with sign-out. Only configured OAuth providers appear.

Sample listings do not accept applications or registrations. No shared database, posting forms, or server-enforced posting roles are implemented yet.

## Authentication setup

Keep `.env.local` private; it is ignored by Git. Supported configuration names:

```dotenv
AUTH_SECRET=your-random-session-secret
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
# Optional:
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret
```

For compatibility with the original starter, `BETTER_AUTH_SECRET` is accepted when `AUTH_SECRET` is absent. Use `AUTH_SECRET` for new setups. Only providers with both credentials are offered on `/account`.

Configure the local OAuth callback in the provider console:

- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

A real provider login must be tested in a browser. Account login currently does not synchronize demo workspace data.

## Validation

```sh
npm run lint
npx tsc --noEmit
npm run build -- --webpack
```

The webpack option provides a production build without requiring a Turbopack development server. Fonts use the system font stack and do not require Google Fonts downloads.

## Manual walkthrough

1. Search for Python; try Remote and Research filters; reset filters.
2. Open listing details. Check Tab navigation and Escape to close.
3. Save a listing, open Applications, and change its status to Applied.
4. Save an event and find it in Saved items.
5. Edit your profile using the avatar. Refresh and check persistence.
6. Repeat on a narrow/mobile window.
7. Open the site while signed out and confirm it opens the login page. Complete Google login and confirm it opens the dashboard. Use My account to sign out; opening /dashboard again should return to login.

## Next implementation stages

1. Set up shared database storage for users, profiles, listings, events, bookmarks, and application states.
2. Connect authenticated users to their own records and protect server mutations.
3. Add professor/recruiter ownership and administrator moderation; never allow a user to grant themselves a posting role.
4. Add validated listing/event create, edit, and removal forms, external URLs, and expiration handling.
5. Test authorization, deploy, and configure production OAuth callback URLs.

Local source edits appear in VS Code. They reach GitHub only after a commit and push.
