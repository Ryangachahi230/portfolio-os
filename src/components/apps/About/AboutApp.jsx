import { useState } from 'react'
import about from '../../../data/about'

export default function AboutApp() {
  return (
    <div style={{
      display: 'flex',
      height: '100%',
      background: '#f3f3f3',
      fontFamily: "'Segoe UI', sans-serif",
    }}>

      {/* ── Left panel — profile card ──────────────────── */}
      <div style={{
        width: 200,
        background: '#ffffff',
        borderRight: '1px solid rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '28px 16px',
        gap: 12,
        flexShrink: 0,
      }}>

        {/* Avatar circle */}
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'linear-gradient(145deg, #0078D4, #005a9e)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          boxShadow: '0 4px 16px rgba(0,120,212,0.3)',
        }}>
          👤
        </div>

        {/* Name */}
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#1a1a1a',
            marginBottom: 4,
          }}>
            {about.name}
          </p>
          <p style={{
            fontSize: 11,
            color: '#0078D4',
            fontWeight: 500,
          }}>
            {about.role}
          </p>
          <p style={{
            fontSize: 11,
            color: '#888',
            marginTop: 2,
          }}>
            {about.location}
          </p>
        </div>

        {/* Divider */}
        <div style={{
          width: '100%',
          height: 1,
          background: 'rgba(0,0,0,0.06)',
        }} />

        {/* Quick stats */}
        <div style={{ width: '100%' }}>
          {[
            { label: 'Role',     value: 'Dev'      },
            { label: 'Stack',    value: 'Full Stack'},
            { label: 'Based',    value: 'Nairobi'  },
            { label: 'Available',value: '✅ Yes'   },
          ].map(s => (
            <div key={s.label} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '6px 0',
              borderBottom: '1px solid rgba(0,0,0,0.04)',
            }}>
              <span style={{ fontSize: 11, color: '#888' }}>{s.label}</span>
              <span style={{ fontSize: 11, color: '#1a1a1a', fontWeight: 500 }}>
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* GitHub link */}
        <a
          href={about.contact.github}
          target="_blank"
          rel="noreferrer"
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 14px',
            background: '#1a1a1a',
            color: 'white',
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 500,
            width: '100%',
            justifyContent: 'center',
          }}
        >
          🐙 GitHub
        </a>
      </div>

      {/* ── Right panel — bio + timeline ──────────────── */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px 24px',
      }}>

        {/* Bio card */}
        <div style={{
          background: 'white',
          borderRadius: 8,
          padding: '16px 20px',
          marginBottom: 16,
          border: '1px solid rgba(0,0,0,0.06)',
        }}>
          <p style={{
            fontSize: 11,
            fontWeight: 600,
            color: '#0078D4',
            letterSpacing: 0.5,
            marginBottom: 8,
            textTransform: 'uppercase',
          }}>
            About
          </p>
          <p style={{
            fontSize: 13,
            color: '#444',
            lineHeight: 1.7,
          }}>
            {about.bio}
          </p>
        </div>

        {/* Timeline */}
        <div style={{
          background: 'white',
          borderRadius: 8,
          padding: '16px 20px',
          border: '1px solid rgba(0,0,0,0.06)',
        }}>
          <p style={{
            fontSize: 11,
            fontWeight: 600,
            color: '#0078D4',
            letterSpacing: 0.5,
            marginBottom: 16,
            textTransform: 'uppercase',
          }}>
            Journey
          </p>

          {/* Timeline items */}
          <div style={{
            position: 'relative',
            paddingLeft: 20,
          }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute',
              left: 5,
              top: 6,
              bottom: 6,
              width: 2,
              background: 'linear-gradient(180deg, #0078D4, rgba(0,120,212,0.1))',
              borderRadius: 2,
            }} />

            {about.timeline.map((item, i) => (
              <TimelineItem key={i} item={item} isLast={i === about.timeline.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Timeline item with expand/collapse ───────────────────
function TimelineItem({ item, isLast }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{
      position: 'relative',
      paddingBottom: isLast ? 0 : 20,
    }}>
      {/* Dot on the line */}
      <div style={{
        position: 'absolute',
        left: -18,
        top: 4,
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: 'white',
        border: '2px solid #0078D4',
        zIndex: 1,
      }} />

      {/* Content */}
      <div
        onClick={() => setExpanded(e => !e)}
        style={{
          cursor: 'pointer',
          padding: '8px 12px',
          borderRadius: 6,
          background: expanded ? '#f0f7ff' : 'transparent',
          border: `1px solid ${expanded ? '#c7e0f4' : 'transparent'}`,
          transition: 'all 0.2s',
        }}
      >
        {/* Year badge + title */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              color: 'white',
              background: '#0078D4',
              padding: '2px 8px',
              borderRadius: 3,
            }}>
              {item.year}
            </span>
            <span style={{
              fontSize: 13,
              fontWeight: 500,
              color: '#1a1a1a',
            }}>
              {item.title}
            </span>
          </div>
          <span style={{
            fontSize: 10,
            color: '#aaa',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.2s',
          }}>
            ▾
          </span>
        </div>

        {/* Expanded description */}
        {expanded && (
          <p style={{
            fontSize: 12,
            color: '#555',
            lineHeight: 1.6,
            marginTop: 8,
            paddingTop: 8,
            borderTop: '1px solid rgba(0,120,212,0.15)',
          }}>
            {item.description}
          </p>
        )}
      </div>
    </div>
  )
}