import { useState, useEffect, useRef } from 'react'

// ── Synthesize Windows XP startup sound ─────────────────
// No audio file needed — built with Web Audio API
function playStartupSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()

    const notes = [
      { freq: 523.25, start: 0.0,  dur: 0.3,  gain: 0.3  }, // C5
      { freq: 659.25, start: 0.2,  dur: 0.3,  gain: 0.25 }, // E5
      { freq: 783.99, start: 0.4,  dur: 0.4,  gain: 0.3  }, // G5
      { freq: 1046.5, start: 0.7,  dur: 0.6,  gain: 0.35 }, // C6
      { freq: 880.00, start: 1.0,  dur: 0.5,  gain: 0.25 }, // A5
      { freq: 783.99, start: 1.3,  dur: 0.8,  gain: 0.3  }, // G5
      { freq: 659.25, start: 1.8,  dur: 1.2,  gain: 0.2  }, // E5
    ]

    notes.forEach(({ freq, start, dur, gain }) => {
      // Oscillator
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start)

      // Slight pitch drift for warmth
      osc.frequency.linearRampToValueAtTime(
        freq * 1.002,
        ctx.currentTime + start + dur
      )

      // Gain envelope (fade in + fade out)
      const gainNode = ctx.createGain()
      gainNode.gain.setValueAtTime(0, ctx.currentTime + start)
      gainNode.gain.linearRampToValueAtTime(
        gain,
        ctx.currentTime + start + 0.05
      )
      gainNode.gain.linearRampToValueAtTime(
        gain * 0.8,
        ctx.currentTime + start + dur * 0.7
      )
      gainNode.gain.linearRampToValueAtTime(
        0,
        ctx.currentTime + start + dur
      )

      // Reverb via delay
      const delay = ctx.createDelay()
      delay.delayTime.value = 0.08
      const delayGain = ctx.createGain()
      delayGain.gain.value = 0.2

      osc.connect(gainNode)
      gainNode.connect(delay)
      delay.connect(delayGain)
      delayGain.connect(ctx.destination)
      gainNode.connect(ctx.destination)

      osc.start(ctx.currentTime + start)
      osc.stop(ctx.currentTime + start + dur + 0.1)
    })
  } catch (e) {
    // Audio not supported — silently skip
    console.log('Audio not supported:', e)
  }
}

// ── Windows flag logo ────────────────────────────────────
function WindowsFlag({ size = 48 }) {
  const s = size / 2 - 2
  return (
    <div style={{
      width: size,
      height: size,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      gap: 3,
      borderRadius: size * 0.08,
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <div style={{ background: '#f25022', borderRadius: 2 }} />
      <div style={{ background: '#7fba00', borderRadius: 2 }} />
      <div style={{ background: '#00a4ef', borderRadius: 2 }} />
      <div style={{ background: '#ffb900', borderRadius: 2 }} />
    </div>
  )
}

// ── XP progress bar (5 animated blocks) ─────────────────
function XPProgress({ active }) {
  const [lit, setLit] = useState(0)

  useEffect(() => {
    if (!active) return
    const interval = setInterval(() => {
      setLit(prev => (prev + 1) % 5)
    }, 220)
    return () => clearInterval(interval)
  }, [active])

  return (
    <div style={{
      display: 'flex',
      gap: 4,
    }}>
      {[0, 1, 2, 3, 4].map(i => (
        <div
          key={i}
          style={{
            width: 14,
            height: 14,
            borderRadius: 3,
            background: i === lit
              ? '#0078D4'
              : 'rgba(255,255,255,0.15)',
            transition: 'background 0.1s',
          }}
        />
      ))}
    </div>
  )
}

// ── Main Boot Screen ─────────────────────────────────────
export default function BootScreen({ onDone }) {
  const [phase,   setPhase]   = useState('black')
  const [opacity, setOpacity] = useState(0)
  const soundPlayed           = useRef(false)

  useEffect(() => {
    // Phase 1 — fade in from black (0.8s)
    const t1 = setTimeout(() => {
      setPhase('logo')
      setOpacity(1)
    }, 400)

    // Phase 2 — play sound after logo appears
    const t2 = setTimeout(() => {
      if (!soundPlayed.current) {
        soundPlayed.current = true
        playStartupSound()
      }
      setPhase('progress')
    }, 1200)

    // Phase 3 — start fade out
    const t3 = setTimeout(() => {
      setPhase('fadeout')
      setOpacity(0)
    }, 4200)

    // Phase 4 — unmount
    const t4 = setTimeout(() => {
      onDone()
    }, 5000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [onDone])

  return (
    <div
      onClick={() => {
        setOpacity(0)
        setTimeout(onDone, 600)
      }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {/* Logo + text — fade in together */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        opacity: phase === 'black' ? 0 : opacity,
        transition: 'opacity 0.8s ease',
      }}>

        {/* Windows flag + wordmark */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          <WindowsFlag size={64} />
          <div>
            <div style={{
              fontSize: 42,
              fontWeight: 300,
              color: 'white',
              fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', sans-serif",
              letterSpacing: -1,
              lineHeight: 1,
            }}>
              Windows
            </div>
            <div style={{
              fontSize: 18,
              color: '#7fba00',
              fontStyle: 'italic',
              fontWeight: 300,
              fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', sans-serif",
              letterSpacing: 1,
              marginTop: 2,
            }}>
              Portfolio OS
            </div>
          </div>
        </div>

        {/* XP tagline */}
        <div style={{
          fontSize: 13,
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: 0.5,
          textAlign: 'center',
        }}>
          Built by Ryan Gachahi
        </div>

        {/* Progress dots — appear after sound */}
        <div style={{
          marginTop: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          opacity: phase === 'progress' || phase === 'fadeout' ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}>
          <XPProgress active={phase === 'progress'} />
          <span style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: 0.5,
          }}>
            Loading...
          </span>
        </div>

        {/* Skip hint */}
        <div style={{
          position: 'fixed',
          bottom: 32,
          fontSize: 11,
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: 0.5,
        }}>
          Click anywhere to skip
        </div>
      </div>
    </div>
  )
}