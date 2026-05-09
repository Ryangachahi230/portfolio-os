import { useState } from 'react'
import clientWork from '../../../data/clientWork'

// ── Category badge colors ────────────────────────────────
const CATEGORY_COLORS = {
  'Web Design':  { bg: '#e8f4fd', color: '#0078D4', border: '#c7e0f4' },
  'Full Stack':  { bg: '#e8f5e9', color: '#107C10', border: '#b8dfb8' },
  'Dashboard':   { bg: '#fde8f8', color: '#C239B3', border: '#f4b8e8' },
  'Mobile Web':  { bg: '#f3e8fd', color: '#8764B8', border: '#d4b8f4' },
}

// ── Tech badge ───────────────────────────────────────────
function TechBadge({ tech }) {
  return (
    <span style={{
      padding: '2px 8px',
      background: '#f0f0f0',
      color: '#555',
      border: '1px solid #e0e0e0',
      borderRadius: 3,
      fontSize: 10,
      fontWeight: 500,
    }}>
      {tech}
    </span>
  )
}

// ── Client card (grid view) ──────────────────────────────
function ClientCard({ work, isSelected, onClick }) {
  const [hovered, setHovered] = useState(false)
  const catColor = CATEGORY_COLORS[work.category] ?? {
    bg: '#f0f0f0', color: '#555', border: '#ddd',
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        border: `1px solid ${isSelected ? '#0078D4' : 'rgba(0,0,0,0.08)'}`,
        borderRadius: 8,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.2s',
        transform: hovered && !isSelected ? 'translateY(-2px)' : 'none',
        boxShadow: isSelected
          ? '0 0 0 2px rgba(0,120,212,0.3)'
          : hovered
            ? '0 4px 16px rgba(0,0,0,0.1)'
            : '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      {/* Thumbnail banner */}
      <div style={{
        height: 80,
        background: work.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 36,
        position: 'relative',
      }}>
        {work.thumbnail}
        {/* Year badge */}
        <div style={{
          position: 'absolute',
          top: 8, right: 8,
          background: 'rgba(0,0,0,0.4)',
          color: 'white',
          fontSize: 10,
          fontWeight: 600,
          padding: '2px 8px',
          borderRadius: 3,
        }}>
          {work.year}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '12px' }}>
        {/* Category badge */}
        <span style={{
          fontSize: 10,
          fontWeight: 600,
          background: catColor.bg,
          color: catColor.color,
          border: `1px solid ${catColor.border}`,
          padding: '2px 8px',
          borderRadius: 3,
          display: 'inline-block',
          marginBottom: 8,
        }}>
          {work.category}
        </span>

        <p style={{
          fontSize: 13,
          fontWeight: 600,
          color: '#1a1a1a',
          marginBottom: 3,
          lineHeight: 1.3,
        }}>
          {work.project}
        </p>
        <p style={{
          fontSize: 11,
          color: '#888',
          marginBottom: 10,
        }}>
          {work.client}
        </p>

        {/* Tech badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {work.tech.map(t => <TechBadge key={t} tech={t} />)}
        </div>
      </div>
    </div>
  )
}

// ── Detail panel ─────────────────────────────────────────
function DetailPanel({ work }) {
  const catColor = CATEGORY_COLORS[work.category] ?? {
    bg: '#f0f0f0', color: '#555', border: '#ddd',
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}>

      {/* Header banner */}
      <div style={{
        height: 120,
        background: work.color,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 56,
        position: 'relative',
        flexShrink: 0,
      }}>
        {work.thumbnail}
        <div style={{
          position: 'absolute',
          bottom: 12, left: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}>
          <span style={{
            fontSize: 16,
            fontWeight: 700,
            color: 'white',
            textShadow: '0 1px 4px rgba(0,0,0,0.4)',
          }}>
            {work.project}
          </span>
          <span style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.8)',
          }}>
            {work.client} · {work.year}
          </span>
        </div>
      </div>

      {/* Category + tech */}
      <div style={{
        background: 'white',
        borderRadius: 8,
        padding: '14px 16px',
        border: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 12,
        }}>
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            background: catColor.bg,
            color: catColor.color,
            border: `1px solid ${catColor.border}`,
            padding: '3px 10px',
            borderRadius: 3,
          }}>
            {work.category}
          </span>
        </div>

        <p style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#0078D4',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          marginBottom: 6,
        }}>
          Description
        </p>
        <p style={{
          fontSize: 13,
          color: '#444',
          lineHeight: 1.7,
          marginBottom: 12,
        }}>
          {work.description}
        </p>

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {work.tech.map(t => <TechBadge key={t} tech={t} />)}
        </div>
      </div>

      {/* Results */}
      <div style={{
        background: 'white',
        borderRadius: 8,
        padding: '14px 16px',
        border: '1px solid rgba(0,0,0,0.06)',
      }}>
        <p style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#0078D4',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          marginBottom: 12,
        }}>
          Results
        </p>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}>
          {work.results.map((r, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 12px',
              background: '#f0f9f0',
              border: '1px solid #b8dfb8',
              borderLeft: '3px solid #107C10',
              borderRadius: 4,
            }}>
              <span style={{ color: '#107C10', fontWeight: 700, fontSize: 14 }}>
                ✓
              </span>
              <span style={{ fontSize: 13, color: '#333' }}>{r}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      {work.testimonial && (
        <div style={{
          background: 'white',
          borderRadius: 8,
          padding: '14px 16px',
          border: '1px solid rgba(0,0,0,0.06)',
        }}>
          <p style={{
            fontSize: 11,
            fontWeight: 600,
            color: '#0078D4',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            Testimonial
          </p>

          {/* Quote */}
          <div style={{
            background: '#f8f9ff',
            border: '1px solid #e0e8ff',
            borderLeft: '3px solid #0078D4',
            borderRadius: 4,
            padding: '12px 16px',
            marginBottom: 12,
          }}>
            <p style={{
              fontSize: 13,
              color: '#444',
              lineHeight: 1.7,
              fontStyle: 'italic',
            }}>
              "{work.testimonial.text}"
            </p>
          </div>

          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32,
              borderRadius: '50%',
              background: work.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              flexShrink: 0,
            }}>
              {work.testimonial.author[0]}
            </div>
            <div>
              <p style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#1a1a1a',
              }}>
                {work.testimonial.author}
              </p>
              <p style={{ fontSize: 11, color: '#888' }}>
                {work.testimonial.role}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Live link */}
      <a
        href={work.liveUrl}
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '10px',
          background: '#0078D4',
          color: 'white',
          borderRadius: 6,
          fontSize: 13,
          fontWeight: 500,
          textDecoration: 'none',
          transition: 'background 0.15s',
          flexShrink: 0,
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#006cc1'}
        onMouseLeave={e => e.currentTarget.style.background = '#0078D4'}
      >
        🌐 View Live Project ↗
      </a>
    </div>
  )
}

