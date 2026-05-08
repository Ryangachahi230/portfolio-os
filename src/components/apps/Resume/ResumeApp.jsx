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
        }}>
          📄
        </div>
        <span style={{ fontSize: 12, color: '#555', fontWeight: 500 }}>
          Ryan Gachahi — Resume.pdf
        </span>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Download button */}
        <a
          href="/resume.pdf"
          download="Ryan_Gachahi_Resume.pdf"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 14px',
            background: '#0078D4',
            color: 'white',
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#006cc1'}
          onMouseLeave={e => e.currentTarget.style.background = '#0078D4'}
        >
          ⬇ Download
        </a>

        {/* Open in new tab */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 14px',
            background: 'white',
            color: '#333',
            border: '1px solid rgba(0,0,0,0.15)',
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
          onMouseLeave={e => e.currentTarget.style.background = 'white'}
        >
          ↗ Full Screen
        </a>
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
            <p style={{ fontSize: 14, color: '#555', fontWeight: 500 }}>
              Resume not found
            </p>
            <p style={{ fontSize: 12, color: '#999', textAlign: 'center', maxWidth: 280 }}>
              Add your PDF to the <code style={{ background: '#f0f0f0', padding: '1px 6px', borderRadius: 3 }}>public/</code> folder
              and name it <code style={{ background: '#f0f0f0', padding: '1px 6px', borderRadius: 3 }}>resume.pdf</code>
            </p>
            
              <a
                href="/resume.pdf"
                download
                style={{
                marginTop: 8,
                padding: '8px 20px',
                background: '#0078D4',
                color: 'white',
                borderRadius: 4,
                fontSize: 13,
                textDecoration: 'none',
              }}
            >
              Try Download Anyway
            </a>
          </div>
        )}

        {/* PDF iframe */}
        {!error && (
          <iframe
            src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=1"
            title="Resume"
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