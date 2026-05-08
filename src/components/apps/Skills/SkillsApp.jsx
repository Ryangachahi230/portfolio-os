import { useState, useEffect } from 'react'
import skills from '../../../data/skills'

// ── Proficiency label ────────────────────────────────────
function profLabel(level) {
  if (level >= 90) return { text: 'Expert',        color: '#107C10' }
  if (level >= 75) return { text: 'Advanced',      color: '#0078D4' }
  if (level >= 60) return { text: 'Intermediate',  color: '#8764B8' }
  return               { text: 'Beginner',         color: '#C239B3' }
}

// ── Animated progress bar ────────────────────────────────
function ProgressBar({ value, color }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 80)
    return () => clearTimeout(t)
  }, [value])

  return (
    <div style={{
      height: 6,
      background: '#ebebeb',
      borderRadius: 3,
      overflow: 'hidden',
      marginTop: 6,
    }}>
      <div style={{
        height: '100%',
        width: `${width}%`,
        background: `linear-gradient(90deg, ${color}99, ${color})`,
        borderRadius: 3,
        transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }} />
    </div>
  )
}

// ── Skill row in the center list ─────────────────────────
function SkillRow({ skill, isSelected, onClick }) {
  const [hovered, setHovered] = useState(false)
  const prof = profLabel(skill.level)

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
        border: `1px solid ${isSelected ? '#c7e0f4' : 'transparent'}`,
        transition: 'all 0.15s',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
      }}>
        <span style={{
          fontSize: 13,
          fontWeight: isSelected ? 600 : 400,
          color: isSelected ? '#0078D4' : '#1a1a1a',
        }}>
          {skill.name}
        </span>
        <span style={{
          fontSize: 10,
          fontWeight: 600,
          color: prof.color,
          background: `${prof.color}15`,
          padding: '2px 7px',
          borderRadius: 3,
        }}>
          {prof.text}
        </span>
      </div>
      <ProgressBar value={skill.level} color={prof.color} />
    </div>
  )
}

// ── Main component ───────────────────────────────────────
export default function SkillsApp() {
  const [activeCategory, setActiveCategory] = useState(skills[0].category)
  const [selectedSkill,  setSelectedSkill]  = useState(null)

  const currentCategory = skills.find(s => s.category === activeCategory)

  // Reset selected skill when category changes
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setSelectedSkill(null)
  }

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      fontFamily: "'Segoe UI', sans-serif",
      background: '#f3f3f3',
    }}>

      {/* ── Left nav — categories ──────────────────────── */}
      <div style={{
        width: 160,
        background: '#ffffff',
        borderRight: '1px solid rgba(0,0,0,0.06)',
        padding: '12px 8px',
        flexShrink: 0,
        overflowY: 'auto',
      }}>
        <p style={{
          fontSize: 10,
          fontWeight: 600,
          color: '#888',
          letterSpacing: 0.8,
          padding: '4px 8px 8px',
          textTransform: 'uppercase',
        }}>
          Categories
        </p>

        {skills.map(s => {
          const isActive = activeCategory === s.category
          return (
            <NavItem
              key={s.category}
              icon={s.icon}
              label={s.category}
              isActive={isActive}
              onClick={() => handleCategoryChange(s.category)}
              count={s.items.length}
            />
          )
        })}
      </div>

      {/* ── Center — skill list ────────────────────────── */}
      <div style={{
        width: 220,
        background: '#fafafa',
        borderRight: '1px solid rgba(0,0,0,0.06)',
        padding: '12px 8px',
        overflowY: 'auto',
        flexShrink: 0,
      }}>
        <p style={{
          fontSize: 10,
          fontWeight: 600,
          color: '#888',
          letterSpacing: 0.8,
          padding: '4px 8px 8px',
          textTransform: 'uppercase',
        }}>
          {currentCategory.icon} {currentCategory.category}
        </p>

        {currentCategory.items.map(skill => (
          <SkillRow
            key={skill.name}
            skill={skill}
            isSelected={selectedSkill?.name === skill.name}
            onClick={() => setSelectedSkill(skill)}
          />
        ))}
      </div>

      {/* ── Right — skill detail ───────────────────────── */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: 20,
      }}>
        {selectedSkill ? (
          <SkillDetail skill={selectedSkill} />
        ) : (
          <EmptyState category={currentCategory} />
        )}
      </div>
    </div>
  )
}

