import { useState } from 'react'
import education from '../../../data/education'

export default function EducationApp() {
  const [expanded, setExpanded] = useState('e1')

  const toggle = (id) => setExpanded(expanded === id ? null : id)

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 18, color: '#1a1a2e', marginBottom: 20 }}>🎓 Education</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {education.map(item => (
          <div key={item.id} style={{
            border: '1px solid #e0e0e0',
            borderRadius: 10,
            overflow: 'hidden',
            boxShadow: expanded === item.id ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
            transition: 'box-shadow 0.2s',
          }}>

            {/* Header — always visible, click to expand */}
            <div
              onClick={() => toggle(item.id)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px',
                cursor: 'pointer',
                background: expanded === item.id ? '#1a1a2e' : '#fafafa',
                transition: 'background 0.2s',
              }}
            >
              <div>
                <p style={{
                  fontWeight: 600, fontSize: 14,
                  color: expanded === item.id ? 'white' : '#1a1a2e',
                }}>
                  {item.degree}
                </p>
                <p style={{
                  fontSize: 12, marginTop: 2,
                  color: expanded === item.id ? 'rgba(255,255,255,0.7)' : '#888',
                }}>
                  {item.school} · {item.year}
                </p>
              </div>
              <span style={{
                fontSize: 18,
                color: expanded === item.id ? 'white' : '#888',
                transform: expanded === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}>
                ▾
              </span>
            </div>

            {/* Expanded Content */}
            {expanded === item.id && (
              <div style={{ padding: '16px', background: 'white' }}>
                <p style={{ fontSize: 13, color: '#555', lineHeight: 1.7, marginBottom: 14 }}>
                  {item.description}
                </p>

                <p style={{ fontSize: 12, fontWeight: 600, color: '#1a1a2e', marginBottom: 8 }}>
                  KEY COURSES
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {item.courses.map(course => (
                    <span key={course} style={{
                      background: '#f0f4ff',
                      color: '#1a56db',
                      borderRadius: 4,
                      padding: '3px 10px',
                      fontSize: 12,
                    }}>
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}