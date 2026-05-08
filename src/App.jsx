import { useEffect } from 'react'
import './styles/global.css'
import Desktop from './components/Desktop/Desktop'
import WindowManager from './components/WindowManager/WindowManager'
import EngineerOverlay from './components/EngineerMode/EngineerOverlay'
import useStore from './store/useStore'

export default function App() {
  const { engineerMode, toggleEngineerMode } = useStore()

  // Ctrl+E keyboard shortcut
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === 'e') {
        e.preventDefault()
        toggleEngineerMode()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [toggleEngineerMode])

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      // Shift layout left when Engineer panel is open
      transition: 'padding-right 0.3s ease',
      paddingRight: engineerMode ? 300 : 0,
    }}>
      <Desktop />
      <WindowManager />
      <EngineerOverlay />
    </div>
  )
}