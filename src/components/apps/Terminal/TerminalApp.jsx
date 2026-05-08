import { useState, useRef, useEffect } from 'react'
import about from '../../../data/about'
import skills from '../../../data/skills'
import projects from '../../../data/projects'
import useStore from '../../../store/useStore'

// All supported commands
const COMMANDS = {
  help: () => `
Available commands:
  help       — show this list
  about      — who I am
  skills     — my tech skills
  projects   — my projects
  open       — open an app  (e.g. open projects)
  clear      — clear terminal
  whoami     — quick intro
  date       — current date
`.trim(),

  about: () => `
Name:     ${about.name}
Role:     ${about.role}
Location: ${about.location}

${about.bio}
`.trim(),

  skills: () => {
    return skills.map(cat =>
      `${cat.icon} ${cat.category}:\n` +
      cat.items.map(s => `   ${s.name} (${s.level}%)`).join('\n')
    ).join('\n\n')
  },

  projects: () => {
    return projects.map((p, i) =>
      `[${i + 1}] ${p.name}\n    ${p.tagline}\n    Tech: ${p.tech.join(', ')}`
    ).join('\n\n')
  },

  whoami: () => `${about.name} — ${about.role} from ${about.location}`,

  date: () => new Date().toLocaleString(),

  clear: () => '__CLEAR__',
}

export default function TerminalApp() {
  const openWindow = useStore(s => s.openWindow)
  const [lines, setLines] = useState([
    { type: 'system', text: '🖥️  Portfolio OS Terminal v1.0' },
    { type: 'system', text: "Type 'help' to see available commands." },
    { type: 'system', text: '─────────────────────────────────' },
  ])
  const [input, setInput]       = useState('')
  const [history, setHistory]   = useState([])
  const [histIdx, setHistIdx]   = useState(-1)
  const bottomRef = useRef()
  const inputRef  = useRef()

  // Auto scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const run = () => {
    const raw = input.trim()
    if (!raw) return

    // Save to history
    setHistory(h => [raw, ...h].slice(0, 50))
    setHistIdx(-1)

    // Echo the command
    const newLines = [{ type: 'input', text: `$ ${raw}` }]

    // Handle "open <appId>"
    if (raw.startsWith('open ')) {
      const appId = raw.split(' ')[1]
      const validApps = ['about', 'education', 'skills', 'projects', 'contact', 'monitor']
      if (validApps.includes(appId)) {
        openWindow(appId)
        newLines.push({ type: 'output', text: `Opening ${appId}...` })
      } else {
        newLines.push({
          type: 'error',
          text: `Unknown app: "${appId}". Try: ${validApps.join(', ')}`,
        })
      }
      setLines(prev => [...prev, ...newLines])
      setInput('')
      return
    }

    const cmd = COMMANDS[raw.toLowerCase()]
    if (!cmd) {
      newLines.push({
        type: 'error',
        text: `Command not found: "${raw}". Type 'help' for options.`,
      })
    } else {
      const result = cmd()
      if (result === '__CLEAR__') {
        setLines([{ type: 'system', text: 'Terminal cleared.' }])
        setInput('')
        return
      }
      // Split multiline output into separate lines
      result.split('\n').forEach(line =>
        newLines.push({ type: 'output', text: line })
      )
    }

    setLines(prev => [...prev, ...newLines])
    setInput('')
  }

  // Arrow up/down to navigate history
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

  const getColor = (type) => {
    if (type === 'input')  return '#e3e3e3'
    if (type === 'error')  return '#ff5f57'
    if (type === 'system') return '#febc2e'
    return '#58a6ff'
  }

  return (
    <div
      style={{
        height: '100%',
        background: '#0d1117',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Courier New', monospace",
        fontSize: 13,
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output area */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '12px 16px',
      }}>
        {lines.map((line, i) => (
          <pre key={i} style={{
            margin: '2px 0',
            color: getColor(line.type),
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            lineHeight: 1.6,
          }}>
            {line.text}
          </pre>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div style={{
        display: 'flex', alignItems: 'center',
        gap: 8, padding: '8px 16px',
        borderTop: '1px solid #21262d',
        background: '#161b22',
      }}>
        <span style={{ color: '#3fb950', fontWeight: 700 }}>$</span>
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
            fontFamily: "'Courier New', monospace",
            fontSize: 13,
            outline: 'none',
            caretColor: '#58a6ff',
          }}
          placeholder="type a command..."
          spellCheck={false}
        />
      </div>
    </div>
  )
}