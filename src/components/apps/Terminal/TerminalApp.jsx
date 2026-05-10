import { useState, useRef, useEffect } from 'react'
import about from '../../../data/about'
import skills from '../../../data/skills'
import projects from '../../../data/projects'
import useStore from '../../../store/useStore'

// ── Command definitions ──────────────────────────────────
const COMMANDS = {
  help: () => ({
    type: 'table',
    rows: [
      { cmd: 'help',        desc: 'Show available commands'            },
      { cmd: 'about',       desc: 'Display personal information'       },
      { cmd: 'skills',      desc: 'List all technical skills'          },
      { cmd: 'projects',    desc: 'Show all projects'                  },
      { cmd: 'open <app>',  desc: 'Open an app (e.g. open projects)'   },
      { cmd: 'ls',          desc: 'List all available apps'            },
      { cmd: 'whoami',      desc: 'Quick introduction'                 },
      { cmd: 'date',        desc: 'Show current date and time'         },
      { cmd: 'clear',       desc: 'Clear the terminal'                 },
      { cmd: 'exit',        desc: 'Close the terminal window'          },
    ],
  }),

  about: () => ({
    type: 'info',
    rows: [
      { key: 'Name',     value: about.name            },
      { key: 'Role',     value: about.role            },
      { key: 'Location', value: about.location        },
      { key: 'GitHub',   value: about.contact.github  },
      { key: 'Email',    value: about.contact.email   },
    ],
  }),

  skills: () => ({
    type: 'skills',
    data: skills,
  }),

  projects: () => ({
    type: 'projects',
    data: projects,
  }),

  whoami: () => ({
    type: 'text',
    text: `${about.name} — ${about.role} from ${about.location}`,
  }),

  date: () => ({
    type: 'text',
    text: new Date().toLocaleString('en-US', {
      weekday:  'long',
      year:     'numeric',
      month:    'long',
      day:      'numeric',
      hour:     '2-digit',
      minute:   '2-digit',
      second:   '2-digit',
    }),
  }),

  // ls — list all apps
  ls: () => ({
    type: 'ls',
    apps: [
      { appId: 'about',       label: 'About Me'     },
      { appId: 'education',   label: 'Education'    },
      { appId: 'skills',      label: 'Skills'       },
      { appId: 'projects',    label: 'Projects'     },
      { appId: 'resume',      label: 'Resume'       },
      { appId: 'clientwork',  label: 'Client Work'  },
      { appId: 'terminal',    label: 'Terminal'     },
      { appId: 'contact',     label: 'Contact'      },
      { appId: 'monitor',     label: 'Monitor'      },
      { appId: 'game',        label: 'Snake Game'   },
      { appId: 'filemanager', label: 'File Explorer'},
    ],
  }),

  clear: () => ({ type: 'clear' }),
}

// ── All valid app IDs for open command ───────────────────
const VALID_APPS = [
  'about',
  'education',
  'skills',
  'projects',
  'resume',
  'clientwork',
  'terminal',
  'contact',
  'monitor',
  'game',
  'filemanager',
]

