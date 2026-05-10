import { useState } from 'react'

export default function ResumeApp() {
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(false)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#f3f3f3',
      fontFamily: "'Segoe UI', sans-serif",
    }}>

      {/* ── Toolbar ───────────────────────────────────── */}
      <div style={{
        height: 40,
        background: '#fafafa',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: 8,
        flexShrink: 0,
      }}>

        {/* Icon + label */}
        <div style={{
          width: 22, height: 22,
          borderRadius: 5,
          background: 'linear-gradient(145deg, #d83b01, #a42900)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          flexShrink: 0,
        }}>
          📄
        </div>

        <span style={{
          fontSize: 12,
          color: '#555',
          fontWeight: 500,
        }}>
          Ryan Gachahi — Resume.pdf
        </span>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* View only badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 12px',
          background: '#fff8e8',
          border: '1px solid #f0d080',
          borderRadius: 4,
          fontSize: 11,
          color: '#8a6200',
          fontWeight: 500,
        }}>
          <span>👁️</span>
          <span>View Only</span>
        </div>
      </div>

      {/* ── PDF Viewer ────────────────────────────────── */}
      <div style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Loading spinner */}
        {loading && !error && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f3f3f3',
            gap: 12,
            zIndex: 1,
          }}>
            <div style={{
              width: 36, height: 36,
              border: '3px solid #e0e0e0',
              borderTop: '3px solid #0078D4',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }} />
            <span style={{ fontSize: 13, color: '#888' }}>
              Loading resume...
            </span>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
          }}>
            <span style={{ fontSize: 48 }}>📄</span>
            <p style={{
              fontSize: 14, color: '#555', fontWeight: 500,
            }}>
              Resume not found
            </p>
            <p style={{
              fontSize: 12, color: '#999',
              textAlign: 'center', maxWidth: 280,
            }}>
              Add your PDF to the{' '}
              <code style={{
                background: '#f0f0f0',
                padding: '1px 6px',
                borderRadius: 3,
              }}>
                public/
              </code>{' '}
              folder and name it{' '}
              <code style={{
                background: '#f0f0f0',
                padding: '1px 6px',
                borderRadius: 3,
              }}>
                resume.pdf
              </code>
            </p>
          </div>
        )}

        {/* ── PDF iframe ──────────────────────────────── */}
        {/* toolbar=0 hides the browser PDF toolbar        */}
        {/* navpanes=0 hides the navigation panel          */}
        {/* This removes the built-in download button      */}
        {!error && (
          <iframe
            src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH"
            title="Resume — View Only"
            width="100%"
            height="100%"
            style={{
              border: 'none',
              display: 'block',
              opacity: loading ? 0 : 1,
              transition: 'opacity 0.3s',
            }}
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false)
              setError(true)
            }}
          />
        )}

        {/* ── Invisible overlay blocks right-click ──────── */}
        {/* Prevents save/download via right-click on PDF   */}
        {!error && !loading && (
          <div
            onContextMenu={e => e.preventDefault()}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              background: 'transparent',
              cursor: 'default',
              // Let scroll and pointer events pass through
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      {/* Spin animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}