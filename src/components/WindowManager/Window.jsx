import { useRef, useState } from 'react'
import useStore from '../../store/useStore'
import useDrag from './useDrag'
import AboutApp      from '../apps/About/AboutApp'
import EducationApp  from '../apps/Education/EducationApp'
import SkillsApp     from '../apps/Skills/SkillsApp'
import ProjectsApp   from '../apps/Projects/ProjectsApp'
import TerminalApp   from '../apps/Terminal/TerminalApp'
import ContactApp    from '../apps/Contact/ContactApp'
import MonitorApp    from '../apps/Monitor/MonitorApp'
import ResumeApp     from '../apps/Resume/ResumeApp'
import ClientWorkApp from '../apps/ClientWork/ClientWorkApp'
import GameApp       from '../apps/Game/GameApp'

const APPS = {
  about:      <AboutApp />,
  education:  <EducationApp />,
  skills:     <SkillsApp />,
  projects:   <ProjectsApp />,
  terminal:   <TerminalApp />,
  contact:    <ContactApp />,
  monitor:    <MonitorApp />,
  resume:     <ResumeApp />,
  clientwork: <ClientWorkApp />,
  game:       <GameApp />,
}

const APP_ICONS = {
  about:      { icon: '👤', bg: 'linear-gradient(145deg, #0078D4, #005a9e)' },
  education:  { icon: '🎓', bg: 'linear-gradient(145deg, #107C10, #0a5a0a)' },
  skills:     { icon: '⚙️', bg: 'linear-gradient(145deg, #8764B8, #5c3d8f)' },
  projects:   { icon: '🗂️', bg: 'linear-gradient(145deg, #C239B3, #8a1f7e)' },
  terminal:   { icon: '💻', bg: 'linear-gradient(145deg, #2d2d2d, #1a1a1a)' },
  contact:    { icon: '📬', bg: 'linear-gradient(145deg, #0078D4, #004e8c)' },
  monitor:    { icon: '📊', bg: 'linear-gradient(145deg, #005FB8, #003a72)' },
  resume:     { icon: '📄', bg: 'linear-gradient(145deg, #d83b01, #a42900)' },
  clientwork: { icon: '💼', bg: 'linear-gradient(145deg, #8764B8, #5c3d8f)' },
  game:       { icon: '🎮', bg: 'linear-gradient(145deg, #038387, #025a5e)' },
}

function MinimizeIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 1" fill="currentColor">
      <rect width="10" height="1"/>
    </svg>
  )
}

function MaximizeIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
      stroke="currentColor" strokeWidth="1">
      <rect x="0.5" y="0.5" width="9" height="9"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
      stroke="currentColor" strokeWidth="1.2"
      strokeLinecap="round">
      <line x1="0.5" y1="0.5" x2="9.5" y2="9.5"/>
      <line x1="9.5" y1="0.5" x2="0.5" y2="9.5"/>
    </svg>
  )
}

function TitlebarBtn({ onClick, isClose, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick() }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 46, height: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: 'none',
        background: hovered
          ? isClose ? '#c42b1c' : 'rgba(0,0,0,0.08)'
          : 'transparent',
        color: hovered && isClose ? 'white' : '#1a1a1a',
        cursor: 'pointer',
        borderRadius: 0,
        transition: 'background 0.1s, color 0.1s',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  )
}

export default function Window({ win }) {
  const { closeWindow, minimizeWindow, focusWindow } = useStore()
  const ref     = useRef()
  useDrag(ref, win.id)

  const isTerminal = win.appId === 'terminal'
  const appMeta    = APP_ICONS[win.appId] ?? {}

  if (win.minimized) return null

  return (
    <div
      ref={ref}
      onMouseDown={() => focusWindow(win.id)}
      style={{
        position: 'fixed',
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
        zIndex: win.zIndex,
        borderRadius: 8,
        boxShadow: '0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.12)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: isTerminal ? '#1a1a1a' : 'rgba(243,243,243,0.98)',
      }}
    >
      {/* Title Bar */}
      <div
        data-drag-handle
        style={{
          height: 32,
          background: isTerminal ? '#1a1a1a' : 'rgba(243,243,243,0.98)',
          borderBottom: `1px solid ${isTerminal
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(0,0,0,0.08)'}`,
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
          cursor: 'grab',
        }}
      >
        {/* Icon + title */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: 8, paddingLeft: 12,
          flex: 1, minWidth: 0,
        }}>
          <div style={{
            width: 18, height: 18,
            borderRadius: 4,
            background: appMeta.bg,
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11, flexShrink: 0,
          }}>
            {appMeta.icon}
          </div>
          <span style={{
            fontSize: 12,
            color: isTerminal ? 'rgba(255,255,255,0.85)' : '#1a1a1a',
            fontWeight: 400,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {win.title}
          </span>
        </div>

        {/* Window controls */}
        <div style={{ display: 'flex', marginLeft: 'auto' }}>
          <TitlebarBtn onClick={() => minimizeWindow(win.id)} isClose={false}>
            <MinimizeIcon />
          </TitlebarBtn>
          <TitlebarBtn onClick={() => {}} isClose={false}>
            <MaximizeIcon />
          </TitlebarBtn>
          <TitlebarBtn onClick={() => closeWindow(win.id)} isClose={true}>
            <CloseIcon />
          </TitlebarBtn>
        </div>
      </div>

      {/* App content */}
      <div style={{
        flex: 1, overflow: 'auto',
        background: isTerminal ? '#1a1a1a' : 'white',
      }}>
        {APPS[win.appId]}
      </div>
    </div>
  )
}