// ── Left nav item ────────────────────────────────────────
function NavItem({ icon, label, isActive, onClick, count }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 10px',
        borderRadius: 6,
        cursor: 'pointer',
        marginBottom: 2,
        background: isActive
          ? '#f0f7ff'
          : hovered
            ? 'rgba(0,0,0,0.04)'
            : 'transparent',
        borderLeft: `3px solid ${isActive ? '#0078D4' : 'transparent'}`,
        transition: 'all 0.15s',
      }}
    >
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span style={{
        fontSize: 12,
        fontWeight: isActive ? 600 : 400,
        color: isActive ? '#0078D4' : '#333',
        flex: 1,
      }}>
        {label}
      </span>
      <span style={{
        fontSize: 10,
        color: isActive ? '#0078D4' : '#aaa',
        background: isActive ? '#d0e8f7' : '#f0f0f0',
        padding: '1px 6px',
        borderRadius: 10,
        fontWeight: 500,
      }}>
        {count}
      </span>
    </div>
  )
}

// ── Skill detail panel ───────────────────────────────────
function SkillDetail({ skill }) {
  const prof = profLabel(skill.level)

  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'white',
        borderRadius: 8,
        padding: '20px 24px',
        marginBottom: 12,
        border: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}>
          <div>
            <h2 style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#1a1a1a',
              marginBottom: 4,
            }}>
              {skill.name}
            </h2>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              color: prof.color,
              background: `${prof.color}15`,
              padding: '3px 10px',
              borderRadius: 4,
            }}>
              {prof.text}
            </span>
          </div>

          {/* Big percentage */}
          <div style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: `${prof.color}15`,
            border: `2px solid ${prof.color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
            <span style={{
              fontSize: 14,
              fontWeight: 700,
              color: prof.color,
              lineHeight: 1,
            }}>
              {skill.level}
            </span>
            <span style={{
              fontSize: 9,
              color: prof.color,
              opacity: 0.7,
            }}>
              %
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 4,
          }}>
            <span style={{ fontSize: 11, color: '#888' }}>Proficiency</span>
            <span style={{ fontSize: 11, color: prof.color, fontWeight: 600 }}>
              {skill.level}%
            </span>
          </div>
          <ProgressBar value={skill.level} color={prof.color} />
        </div>
      </div>

      {/* Description */}
      <div style={{
        background: 'white',
        borderRadius: 8,
        padding: '16px 24px',
        marginBottom: 12,
        border: '1px solid rgba(0,0,0,0.06)',
      }}>
        <p style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#0078D4',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          marginBottom: 8,
        }}>
          Description
        </p>
        <p style={{
          fontSize: 13,
          color: '#444',
          lineHeight: 1.7,
        }}>
          {skill.description}
        </p>
      </div>

      {/* Used in projects */}
      {skill.projects.length > 0 && (
        <div style={{
          background: 'white',
          borderRadius: 8,
          padding: '16px 24px',
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
            Used In Projects
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skill.projects.map(p => (
              <div key={p} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                background: '#f0f7ff',
                border: '1px solid #c7e0f4',
                borderRadius: 4,
                fontSize: 12,
                color: '#0078D4',
                fontWeight: 500,
              }}>
                🗂️ {p}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Empty state ──────────────────────────────────────────
function EmptyState({ category }) {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      color: '#bbb',
    }}>
      <span style={{ fontSize: 48 }}>{category.icon}</span>
      <p style={{ fontSize: 14, color: '#888' }}>
        Select a skill to view details
      </p>
      <p style={{ fontSize: 12, color: '#bbb' }}>
        {category.items.length} skills in {category.category}
      </p>
    </div>
  )
}