import { useState } from 'react'
import useStore from '../../../store/useStore'

// ── File system structure ────────────────────────────────
const FILE_SYSTEM = {
  'Desktop': {
    type: 'folder',
    children: {
      'About Me':    { type: 'app', appId: 'about',      icon: '👤', ext: 'app' },
      'Education':   { type: 'app', appId: 'education',  icon: '🎓', ext: 'app' },
      'Skills':      { type: 'app', appId: 'skills',     icon: '⚙️', ext: 'app' },
      'Projects':    { type: 'app', appId: 'projects',   icon: '🗂️', ext: 'app' },
      'Terminal':    { type: 'app', appId: 'terminal',   icon: '💻', ext: 'app' },
      'Monitor':     { type: 'app', appId: 'monitor',    icon: '📊', ext: 'app' },
    },
  },
  'Documents': {
    type: 'folder',
    children: {
      'Resume':      { type: 'app', appId: 'resume',     icon: '📄', ext: 'pdf' },
      'Client Work': { type: 'app', appId: 'clientwork', icon: '💼', ext: 'folder' },
      'Projects':    { type: 'app', appId: 'projects',   icon: '🗂️', ext: 'folder' },
    },
  },
  'Games': {
    type: 'folder',
    children: {
      'Snake':       { type: 'app', appId: 'game',       icon: '🎮', ext: 'exe' },
    },
  },
  'Contact': {
    type: 'folder',
    children: {
      'Get In Touch':{ type: 'app', appId: 'contact',    icon: '📬', ext: 'app' },
    },
  },
}

// ── Sidebar nav item ─────────────────────────────────────
function SideItem({ icon, label, isActive, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '5px 10px',
        borderRadius: 4,
        cursor: 'pointer',
        fontSize: 12,
        color: isActive ? '#0078D4' : '#333',
        background: isActive
          ? '#e8f0fe'
          : hovered ? 'rgba(0,0,0,0.05)' : 'transparent',
        fontWeight: isActive ? 600 : 400,
        transition: 'all 0.12s',
        userSelect: 'none',
      }}
    >
      <span style={{ fontSize: 15, flexShrink: 0 }}>{icon}</span>
      <span style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
    </div>
  )
}

// ── File / folder card in content area ───────────────────
function FileCard({ name, item, onOpen, onDoubleClick }) {
  const [hovered,  setHovered]  = useState(false)
  const [selected, setSelected] = useState(false)

  const extColors = {
    pdf:    { bg: '#fde8e8', color: '#c42b1c' },
    exe:    { bg: '#e8f5e9', color: '#107C10' },
    app:    { bg: '#e8f0fe', color: '#0078D4' },
    folder: { bg: '#fff8e8', color: '#8a6200' },
  }
  const extStyle = extColors[item.ext] ?? extColors.app

  return (
    <div
      onClick={() => setSelected(s => !s)}
      onDoubleClick={() => onDoubleClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        padding: '12px 8px',
        borderRadius: 6,
        cursor: 'default',
        background: selected
          ? 'rgba(0,120,212,0.12)'
          : hovered ? 'rgba(0,0,0,0.04)' : 'transparent',
        border: `1px solid ${selected
          ? 'rgba(0,120,212,0.3)'
          : 'transparent'}`,
        transition: 'all 0.12s',
        userSelect: 'none',
        minWidth: 80,
      }}
    >
      {/* File icon */}
      <div style={{
        width: 52, height: 52,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 36,
        position: 'relative',
      }}>
        {item.icon}
        {/* Extension badge */}
        <div style={{
          position: 'absolute',
          bottom: 0, right: 0,
          background: extStyle.bg,
          color: extStyle.color,
          fontSize: 8,
          fontWeight: 700,
          padding: '1px 4px',
          borderRadius: 3,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}>
          {item.ext}
        </div>
      </div>

      {/* File name */}
      <span style={{
        fontSize: 11,
        color: '#1a1a1a',
        textAlign: 'center',
        lineHeight: 1.3,
        maxWidth: 80,
        wordBreak: 'break-word',
      }}>
        {name}
      </span>
    </div>
  )
}

