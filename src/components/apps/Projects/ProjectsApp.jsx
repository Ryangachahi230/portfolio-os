import { useState } from 'react'
import projects from '../../../data/projects'

const TABS = [
  { id: 'overview',     label: 'Overview',      icon: '📋' },
  { id: 'how',         label: 'How It Works',  icon: '⚙️' },
  { id: 'challenges',  label: 'Challenges',    icon: '🧩' },
  { id: 'improvements',label: 'Improvements',  icon: '🚀' },
]

// ── Tech badge ───────────────────────────────────────────
function TechBadge({ tech }) {
  const colors = {
    'React':     { bg: '#e8f4fd', color: '#0078D4', border: '#c7e0f4' },
    'Node.js':   { bg: '#e8f5e9', color: '#107C10', border: '#b8dfb8' },
    'Socket.io': { bg: '#f3e8fd', color: '#8764B8', border: '#d4b8f4' },
    'MongoDB':   { bg: '#e8f5e9', color: '#107C10', border: '#b8dfb8' },
    'Zustand':   { bg: '#fde8f8', color: '#C239B3', border: '#f4b8e8' },
    'Vite':      { bg: '#e8f4fd', color: '#0078D4', border: '#c7e0f4' },
    'Python':    { bg: '#fff8e8', color: '#8a6200', border: '#f4dfa0' },
  }
  const style = colors[tech] ?? {
    bg: '#f0f0f0', color: '#555', border: '#ddd',
  }

  return (
    <span style={{
      padding: '3px 10px',
      borderRadius: 4,
      fontSize: 11,
      fontWeight: 600,
      background: style.bg,
      color: style.color,
      border: `1px solid ${style.border}`,
    }}>
      {tech}
    </span>
  )
}

// ── Sidebar project item ─────────────────────────────────
function ProjectItem({ project, isSelected, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '10px 12px',
        borderRadius: 6,
        cursor: 'pointer',
        marginBottom: 2,
        background: isSelected
          ? '#f0f7ff'
          : hovered
            ? 'rgba(0,0,0,0.04)'
            : 'transparent',
        borderLeft: `3px solid ${isSelected ? '#0078D4' : 'transparent'}`,
        transition: 'all 0.15s',
      }}
    >
      <p style={{
        fontSize: 13,
        fontWeight: isSelected ? 600 : 400,
        color: isSelected ? '#0078D4' : '#1a1a1a',
        marginBottom: 3,
      }}>
        {project.name}
      </p>
      <p style={{
        fontSize: 11,
        color: '#888',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {project.tagline}
      </p>
    </div>
  )
}

// ── Tab button ───────────────────────────────────────────
function TabBtn({ tab, isActive, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 14px',
        border: 'none',
        borderBottom: `2px solid ${isActive ? '#0078D4' : 'transparent'}`,
        background: hovered && !isActive
          ? 'rgba(0,0,0,0.04)'
          : 'transparent',
        color: isActive ? '#0078D4' : '#555',
        fontSize: 12,
        fontWeight: isActive ? 600 : 400,
        cursor: 'pointer',
        transition: 'all 0.15s',
        borderRadius: '4px 4px 0 0',
        whiteSpace: 'nowrap',
      }}
    >
      <span>{tab.icon}</span>
      <span>{tab.label}</span>
    </button>
  )
}

// ── Overview tab ─────────────────────────────────────────
function OverviewTab({ project }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Description card */}
      <div style={{
        background: 'white',
        borderRadius: 8,
        padding: '16px 20px',
        border: '1px solid rgba(0,0,0,0.06)',
      }}>
        <p style={{
          fontSize: 11, fontWeight: 600,
          color: '#0078D4', letterSpacing: 0.5,
          textTransform: 'uppercase', marginBottom: 8,
        }}>
          Description
        </p>
        <p style={{ fontSize: 13, color: '#444', lineHeight: 1.7 }}>
          {project.description}
        </p>
      </div>

      {/* Tech stack card */}
      <div style={{
        background: 'white',
        borderRadius: 8,
        padding: '16px 20px',
        border: '1px solid rgba(0,0,0,0.06)',
      }}>
        <p style={{
          fontSize: 11, fontWeight: 600,
          color: '#0078D4', letterSpacing: 0.5,
          textTransform: 'uppercase', marginBottom: 12,
        }}>
          Tech Stack
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {project.tech.map(t => <TechBadge key={t} tech={t} />)}
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 10 }}>
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '9px 20px',
            background: '#0078D4',
            color: 'white',
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#006cc1'}
          onMouseLeave={e => e.currentTarget.style.background = '#0078D4'}
        >
          🌐 Live Demo
        </a>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '9px 20px',
            background: 'white',
            color: '#1a1a1a',
            border: '1px solid rgba(0,0,0,0.15)',
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
          onMouseLeave={e => e.currentTarget.style.background = 'white'}
        >
          🐙 GitHub
        </a>
      </div>
    </div>
  )
}

