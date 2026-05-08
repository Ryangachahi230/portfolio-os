// Simple pub/sub event system
// Usage:
//   eventBus.on('APP_OPEN', (data) => console.log(data))
//   eventBus.emit('APP_OPEN', { appId: 'about' })

const listeners = {}

const eventBus = {
  on(event, fn) {
    if (!listeners[event]) listeners[event] = []
    listeners[event].push(fn)
    // Returns unsubscribe function
    return () => {
      listeners[event] = listeners[event].filter(f => f !== fn)
    }
  },

  emit(event, payload = {}) {
    if (!listeners[event]) return
    listeners[event].forEach(fn => fn(payload))
  },

  off(event, fn) {
    if (!listeners[event]) return
    listeners[event] = listeners[event].filter(f => f !== fn)
  },
}

export default eventBus