import { useState, useEffect } from 'react'
import useStore from '../../../store/useStore'
import eventBus from '../../../events/eventBus'

// ── tiny reusable meter ──────────────────────────────────────────
function Meter({ label, value, color, unit = '%' }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginBottom: 6, fontSize: 13,
      }}>
        <span style={{ color: '#555', fontWeight: 500 }}>{label}</span>
        <span style={{ color, fontWeight: 700 }}>{value}{unit}</span>
      </div>
      <div style={{
        height: 8, background: '#eee',
        borderRadius: 4, overflow: 'hidden',
      }}>
        <div style={{
          width: `${value}%`, height: '100%',
          background: `linear-gradient(90deg, ${color}99, ${color})`,
          borderRadius: 4,
          transition: 'width 1s ease',
        }} />
      </div>
    </div>
  )
}

// ── event badge colors ───────────────────────────────────────────
const EVENT_COLORS = {
  APP_OPEN:     '#28c840',
  APP_CLOSE:    '#ff5f57',
  APP_FOCUS:    '#58a6ff',
  APP_MINIMIZE: '#febc2e',
}

// ── main component ───────────────────────────────────────────────
export default function MonitorApp() {
  const windows = useStore(s => s.windows)

  // Simulated metrics — scale with real open window count
  const [cpu, setCpu]       = useState(8)
  const [memory, setMemory] = useState(30)
  const [uptime, setUptime] = useState(0)

  // Live event stream
  const [events, setEvents] = useState([])

  // ── tick: update simulated metrics every 1.5 s ─────────────────
  useEffect(() => {
    const tick = setInterval(() => {
      const openCount = windows.filter(w => !w.minimized).length
      // CPU rises with open windows, flickers realistically
      const baseCpu = 5 + openCount * 7
      setCpu(Math.min(99, Math.round(baseCpu + Math.random() * 10)))
      // Memory grows slowly with total windows
      const baseMem = 25 + windows.length * 5
      setMemory(Math.min(99, Math.round(baseMem + Math.random() * 4)))
      // Uptime counts up every tick
      setUptime(t => t + 1)
    }, 1500)
    return () => clearInterval(tick)
  }, [windows.length])

  // ── subscribe to event bus ─────────────────────────────────────
  useEffect(() => {
    const TRACKED = ['APP_OPEN', 'APP_CLOSE', 'APP_FOCUS', 'APP_MINIMIZE']
    const unsubs = TRACKED.map(ev =>
      eventBus.on(ev, (payload) =>
        setEvents(prev =>
          [{ event: ev, ...payload, ts: Date.now() }, ...prev].slice(0, 12)
        )
      )
    )
    return () => unsubs.forEach(u => u())
  }, [])

  const openApps     = windows.filter(w => !w.minimized)
  const minimizedApps = windows.filter(w => w.minimized)

  // Format uptime as mm:ss
  const formatUptime = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, '0')
    const sec = String(s % 60).padStart(2, '0')
    return `${m}:${sec}`
  }

  return (
    <div style={{
      height: '100%', overflowY: 'auto',
      padding: 20, fontFamily: 'sans-serif',
      background: '#fafafa',
    }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 20,
      }}>
        <h2 style={{ fontSize: 16, color: '#1a1a2e', margin: 0 }}>
          📊 System Monitor
        </h2>
        <span style={{
          fontSize: 12, color: '#888',
          background: '#f0f0f0', padding: '3px 10px',
          borderRadius: 20,
        }}>
          Uptime: {formatUptime(uptime)}
        </span>
      </div>

      {/* ── Performance metrics ────────────────────────────── */}
      <div style={{
        background: 'white', borderRadius: 12,
        padding: 16, marginBottom: 16,
        border: '1px solid #eee',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}>
        <p style={{
          fontSize: 11, fontWeight: 600,
          color: '#999', marginBottom: 14,
          letterSpacing: 0.5,
        }}>
          PERFORMANCE
        </p>
        <Meter label="CPU Usage"    value={cpu}    color="#ff5f57" />
        <Meter label="Memory Usage" value={memory} color="#58a6ff" />
        <Meter
          label="Active Windows"
          value={Math.round((openApps.length / 6) * 100)}
          color="#28c840"
        />
      </div>

      {/* ── Open applications ──────────────────────────────── */}
      <div style={{
        background: 'white', borderRadius: 12,
        padding: 16, marginBottom: 16,
        border: '1px solid #eee',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}>
        <p style={{
          fontSize: 11, fontWeight: 600,
          color: '#999', marginBottom: 12,
          letterSpacing: 0.5,
        }}>
          RUNNING APPS ({openApps.length})
        </p>

        {openApps.length === 0 ? (
          <p style={{ fontSize: 13, color: '#bbb', textAlign: 'center', padding: '8px 0' }}>
            No apps open
          </p>
        ) : (
          openApps.map(w => (
            <div key={w.id} style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: '1px solid #f5f5f5',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#28c840',
                  boxShadow: '0 0 6px #28c840',
                }} />
                <span style={{ fontSize: 13, color: '#333', fontWeight: 500 }}>
                  {w.title}
                </span>
              </div>
              <span style={{
                fontSize: 11, color: '#999',
                background: '#f5f5f5',
                padding: '2px 8px', borderRadius: 4,
              }}>
                z:{w.zIndex}
              </span>
            </div>
          ))
        )}

        {/* Minimized */}
        {minimizedApps.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <p style={{ fontSize: 11, color: '#bbb', marginBottom: 6 }}>
              MINIMIZED ({minimizedApps.length})
            </p>
            {minimizedApps.map(w => (
              <div key={w.id} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 0',
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#febc2e',
                }} />
                <span style={{ fontSize: 13, color: '#aaa' }}>{w.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Live event stream ──────────────────────────────── */}
      <div style={{
        background: '#0d1117', borderRadius: 12,
        padding: 16, border: '1px solid #21262d',
      }}>
        <p style={{
          fontSize: 11, fontWeight: 600,
          color: '#58a6ff', marginBottom: 12,
          letterSpacing: 0.5,
        }}>
          LIVE EVENT STREAM
        </p>

        {events.length === 0 ? (
          <p style={{
            fontSize: 12, color: '#555',
            fontFamily: 'monospace', textAlign: 'center',
            padding: '8px 0',
          }}>
            Waiting for events...
          </p>
        ) : (
          events.map((e, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center',
              gap: 8, padding: '4px 0',
              opacity: 1 - i * 0.07,
            }}>
              <span style={{
                fontSize: 10, fontWeight: 700,
                color: EVENT_COLORS[e.event] ?? '#888',
                fontFamily: 'monospace',
                minWidth: 100,
              }}>
                {e.event}
              </span>
              <span style={{
                fontSize: 11, color: '#888',
                fontFamily: 'monospace',
              }}>
                {e.appId ?? e.id ?? '—'}
              </span>
              <span style={{
                fontSize: 10, color: '#444',
                marginLeft: 'auto', fontFamily: 'monospace',
              }}>
                {new Date(e.ts).toLocaleTimeString()}
              </span>
            </div>
          ))
        )}
      </div>

    </div>
  )
}