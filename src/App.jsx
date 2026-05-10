import { useEffect, useState } from 'react'
import './styles/global.css'
import Desktop from './components/Desktop/Desktop'
import WindowManager from './components/WindowManager/WindowManager'
import EngineerOverlay from './components/EngineerMode/EngineerOverlay'
import BootScreen from './components/Boot/BootScreen'
import useStore from './store/useStore'

export default function App() {
  const { engineerMode, toggleEngineerMode } = useStore()

  // Always show boot screen on every visit
  const [showBoot, setShowBoot] = useState(true)

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
      height: '100dvh',
      overflow: 'hidden',
      transition: 'padding-right 0.3s ease',
      paddingRight: engineerMode ? 300 : 0,
    }}>
      {/* Boot screen shows every time */}
      {showBoot && (
        <BootScreen onDone={() => setShowBoot(false)} />
      )}

      <Desktop />
      <WindowManager />
      <EngineerOverlay />
    </div>
  )
}