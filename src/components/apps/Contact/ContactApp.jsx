import { useState } from 'react'
import contact from '../../../data/contact'

const LINKS = [
  { label: 'GitHub',   icon: '🐙', url: contact.github,   color: '#24292e' },
  { label: 'LinkedIn', icon: '💼', url: contact.linkedin, color: '#0077b5' },
  { label: 'Twitter',  icon: '🐦', url: contact.twitter,  color: '#1da1f2' },
  { label: 'Email',    icon: '📧', url: `mailto:${contact.email}`, color: '#ea4335' },
]

export default function ContactApp() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(contact.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ padding: 28, fontFamily: 'sans-serif' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <span style={{ fontSize: 48 }}>📬</span>
        <h2 style={{ fontSize: 20, color: '#1a1a2e', marginTop: 8 }}>
          Get In Touch
        </h2>
        <p style={{
          fontSize: 14, color: '#666',
          lineHeight: 1.7, marginTop: 8,
          maxWidth: 360, margin: '8px auto 0',
        }}>
          {contact.message}
        </p>
      </div>

      {/* Email copy box */}
      <div style={{
        display: 'flex', alignItems: 'center',
        background: '#f8f9fa', border: '1px solid #e0e0e0',
        borderRadius: 10, padding: '12px 16px',
        marginBottom: 24, gap: 12,
      }}>
        <span style={{ fontSize: 20 }}>📧</span>
        <span style={{ flex: 1, fontSize: 14, color: '#333' }}>
          {contact.email}
        </span>
        <button
          onClick={copyEmail}
          style={{
            padding: '6px 14px',
            background: copied ? '#28c840' : '#1a1a2e',
            color: 'white', border: 'none',
            borderRadius: 6, fontSize: 12,
            cursor: 'pointer', transition: 'background 0.3s',
          }}
        >
          {copied ? '✅ Copied!' : 'Copy'}
        </button>
      </div>

      {/* Social links */}
      <p style={{
        fontSize: 11, fontWeight: 600,
        color: '#999', marginBottom: 12,
      }}>
        FIND ME ON
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {LINKS.map(link => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 16px',
              background: '#fafafa',
              border: '1px solid #e0e0e0',
              borderRadius: 10, textDecoration: 'none',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateX(4px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateX(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <span style={{ fontSize: 22 }}>{link.icon}</span>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#222' }}>
              {link.label}
            </span>
            <span style={{ marginLeft: 'auto', fontSize: 16, color: '#bbb' }}>↗</span>
          </a>
        ))}
      </div>
    </div>
  )
}