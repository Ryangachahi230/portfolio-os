import about from '../../../data/about'

export default function AboutApp() {
  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, margin: '0 auto 12px',
        }}>👤</div>
        <h2 style={{ fontSize: 22, color: '#1a1a2e' }}>{about.name}</h2>
        <p style={{ color: '#666', fontSize: 14 }}>{about.role} · {about.location}</p>
      </div>

      {/* Bio */}
      <p style={{
        background: '#f8f9fa', borderRadius: 8,
        padding: 16, fontSize: 14, lineHeight: 1.7,
        color: '#444', marginBottom: 24,
      }}>
        {about.bio}
      </p>

      {/* Timeline */}
      <h3 style={{ fontSize: 15, color: '#1a1a2e', marginBottom: 16 }}>Journey</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {about.timeline.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 16 }}>
            <div style={{
              minWidth: 48, height: 48, borderRadius: 8,
              background: '#1a1a2e', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700,
            }}>{item.year}</div>
            <div>
              <p style={{ fontWeight: 600, fontSize: 14, color: '#222' }}>{item.title}</p>
              <p style={{ fontSize: 13, color: '#666', marginTop: 2 }}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}