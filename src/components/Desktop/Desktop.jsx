import DesktopIcon from './DesktopIcon'
import useStore from '../../store/useStore'

const ICONS = [
  { appId: 'about',     icon: '👤', label: 'About Me'  },
  { appId: 'education', icon: '🎓', label: 'Education' },
  { appId: 'skills',    icon: '⚙️', label: 'Skills'    },
  { appId: 'projects',  icon: '🗂️', label: 'Projects'  },
]

export default function Desktop() {
  const openWindow = useStore(s => s.openWindow)

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      {/* Icons */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        padding: 24,
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
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        color: 'white',
        fontSize: 13,
      }}>
        <span>🖥️ Portfolio OS</span>
      </div>
    </div>
  )
}