import './styles/global.css'
import Desktop from './components/Desktop/Desktop'
import WindowManager from './components/WindowManager/WindowManager'

export default function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Desktop />
      <WindowManager />
    </div>
  )
}