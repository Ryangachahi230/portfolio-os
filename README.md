# Portfolio OS 🖥️

An interactive portfolio built as a Windows-inspired desktop operating system. Built with React, Zustand, and Vite — no UI frameworks, no templates.

![Portfolio OS](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![Zustand](https://img.shields.io/badge/Zustand-4-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌐 Live Demo

> [https://your-portfolio-url.netlify.app](https://your-portfolio-url.netlify.app)

---

## 📸 Preview

The portfolio loads with a Windows XP-style boot screen, plays a startup chime, then reveals a Windows Vista-inspired desktop with fully interactive windows, a Start Menu, taskbar, and file manager.

---

## ✨ Features

### Desktop Experience
- Windows Vista wallpaper (pure CSS — no image files)
- Freely draggable desktop icons with position persistence
- Right-click context menu — pin/unpin icons, reset layout
- Double-click icons to open apps
- Windows 11-style taskbar with centered icons
- Live clock with date in system tray
- Open app indicators (blue dot under taskbar icons)

### Window Management
- Open, close, and minimize windows
- Draggable windows with focus management
- Z-index stacking (active window always on top)
- Window state persists across page refreshes
- Minimized apps restore from taskbar

### Start Menu
- Windows 11-style Start Menu
- Live search across all apps
- Quick-access sidebar with profile
- Shutdown button (replays boot screen)
- File Explorer shortcut

### Applications
| App | Description |
|---|---|
| 👤 About Me | Profile card with expandable timeline |
| 🎓 Education | Accordion-style education history |
| ⚙️ Skills | Three-panel layout with animated skill bars |
| 🗂️ Projects | Tabbed project viewer with How It Works, Challenges, Improvements |
| 📄 Resume | PDF viewer with download and full-screen options |
| 💼 Client Work | Filterable gallery with results and tech stack |
| 💻 Terminal | PowerShell-style terminal with real commands |
| 📬 Contact | Social links with one-click email copy |
| 📊 Monitor | Live CPU/memory simulation and event stream |
| 🎮 Snake Game | Fully playable Snake with pause, high score, and mobile controls |
| 📁 File Explorer | Windows Explorer-style file manager with navigation |

### Terminal Commands
```
help          Show all commands
about         Display personal info
skills        List skills with ASCII progress bars
projects      Show all projects
ls            List all available apps
open <app>    Launch any app (e.g. open filemanager)
whoami        Quick intro
date          Current date and time
clear         Clear terminal
exit          Close terminal
```

### Engineer Mode
Toggle with the `</> Engineer` button or `Ctrl + E`:
- Live Zustand state inspector
- Component tree viewer
- Data flow diagram
- Full action log with timestamps

### Boot Experience
- Windows XP-style splash screen on first visit
- Startup chime synthesized with Web Audio API (no audio files)
- Click anywhere to skip
- Only plays once — state saved to localStorage

---

## 🛠️ Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| UI Framework | React 18 | Component-based, industry standard |
| Build Tool | Vite 5 | Fast dev server, instant HMR |
| State Management | Zustand 4 | Simple, no boilerplate |
| Styling | Inline CSS / Plain CSS | No framework dependency |
| Persistence | localStorage | No backend needed |
| Audio | Web Audio API | No audio files needed |
| Package Manager | npm | Comes with Node.js |
| Deployment | Netlify | Free, drag-and-drop deploy |

---

## 📁 Project Structure

```
portfolio-os/
├── public/
│   └── resume.pdf              # Your resume PDF
├── src/
│   ├── main.jsx                # React entry point
│   ├── App.jsx                 # Root component + Ctrl+E shortcut
│   │
│   ├── store/
│   │   └── useStore.js         # Zustand global store
│   │
│   ├── events/
│   │   └── eventBus.js         # Pub/sub event system
│   │
│   ├── data/
│   │   ├── about.js            # Personal info + timeline
│   │   ├── skills.js           # Skills with categories
│   │   ├── projects.js         # Project data
│   │   ├── education.js        # Education history
│   │   └── clientWork.js       # Client project data
│   │
│   ├── components/
│   │   ├── Boot/
│   │   │   └── BootScreen.jsx  # XP splash + startup sound
│   │   │
│   │   ├── Desktop/
│   │   │   ├── Desktop.jsx     # Vista wallpaper + taskbar
│   │   │   ├── DesktopIcon.jsx # Draggable icon with context menu
│   │   │   └── ContextMenu.jsx # Right-click menu
│   │   │
│   │   ├── WindowManager/
│   │   │   ├── WindowManager.jsx
│   │   │   ├── Window.jsx      # Win11 titlebar + drag
│   │   │   └── useDrag.js      # Drag hook
│   │   │
│   │   ├── StartMenu/
│   │   │   └── StartMenu.jsx   # Win11 Start Menu
│   │   │
│   │   ├── EngineerMode/
│   │   │   ├── EngineerOverlay.jsx
│   │   │   └── EngineerToggle.jsx
│   │   │
│   │   └── apps/
│   │       ├── About/
│   │       ├── Education/
│   │       ├── Skills/
│   │       ├── Projects/
│   │       ├── Resume/
│   │       ├── ClientWork/
│   │       ├── Terminal/
│   │       ├── Contact/
│   │       ├── Monitor/
│   │       ├── Game/
│   │       └── FileManager/
│   │
│   └── styles/
│       └── global.css
│
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ ([nodejs.org](https://nodejs.org))
- Git ([git-scm.com](https://git-scm.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/Ryangachahi230/portfolio-os.git

# Navigate into the project
cd portfolio-os

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Adding Your Resume

Drop your PDF into the `public/` folder and name it `resume.pdf`:

```
public/
└── resume.pdf
```

---

## 📦 Available Scripts

```bash
npm run dev      # Start development server (localhost:5173)
npm run build    # Build for production (outputs to dist/)
npm run preview  # Preview the production build locally
```

---

## 🌍 Deployment

### Deploy to Netlify (Recommended)

```bash
# Build the project
npm run build

# Drag the dist/ folder to:
# https://app.netlify.com/drop
```

Done — your portfolio is live in under 2 minutes.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:
```json
"homepage": "https://Ryangachahi230.github.io/portfolio-os",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Then run:
```bash
npm run deploy
```

---

## ✏️ Customization

### Update Your Personal Info

Edit `src/data/about.js`:
```js
const about = {
  name: 'Your Name',
  role: 'Your Role',
  location: 'Your City',
  bio: 'Your bio...',
  timeline: [...],
  contact: {
    github: 'https://github.com/yourusername',
    email: 'your@email.com',
  },
}
```

### Add a New Project

Edit `src/data/projects.js` and add an object:
```js
{
  id: 'p3',
  name: 'Your Project',
  tagline: 'One line description',
  tech: ['React', 'Node.js'],
  description: 'Full description...',
  howItWorks: 'Technical explanation...',
  challenges: ['Challenge 1', 'Challenge 2'],
  improvements: ['Future plan 1', 'Future plan 2'],
  demoUrl: 'https://your-demo.com',
  repoUrl: 'https://github.com/you/project',
}
```

### Add a New App

1. Create `src/components/apps/YourApp/YourApp.jsx`
2. Add to `APP_META` in `useStore.js`
3. Add to `APPS` and `APP_ICONS` in `Window.jsx`
4. Add to `ICONS` in `Desktop.jsx`
5. Add to `ALL_APPS` in `StartMenu.jsx`
6. Add to `VALID_APPS` in `TerminalApp.jsx`

### Change the Wallpaper

In `Desktop.jsx`, find the Vista Wallpaper section and replace the CSS gradients with any colors you want.

---

## 🏗️ Architecture

### State Management

All state lives in a single Zustand store (`useStore.js`):

```
Global Store
├── windows[]          — open window list with position + z-index
├── iconPositions{}    — desktop icon x/y coordinates
├── pinnedIcons[]      — which apps appear on desktop
├── pinnedTaskbar[]    — which apps pin to taskbar
├── engineerMode       — toggle for debug overlay
└── logs[]             — action log for Engineer Mode
```

### Event System

A lightweight pub/sub bus (`eventBus.js`) decouples components:

```
openWindow()  →  eventBus.emit('APP_OPEN')  →  MonitorApp updates
closeWindow() →  eventBus.emit('APP_CLOSE') →  MonitorApp updates
focusWindow() →  eventBus.emit('APP_FOCUS') →  MonitorApp updates
```

### Persistence

The store uses Zustand's `persist` middleware to save to `localStorage`:
- Window positions and open state
- Desktop icon positions
- Pinned icons (desktop + taskbar)
- Engineer Mode preference

---

## 🎮 Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + E` | Toggle Engineer Mode |
| `Escape` | Close Start Menu / Context Menu |
| `↑ / ↓` | Navigate terminal history |
| `P` or `Space` | Pause Snake game |
| `Arrow keys / WASD` | Control snake |

---

## 📄 License

MIT License — feel free to fork, customize, and use for your own portfolio.

---

## 👤 Author

**Ryan Gachahi**
- GitHub: [@Ryangachahi230](https://github.com/Ryangachahi230)
- Portfolio: [your-portfolio-url.netlify.app](https://your-portfolio-url.netlify.app)

---

## 🙏 Acknowledgements

- Inspired by Windows XP, Vista, and Windows 11 design language
- Built entirely without UI component libraries
- State management pattern inspired by Zustand documentation
- Boot sound synthesized with Web Audio API

---

*Built with ❤️ in Nairobi, Kenya*