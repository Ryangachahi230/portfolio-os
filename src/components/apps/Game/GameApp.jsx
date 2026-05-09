import { useState, useEffect, useCallback, useRef } from 'react'

// ── Game constants ───────────────────────────────────────
const GRID   = 20    // grid size (cells)
const CELL   = 18    // px per cell
const INIT_SPEED = 150 // ms per tick

const DIRS = {
  ArrowUp:    { x: 0,  y: -1 },
  ArrowDown:  { x: 0,  y:  1 },
  ArrowLeft:  { x: -1, y:  0 },
  ArrowRight: { x: 1,  y:  0 },
  w: { x: 0,  y: -1 },
  s: { x: 0,  y:  1 },
  a: { x: -1, y:  0 },
  d: { x: 1,  y:  0 },
}

// ── Helpers ──────────────────────────────────────────────
const randomCell = (snake) => {
  let pos
  do {
    pos = {
      x: Math.floor(Math.random() * GRID),
      y: Math.floor(Math.random() * GRID),
    }
  } while (snake.some(s => s.x === pos.x && s.y === pos.y))
  return pos
}

const initState = () => ({
  snake: [
    { x: 10, y: 10 },
    { x: 9,  y: 10 },
    { x: 8,  y: 10 },
  ],
  dir:   { x: 1, y: 0 },
  food:  { x: 15, y: 10 },
  score: 0,
  best:  0,
  alive: true,
  started: false,
})