// ── How it works tab ─────────────────────────────────────
function HowTab({ project }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: 8,
      padding: '20px 24px',
      border: '1px solid rgba(0,0,0,0.06)',
    }}>
      <p style={{
        fontSize: 11, fontWeight: 600,
        color: '#0078D4', letterSpacing: 0.5,
        textTransform: 'uppercase', marginBottom: 12,
      }}>
        How It Works
      </p>
      <p style={{
        fontSize: 13, color: '#444',
        lineHeight: 1.8,
      }}>
        {project.howItWorks}
      </p>
    </div>
  )
}

// ── List tab (challenges / improvements) ─────────────────
function ListTab({ items, color, emptyMsg }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: 8,
      padding: '20px 24px',
      border: '1px solid rgba(0,0,0,0.06)',
    }}>
      {items.length === 0 ? (
        <p style={{ fontSize: 13, color: '#aaa' }}>{emptyMsg}</p>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          {items.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
              padding: '10px 14px',
              background: `${color}08`,
              border: `1px solid ${color}20`,
              borderLeft: `3px solid ${color}`,
              borderRadius: 4,
            }}>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                color: 'white',
                background: color,
                width: 20,
                height: 20,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 1,
              }}>
                {i + 1}
              </span>
              <p style={{
                fontSize: 13,
                color: '#333',
                lineHeight: 1.6,
              }}>
                {item}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main component ───────────────────────────────────────
export default function ProjectsApp() {
  const [selected, setSelected] = useState(projects[0])
  const [activeTab, setActiveTab] = useState('overview')

  const handleProjectChange = (project) => {
    setSelected(project)
    setActiveTab('overview')
  }

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      fontFamily: "'Segoe UI', sans-serif",
      background: '#f3f3f3',
    }}>

      {/* ── Left sidebar — project list ────────────────── */}
      <div style={{
        width: 200,
        background: 'white',
        borderRight: '1px solid rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        overflowY: 'auto',
      }}>
        <div style={{
          padding: '12px 8px 8px',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}>
          <p style={{
            fontSize: 10,
            fontWeight: 600,
            color: '#888',
            letterSpacing: 0.8,
            padding: '0 4px',
            textTransform: 'uppercase',
          }}>
            Projects ({projects.length})
          </p>
        </div>
        <div style={{ padding: '8px' }}>
          {projects.map(p => (
            <ProjectItem
              key={p.id}
              project={p}
              isSelected={selected.id === p.id}
              onClick={() => handleProjectChange(p)}
            />
          ))}
        </div>
      </div>

      {/* ── Right — detail area ────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* Project header */}
        <div style={{
          padding: '14px 20px 0',
          background: 'white',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          flexShrink: 0,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}>
            <div>
              <h2 style={{
                fontSize: 16,
                fontWeight: 600,
                color: '#1a1a1a',
                marginBottom: 4,
              }}>
                {selected.name}
              </h2>
              <p style={{ fontSize: 12, color: '#888' }}>
                {selected.tagline}
              </p>
            </div>
          </div>

          {/* Tab bar */}
          <div style={{
            display: 'flex',
            gap: 0,
            marginTop: 4,
          }}>
            {TABS.map(tab => (
              <TabBtn
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: 20,
        }}>
          {activeTab === 'overview' && (
            <OverviewTab project={selected} />
          )}
          {activeTab === 'how' && (
            <HowTab project={selected} />
          )}
          {activeTab === 'challenges' && (
            <ListTab
              items={selected.challenges}
              color="#C239B3"
              emptyMsg="No challenges listed yet."
            />
          )}
          {activeTab === 'improvements' && (
            <ListTab
              items={selected.improvements}
              color="#107C10"
              emptyMsg="No improvements listed yet."
            />
          )}
        </div>
      </div>
    </div>
  )
}