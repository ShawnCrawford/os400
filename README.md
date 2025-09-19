# os400-ver-2

## Project Overview
This project reimagines an AS/400-inspired CRM for modern desktop users, emphasizing efficient keyboard-driven workflows, a minimalistic two-pane workspace, and contextual actions that mirror legacy function-key behavior while delivering a polished native experience. The default layout keeps core client information in the top pane and the latest journals, tagged notes, or history in the bottom pane, with each pane able to switch independently to related views. The roadmap targets inside sales, account management, support, and operations teams with capabilities for lead management, customer records, ticketing, and analytics. See the [CRM Modernization Vision](docs/vision.md) for detailed user personas, use cases, interaction design goals (including the menu-driven launchpad), roadmap milestones, and integration dependencies as we progress from desktop delivery to future web experiences.

## Getting Started

The `desktop-app` directory contains the open-source Electron + Vite + React scaffold that will power the Mac and Linux client. To run it locally:

```bash
cd desktop-app
npm install
npm run dev
```

The development server starts both the Electron main process and the renderer so you can iterate on the AS/400-inspired two-pane workspace with hot module reloading. Use `npm run build` to produce production-ready bundles and platform installers once features are implemented.
