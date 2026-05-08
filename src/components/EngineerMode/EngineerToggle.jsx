import useStore from '../../store/useStore'

export default function EngineerToggle() {
  const { engineerMode, toggleEngineerMode } = useStore()

  return (
    <button
      onClick={toggleEngineerMode}
      title="Toggle Engineer Mode (Ctrl+E)"
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '4px 12px',
        background: engineerMode
          ? 'rgba(88,166,255,0.2)'
          : 'rgba(255,255,255,0.08)',
        border: engineerMode
          ? '1px solid rgba(88,166,255,0.5)'
          : '1px solid rgba(255,255,255,0.15)',
        borderRadius: 6,
        color: engineerMode ? '#58a6ff' : 'rgba(255,255,255,0.6)',
        fontSize: 12,
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontFamily: 'monospace',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(88,166,255,0.2)'}
      onMouseLeave={e => e.currentTarget.style.background = engineerMode
        ? 'rgba(88,166,255,0.2)'
        : 'rgba(255,255,255,0.08)'
      }
    >
      {/* Toggle pill */}
      <div style={{
        width: 28, height: 16,
        background: engineerMode ? '#58a6ff' : '#444',
        borderRadius: 8,
        position: 'relative',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute',
          top: 2, left: engineerMode ? 14 : 2,
          width: 12, height: 12,
          background: 'white',
          borderRadius: '50%',
          transition: 'left 0.2s',
        }} />
      </div>
      <span>{'</> Engineer'}</span>
    </button>
  )
}