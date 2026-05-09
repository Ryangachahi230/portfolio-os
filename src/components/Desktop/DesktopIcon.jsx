import { useRef, useState, useCallback } from 'react'
import useStore from '../../store/useStore'
import ContextMenu from './ContextMenu'

export default function DesktopIcon({ appId, icon, label, bg }) {
  const { openWindow, setIconPosition, iconPositions } = useStore()
  const pos = iconPositions[appId] ?? { x: 0, y: 0 }

  const isDragging  = useRef(false)
  const hasDragged  = useRef(false)
  const dragOffset  = useRef({ x: 0, y: 0 })

  const [dragging,    setDragging]    = useState(false)
  const [selected,    setSelected]    = useState(false)
  const [hovered,     setHovered]     = useState(false)
  const [contextMenu, setContextMenu] = useState(null)
  // contextMenu = { x, y } when open

  // ── Right click — show context menu ───────────────────
  const onContextMenu = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setSelected(true)
    setContextMenu({ x: e.clientX, y: e.clientY })
  }, [])

  // ── Mouse down — start drag tracking ──────────────────
  const onMouseDown = useCallback((e) => {
    if (e.button !== 0) return
    e.stopPropagation()

    setSelected(true)
    isDragging.current = true
    hasDragged.current = false

    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    }

    const onMove = (e) => {
      if (!isDragging.current) return
      hasDragged.current = true
      setDragging(true)

      const newX = Math.max(0,
        Math.min(window.innerWidth  - 84, e.clientX - dragOffset.current.x)
      )
      const newY = Math.max(0,
        Math.min(window.innerHeight - 96, e.clientY - dragOffset.current.y)
      )
      setIconPosition(appId, newX, newY)
    }

    const onUp = () => {
      isDragging.current = false
      setDragging(false)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup',   onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup',   onUp)
  }, [appId, pos.x, pos.y, setIconPosition])

  // ── Double click — open app ────────────────────────────
  const onDoubleClick = useCallback((e) => {
    e.stopPropagation()
    if (!hasDragged.current) openWindow(appId)
  }, [appId, openWindow])

  // ── Single click — select only ─────────────────────────
  const onClick = useCallback((e) => {
    e.stopPropagation()
    setSelected(true)
  }, [])

  return (
    <>
      <div
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
        onClick={onClick}
        onContextMenu={onContextMenu}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position:   'absolute',
          left:        pos.x,
          top:         pos.y,
          width:       84,
          display:    'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap:         6,
          padding:    '8px 4px',
          borderRadius: 6,
          cursor:      dragging ? 'grabbing' : 'default',
          userSelect: 'none',
          zIndex:      dragging ? 9999 : 1,
          background:  selected
            ? 'rgba(70,130,220,0.30)'
            : hovered
              ? 'rgba(255,255,255,0.12)'
              : 'transparent',
          border: `1px solid ${selected
            ? 'rgba(100,160,255,0.5)'
            : 'transparent'}`,
          transition: dragging
            ? 'none'
            : 'background 0.15s, border 0.15s',
          filter: dragging
            ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))'
            : 'none',
          transform: dragging ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {/* Icon tile */}
        <div style={{
          width: 48, height: 48,
          borderRadius: 10,
          background: bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 26,
          boxShadow: hovered && !dragging
            ? '0 4px 16px rgba(0,0,0,0.35)'
            : '0 2px 8px rgba(0,0,0,0.25)',
          transition: 'box-shadow 0.15s, transform 0.15s',
          transform: hovered && !dragging
            ? 'translateY(-2px)'
            : 'translateY(0)',
          pointerEvents: 'none',
        }}>
          {icon}
        </div>

        {/* Label */}
        <span style={{
          fontSize: 11,
          color: 'white',
          textAlign: 'center',
          lineHeight: 1.3,
          textShadow: '0 1px 4px rgba(0,0,0,0.9)',
          maxWidth: 76,
          wordBreak: 'break-word',
          pointerEvents: 'none',
        }}>
          {label}
        </span>

        {/* Drag ghost tooltip */}
        {dragging && (
          <div style={{
            position: 'absolute',
            bottom: -22,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.75)',
            color: 'white',
            fontSize: 10,
            padding: '2px 8px',
            borderRadius: 3,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}>
            {label}
          </div>
        )}
      </div>

      {/* Context menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          appId={appId}
          label={label}
          onClose={() => {
            setContextMenu(null)
            setSelected(false)
          }}
        />
      )}
    </>
  )
}