// ── Score display ────────────────────────────────────────
function ScoreBoard({ score, best }) {
  return (
    <div style={{
      display: 'flex',
      gap: 12,
      justifyContent: 'center',
    }}>
      {[
        { label: 'Score', value: score },
        { label: 'Best',  value: best  },
      ].map(({ label, value }) => (
        <div key={label} style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8,
          padding: '8px 20px',
          textAlign: 'center',
          minWidth: 80,
        }}>
          <div style={{
            fontSize: 10,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: 1,
            textTransform: 'uppercase',
            marginBottom: 4,
          }}>
            {label}
          </div>
          <div style={{
            fontSize: 22,
            fontWeight: 600,
            color: label === 'Score' ? '#3fb950' : '#febc2e',
            fontFamily: 'monospace',
          }}>
            {value}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Mobile control button ────────────────────────────────
function CtrlBtn({ label, onClick }) {
  return (
    <button
      onPointerDown={onClick}
      style={{
        width: 48, height: 48,
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 8,
        color: 'white',
        fontSize: 18,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        transition: 'background 0.1s',
        WebkitTapHighlightColor: 'transparent',
      }}
      onPointerEnter={e =>
        e.currentTarget.style.background = 'rgba(255,255,255,0.16)'
      }
      onPointerLeave={e =>
        e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
      }
    >
      {label}
    </button>
  )
}

// ── Main Game Component ──────────────────────────────────
export default function GameApp() {
  const [game,    setGame]    = useState(initState)
  const [paused,  setPaused]  = useState(false)
  const dirQueue              = useRef([])
  const gameRef               = useRef(game)
  const pausedRef             = useRef(paused)
  const containerRef          = useRef()

  // Keep refs in sync
  useEffect(() => { gameRef.current  = game    }, [game])
  useEffect(() => { pausedRef.current = paused  }, [paused])

  // ── Game tick ──────────────────────────────────────────
  const tick = useCallback(() => {
    const g = gameRef.current
    if (!g.alive || !g.started || pausedRef.current) return

    // Consume next direction from queue
    let dir = g.dir
    while (dirQueue.current.length > 0) {
      const next = dirQueue.current.shift()
      // Prevent 180-degree reversal
      if (next.x !== -g.dir.x || next.y !== -g.dir.y) {
        dir = next
        break
      }
    }

    const head = {
      x: (g.snake[0].x + dir.x + GRID) % GRID,
      y: (g.snake[0].y + dir.y + GRID) % GRID,
    }

    // Check self collision
    const hitSelf = g.snake.some(s => s.x === head.x && s.y === head.y)
    if (hitSelf) {
      const best = Math.max(g.score, g.best)
      setGame(prev => ({ ...prev, alive: false, best }))
      return
    }

    const ateFood = head.x === g.food.x && head.y === g.food.y
    const newSnake = ateFood
      ? [head, ...g.snake]
      : [head, ...g.snake.slice(0, -1)]

    const newFood  = ateFood ? randomCell(newSnake) : g.food
    const newScore = ateFood ? g.score + 10 : g.score

    setGame(prev => ({
      ...prev,
      snake: newSnake,
      dir,
      food: newFood,
      score: newScore,
      best: Math.max(newScore, prev.best),
    }))
  }, [])

  // ── Game loop ──────────────────────────────────────────
  useEffect(() => {
    if (!game.started || !game.alive) return
    // Speed increases every 50 points
    const speed = Math.max(60, INIT_SPEED - Math.floor(game.score / 50) * 15)
    const id = setInterval(tick, speed)
    return () => clearInterval(id)
  }, [game.started, game.alive, game.score, tick])

  // ── Keyboard controls ──────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      // Prevent page scroll with arrow keys
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
        e.preventDefault()
      }

      // Start game on any arrow/wasd key
      if (!gameRef.current.started && DIRS[e.key]) {
        setGame(prev => ({ ...prev, started: true }))
      }

      // Pause with P or Space
      if (e.key === 'p' || e.key === ' ') {
        e.preventDefault()
        setPaused(prev => !prev)
        return
      }

      // Queue direction
      if (DIRS[e.key]) {
        dirQueue.current.push(DIRS[e.key])
      }
    }

    // Focus container for key events
    containerRef.current?.focus()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // ── Restart ────────────────────────────────────────────
  const restart = () => {
    dirQueue.current = []
    setPaused(false)
    setGame(prev => ({
      ...initState(),
      best: prev.best,
    }))
    containerRef.current?.focus()
  }

  // ── Mobile direction handler ───────────────────────────
  const mobileDir = (key) => {
    if (!game.started) {
      setGame(prev => ({ ...prev, started: true }))
    }
    dirQueue.current.push(DIRS[key])
    containerRef.current?.focus()
  }

  const size = GRID * CELL  // canvas size in px

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      style={{
        height: '100%',
        background: '#0d1117',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        outline: 'none',
        padding: 16,
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >

      {/* ── Header ────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <span style={{ fontSize: 22 }}>🐍</span>
        <span style={{
          fontSize: 16,
          fontWeight: 600,
          color: 'white',
          letterSpacing: 1,
        }}>
          SNAKE
        </span>
        <span style={{
          fontSize: 11,
          color: 'rgba(255,255,255,0.3)',
          marginLeft: 4,
        }}>
          WASD or ↑↓←→ · P to pause
        </span>
      </div>

      {/* ── Score ─────────────────────────────────────── */}
      <ScoreBoard score={game.score} best={game.best} />

      {/* ── Game canvas ───────────────────────────────── */}
      <div style={{
        position: 'relative',
        width: size,
        height: size,
        background: '#161b22',
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        boxShadow: '0 0 40px rgba(63,185,80,0.05)',
        flexShrink: 0,
      }}>

        {/* Grid lines */}
        {Array.from({ length: GRID }).map((_, row) =>
          Array.from({ length: GRID }).map((_, col) => (
            <div
              key={`${row}-${col}`}
              style={{
                position: 'absolute',
                left: col * CELL,
                top:  row * CELL,
                width: CELL,
                height: CELL,
                border: '1px solid rgba(255,255,255,0.02)',
              }}
            />
          ))
        )}

        {/* Food */}
        <div style={{
          position: 'absolute',
          left: game.food.x * CELL + 2,
          top:  game.food.y * CELL + 2,
          width: CELL - 4,
          height: CELL - 4,
          background: '#ff5f57',
          borderRadius: '50%',
          boxShadow: '0 0 8px rgba(255,95,87,0.8)',
          transition: 'left 0.05s, top 0.05s',
        }} />

        {/* Snake */}
        {game.snake.map((seg, i) => {
          const isHead = i === 0
          const ratio  = 1 - (i / game.snake.length) * 0.4
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: seg.x * CELL + 1,
                top:  seg.y * CELL + 1,
                width:  CELL - 2,
                height: CELL - 2,
                background: isHead
                  ? '#3fb950'
                  : `rgba(63, 185, 80, ${ratio})`,
                borderRadius: isHead ? 5 : 3,
                boxShadow: isHead
                  ? '0 0 10px rgba(63,185,80,0.6)'
                  : 'none',
                transition: 'left 0.05s, top 0.05s',
                zIndex: isHead ? 2 : 1,
              }}
            />
          )
        })}

        {/* ── Start overlay ───────────────────────────── */}
        {!game.started && game.alive && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.75)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            borderRadius: 8,
          }}>
            <span style={{ fontSize: 48 }}>🐍</span>
            <p style={{
              color: 'white', fontSize: 16, fontWeight: 600,
            }}>
              Press any arrow key to start
            </p>
            <p style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: 12,
            }}>
              WASD or ↑↓←→ to move · P to pause
            </p>
            <button
              onClick={() => {
                setGame(prev => ({ ...prev, started: true }))
                containerRef.current?.focus()
              }}
              style={{
                marginTop: 8,
                padding: '8px 24px',
                background: '#3fb950',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              ▶ Start Game
            </button>
          </div>
        )}

        {/* ── Pause overlay ───────────────────────────── */}
        {paused && game.alive && game.started && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.75)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            borderRadius: 8,
          }}>
            <span style={{ fontSize: 40 }}>⏸</span>
            <p style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>
              Paused
            </p>
            <button
              onClick={() => {
                setPaused(false)
                containerRef.current?.focus()
              }}
              style={{
                padding: '8px 24px',
                background: '#0078D4',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              ▶ Resume
            </button>
          </div>
        )}

        {/* ── Game over overlay ────────────────────────── */}
        {!game.alive && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            borderRadius: 8,
          }}>
            <span style={{ fontSize: 40 }}>💀</span>
            <p style={{
              color: '#ff5f57',
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 1,
            }}>
              GAME OVER
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
              Score: <span style={{ color: '#3fb950', fontWeight: 600 }}>
                {game.score}
              </span>
            </p>
            {game.score > 0 && game.score >= game.best && (
              <p style={{
                color: '#febc2e',
                fontSize: 12,
                fontWeight: 600,
              }}>
                🏆 New Best Score!
              </p>
            )}
            <button
              onClick={restart}
              style={{
                marginTop: 8,
                padding: '9px 28px',
                background: '#3fb950',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              ↺ Play Again
            </button>
          </div>
        )}
      </div>

      {/* ── Mobile D-pad controls ──────────────────────── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}>
        <CtrlBtn label="↑" onClick={() => mobileDir('ArrowUp')} />
        <div style={{ display: 'flex', gap: 4 }}>
          <CtrlBtn label="←" onClick={() => mobileDir('ArrowLeft')} />
          <CtrlBtn label="↓" onClick={() => mobileDir('ArrowDown')} />
          <CtrlBtn label="→" onClick={() => mobileDir('ArrowRight')} />
        </div>
      </div>

      {/* ── Bottom buttons ─────────────────────────────── */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => {
            setPaused(p => !p)
            containerRef.current?.focus()
          }}
          style={{
            padding: '6px 16px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 6,
            color: 'white',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          {paused ? '▶ Resume' : '⏸ Pause'}
        </button>
        <button
          onClick={restart}
          style={{
            padding: '6px 16px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 6,
            color: 'white',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          ↺ Restart
        </button>
      </div>
    </div>
  )
}