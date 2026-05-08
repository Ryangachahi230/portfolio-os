import { create } from 'zustand'
import eventBus from '../events/eventBus'

const APP_META = {
  about:    { title: 'About Me',   icon: '👤', w: 560, h: 440 },
  education:{ title: 'Education',  icon: '🎓', w: 580, h: 500 },
  skills:   { title: 'Skills',     icon: '⚙️', w: 660, h: 480 },
  projects: { title: 'Projects',   icon: '🗂️', w: 700, h: 500 },
  terminal: { title: 'Terminal',   icon: '💻', w: 560, h: 380 },
  contact:  { title: 'Contact',    icon: '📬', w: 500, h: 400 },
}

const useStore = create((set, get) => ({

  // --- Windows ---
  windows: [],
  nextZIndex: 10,
  activeWindowId: null,

  openWindow: (appId) => {
    const existing = get().windows.find(w => w.appId === appId)
    if (existing) {
      get().focusWindow(existing.id)
      return
    }
    const id   = `${appId}-${Date.now()}`
    const z    = get().nextZIndex
    const meta = APP_META[appId]

    set(s => ({
      windows: [...s.windows, {
        id, appId,
        title: meta.title,
        x: 100 + s.windows.length * 30,
        y: 80  + s.windows.length * 30,
        w: meta.w,
        h: meta.h,
        minimized: false,
        zIndex: z,
      }],
      nextZIndex: z + 1,
      activeWindowId: id,
    }))

    // Fire event + log
    eventBus.emit('APP_OPEN', { appId, id })
    get().addLog({ type: 'APP_OPEN', detail: appId })
  },

  closeWindow: (id) => {
    const win = get().windows.find(w => w.id === id)
    set(s => ({ windows: s.windows.filter(w => w.id !== id) }))
    if (win) {
      eventBus.emit('APP_CLOSE', { appId: win.appId, id })
      get().addLog({ type: 'APP_CLOSE', detail: win.appId })
    }
  },

  minimizeWindow: (id) => {
    set(s => ({
      windows: s.windows.map(w =>
        w.id === id ? { ...w, minimized: true } : w
      )
    }))
    get().addLog({ type: 'APP_MINIMIZE', detail: id })
  },

  focusWindow: (id) => {
    const z = get().nextZIndex
    set(s => ({
      windows: s.windows.map(w =>
        w.id === id ? { ...w, zIndex: z, minimized: false } : w
      ),
      activeWindowId: id,
      nextZIndex: z + 1,
    }))
    eventBus.emit('APP_FOCUS', { id })
    get().addLog({ type: 'APP_FOCUS', detail: id })
  },

  moveWindow: (id, x, y) =>
    set(s => ({
      windows: s.windows.map(w =>
        w.id === id ? { ...w, x, y } : w
      )
    })),

  // --- Action log (used by Engineer Mode later) ---
  logs: [],
  addLog: (entry) =>
    set(s => ({
      logs: [{ ts: Date.now(), ...entry }, ...s.logs].slice(0, 100)
    })),

  // --- Engineer mode (wired up in Phase 5) ---
  engineerMode: false,
  toggleEngineerMode: () =>
    set(s => ({ engineerMode: !s.engineerMode })),

}))

export default useStore
export { APP_META }