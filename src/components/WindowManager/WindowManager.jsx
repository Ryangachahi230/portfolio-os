import useStore from '../../store/useStore'
import Window from './Window'

export default function WindowManager() {
  const windows = useStore(s => s.windows)

  return (
    <div style={{
      position: 'fixed', inset: 0,
      pointerEvents: 'none',
      zIndex: 100,
    }}>
      {windows.map(win => (
        <div key={win.id} style={{ pointerEvents: 'auto' }}>
          <Window win={win} />
        </div>
      ))}
    </div>
  )
}