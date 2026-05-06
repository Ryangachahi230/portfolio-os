import { useState } from 'react'
import projects from '../../../data/projects'

const TABS = ['Overview', 'How It Works', 'Challenges', 'Improvements']

export default function ProjectsApp() {
  const [selected, setSelected] = useState(projects[0])
  const [tab, setTab] = useState('Overview')

  return (
    <div style={{ display: 'flex', height: '100%' }}>

      {/* Sidebar */}
      <div style={{
        width: 200, borderRight: '1px solid #eee',
        padding: 12, overflowY: 'auto', flexShrink: 0,
      }}>
        <p style={{ fontSize: 11, color: '#999', marginBottom: 8, fontWeight: 600 }}>PROJECTS</p>
        {projects.map(p => (
          <div
            key={p.id}
            onClick={() => { setSelected(p); setTab('Overview') }}
            style={{
              padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
              background: selected.id === p.id ? '#1a1a2e' : 'transparent',
              color: selected.id === p.id ? 'white' : '#333',
              marginBottom: 4, fontSize: 13, fontWeight: 500,
            }}
          >
            {p.name}
          </div>
        ))}
      </div>

      {/* Detail Panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Project Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #eee' }}>
          <h2 style={{ fontSize: 18, color: '#1a1a2e' }}>{selected.name}</h2>
          <p style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{selected.tagline}</p>
          <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
            {selected.tech.map(t => (
              <span key={t} style={{
                background: '#e8f0fe', color: '#1a56db',
                borderRadius: 4, padding: '2px 8px', fontSize: 11, fontWeight: 600,
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, padding: '8px 20px', borderBottom: '1px solid #eee' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '5px 12px', borderRadius: 6, border: 'none',
              background: tab === t ? '#1a1a2e' : '#f0f0f0',
              color: tab === t ? 'white' : '#555',
              fontSize: 12, fontWeight: 500,
            }}>{t}</button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
          {tab === 'Overview' && (
            <div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#444', marginBottom: 16 }}>
                {selected.description}
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                <a href={selected.demoUrl} target="_blank" rel="noreferrer" style={{
                  padding: '8px 16px', background: '#1a1a2e', color: 'white',
                  borderRadius: 6, fontSize: 13, textDecoration: 'none',
                }}>Live Demo ↗</a>
                <a href={selected.repoUrl} target="_blank" rel="noreferrer" style={{
                  padding: '8px 16px', background: '#f0f0f0', color: '#333',
                  borderRadius: 6, fontSize: 13, textDecoration: 'none',
                }}>GitHub ↗</a>
              </div>
            </div>
          )}
          {tab === 'How It Works' && (
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#444' }}>{selected.howItWorks}</p>
          )}
          {tab === 'Challenges' && (
            <ul style={{ paddingLeft: 20 }}>
              {selected.challenges.map((c, i) => (
                <li key={i} style={{ fontSize: 14, lineHeight: 2, color: '#444' }}>{c}</li>
              ))}
            </ul>
          )}
          {tab === 'Improvements' && (
            <ul style={{ paddingLeft: 20 }}>
              {selected.improvements.map((r, i) => (
                <li key={i} style={{ fontSize: 14, lineHeight: 2, color: '#444' }}>{r}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}