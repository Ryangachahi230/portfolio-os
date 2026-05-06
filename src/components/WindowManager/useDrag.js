import { useEffect } from 'react'
import useStore from '../../store/useStore'

export default function useDrag(ref, windowId) {
  const moveWindow = useStore(s => s.moveWindow)

  useEffect(() => {
    const el = ref.current
    let dragging = false
    let ox = 0, oy = 0

    const onDown = (e) => {
      if (!e.target.closest('[data-drag-handle]')) return
      dragging = true
      ox = e.clientX - el.offsetLeft
      oy = e.clientY - el.offsetTop
    }
    const onMove = (e) => {
      if (!dragging) return
      moveWindow(windowId, e.clientX - ox, e.clientY - oy)
    }
    const onUp = () => { dragging = false }

    el.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)

    return () => {
      el.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [windowId, moveWindow])
}