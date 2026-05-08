import { useState, useEffect } from 'react'
import DesktopIcon from './DesktopIcon'
import useStore from '../../store/useStore'

const ICONS = [
  { appId: 'about',     icon: '👤', label: 'About Me'  },
  { appId: 'education', icon: '🎓', label: 'Education' },
  { appId: 'skills',    icon: '⚙️', label: 'Skills'    },
  { appId: 'projects',  icon: '🗂️', label: 'Projects'  },
  { appId: 'terminal',  icon: '💻', label: 'Terminal'  },
  { appId: 'contact',   icon: '📬', label: 'Contact'   },
  { appId: 'monitor',   icon: '📊', label: 'Monitor'   },
]

export default function Desktop() {
  const { openWindow, windows, focusWindow } = useStore()
  const minimized = windows.filter(w => w.minimized)

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between',
    }}>

      {/* Icons */}
      <div style={{
        display: 'flex', flexWrap: 'wrap',
        gap: 8, padding: 24,
        alignContent: 'flex-start',
      }}>
        {ICONS.map(({ appId, icon, label }) => (
          <DesktopIcon
            key={appId}
            icon={icon}
            label={label}
            onClick={() => openWindow(appId)}
          />
        ))}
      </div>

      {/* Taskbar */}
      <div style={{
        height: 48,
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: 8,
      }}>
        <span style={{
          color: 'white', fontSize: 13,
          marginRight: 12, fontWeight: 500,
        }}>
          🖥️ Portfolio OS
        </span>

        {minimized.length > 0 && (
          <div style={{
            width: 1, height: 24,
            background: 'rgba(255,255,255,0.2)',
            marginRight: 4,
          }} />
        )}

        {minimized.map(win => (
          <button
            key={win.id}
            onClick={() => focusWindow(win.id)}
            style={{
              padding: '4px 12px',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 6, color: 'white',
              fontSize: 12, cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >
            {win.title}
          </button>
        ))}

        <Clock />
      </div>
    </div>
  )
}

function Clock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return (
    <span style={{
      color: 'rgba(255,255,255,0.7)',
      fontSize: 12, marginLeft: 'auto',
    }}>
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </span>
  )
}