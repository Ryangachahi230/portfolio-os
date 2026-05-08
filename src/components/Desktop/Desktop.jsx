import { useState, useEffect } from 'react'
import DesktopIcon from './DesktopIcon'
import EngineerToggle from '../EngineerMode/EngineerToggle'
import useStore from '../../store/useStore'

const ICONS = [
  { appId: 'about',     icon: '👤', label: 'About Me',  bg: 'linear-gradient(145deg, #0078D4, #005a9e)' },
  { appId: 'education', icon: '🎓', label: 'Education', bg: 'linear-gradient(145deg, #107C10, #0a5a0a)' },
  { appId: 'skills',    icon: '⚙️', label: 'Skills',    bg: 'linear-gradient(145deg, #8764B8, #5c3d8f)' },
  { appId: 'projects',  icon: '🗂️', label: 'Projects',  bg: 'linear-gradient(145deg, #C239B3, #8a1f7e)' },
  { appId: 'terminal',  icon: '💻', label: 'Terminal',  bg: 'linear-gradient(145deg, #2d2d2d, #1a1a1a)' },
  { appId: 'contact',   icon: '📬', label: 'Contact',   bg: 'linear-gradient(145deg, #0078D4, #004e8c)' },
  { appId: 'monitor',   icon: '📊', label: 'Monitor',   bg: 'linear-gradient(145deg, #005FB8, #003a72)' },
  { appId: 'resume',    icon: '📄', label: 'Resume',    bg: 'linear-gradient(145deg, #d83b01, #a42900)' },
]

// Windows logo SVG
function WindowsLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="white">
      <rect x="0"  y="0"  width="8" height="8" rx="1"/>
      <rect x="10" y="0"  width="8" height="8" rx="1"/>
      <rect x="0"  y="10" width="8" height="8" rx="1"/>
      <rect x="10" y="10" width="8" height="8" rx="1"/>
    </svg>
  )
}

export default function Desktop() {
  const { openWindow, windows, focusWindow } = useStore()
  const minimized = windows.filter(w => w.minimized)

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── Wallpaper ───────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse at 60% 40%, #1e5fa8 0%, transparent 60%),
          radial-gradient(ellipse at 20% 80%, #0d3b6e 0%, transparent 50%),
          radial-gradient(ellipse at 90% 90%, #1a4a8a 0%, transparent 40%),
          linear-gradient(160deg, #0a2a5e 0%, #1a4a8a 40%, #2d6abf 70%, #0d2d5e 100%)
        `,
        zIndex: 0,
      }}>
        {/* subtle light bloom */}
        <div style={{
          position: 'absolute',
          top: '30%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%', height: '60%',
          background: 'radial-gradient(ellipse, rgba(100,180,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Desktop icon area ───────────────────────────── */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 4,
        padding: 20,
        alignContent: 'flex-start',
        flex: 1,
      }}>
        {ICONS.map(({ appId, icon, label, bg }) => (
          <DesktopIcon
            key={appId}
            icon={icon}
            label={label}
            bg={bg}
            onClick={() => openWindow(appId)}
          />
        ))}
      </div>

      {/* ── Taskbar ─────────────────────────────────────── */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        height: 48,
        background: 'rgba(32, 32, 32, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 8px',
        flexShrink: 0,
      }}>

        {/* Engineer toggle — far left */}
        <div style={{ position: 'absolute', left: 12 }}>
          <EngineerToggle />
        </div>

        {/* ── Centered icons (Windows 11 style) ─────────── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}>

          {/* Windows Start button */}
          <TaskbarBtn title="Start">
            <WindowsLogo />
          </TaskbarBtn>

          {/* Separator */}
          <div style={{
            width: 1, height: 20,
            background: 'rgba(255,255,255,0.15)',
            margin: '0 4px',
          }} />

          {/* App icons — pinned + open */}
          {ICONS.map(({ appId, icon, bg }) => {
            const win = windows.find(w => w.appId === appId)
            const isOpen = !!win
            const isMinimized = win?.minimized
            return (
              <TaskbarApp
                key={appId}
                icon={icon}
                bg={bg}
                isOpen={isOpen}
                isMinimized={isMinimized}
                onClick={() => {
                  if (win) {
                    focusWindow(win.id)
                  } else {
                    openWindow(appId)
                  }
                }}
              />
            )
          })}
        </div>

        {/* ── System tray — far right ────────────────────── */}
        <div style={{
          position: 'absolute',
          right: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 0,
        }}>
          <TrayIcon>🔊</TrayIcon>
          <TrayIcon>📶</TrayIcon>
          <Clock />
        </div>
      </div>

      {/* Minimized app labels (above taskbar, hidden — taskbar handles it) */}
      {minimized.length > 0 && (
        <div style={{
          position: 'absolute',
          bottom: 52,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 4,
          zIndex: 10,
        }}>
          {minimized.map(win => (
            <button
              key={win.id}
              onClick={() => focusWindow(win.id)}
              style={{
                padding: '4px 12px',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 4,
                color: 'white',
                fontSize: 12,
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
              }}
            >
              {win.title}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Taskbar button (Start) ───────────────────────────────
function TaskbarBtn({ children, title }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      title={title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 40, height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        cursor: 'pointer',
        background: hovered ? 'rgba(255,255,255,0.1)' : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      {children}
    </div>
  )
}

// ── Taskbar app icon ─────────────────────────────────────
function TaskbarApp({ icon, bg, isOpen, isMinimized, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 44, height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        cursor: 'pointer',
        position: 'relative',
        background: hovered
          ? 'rgba(255,255,255,0.1)'
          : isOpen ? 'rgba(255,255,255,0.06)' : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      {/* App icon square */}
      <div style={{
        width: 28, height: 28,
        borderRadius: 6,
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
      }}>
        {icon}
      </div>

      {/* Open indicator dot */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: 3,
          left: '50%',
          transform: 'translateX(-50%)',
          width: isMinimized ? 3 : 4,
          height: isMinimized ? 3 : 4,
          background: isMinimized
            ? 'rgba(255,255,255,0.5)'
            : '#0078D4',
          borderRadius: '50%',
          transition: 'all 0.2s',
        }} />
      )}
    </div>
  )
}

// ── System tray icon ─────────────────────────────────────
function TrayIcon({ children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 32, height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        cursor: 'pointer',
        borderRadius: 4,
        background: hovered ? 'rgba(255,255,255,0.1)' : 'transparent',
        transition: 'background 0.15s',
        opacity: 0.85,
      }}
    >
      {children}
    </div>
  )
}

// ── Taskbar clock ────────────────────────────────────────
function Clock() {
  const [time, setTime] = useState(new Date())
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '0 12px',
        height: 48,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        borderRadius: 4,
        background: hovered ? 'rgba(255,255,255,0.1)' : 'transparent',
        transition: 'background 0.15s',
        minWidth: 70,
      }}
    >
      <span style={{
        color: 'white',
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 1.3,
      }}>
        {time.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
      <span style={{
        color: 'rgba(255,255,255,0.75)',
        fontSize: 11,
        lineHeight: 1.3,
      }}>
        {time.toLocaleDateString([], {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
        })}
      </span>
    </div>
  )
}