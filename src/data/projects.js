const projects = [
  {
    id: 'p1',
    name: 'Chat Application',
    tagline: 'Real-time messaging with WebSockets',
    tech: ['React', 'Node.js', 'Socket.io'],
    description: 'A real-time group chat app with rooms and message history.',
    howItWorks: 'Client connects via WebSocket. Messages are broadcast to all room members and saved to MongoDB.',
    challenges: [
      'Handling reconnection without losing messages',
      'Managing multiple chat rooms efficiently',
    ],
    improvements: [
      'Add end-to-end encryption',
      'Push notifications via Service Workers',
    ],
    demoUrl: 'https://your-demo.com',
    repoUrl: 'https://github.com/Ryangachahi230',
  },
  {
    id: 'p2',
    name: 'Portfolio OS',
    tagline: 'This portfolio — built as an interactive Web OS',
    tech: ['React', 'Zustand', 'Vite'],
    description: 'An OS-inspired portfolio with window management, state, and an event system.',
    howItWorks: 'Windows are managed via a global Zustand store. Each app is a React component rendered inside a draggable window frame.',
    challenges: [
      'Building drag without external libraries',
      'Managing z-index and focus correctly',
    ],
    improvements: [
      'Add mobile responsive layout',
      'Add Engineer Mode with live state viewer',
    ],
    demoUrl: '#',
    repoUrl: 'https://github.com/Ryangachahi230/portfolio-os',
  },
]

export default projects