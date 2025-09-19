import { FormEvent, useMemo, useState } from 'react'
import './App.css'

type MenuItem = {
  id: string
  label: string
  description: string
  defaultTopView?: string
  defaultBottomView?: string
}

type TopPaneField = {
  term: string
  detail: string
}

type TopPaneView = {
  id: string
  label: string
  description: string
  fields: TopPaneField[]
  reminders?: string[]
}

type BottomPaneEntry = {
  title: string
  timestamp: string
  summary: string
  tag: string
}

type BottomPaneView = {
  id: string
  label: string
  description: string
  entries: BottomPaneEntry[]
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    label: 'Clients',
    description: 'Search and manage client records, ownership, and health insights.',
    defaultTopView: 'client-context',
    defaultBottomView: 'journals',
  },
  {
    id: '2',
    label: 'Journals',
    description: 'Scan system-wide journal updates and monitor collaboration threads.',
    defaultTopView: 'journal-browser',
    defaultBottomView: 'tagged-journals',
  },
  {
    id: '3',
    label: 'Contacts',
    description: 'Maintain contact hierarchies, primary roles, and communication preferences.',
    defaultTopView: 'contact-directory',
    defaultBottomView: 'call-notes',
  },
  {
    id: '4',
    label: 'Call Notes',
    description: 'Capture live call outcomes, tasks, and follow-up assignments.',
    defaultTopView: 'client-context',
    defaultBottomView: 'call-notes',
  },
]

const topPaneViews: TopPaneView[] = [
  {
    id: 'client-context',
    label: 'Client Context',
    description: 'Snapshot of the selected client including contracts, owners, and current status.',
    fields: [
      { term: 'Client', detail: 'Acme Industrial Co.' },
      { term: 'Account Owner', detail: 'Dana Lee' },
      { term: 'Lifecycle Stage', detail: 'Active · Renewal 2025-02-01' },
      { term: 'Health', detail: 'Stable · SLA at 98%' },
    ],
    reminders: ['Next Task: Q4 planning call · due Jul 18, 2024'],
  },
  {
    id: 'journal-browser',
    label: 'Journal Browser',
    description: 'Filterable stream of cross-team updates that affect this client portfolio.',
    fields: [
      { term: 'Active Filters', detail: 'Client = Acme · Tag = Renewal' },
      { term: 'Last Sync', detail: 'Jul 12, 2024 07:45' },
      { term: 'New Entries', detail: '3 since last review' },
      { term: 'Owners Watching', detail: 'Dana Lee, Miguel Ortiz' },
    ],
  },
  {
    id: 'contact-directory',
    label: 'Contact Directory',
    description: 'Primary and alternate contacts aligned to roles and communication preferences.',
    fields: [
      { term: 'Executive Sponsor', detail: 'Jordan Patel · jordan.patel@acme.example · +1 415-555-0142' },
      { term: 'Operations Lead', detail: 'Morgan Reid · morgan.reid@acme.example · +1 415-555-0179' },
      { term: 'Support Channel', detail: 'Shared inbox · support@acme.example' },
      { term: 'Preferences', detail: 'No SMS · Weekly digest on Mondays' },
    ],
  },
  {
    id: 'demographics',
    label: 'Demographics',
    description: 'Static profile attributes captured from onboarding and enrichment feeds.',
    fields: [
      { term: 'Industry', detail: 'Industrial Automation' },
      { term: 'Employees', detail: '1,200' },
      { term: 'Headquarters', detail: 'Portland, OR · USA' },
      { term: 'ERP', detail: 'Infor CloudSuite' },
    ],
  },
]

const bottomPaneViews: BottomPaneView[] = [
  {
    id: 'journals',
    label: 'Latest Journals',
    description: 'Chronological feed of journal entries associated with this client.',
    entries: [
      {
        title: 'Quarterly Business Review Recap',
        timestamp: 'Jul 11, 2024 · 15:45',
        summary: 'Captured executive feedback on renewal terms and flagged pricing adjustments for finance.',
        tag: 'Journal',
      },
      {
        title: 'SLA Dashboard Shared',
        timestamp: 'Jul 10, 2024 · 09:02',
        summary: 'Posted weekly SLA performance with commentary for operations leadership.',
        tag: 'Journal',
      },
    ],
  },
  {
    id: 'tagged-journals',
    label: 'Tagged Activity',
    description: 'Entries where the client was mentioned or tagged for visibility.',
    entries: [
      {
        title: 'Migration Risk Assessment',
        timestamp: 'Jul 09, 2024 · 12:17',
        summary: 'Implementation squad flagged a potential risk on the Phase 2 rollout and tagged the account team.',
        tag: 'Tagged',
      },
      {
        title: 'CSAT Response Review',
        timestamp: 'Jul 08, 2024 · 08:41',
        summary: 'Support highlighted a neutral CSAT response; action required before next steering committee.',
        tag: 'Tagged',
      },
    ],
  },
  {
    id: 'call-notes',
    label: 'Call Notes',
    description: 'Recent call logs with outcomes, owners, and next steps.',
    entries: [
      {
        title: 'Renewal Prep Call',
        timestamp: 'Jul 12, 2024 · 10:05',
        summary: 'Confirmed executive sponsor availability and aligned on success metrics for the renewal deck.',
        tag: 'Call',
      },
      {
        title: 'Weekly Operations Sync',
        timestamp: 'Jul 05, 2024 · 13:30',
        summary: 'Discussed ticket backlog and assigned Dana Lee as escalation contact for urgent incidents.',
        tag: 'Call',
      },
    ],
  },
  {
    id: 'profile-history',
    label: 'Profile History',
    description: 'Audit trail of profile updates and field edits.',
    entries: [
      {
        title: 'Billing Contact Updated',
        timestamp: 'Jul 03, 2024 · 16:22',
        summary: 'Swapped billing contact to Morgan Reid following finance request and triggered DocuSign refresh.',
        tag: 'Profile',
      },
      {
        title: 'Segment Reclassification',
        timestamp: 'Jun 28, 2024 · 11:18',
        summary: 'Operations reclassified client from Mid-Market to Enterprise for FY25 planning.',
        tag: 'Profile',
      },
    ],
  },
]

