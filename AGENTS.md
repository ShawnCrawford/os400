# Repository Guidelines

## Project Structure & Module Organization
- `desktop-app/` is the active workspace; run npm scripts here.
- `src/` hosts the renderer (React + TypeScript); group screens by feature and route through `App.tsx`.
- `electron/` contains `main.ts` and `preload.ts`; keep OS integrations behind preload bridges.
- `public/` holds static assets and window chrome; update icons here before packaging.
- `docs/vision.md` documents the CRM storyline; keep UX copy and flows aligned.

## Build, Test, and Development Commands
- `npm install` (inside `desktop-app/`) installs dependencies.
- `npm run dev` opens Vite + Electron with hot reload for renderer and main.
- `npm run lint` runs ESLint (TypeScript + React Hooks) and must pass pre-PR.
- `npm run build` type-checks, bundles renderer/main, and triggers Electron Builder output under `dist/`.
- `npm run preview` serves the built renderer for browser-only debugging.

## Coding Style & Naming Conventions
- TypeScript strict mode is enforced; favor functional components and explicit prop typings.
- Use two-space indentation, single quotes, PascalCase component files (`ClientPanel.tsx`), camelCase helpers, kebab-case CSS classes.
- Keep shared utilities in dedicated feature folders; avoid cross-importing from `electron/` into `src/`.
- Resolve lint warnings rather than disabling them; document any rule exceptions in the PR.

## Testing Guidelines
- Automated tests are pending; target Vitest + Testing Library with co-located `*.test.tsx` files.
- Meanwhile, smoke-test via `npm run dev`, exercise numeric menus, and confirm pane swaps plus preload isolation.
- Capture manual test notes and any known gaps in the PR description or linked issues.

## Commit & Pull Request Guidelines
- Write concise, imperative commit titles (for example, `Add client journal pane`) and keep bodies wrapped near 72 characters.
- Branch names should reflect scope (`renderer/menu-shortcuts`, `electron/ipc-auth`); push drafts early for feedback.
- Pull requests need a change summary, test evidence (command + result), linked issues, and UI captures when visuals change.
- Request review only after `npm run lint` and `npm run build` succeed locally; call out TODOs or follow-ups explicitly.

## Agent Workflow Notes
- Route privileged operations through `electron/main.ts`; expose the minimum surface from `preload.ts`.
- Share roadmap or UX deviations by updating `docs/vision.md` and referencing the relevant section in your PR.
