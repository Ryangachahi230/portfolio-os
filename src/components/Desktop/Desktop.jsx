import { useState, useEffect } from 'react'
import DesktopIcon from './DesktopIcon'
import EngineerToggle from '../EngineerMode/EngineerToggle'
import StartMenu from '../StartMenu/StartMenu'
import useStore from '../../store/useStore'

const ICONS = [
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
  { appId: 'filemanager', icon: '📁', label: 'Files',        bg: 'linear-gradient(145deg, #FFB900, #e6a800)' },
]

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
  const {
    openWindow, windows, focusWindow,
    pinnedIcons, resetIconPositions,
  } = useStore()

  const minimized   = windows.filter(w => w.minimized)
  const [showStart, setShowStart] = useState(false)
  const [isMobile,  setIsMobile]  = useState(window.innerWidth < 768)

  // Listen for resize
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

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

      {/* ── Vista Wallpaper ─────────────────────────── */}
      <div style={{
        position: 'absolute',
        inset: 0, zIndex: 0,
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg,
            #0a1628 0%, #0d2545 10%, #1a4a8a 30%,
            #2d6abf 50%, #5b9bd4 65%, #87ceeb 78%,
            #b8e0f0 88%, #d4eef8 100%)`,
        }} />
        <div style={{
          position: 'absolute',
          top: '18%', left: '50%',
          transform: 'translateX(-50%)',
          width: '60%', height: '50%',
          background: 'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 35%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '28%', left: 0, right: 0, height: '22%',
          background: 'radial-gradient(ellipse at 50% 100%, rgba(200,230,255,0.5) 0%, rgba(150,200,240,0.2) 50%, transparent 75%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%', left: '50%',
          transform: 'translateX(-50%)',
          width: '55%', height: '45%',
          background: 'radial-gradient(ellipse at 50% 80%, rgba(80,180,80,0.55) 0%, rgba(40,140,40,0.25) 40%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '26%', left: '50%',
          transform: 'translateX(-50%)',
          width: '22%', height: '22%',
          background: 'radial-gradient(ellipse at 50% 60%, rgba(200,255,200,0.7) 0%, rgba(120,220,120,0.3) 50%, transparent 75%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0, height: '32%',
          background: `linear-gradient(180deg,
            #4ab54a 0%, #3a9a3a 20%, #2d7d2d 50%,
            #1f5e1f 80%, #164416 100%)`,
          borderRadius: '50% 50% 0 0 / 8% 8% 0 0',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '28%', left: '50%',
          transform: 'translateX(-50%)',
          width: '70%', height: '10%',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(120,220,80,0.5) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, width: '30%', height: '22%',
          background: 'radial-gradient(ellipse at 100% 0%, #2d7d2d 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0, right: 0, width: '30%', height: '22%',
          background: 'radial-gradient(ellipse at 0% 0%, #2d7d2d 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute',
          top: '22%', left: '8%', width: 140, height: 40,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.2) 50%, transparent 75%)',
          filter: 'blur(4px)',
        }} />
        <div style={{
          position: 'absolute',
          top: '18%', right: '12%', width: 180, height: 50,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 50%, transparent 75%)',
          filter: 'blur(5px)',
        }} />
        <div style={{
          position: 'absolute',
          top: '14%', left: '35%', width: 120, height: 35,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.4) 0%, transparent 70%)',
          filter: 'blur(3px)',
        }} />
      </div>

      {/* ── Desktop icon area ────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
        }}
        onContextMenu={e => e.preventDefault()}
      >
        {pinnedIcons.map((appId) => {
          const iconData = ICONS.find(i => i.appId === appId)
          if (!iconData) return null
          return (
            <DesktopIcon
              key={appId}
              appId={appId}
              icon={iconData.icon}
              label={iconData.label}
              bg={iconData.bg}
            />
          )
        })}
      </div>

      {/* ── Start Menu ──────────────────────────────── */}
      {showStart && (
        <StartMenu onClose={() => setShowStart(false)} />
      )}

      {/* ── Taskbar ─────────────────────────────────── */}
      <div style={{
        position: 'relative',
        zIndex: 9997,
        height: isMobile ? 56 : 48,
        background: 'rgba(32,32,32,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isMobile ? 'flex-start' : 'center',
        padding: '0 8px',
        flexShrink: 0,
        gap: isMobile ? 2 : 0,
        overflowX: isMobile ? 'auto' : 'visible',
      }}>

        {/* Engineer toggle — desktop only */}
        {!isMobile && (
          <div style={{ position: 'absolute', left: 12 }}>
            <EngineerToggle />
          </div>
        )}

        {/* Windows Start button */}
        <div
          onClick={() => setShowStart(s => !s)}
          title="Start"
          style={{
            width: isMobile ? 44 : 40,
            height: isMobile ? 44 : 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            cursor: 'pointer',
            flexShrink: 0,
            background: showStart
              ? 'rgba(255,255,255,0.15)'
              : 'transparent',
            transition: 'background 0.15s',
          }}
        >
          <WindowsLogo />
        </div>

        {/* Separator */}
        <div style={{
          width: 1, height: 20,
          background: 'rgba(255,255,255,0.15)',
          margin: '0 4px',
          flexShrink: 0,
        }} />

        {/* App icons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          overflowX: isMobile ? 'auto' : 'visible',
          flex: isMobile ? 1 : 'none',
        }}>
          {ICONS.map(({ appId, icon, bg }) => {
            const win         = windows.find(w => w.appId === appId)
            const isOpen      = !!win
            const isMinimized = win?.minimized
            return (
              <TaskbarApp
                key={appId}
                icon={icon}
                bg={bg}
                isOpen={isOpen}
                isMinimized={isMinimized}
                isMobile={isMobile}
                onClick={() => {
                  if (win) focusWindow(win.id)
                  else openWindow(appId)
                }}
              />
            )
          })}
        </div>

        {/* System tray */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: isMobile ? 'auto' : undefined,
          position: isMobile ? 'relative' : 'absolute',
          right: isMobile ? undefined : 0,
          flexShrink: 0,
        }}>
          {!isMobile && <TrayIcon>🔊</TrayIcon>}
          {!isMobile && <TrayIcon>📶</TrayIcon>}
          <Clock isMobile={isMobile} />
        </div>
      </div>

      {/* Minimized restore buttons */}
      {minimized.length > 0 && (
        <div style={{
          position: 'absolute',
          bottom: isMobile ? 60 : 52,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 4,
          zIndex: 10,
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: '90vw',
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

// ── Taskbar app icon ─────────────────────────────────────
function TaskbarApp({ icon, bg, isOpen, isMinimized, onClick, isMobile }) {
  const [hovered, setHovered] = useState(false)
  const size     = isMobile ? 40 : 44
  const iconSize = isMobile ? 24 : 28

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: size, height: size,
        display: 'flex', alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4, cursor: 'pointer',
        position: 'relative', flexShrink: 0,
        background: hovered
          ? 'rgba(255,255,255,0.1)'
          : isOpen ? 'rgba(255,255,255,0.06)' : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      <div style={{
        width: iconSize, height: iconSize,
        borderRadius: 6, background: bg,
        display: 'flex', alignItems: 'center',
        justifyContent: 'center',
        fontSize: isMobile ? 14 : 16,
      }}>
        {icon}
      </div>
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: 3, left: '50%',
          transform: 'translateX(-50%)',
          width: isMinimized ? 3 : 4,
          height: isMinimized ? 3 : 4,
          background: isMinimized
            ? 'rgba(255,255,255,0.5)' : '#0078D4',
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
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: 14,
        cursor: 'pointer', borderRadius: 4,
        background: hovered
          ? 'rgba(255,255,255,0.1)' : 'transparent',
        transition: 'background 0.15s',
        opacity: 0.85,
      }}
    >
      {children}
    </div>
  )
}

// ── Taskbar clock ────────────────────────────────────────
function Clock({ isMobile }) {
  const [time,    setTime]    = useState(new Date())
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
        padding: '0 8px',
        height: isMobile ? 56 : 48,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        borderRadius: 4,
        background: hovered
          ? 'rgba(255,255,255,0.1)' : 'transparent',
        transition: 'background 0.15s',
        minWidth: isMobile ? 50 : 70,
        flexShrink: 0,
      }}
    >
      <span style={{
        color: 'white',
        fontSize: isMobile ? 11 : 12,
        lineHeight: 1.3,
        whiteSpace: 'nowrap',
      }}>
        {time.toLocaleTimeString([], {
          hour: '2-digit', minute: '2-digit',
        })}
      </span>
      {!isMobile && (
        <span style={{
          color: 'rgba(255,255,255,0.75)',
          fontSize: 11, lineHeight: 1.3,
        }}>
          {time.toLocaleDateString([], {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      )}
    </div>
  )
}