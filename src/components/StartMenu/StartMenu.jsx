import { useState, useEffect, useRef } from 'react'
import useStore from '../../store/useStore'

const ALL_APPS = [
  { appId: 'about',       icon: '👤', label: 'About Me',     bg: 'linear-gradient(145deg, #0078D4, #005a9e)' },
  { appId: 'education',   icon: '🎓', label: 'Education',    bg: 'linear-gradient(145deg, #107C10, #0a5a0a)' },
  { appId: 'skills',      icon: '⚙️', label: 'Skills',       bg: 'linear-gradient(145deg, #8764B8, #5c3d8f)' },
  { appId: 'projects',    icon: '🗂️', label: 'Projects',     bg: 'linear-gradient(145deg, #C239B3, #8a1f7e)' },
  { appId: 'resume',      icon: '📄', label: 'Resume',       bg: 'linear-gradient(145deg, #d83b01, #a42900)' },
  { appId: 'clientwork',  icon: '💼', label: 'Client Work',  bg: 'linear-gradient(145deg, #8764B8, #5c3d8f)' },
  { appId: 'terminal',    icon: '💻', label: 'Terminal',     bg: 'linear-gradient(145deg, #2d2d2d, #1a1a1a)' },
  { appId: 'contact',     icon: '📬', label: 'Contact',      bg: 'linear-gradient(145deg, #0078D4, #004e8c)' },
  { appId: 'monitor',     icon: '📊', label: 'Monitor',      bg: 'linear-gradient(145deg, #005FB8, #003a72)' },
  { appId: 'game',        icon: '🎮', label: 'Snake Game',   bg: 'linear-gradient(145deg, #038387, #025a5e)' },
  { appId: 'filemanager', icon: '📁', label: 'File Explorer',bg: 'linear-gradient(145deg, #FFB900, #e6a800)' },
]

// ── Pinned app icon ──────────────────────────────────────
function PinnedApp({ app, onClick }) {
  return (
    <div
      onClick={() => onClick(app.appId)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        padding: '10px 8px',
        borderRadius: 6,
        cursor: 'pointer',
        transition: 'background 0.15s',
      }}
      onMouseEnter={e =>
        e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
      }
      onMouseLeave={e =>
        e.currentTarget.style.background = 'transparent'
      }
    >
      <div style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        background: app.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 22,
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}>
        {app.icon}
      </div>
      <span style={{
        fontSize: 11,
        color: 'rgba(255,255,255,0.85)',
        textAlign: 'center',
        lineHeight: 1.3,
        maxWidth: 64,
      }}>
        {app.label}
      </span>
    </div>
  )
}

// ── Left sidebar item ────────────────────────────────────
function SideItem({ icon, label, onClick, danger }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '9px 16px',
        cursor: 'pointer',
        fontSize: 13,
        color: danger
          ? 'rgba(255,100,100,0.85)'
          : 'rgba(255,255,255,0.8)',
        transition: 'background 0.15s',
        borderRadius: 4,
        margin: '0 4px',
      }}
      onMouseEnter={e =>
        e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
      }
      onMouseLeave={e =>
        e.currentTarget.style.background = 'transparent'
      }
    >
      <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>
        {icon}
      </span>
      {label}
    </div>
  )
}

// ── Search bar ───────────────────────────────────────────
function SearchBar({ value, onChange }) {
  return (
    <div style={{
      padding: '12px 16px',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 6,
        padding: '7px 12px',
      }}>
        <span style={{ fontSize: 14, opacity: 0.6 }}>🔍</span>
        <input
          autoFocus
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Search apps..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'white',
            fontSize: 13,
            fontFamily: "'Segoe UI', sans-serif",
          }}
        />
      </div>
    </div>
  )
}

// ── Main Start Menu ──────────────────────────────────────
export default function StartMenu({ onClose }) {
  const { openWindow } = useStore()
  const menuRef        = useRef()
  const [search, setSearch] = useState('')

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose()
      }
    }
    const t = setTimeout(() =>
      document.addEventListener('mousedown', handler), 100
    )
    return () => {
      clearTimeout(t)
      document.removeEventListener('mousedown', handler)
    }
  }, [onClose])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleOpen = (appId) => {
    openWindow(appId)
    onClose()
  }

  // Filter apps by search
  const filtered = search.trim()
    ? ALL_APPS.filter(a =>
        a.label.toLowerCase().includes(search.toLowerCase())
      )
    : ALL_APPS

  // Shutdown — clear state and reload
  const handleShutdown = () => {
    localStorage.removeItem('portfolio-os-booted')
    localStorage.removeItem('portfolio-os-state')
    window.location.reload()
  }

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        bottom: 52,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 640,
        background: 'rgba(18,18,30,0.96)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 10,
        boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 9998,
        overflow: 'hidden',
        animation: 'slideUp 0.2s ease',
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      {/* ── Search ──────────────────────────────────── */}
      <SearchBar value={search} onChange={setSearch} />

      <div style={{ display: 'flex', flex: 1 }}>

        {/* ── Left sidebar ────────────────────────────── */}
        <div style={{
          width: 220,
          borderRight: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          padding: '8px 0',
        }}>

          {/* User profile */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '8px 16px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            marginBottom: 8,
          }}>
            <div style={{
              width: 42, height: 42,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0078D4, #005a9e)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22, flexShrink: 0,
              boxShadow: '0 2px 8px rgba(0,120,212,0.4)',
            }}>
              👤
            </div>
            <div>
              <div style={{
                fontSize: 13, fontWeight: 600, color: 'white',
              }}>
                Ryan Gachahi
              </div>
              <div style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.45)',
                marginTop: 1,
              }}>
                Full Stack Developer
              </div>
            </div>
          </div>

          {/* ── Quick links ─────────────────────────── */}
          <SideItem icon="👤" label="About Me"
            onClick={() => handleOpen('about')} />
          <SideItem icon="🗂️" label="Projects"
            onClick={() => handleOpen('projects')} />
          <SideItem icon="📄" label="Resume"
            onClick={() => handleOpen('resume')} />
          <SideItem icon="💼" label="Client Work"
            onClick={() => handleOpen('clientwork')} />
          <SideItem icon="🎮" label="Snake Game"
            onClick={() => handleOpen('game')} />
          <SideItem icon="📬" label="Contact"
            onClick={() => handleOpen('contact')} />

          {/* ── NEW: File Explorer link ──────────────── */}
          <SideItem icon="📁" label="File Explorer"
            onClick={() => handleOpen('filemanager')} />

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* ── Bottom actions ───────────────────────── */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: 8,
            marginTop: 8,
          }}>
            <SideItem icon="⚙️" label="Settings"
              onClick={() => handleOpen('monitor')} />
            <SideItem
              icon="⏻"
              label="Shut down"
              danger
              onClick={handleShutdown}
            />
          </div>
        </div>

        {/* ── Right — pinned apps grid ─────────────────── */}
        <div style={{
          flex: 1,
          padding: '12px 8px',
          overflowY: 'auto',
        }}>
          <p style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: 0.8,
            padding: '0 8px 8px',
            textTransform: 'uppercase',
          }}>
            {search ? `Results (${filtered.length})` : 'Pinned'}
          </p>

          {filtered.length === 0 ? (
            <div style={{
              padding: 24,
              textAlign: 'center',
              color: 'rgba(255,255,255,0.3)',
              fontSize: 13,
            }}>
              No apps found
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 4,
            }}>
              {filtered.map(app => (
                <PinnedApp
                  key={app.appId}
                  app={app}
                  onClick={handleOpen}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}