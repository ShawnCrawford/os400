# OS400 Desktop Client

This package houses the Electron + Vite + React desktop shell for the AS/400-inspired CRM experience. It provides a native-feeling, keyboard-friendly workspace that mirrors the two-pane layout defined in the project vision while remaining portable across macOS and Linux.

## Tech Stack

- **Electron 30** for cross-platform desktop packaging and access to native capabilities.
- **Vite 5 + React 18 + TypeScript** for a fast, modular renderer that can evolve into the AS/400-style split workspace.
- **Electron Builder** for generating production installers when we are ready to distribute builds.

## Local Development

```bash
npm install
npm run dev
```

The `dev` script launches the Vite development server and attaches the Electron main process with hot module replacement. Changes made under `src/` will reload instantly in the renderer window.

## Building Distributables

```bash
npm run build
```

The build pipeline type-checks the project, creates production bundles for the renderer and main processes, and invokes Electron Builder to produce platform-specific artifacts. macOS and Linux binaries can be created from the same codebase.

## Next Steps

- Implement the numeric launch menu and routing into CRM modules.
- Build the two-pane layout components with pane-swapping controls for client context and journal activity.
- Integrate with the service layer defined in the broader project roadmap (authentication, data access, reporting).

Contributions are welcome—feel free to open issues or pull requests as we flesh out the experience.
