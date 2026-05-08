import { useState } from 'react'
import useStore from '../../store/useStore'

// ── section wrapper ──────────────────────────────────────────────
function Section({ title, color = '#58a6ff', children }) {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ marginBottom: 16 }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', cursor: 'pointer',
          marginBottom: 8,
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: 1 }}>
          {title}
        </span>
        <span style={{ color: '#555', fontSize: 12 }}>{open ? '▾' : '▸'}</span>
      </div>
      {open && children}
    </div>
  )
}

// ── log type colors ──────────────────────────────────────────────
const LOG_COLORS = {
  APP_OPEN:     '#28c840',
  APP_CLOSE:    '#ff5f57',
  APP_FOCUS:    '#58a6ff',
  APP_MINIMIZE: '#febc2e',
}

// ── component tree data (static but reflects open apps) ──────────
function ComponentTree({ windows }) {
  return (
    <div style={{ fontFamily: 'monospace', fontSize: 11, lineHeight: 1.8 }}>
      <div style={{ color: '#e3e3e3' }}>{'<App>'}</div>
      <div style={{ paddingLeft: 12, color: '#58a6ff' }}>{'<Desktop />'}</div>
      <div style={{ paddingLeft: 12, color: '#58a6ff' }}>{'<WindowManager>'}</div>
      {windows.map(w => (
        <div key={w.id} style={{ paddingLeft: 24 }}>
          <span style={{ color: w.minimized ? '#555' : '#3fb950' }}>
            {'<Window '}
          </span>
          <span style={{ color: '#febc2e' }}>appId</span>
          <span style={{ color: '#e3e3e3' }}>{"='"}</span>
          <span style={{ color: '#ff9f43' }}>{w.appId}</span>
          <span style={{ color: '#e3e3e3' }}>{"'"}</span>
          <span style={{ color: '#ff9f43' }}> z</span>
          <span style={{ color: '#e3e3e3' }}>={w.zIndex}</span>
          <span style={{ color: w.minimized ? '#555' : '#3fb950' }}>
            {' />'}
          </span>
          {w.minimized && (
            <span style={{ color: '#555', fontSize: 10 }}> {/* minimized */}</span>
          )}
        </div>
      ))}
      <div style={{ paddingLeft: 12, color: '#58a6ff' }}>{'</WindowManager>'}</div>
      <div style={{ paddingLeft: 12, color: '#58a6ff' }}>{'<EngineerOverlay />'}</div>
      <div style={{ color: '#e3e3e3' }}>{'</App>'}</div>
    </div>
  )
}