// ── Main component ───────────────────────────────────────
export default function ClientWorkApp() {
  const [selected, setSelected] = useState(null)
  const [filter,   setFilter]   = useState('All')

  const categories = ['All', ...new Set(clientWork.map(w => w.category))]

  const filtered = filter === 'All'
    ? clientWork
    : clientWork.filter(w => w.category === filter)

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      fontFamily: "'Segoe UI', sans-serif",
      background: '#f3f3f3',
    }}>

      {/* ── Left — grid + filters ──────────────────────── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRight: selected ? '1px solid rgba(0,0,0,0.08)' : 'none',
        minWidth: 0,
      }}>

        {/* Filter toolbar */}
        <div style={{
          padding: '10px 14px',
          background: 'white',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          flexShrink: 0,
        }}>
          {categories.map(cat => (
            <FilterBtn
              key={cat}
              label={cat}
              isActive={filter === cat}
              onClick={() => {
                setFilter(cat)
                setSelected(null)
              }}
            />
          ))}
          <span style={{
            marginLeft: 'auto',
            fontSize: 11,
            color: '#999',
            alignSelf: 'center',
          }}>
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Cards grid */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: 14,
          display: 'grid',
          gridTemplateColumns: selected
            ? '1fr'
            : 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 12,
          alignContent: 'start',
        }}>
          {filtered.map(work => (
            <ClientCard
              key={work.id}
              work={work}
              isSelected={selected?.id === work.id}
              onClick={() =>
                setSelected(s => s?.id === work.id ? null : work)
              }
            />
          ))}
        </div>
      </div>

      {/* ── Right — detail panel ───────────────────────── */}
      {selected && (
        <div style={{
          width: 300,
          overflowY: 'auto',
          padding: 14,
          flexShrink: 0,
          background: '#f3f3f3',
        }}>
          {/* Close detail button */}
          <button
            onClick={() => setSelected(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 12px',
              background: 'white',
              border: '1px solid rgba(0,0,0,0.12)',
              borderRadius: 4,
              fontSize: 12,
              color: '#555',
              cursor: 'pointer',
              marginBottom: 12,
              width: '100%',
              justifyContent: 'center',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
            onMouseLeave={e => e.currentTarget.style.background = 'white'}
          >
            ✕ Close Detail
          </button>
          <DetailPanel work={selected} />
        </div>
      )}
    </div>
  )
}

// ── Filter button ────────────────────────────────────────
function FilterBtn({ label, isActive, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '4px 12px',
        border: `1px solid ${isActive ? '#0078D4' : 'rgba(0,0,0,0.12)'}`,
        borderRadius: 4,
        background: isActive
          ? '#0078D4'
          : hovered ? '#f0f0f0' : 'white',
        color: isActive ? 'white' : '#444',
        fontSize: 12,
        fontWeight: isActive ? 600 : 400,
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
    >
      {label}
    </button>
  )
}