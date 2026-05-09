import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import eventBus from '../events/eventBus'

const APP_META = {
  about:     { title: 'About Me',       icon: '👤', w: 560, h: 440 },
  education: { title: 'Education',      icon: '🎓', w: 580, h: 500 },
  skills:    { title: 'Skills',         icon: '⚙️', w: 660, h: 480 },
  projects:  { title: 'Projects',       icon: '🗂️', w: 700, h: 500 },
  terminal:  { title: 'Terminal',       icon: '💻', w: 560, h: 380 },
  contact:   { title: 'Contact',        icon: '📬', w: 500, h: 400 },
  monitor:   { title: 'System Monitor', icon: '📊', w: 500, h: 580 },
  resume:    { title: 'Resume',         icon: '📄', w: 680, h: 580 },
  clientwork:{ title: 'Client Work',    icon: '💼', w: 780, h: 560 },
  game:      { title: 'Snake Game',     icon: '🎮', w: 480, h: 620 },
  filemanager: { title: 'File Explorer', icon: '📁', w: 720, h: 520 },
}

// ── Default icon positions (grid layout top-left) ────────
const DEFAULT_ICON_POSITIONS = {
  about:      { x: 20,  y: 20  },
  education:  { x: 20,  y: 110 },
  skills:     { x: 20,  y: 200 },
  projects:   { x: 20,  y: 290 },
  resume:     { x: 20,  y: 380 },
  clientwork: { x: 20,  y: 470 },
  terminal:   { x: 110, y: 20  },
  contact:    { x: 110, y: 110 },
  monitor:    { x: 110, y: 200 },
  game:       { x: 110, y: 290 },
  filemanager: { x: 110, y: 380 },
}

// ── All apps pinned to desktop by default ────────────────
const DEFAULT_PINNED = Object.keys(DEFAULT_ICON_POSITIONS)

const useStore = create(
  persist(
    (set, get) => ({

      // ── Windows ──────────────────────────────────────
      windows:       [],
      nextZIndex:    10,
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
        if (!meta) return

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
          nextZIndex:    z + 1,
          activeWindowId: id,
        }))

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
        eventBus.emit('APP_MINIMIZE', { id })
        get().addLog({ type: 'APP_MINIMIZE', detail: id })
      },

      focusWindow: (id) => {
        const z = get().nextZIndex
        set(s => ({
          windows: s.windows.map(w =>
            w.id === id ? { ...w, zIndex: z, minimized: false } : w
          ),
          activeWindowId: id,
          nextZIndex:     z + 1,
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

      // ── Desktop icon positions ────────────────────────
      iconPositions: DEFAULT_ICON_POSITIONS,

      setIconPosition: (appId, x, y) =>
        set(s => ({
          iconPositions: {
            ...s.iconPositions,
            [appId]: { x, y },
          }
        })),

      resetIconPositions: () =>
        set({ iconPositions: DEFAULT_ICON_POSITIONS }),

      // ── Pinned icons on desktop ───────────────────────
      pinnedIcons: DEFAULT_PINNED,

      pinIcon: (appId) =>
        set(s => ({
          pinnedIcons: s.pinnedIcons.includes(appId)
            ? s.pinnedIcons
            : [...s.pinnedIcons, appId],
        })),

      unpinIcon: (appId) =>
        set(s => ({
          pinnedIcons: s.pinnedIcons.filter(id => id !== appId),
        })),

      // ── Pinned apps in taskbar ────────────────────────
      // (separate from desktop icons)
      pinnedTaskbar: ['about', 'projects', 'terminal'],

      pinToTaskbar: (appId) =>
        set(s => ({
          pinnedTaskbar: s.pinnedTaskbar.includes(appId)
            ? s.pinnedTaskbar
            : [...s.pinnedTaskbar, appId],
        })),

      unpinFromTaskbar: (appId) =>
        set(s => ({
          pinnedTaskbar: s.pinnedTaskbar.filter(id => id !== appId),
        })),

      // ── Logs ─────────────────────────────────────────
      logs: [],
      addLog: (entry) =>
        set(s => ({
          logs: [{ ts: Date.now(), ...entry }, ...s.logs].slice(0, 100)
        })),

      // ── Engineer mode ─────────────────────────────────
      engineerMode: false,
      toggleEngineerMode: () =>
        set(s => ({ engineerMode: !s.engineerMode })),

    }),

    {
      name: 'portfolio-os-state',
      partialize: (s) => ({
        windows:       s.windows,
        nextZIndex:    s.nextZIndex,
        engineerMode:  s.engineerMode,
        iconPositions: s.iconPositions,
        pinnedIcons:   s.pinnedIcons,
        pinnedTaskbar: s.pinnedTaskbar,
      }),
    }
  )
)

export default useStore
export { APP_META }