// ── Render output based on type ──────────────────────────
function Output({ result }) {
  if (!result) return null

  // Help table
  if (result.type === 'table') {
    return (
      <div style={{ marginTop: 4 }}>
        {result.rows.map((r, i) => (
          <div key={i} style={{
            display: 'flex',
            lineHeight: 1.8,
          }}>
            <span style={{
              color: '#3fb950',
              minWidth: 140,
              fontWeight: 600,
            }}>
              {r.cmd}
            </span>
            <span style={{ color: '#8b949e' }}>— {r.desc}</span>
          </div>
        ))}
      </div>
    )
  }

  // About info
  if (result.type === 'info') {
    return (
      <div style={{ marginTop: 4 }}>
        {result.rows.map((r, i) => (
          <div key={i} style={{
            display: 'flex',
            lineHeight: 1.8,
          }}>
            <span style={{ color: '#79c0ff', minWidth: 100 }}>
              {r.key}
            </span>
            <span style={{ color: '#e3e3e3' }}>: {r.value}</span>
          </div>
        ))}
      </div>
    )
  }

  // Skills
  if (result.type === 'skills') {
    return (
      <div style={{ marginTop: 4 }}>
        {result.data.map((cat, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <div style={{ color: '#f0b429', fontWeight: 600 }}>
              {cat.icon} {cat.category}
            </div>
            {cat.items.map((s, j) => (
              <div key={j} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                paddingLeft: 16,
                lineHeight: 1.8,
              }}>
                <span style={{ color: '#8b949e', minWidth: 130 }}>
                  {s.name}
                </span>
                <span style={{ color: '#3fb950' }}>
                  {'█'.repeat(Math.round(s.level / 10))}
                  {'░'.repeat(10 - Math.round(s.level / 10))}
                </span>
                <span style={{ color: '#8b949e', fontSize: 11 }}>
                  {s.level}%
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  // Projects
  if (result.type === 'projects') {
    return (
      <div style={{ marginTop: 4 }}>
        {result.data.map((p, i) => (
          <div key={i} style={{
            marginBottom: 12,
            borderLeft: '2px solid #21262d',
            paddingLeft: 12,
          }}>
            <div style={{ color: '#79c0ff', fontWeight: 600 }}>
              [{i + 1}] {p.name}
            </div>
            <div style={{ color: '#8b949e', fontSize: 12 }}>
              {p.tagline}
            </div>
            <div style={{
              color: '#3fb950', fontSize: 11, marginTop: 2,
            }}>
              {p.tech.join(' · ')}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // ls — app directory listing
  if (result.type === 'ls') {
    return (
      <div style={{ marginTop: 4 }}>
        <div style={{
          color: '#8b949e', fontSize: 11,
          marginBottom: 6,
        }}>
          Directory: C:\Portfolio\Apps
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px 16px',
        }}>
          {result.apps.map((app, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              lineHeight: 1.8,
            }}>
              <span style={{ color: '#58a6ff', minWidth: 100 }}>
                {app.appId}
              </span>
              <span style={{ color: '#8b949e', fontSize: 11 }}>
                {app.label}
              </span>
            </div>
          ))}
        </div>
        <div style={{
          color: '#555', fontSize: 11, marginTop: 8,
        }}>
          Use 'open &lt;appId&gt;' to launch any app
        </div>
      </div>
    )
  }

  // Plain text
  if (result.type === 'text') {
    return (
      <div style={{
        color: '#e3e3e3', marginTop: 4, lineHeight: 1.8,
      }}>
        {result.text}
      </div>
    )
  }

  return null
}

// ── Single terminal line ─────────────────────────────────
function Line({ line }) {
  if (line.type === 'input') {
    return (
      <div style={{
        display: 'flex',
        lineHeight: 1.8,
        flexWrap: 'wrap',
        marginTop: 4,
      }}>
        <span style={{ color: '#3fb950', marginRight: 4 }}>PS</span>
        <span style={{ color: '#79c0ff', marginRight: 4 }}>
          C:\Portfolio
        </span>
        <span style={{ color: '#e3e3e3', marginRight: 8 }}>{'>'}</span>
        <span style={{ color: '#e3e3e3' }}>{line.text}</span>
      </div>
    )
  }

  if (line.type === 'error') {
    return (
      <div style={{
        color: '#ff5f57', lineHeight: 1.8,
        display: 'flex', gap: 8,
      }}>
        <span>✖</span>
        <span>{line.text}</span>
      </div>
    )
  }

  if (line.type === 'success') {
    return (
      <div style={{
        color: '#3fb950', lineHeight: 1.8,
        display: 'flex', gap: 8,
      }}>
        <span>✔</span>
        <span>{line.text}</span>
      </div>
    )
  }

  if (line.type === 'system') {
    return (
      <div style={{ color: '#f0b429', lineHeight: 1.8 }}>
        {line.text}
      </div>
    )
  }

  if (line.type === 'output' && line.result) {
    return <Output result={line.result} />
  }

  return (
    <div style={{ color: '#8b949e', lineHeight: 1.8 }}>
      {line.text ?? ''}
    </div>
  )
}

// ── Main Terminal component ──────────────────────────────
export default function TerminalApp() {
  const openWindow  = useStore(s => s.openWindow)
  const closeWindow = useStore(s => s.closeWindow)
  const windows     = useStore(s => s.windows)

  const [lines, setLines] = useState([
    { type: 'system', text: 'Windows PowerShell'                        },
    { type: 'system', text: 'Portfolio OS [Version 1.0.0]'              },
    { type: 'system', text: '(c) Ryan Gachahi. All rights reserved.'    },
    { type: 'output', text: ''                                           },
    { type: 'output', text: "Type 'help' for commands · 'ls' to list all apps" },
    { type: 'output', text: ''                                           },
  ])

  const [input,   setInput]   = useState('')
  const [history, setHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)

  const bottomRef = useRef()
  const inputRef  = useRef()

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const run = () => {
    const raw = input.trim()
    if (!raw) return

    // Save to history
    setHistory(h => [raw, ...h].slice(0, 50))
    setHistIdx(-1)

    const newLines = [{ type: 'input', text: raw }]
    const lower    = raw.toLowerCase()

    // ── open <appId> ──────────────────────────────────
    if (lower.startsWith('open ')) {
      const appId = raw.split(' ')[1]?.toLowerCase()

      if (!appId) {
        newLines.push({
          type: 'error',
          text: 'Usage: open <appId>  (type ls to see all apps)',
        })
      } else if (VALID_APPS.includes(appId)) {
        openWindow(appId)
        newLines.push({
          type: 'success',
          text: `Launching ${appId}...`,
        })
      } else {
        newLines.push({
          type: 'error',
          text: `Unknown app: "${appId}". Type 'ls' to see all apps.`,
        })
      }

      setLines(p => [...p, ...newLines])
      setInput('')
      return
    }

    // ── exit ──────────────────────────────────────────
    if (lower === 'exit') {
      const win = windows.find(w => w.appId === 'terminal')
      if (win) closeWindow(win.id)
      return
    }

    // ── run named command ─────────────────────────────
    const cmd = COMMANDS[lower]
    if (!cmd) {
      newLines.push({
        type: 'error',
        text: `'${raw}' is not recognized. Type 'help' for commands.`,
      })
    } else {
      const result = cmd()

      if (result.type === 'clear') {
        setLines([
          { type: 'system', text: 'Terminal cleared.' },
          { type: 'output', text: '' },
        ])
        setInput('')
        return
      }

      newLines.push({ type: 'output', result })
      newLines.push({ type: 'output', text: '' })
    }

    setLines(p => [...p, ...newLines])
    setInput('')
  }

  // Arrow up/down history + Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { run(); return }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const idx = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(idx)
      setInput(history[idx] ?? '')
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const idx = Math.max(histIdx - 1, -1)
      setHistIdx(idx)
      setInput(idx === -1 ? '' : history[idx])
    }
  }

  return (
    <div
      style={{
        height: '100%',
        background: '#0d1117',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Cascadia Code', 'Consolas', 'Courier New', monospace",
        fontSize: 13,
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* ── Windows Terminal tab bar ─────────────────── */}
      <div style={{
        height: 32,
        background: '#010409',
        display: 'flex',
        alignItems: 'flex-end',
        paddingLeft: 8,
        flexShrink: 0,
        borderBottom: '1px solid #21262d',
      }}>
        {/* Active tab */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 14px',
          background: '#0d1117',
          borderRadius: '4px 4px 0 0',
          border: '1px solid #21262d',
          borderBottom: 'none',
          marginBottom: -1,
        }}>
          <span style={{ fontSize: 12 }}>💻</span>
          <span style={{ fontSize: 12, color: '#e3e3e3' }}>
            PowerShell
          </span>
          <span style={{
            fontSize: 10, color: '#555',
            marginLeft: 4, cursor: 'pointer',
          }}>
            ✕
          </span>
        </div>

        {/* New tab button */}
        <div style={{
          width: 28, height: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#555',
          cursor: 'pointer',
          fontSize: 16,
          marginLeft: 4,
          borderRadius: 4,
        }}>
          +
        </div>
      </div>

      {/* ── Output area ──────────────────────────────── */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px 16px',
      }}>
        {lines.map((line, i) => (
          <Line key={i} line={line} />
        ))}

        {/* Live input prompt */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 4,
        }}>
          <span style={{ color: '#3fb950', marginRight: 4 }}>PS</span>
          <span style={{ color: '#79c0ff', marginRight: 4 }}>
            C:\Portfolio
          </span>
          <span style={{ color: '#e3e3e3', marginRight: 8 }}>{'>'}</span>
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#e3e3e3',
              fontFamily: "'Cascadia Code', 'Consolas', monospace",
              fontSize: 13,
              outline: 'none',
              caretColor: '#e3e3e3',
            }}
            spellCheck={false}
            autoComplete="off"
          />
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  )
}