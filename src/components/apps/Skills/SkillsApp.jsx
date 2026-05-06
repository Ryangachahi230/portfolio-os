import { useState } from 'react'
import skills from '../../../data/skills'

export default function SkillsApp() {
  const [activeCategory, setActiveCategory] = useState(skills[0].category)
  const [selectedSkill, setSelectedSkill] = useState(null)

  const currentCategory = skills.find(s => s.category === activeCategory)

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'sans-serif' }}>

      {/* Left — Category tabs */}
      <div style={{
        width: 130, borderRight: '1px solid #eee',
        padding: 12, flexShrink: 0,
        background: '#fafafa',
      }}>
        <p style={{ fontSize: 11, color: '#999', fontWeight: 600, marginBottom: 8 }}>
          CATEGORIES
        </p>
        {skills.map(s => (
          <div
            key={s.category}
            onClick={() => { setActiveCategory(s.category); setSelectedSkill(null) }}
            style={{
              padding: '8px 10px',
              borderRadius: 8,
              cursor: 'pointer',
              marginBottom: 4,
              fontSize: 13,
              fontWeight: 500,
              background: activeCategory === s.category ? '#1a1a2e' : 'transparent',
              color: activeCategory === s.category ? 'white' : '#444',
            }}
          >
            {s.icon} {s.category}
          </div>
        ))}
      </div>

      {/* Middle — Skill list */}
      <div style={{
        width: 180, borderRight: '1px solid #eee',
        padding: 12, overflowY: 'auto', flexShrink: 0,
      }}>
        <p style={{ fontSize: 11, color: '#999', fontWeight: 600, marginBottom: 8 }}>
          SKILLS
        </p>
        {currentCategory.items.map(skill => (
          <div
            key={skill.name}
            onClick={() => setSelectedSkill(skill)}
            style={{
              padding: '10px 12px',
              borderRadius: 8,
              cursor: 'pointer',
              marginBottom: 4,
              background: selectedSkill?.name === skill.name ? '#e8f0fe' : 'transparent',
              border: selectedSkill?.name === skill.name ? '1px solid #c7d7f9' : '1px solid transparent',
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 500, color: '#222' }}>{skill.name}</p>

            {/* Level bar */}
            <div style={{
              height: 4, background: '#eee',
              borderRadius: 2, marginTop: 6, overflow: 'hidden',
            }}>
              <div style={{
                width: `${skill.level}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #1a1a2e, #0f3460)',
                borderRadius: 2,
              }} />
            </div>
            <p style={{ fontSize: 10, color: '#999', marginTop: 3 }}>{skill.level}%</p>
          </div>
        ))}
      </div>

      {/* Right — Skill detail */}
      <div style={{ flex: 1, padding: 20, overflowY: 'auto' }}>
        {selectedSkill ? (
          <div>
            <h2 style={{ fontSize: 20, color: '#1a1a2e', marginBottom: 6 }}>
              {selectedSkill.name}
            </h2>

            {/* Big level bar */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: '#888' }}>Proficiency</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#1a1a2e' }}>
                  {selectedSkill.level}%
                </span>
              </div>
              <div style={{ height: 8, background: '#eee', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  width: `${selectedSkill.level}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #1a1a2e, #0f3460)',
                  borderRadius: 4,
                  transition: 'width 0.5s ease',
                }} />
              </div>
            </div>

            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#555', marginBottom: 20 }}>
              {selectedSkill.description}
            </p>

            {selectedSkill.projects.length > 0 && (
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#1a1a2e', marginBottom: 8 }}>
                  USED IN PROJECTS
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {selectedSkill.projects.map(p => (
                    <span key={p} style={{
                      background: '#f0f4ff', color: '#1a56db',
                      borderRadius: 4, padding: '3px 10px', fontSize: 12,
                    }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={{
            height: '100%', display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            color: '#bbb',
          }}>
            <span style={{ fontSize: 40, marginBottom: 12 }}>👈</span>
            <p style={{ fontSize: 14 }}>Select a skill to see details</p>
          </div>
        )}
      </div>

    </div>
  )
}