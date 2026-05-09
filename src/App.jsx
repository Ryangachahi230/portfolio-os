import { useEffect, useState } from 'react'
import './styles/global.css'
import Desktop from './components/Desktop/Desktop'
import WindowManager from './components/WindowManager/WindowManager'
import EngineerOverlay from './components/EngineerMode/EngineerOverlay'
import BootScreen from './components/Boot/BootScreen'
import useStore from './store/useStore'

const BOOT_KEY = 'portfolio-os-booted'

export default function App() {
  const { engineerMode, toggleEngineerMode } = useStore()

  // Check localStorage — show boot screen only on first visit
  const [showBoot, setShowBoot] = useState(() => {
    try {
      return !localStorage.getItem(BOOT_KEY)
    } catch {
      return false
    }
  })

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

  const handleBootDone = () => {
    try {
      localStorage.setItem(BOOT_KEY, 'true')
    } catch {
      // ignore
    }
    setShowBoot(false)
  }

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      transition: 'padding-right 0.3s ease',
      paddingRight: engineerMode ? 300 : 0,
    }}>
      {/* Boot screen — renders on top of everything */}
      {showBoot && <BootScreen onDone={handleBootDone} />}

      <Desktop />
      <WindowManager />
      <EngineerOverlay />
    </div>
  )
}