import { useState } from 'react'

export default function DesktopIcon({ icon, label, bg, onClick }) {
  const [hovered, setHovered]   = useState(false)
  const [pressed, setPressed]   = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        padding: '10px 8px',
        borderRadius: 6,
        cursor: 'pointer',
        width: 84,
        transition: 'background 0.15s',
        background: hovered
          ? 'rgba(255,255,255,0.12)'
          : 'transparent',
        transform: pressed ? 'scale(0.94)' : 'scale(1)',
      }}
    >
      {/* ── Icon tile (Windows 11 style) ──────────────── */}
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 10,
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 26,
        boxShadow: hovered
          ? '0 4px 16px rgba(0,0,0,0.35)'
          : '0 2px 8px rgba(0,0,0,0.25)',
        transition: 'box-shadow 0.15s, transform 0.15s',
        transform: hovered && !pressed
          ? 'translateY(-2px)'
          : 'translateY(0px)',
      }}>
        {icon}
      </div>

      {/* ── Label ─────────────────────────────────────── */}
      <span style={{
        color: 'white',
        fontSize: 11,
        textAlign: 'center',
        lineHeight: 1.3,
        textShadow: '0 1px 4px rgba(0,0,0,0.9)',
        maxWidth: 76,
        wordBreak: 'break-word',
      }}>
        {label}
      </span>
    </div>
  )
}