function App() {
  const [menuSelection, setMenuSelection] = useState('')
  const [activeMenu, setActiveMenu] = useState(menuItems[0].id)
  const [topViewId, setTopViewId] = useState(topPaneViews[0].id)
  const [bottomViewId, setBottomViewId] = useState(bottomPaneViews[0].id)

  const activeTopView = useMemo(
    () => topPaneViews.find((view) => view.id === topViewId) ?? topPaneViews[0],
    [topViewId],
  )

  const activeBottomView = useMemo(
    () => bottomPaneViews.find((view) => view.id === bottomViewId) ?? bottomPaneViews[0],
    [bottomViewId],
  )

  const setMenuWithDefaults = (item: MenuItem) => {
    setActiveMenu(item.id)
    if (item.defaultTopView) {
      setTopViewId(item.defaultTopView)
    }
    if (item.defaultBottomView) {
      setBottomViewId(item.defaultBottomView)
    }
  }

  const handleMenuSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = menuSelection.trim()
    const match = menuItems.find((item) => item.id === trimmed)

    if (match) {
      setMenuWithDefaults(match)
    }

    setMenuSelection('')
  }

  return (
    <div className="app-shell">
      <header className="command-bar">
        <div className="command-title">Welcome to OS400</div>
        <form className="command-form" onSubmit={handleMenuSubmit}>
          <label htmlFor="menu-selection">Menu Selection</label>
          <div className="input-wrapper">
            <span className="prompt">➡︎</span>
            <input
              id="menu-selection"
              name="menu-selection"
              value={menuSelection}
              onChange={(event) => setMenuSelection(event.target.value)}
              placeholder={activeMenu}
              inputMode="numeric"
              aria-label="Menu selection"
            />
          </div>
        </form>
      </header>

      <section className="menu-panel" aria-label="Primary navigation">
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`menu-item${item.id === activeMenu ? ' active' : ''}`}
                onClick={() => setMenuWithDefaults(item)}
              >
                <span className="menu-id">{item.id}.</span>
                <span className="menu-copy">
                  <span className="menu-label">{item.label}</span>
                  <span className="menu-description">{item.description}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <main className="workspace">
        <section className="pane">
          <header className="pane-header">
            <div className="pane-title">{activeTopView.label}</div>
            <nav className="pane-tabs" aria-label="Top pane views">
              {topPaneViews.map((view) => (
                <button
                  key={view.id}
                  type="button"
                  className={`pane-tab${view.id === topViewId ? ' active' : ''}`}
                  onClick={() => setTopViewId(view.id)}
                >
                  {view.label}
                </button>
              ))}
            </nav>
          </header>
          <div className="pane-content">
            <p className="pane-description">{activeTopView.description}</p>
            <dl className="detail-grid">
              {activeTopView.fields.map((field) => (
                <div key={field.term} className="detail-row">
                  <dt>{field.term}</dt>
                  <dd>{field.detail}</dd>
                </div>
              ))}
            </dl>
            {activeTopView.reminders && (
              <ul className="reminder-list">
                {activeTopView.reminders.map((reminder) => (
                  <li key={reminder}>{reminder}</li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="pane">
          <header className="pane-header">
            <div className="pane-title">{activeBottomView.label}</div>
            <nav className="pane-tabs" aria-label="Bottom pane views">
              {bottomPaneViews.map((view) => (
                <button
                  key={view.id}
                  type="button"
                  className={`pane-tab${view.id === bottomViewId ? ' active' : ''}`}
                  onClick={() => setBottomViewId(view.id)}
                >
                  {view.label}
                </button>
              ))}
            </nav>
          </header>
          <div className="pane-content">
            <p className="pane-description">{activeBottomView.description}</p>
            <div className="activity-list">
              {activeBottomView.entries.map((entry) => (
                <article key={`${entry.timestamp}-${entry.title}`} className="activity-card">
                  <header className="activity-header">
                    <span className="activity-tag">{entry.tag}</span>
                    <span className="activity-timestamp">{entry.timestamp}</span>
                  </header>
                  <h3>{entry.title}</h3>
                  <p>{entry.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
