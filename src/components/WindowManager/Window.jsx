import { useRef } from 'react'
import useStore from '../../store/useStore'
import useDrag from './useDrag'
import AboutApp     from '../apps/About/AboutApp'
import EducationApp from '../apps/Education/EducationApp'
import SkillsApp    from '../apps/Skills/SkillsApp'
import ProjectsApp  from '../apps/Projects/ProjectsApp'
import TerminalApp  from '../apps/Terminal/TerminalApp'
import ContactApp   from '../apps/Contact/ContactApp'

const APPS = {
  about:     <AboutApp />,
  education: <EducationApp />,
  skills:    <SkillsApp />,
  projects:  <ProjectsApp />,
  terminal:  <TerminalApp />,
  contact:   <ContactApp />,
}

export default function Window({ win }) {
  const { closeWindow, minimizeWindow, focusWindow } = useStore()
  const ref = useRef()
  useDrag(ref, win.id)

  if (win.minimized) return null

  return (
    <div
      ref={ref}
      onMouseDown={() => focusWindow(win.id)}
      style={{
        position: 'fixed',
        left: win.x, top: win.y,
        width: win.w, height: win.h,
        zIndex: win.zIndex,
        background: '#ffffff',
        borderRadius: 12,
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.2)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Title Bar */}
      <div
        data-drag-handle
        style={{
          height: 44, background: '#f0f0f0',
          borderBottom: '1px solid #ddd',
          display: 'flex', alignItems: 'center',
          padding: '0 12px', gap: 8,
          cursor: 'grab', flexShrink: 0,
        }}
      >
        <button onClick={() => closeWindow(win.id)} style={{
          width: 13, height: 13, borderRadius: '50%',
          background: '#ff5f57', border: 'none',
        }} />
        <button onClick={() => minimizeWindow(win.id)} style={{
          width: 13, height: 13, borderRadius: '50%',
          background: '#febc2e', border: 'none',
        }} />
        <div style={{
          width: 13, height: 13, borderRadius: '50%',
          background: '#28c840',
        }} />
        <span style={{
          flex: 1, textAlign: 'center',
          fontSize: 13, fontWeight: 600,
          color: '#333', marginRight: 42,
        }}>
          {win.title}
        </span>
      </div>

      {/* App Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {APPS[win.appId]}
      </div>
    </div>
  )
}