// ── state inspector ──────────────────────────────────────────────
function StateInspector({ windows, activeWindowId, engineerMode, nextZIndex }) {
  const state = {
    activeWindowId,
    engineerMode,
    nextZIndex,
    'windows.length': windows.length,
    'windows.open':   windows.filter(w => !w.minimized).length,
    'windows.min':    windows.filter(w => w.minimized).length,
  }

  return (
    <div style={{ fontFamily: 'monospace', fontSize: 11 }}>
      {Object.entries(state).map(([key, val]) => (
        <div key={key} style={{
          display: 'flex', justifyContent: 'space-between',
          padding: '3px 0',
          borderBottom: '1px solid #1a1a1a',
        }}>
          <span style={{ color: '#888' }}>{key}</span>
          <span style={{
            color: typeof val === 'boolean'
              ? (val ? '#28c840' : '#ff5f57')
              : '#febc2e',
          }}>
            {String(val)}
          </span>
        </div>
      ))}

      {/* Per-window state */}
      {windows.length > 0 && (
        <div style={{ marginTop: 10 }}>
          <div style={{ color: '#555', marginBottom: 4, fontSize: 10 }}>
            windows[]
          </div>
          {windows.map(w => (
            <div key={w.id} style={{
              background: w.id === activeWindowId ? '#1a2a1a' : '#111',
              border: `1px solid ${w.id === activeWindowId ? '#28c840' : '#222'}`,
              borderRadius: 4, padding: '6px 8px',
              marginBottom: 4,
            }}>
              <div style={{ color: '#ff9f43', fontWeight: 700 }}>{w.appId}</div>
              <div style={{ color: '#666', fontSize: 10 }}>
                x:{Math.round(w.x)} y:{Math.round(w.y)} z:{w.zIndex}
              </div>
              <div style={{ color: '#666', fontSize: 10 }}>
                {w.w}×{w.h} {w.minimized ? '📦 minimized' : '✅ visible'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── data flow diagram ────────────────────────────────────────────
function DataFlow() {
  const nodes = [
    { label: 'User Click',       color: '#febc2e' },
    { label: 'openWindow()',     color: '#58a6ff' },
    { label: 'Zustand Store',    color: '#ff9f43' },
    { label: 'eventBus.emit()',  color: '#a78bfa' },
    { label: 'React Re-render',  color: '#28c840' },
    { label: 'Monitor updates',  color: '#3fb950' },
  ]
  return (
    <div style={{ fontFamily: 'monospace', fontSize: 11 }}>
      {nodes.map((n, i) => (
        <div key={i}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '5px 8px',
            background: '#111',
            borderRadius: 4,
            border: `1px solid ${n.color}33`,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: n.color, flexShrink: 0,
            }} />
            <span style={{ color: n.color }}>{n.label}</span>
          </div>
          {i < nodes.length - 1 && (
            <div style={{
              color: '#333', fontSize: 14,
              textAlign: 'center', lineHeight: 1.2,
            }}>│</div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── main overlay ─────────────────────────────────────────────────
export default function EngineerOverlay() {
  const {
    windows, activeWindowId,
    engineerMode, nextZIndex,
    logs,
  } = useStore()

  if (!engineerMode) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0, right: 0, bottom: 0,
      width: 300,
      background: '#0d1117',
      borderLeft: '1px solid #21262d',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'monospace',
      overflow: 'hidden',
    }}>

      {/* Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #21262d',
        background: '#161b22',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#28c840',
            boxShadow: '0 0 8px #28c840',
          }} />
          <span style={{ color: '#58a6ff', fontWeight: 700, fontSize: 13 }}>
            Engineer Mode
          </span>
        </div>
        <p style={{ color: '#555', fontSize: 10, marginTop: 4 }}>
          Press Ctrl+E to toggle · Live state view
        </p>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>

        {/* State Inspector */}
        <Section title="ZUSTAND STATE" color="#febc2e">
          <StateInspector
            windows={windows}
            activeWindowId={activeWindowId}
            engineerMode={engineerMode}
            nextZIndex={nextZIndex}
          />
        </Section>

        <div style={{ height: 1, background: '#21262d', margin: '12px 0' }} />

        {/* Component Tree */}
        <Section title="COMPONENT TREE" color="#a78bfa">
          <ComponentTree windows={windows} />
        </Section>

        <div style={{ height: 1, background: '#21262d', margin: '12px 0' }} />

        {/* Data Flow */}
        <Section title="DATA FLOW" color="#3fb950">
          <DataFlow />
        </Section>

        <div style={{ height: 1, background: '#21262d', margin: '12px 0' }} />

        {/* Action Log */}
        <Section title="ACTION LOG" color="#58a6ff">
          {logs.length === 0 ? (
            <p style={{ color: '#555', fontSize: 11 }}>No actions yet...</p>
          ) : (
            logs.slice(0, 20).map((log, i) => (
              <div key={i} style={{
                display: 'flex', gap: 8,
                padding: '4px 0',
                borderBottom: '1px solid #111',
                alignItems: 'flex-start',
              }}>
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  color: LOG_COLORS[log.type] ?? '#888',
                  minWidth: 90, flexShrink: 0,
                }}>
                  {log.type}
                </span>
                <span style={{ fontSize: 10, color: '#666', flex: 1 }}>
                  {log.detail}
                </span>
                <span style={{ fontSize: 9, color: '#333', flexShrink: 0 }}>
                  {new Date(log.ts).toLocaleTimeString()}
                </span>
              </div>
            ))
          )}
        </Section>

      </div>

      {/* Footer */}
      <div style={{
        padding: '8px 16px',
        borderTop: '1px solid #21262d',
        background: '#161b22',
        flexShrink: 0,
      }}>
        <p style={{ fontSize: 10, color: '#333', textAlign: 'center' }}>
          Portfolio OS · Built with React + Zustand
        </p>
      </div>
    </div>
  )
}