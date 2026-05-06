export default function DesktopIcon({ icon, label, onClick }) {
  return (
    <div onClick={onClick} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      padding: '12px 16px',
      borderRadius: 12,
      cursor: 'pointer',
      transition: 'background 0.2s',
      width: 90,
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <span style={{ fontSize: 40 }}>{icon}</span>
      <span style={{
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        textShadow: '0 1px 3px rgba(0,0,0,0.8)',
      }}>{label}</span>
    </div>
  )
}