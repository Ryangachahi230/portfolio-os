import { create } from 'zustand'

const APP_META = {
  about:     { title: 'About Me',  icon: '👤', w: 560, h: 440 },
  education: { title: 'Education', icon: '🎓', w: 580, h: 500 },
  skills:    { title: 'Skills',    icon: '⚙️', w: 660, h: 480 },
  projects:  { title: 'Projects',  icon: '🗂️', w: 700, h: 500 },
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
    const id = `${appId}-${Date.now()}`
    const z  = get().nextZIndex
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
  },

  closeWindow: (id) =>
    set(s => ({ windows: s.windows.filter(w => w.id !== id) })),

  minimizeWindow: (id) =>
    set(s => ({
      windows: s.windows.map(w =>
        w.id === id ? { ...w, minimized: true } : w
      )
    })),

  focusWindow: (id) => {
    const z = get().nextZIndex
    set(s => ({
      windows: s.windows.map(w =>
        w.id === id ? { ...w, zIndex: z, minimized: false } : w
      ),
      activeWindowId: id,
      nextZIndex: z + 1,
    }))
  },

  moveWindow: (id, x, y) =>
    set(s => ({
      windows: s.windows.map(w =>
        w.id === id ? { ...w, x, y } : w
      )
    })),

}))

export default useStore