// ── Toolbar button ───────────────────────────────────────
function ToolBtn({ label, onClick, disabled }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        height: 26,
        padding: '0 10px',
        background: hovered && !disabled
          ? 'rgba(0,0,0,0.06)' : 'transparent',
        border: `1px solid ${hovered && !disabled
          ? 'rgba(0,0,0,0.15)' : 'transparent'}`,
        borderRadius: 4,
        fontSize: 12,
        color: disabled ? '#bbb' : '#333',
        cursor: disabled ? 'default' : 'pointer',
        transition: 'all 0.12s',
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {label}
    </button>
  )
}

// ── Main File Manager ────────────────────────────────────
export default function FileManagerApp() {
  const { openWindow } = useStore()

  const [currentFolder, setCurrentFolder] = useState('Desktop')
  const [history,       setHistory]       = useState(['Desktop'])
  const [histIdx,       setHistIdx]       = useState(0)
  const [search,        setSearch]        = useState('')

  const folder     = FILE_SYSTEM[currentFolder]
  const files      = folder?.children ?? {}
  const allFolders = Object.keys(FILE_SYSTEM)

  // Filter by search
  const filteredFiles = Object.entries(files).filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase())
  )

  // ── Navigation ───────────────────────────────────────
  const navigate = (folderName) => {
    const newHistory = [...history.slice(0, histIdx + 1), folderName]
    setHistory(newHistory)
    setHistIdx(newHistory.length - 1)
    setCurrentFolder(folderName)
    setSearch('')
  }

  const goBack = () => {
    if (histIdx > 0) {
      const prev = history[histIdx - 1]
      setHistIdx(histIdx - 1)
      setCurrentFolder(prev)
      setSearch('')
    }
  }

  const goForward = () => {
    if (histIdx < history.length - 1) {
      const next = history[histIdx + 1]
      setHistIdx(histIdx + 1)
      setCurrentFolder(next)
      setSearch('')
    }
  }

  // ── Open file/app ─────────────────────────────────────
  const openItem = (item) => {
    if (item.type === 'app') {
      openWindow(item.appId)
    } else if (item.type === 'folder') {
      navigate(item.name)
    }
  }

  const canBack    = histIdx > 0
  const canForward = histIdx < history.length - 1

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#f3f3f3',
      fontFamily: "'Segoe UI', sans-serif",
    }}>

      {/* ── Toolbar ──────────────────────────────────── */}
      <div style={{
        height: 38,
        background: '#fafafa',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        gap: 4,
        flexShrink: 0,
      }}>
        {/* Back / Forward */}
        <ToolBtn
          label="← Back"
          onClick={goBack}
          disabled={!canBack}
        />
        <ToolBtn
          label="→ Forward"
          onClick={goForward}
          disabled={!canForward}
        />

        {/* Divider */}
        <div style={{
          width: 1, height: 18,
          background: 'rgba(0,0,0,0.12)',
          margin: '0 4px',
        }} />

        {/* Address bar */}
        <div style={{
          flex: 1,
          height: 26,
          background: 'white',
          border: '1px solid #d0d0d0',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
          gap: 6,
          fontSize: 12,
          color: '#333',
        }}>
          <span style={{ opacity: 0.5 }}>📁</span>
          <span style={{ color: '#888' }}>Portfolio OS</span>
          <span style={{ color: '#bbb' }}>›</span>
          <span style={{ color: '#0078D4', fontWeight: 500 }}>
            {currentFolder}
          </span>
        </div>

        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          height: 26,
          background: 'white',
          border: '1px solid #d0d0d0',
          borderRadius: 4,
          padding: '0 8px',
          width: 160,
        }}>
          <span style={{ fontSize: 12, opacity: 0.5 }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Search ${currentFolder}`}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: 12,
              color: '#333',
              background: 'transparent',
              fontFamily: "'Segoe UI', sans-serif",
            }}
          />
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
      }}>

        {/* ── Sidebar ────────────────────────────────── */}
        <div style={{
          width: 160,
          background: 'white',
          borderRight: '1px solid rgba(0,0,0,0.06)',
          padding: '8px 4px',
          overflowY: 'auto',
          flexShrink: 0,
        }}>
          {/* Quick Access */}
          <p style={{
            fontSize: 10,
            fontWeight: 600,
            color: '#999',
            letterSpacing: 0.8,
            padding: '4px 10px 6px',
            textTransform: 'uppercase',
          }}>
            Quick Access
          </p>
          <SideItem
            icon="🖥️"
            label="Desktop"
            isActive={currentFolder === 'Desktop'}
            onClick={() => navigate('Desktop')}
          />
          <SideItem
            icon="📁"
            label="Documents"
            isActive={currentFolder === 'Documents'}
            onClick={() => navigate('Documents')}
          />
          <SideItem
            icon="🎮"
            label="Games"
            isActive={currentFolder === 'Games'}
            onClick={() => navigate('Games')}
          />
          <SideItem
            icon="📬"
            label="Contact"
            isActive={currentFolder === 'Contact'}
            onClick={() => navigate('Contact')}
          />

          {/* Divider */}
          <div style={{
            height: 1,
            background: 'rgba(0,0,0,0.06)',
            margin: '8px 4px',
          }} />

          {/* All folders */}
          <p style={{
            fontSize: 10,
            fontWeight: 600,
            color: '#999',
            letterSpacing: 0.8,
            padding: '4px 10px 6px',
            textTransform: 'uppercase',
          }}>
            Portfolio
          </p>
          {allFolders.map(name => (
            <SideItem
              key={name}
              icon="📂"
              label={name}
              isActive={currentFolder === name}
              onClick={() => navigate(name)}
            />
          ))}
        </div>

        {/* ── Content area ───────────────────────────── */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: 16,
        }}>

          {/* Folder header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 20 }}>📂</span>
              <span style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#1a1a1a',
              }}>
                {currentFolder}
              </span>
              <span style={{
                fontSize: 11,
                color: '#999',
                background: '#f0f0f0',
                padding: '1px 8px',
                borderRadius: 10,
              }}>
                {filteredFiles.length} items
              </span>
            </div>

            {search && (
              <button
                onClick={() => setSearch('')}
                style={{
                  padding: '3px 10px',
                  background: 'white',
                  border: '1px solid rgba(0,0,0,0.15)',
                  borderRadius: 4,
                  fontSize: 11,
                  color: '#555',
                  cursor: 'pointer',
                }}
              >
                ✕ Clear search
              </button>
            )}
          </div>

          {/* Hint text */}
          {!search && (
            <p style={{
              fontSize: 11,
              color: '#aaa',
              marginBottom: 12,
            }}>
              Double-click to open · Single-click to select
            </p>
          )}

          {/* Files grid */}
          {filteredFiles.length === 0 ? (
            <div style={{
              padding: '40px 0',
              textAlign: 'center',
              color: '#bbb',
            }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🔍</div>
              <p style={{ fontSize: 13 }}>No files found</p>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              alignContent: 'flex-start',
            }}>
              {filteredFiles.map(([name, item]) => (
                <FileCard
                  key={name}
                  name={name}
                  item={item}
                  onDoubleClick={openItem}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Status bar ───────────────────────────────── */}
      <div style={{
        height: 24,
        background: '#fafafa',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: 16,
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 11, color: '#888' }}>
          {filteredFiles.length} items
        </span>
        <span style={{ fontSize: 11, color: '#bbb' }}>
          Double-click any file to open
        </span>
      </div>
    </div>
  )
}