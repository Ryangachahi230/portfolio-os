import { useEffect, useRef } from 'react'
import useStore from '../../store/useStore'

// ── Single menu item ─────────────────────────────────────
function MenuItem({ icon, label, onClick, danger, disabled, separator }) {
  if (separator) {
    return (
      <div style={{
        height: 1,
        background: 'rgba(255,255,255,0.08)',
        margin: '3px 8px',
      }} />
    )
  }

  return (
    <div
      onClick={disabled ? undefined : onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '7px 14px',
        fontSize: 12,
        color: disabled
          ? 'rgba(255,255,255,0.25)'
          : danger
            ? 'rgba(255,100,100,0.9)'
            : 'rgba(255,255,255,0.85)',
        cursor: disabled ? 'default' : 'pointer',
        borderRadius: 4,
        margin: '0 4px',
        transition: 'background 0.12s',
        userSelect: 'none',
      }}
      onMouseEnter={e => {
        if (!disabled)
          e.currentTarget.style.background = 'rgba(70,130,220,0.35)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent'
      }}
    >
      <span style={{
        fontSize: 15,
        width: 20,
        textAlign: 'center',
        flexShrink: 0,
      }}>
        {icon}
      </span>
      <span style={{ flex: 1 }}>{label}</span>
    </div>
  )
}

// ── Main Context Menu ────────────────────────────────────
export default function ContextMenu({ x, y, appId, label, onClose }) {
  const {
    openWindow,
    unpinIcon,
    pinIcon,
    pinnedIcons,
    pinToTaskbar,
    unpinFromTaskbar,
    pinnedTaskbar,
    resetIconPositions,
    setIconPosition,
    iconPositions,
  } = useStore()

  const menuRef        = useRef()
  const isPinnedDesk   = pinnedIcons.includes(appId)
  const isPinnedTask   = pinnedTaskbar.includes(appId)

  // ── Adjust position so menu stays inside viewport ──────
  const menuW = 220
  const menuH = 280
  const adjX  = x + menuW > window.innerWidth  ? x - menuW : x
  const adjY  = y + menuH > window.innerHeight - 48 ? y - menuH : y

  // ── Close on outside click or Escape ──────────────────
  useEffect(() => {
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose()
      }
    }
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    const t = setTimeout(() => {
      document.addEventListener('mousedown', onDown)
      document.addEventListener('keydown',   onKey)
    }, 50)
    return () => {
      clearTimeout(t)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown',   onKey)
    }
  }, [onClose])

  const handle = (fn) => {
    fn()
    onClose()
  }

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        left: adjX,
        top:  adjY,
        width: menuW,
        background: 'rgba(18,24,48,0.97)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 8,
        boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
        zIndex: 99999,
        padding: '4px 0',
        animation: 'ctxFadeIn 0.12s ease',
      }}
    >
      <style>{`
        @keyframes ctxFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* App label header */}
      <div style={{
        padding: '8px 14px 6px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        marginBottom: 4,
      }}>
        <p style={{
          fontSize: 11,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
        }}>
          {label}
        </p>
      </div>

      {/* Open */}
      <MenuItem
        icon="🚀"
        label="Open"
        onClick={() => handle(() => openWindow(appId))}
      />

      <MenuItem separator />

      {/* Pin to taskbar / Unpin from taskbar */}
      {isPinnedTask ? (
        <MenuItem
          icon="📌"
          label="Unpin from taskbar"
          onClick={() => handle(() => unpinFromTaskbar(appId))}
        />
      ) : (
        <MenuItem
          icon="📌"
          label="Pin to taskbar"
          onClick={() => handle(() => pinToTaskbar(appId))}
        />
      )}

      {/* Unpin from desktop / Pin to desktop */}
      {isPinnedDesk ? (
        <MenuItem
          icon="🖥️"
          label="Unpin from desktop"
          onClick={() => handle(() => unpinIcon(appId))}
        />
      ) : (
        <MenuItem
          icon="🖥️"
          label="Pin to desktop"
          onClick={() => handle(() => pinIcon(appId))}
        />
      )}

      <MenuItem separator />

      {/* Move to corner */}
      <MenuItem
        icon="↖️"
        label="Move to top-left"
        onClick={() => handle(() => setIconPosition(appId, 20, 20))}
      />

      {/* Reset all positions */}
      <MenuItem
        icon="🔄"
        label="Reset icon layout"
        onClick={() => handle(() => resetIconPositions())}
      />

      <MenuItem separator />

      {/* Remove shortcut */}
      <MenuItem
        icon="🗑️"
        label="Remove from desktop"
        danger
        onClick={() => handle(() => unpinIcon(appId))}
      />
    </div>
  )
}