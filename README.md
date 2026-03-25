# Frontend Effect Playground

> Discover 240+ interactive frontend effects with live previews and ready-to-use code

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Design](https://img.shields.io/badge/Design-Material_You-purple)](https://m3.material.io/)

A curated collection of modern frontend effects and interactions organized into 25 categories. Perfect for developers, designers, and anyone looking to add polished, interactive elements to their web projects.

## ✨ Features

- **240+ Effects** across 25 carefully organized categories
- **Live Previews** - See each effect in action before implementing
- **Copy-Paste Code** - Ready-to-use HTML, CSS, and JavaScript snippets
- **AI Prompts** - Generate variations using AI tools
- **Bilingual** - English and Chinese (中文) interface
- **Material You Design** - Beautiful purple/lavender theme
- **Zero Dependencies** - Pure vanilla JavaScript, no frameworks needed
- **Fully Responsive** - Works on desktop, tablet, and mobile

## 🎨 Categories

| Category | Effects | Description |
|----------|---------|-------------|
| 🎨 Design Style | 34 | Minimalism, Cyberpunk, Y2K, Glassmorphism, and more |
| 🖱️ Mouse Effects | 12 | Custom cursors, magnetic buttons, spotlight effects |
| ✍️ Text Effects | 12 | Typewriter, glitch text, gradient animations |
| 🔄 Transitions | 10 | Smooth state transitions and animations |
| 📄 Page Transitions | 8 | Full-page transition effects |
| 🌄 Backgrounds | 10 | Gradient, mesh, animated backgrounds |
| ✨ Background Effects | 10 | Particle systems, floating elements |
| 🧊 3D Effects | 10 | CSS 3D transforms and perspective effects |
| 🔷 3D Transforms | 10 | Rotate, scale, and translate in 3D space |
| 📊 Data Visualization | 8 | Charts, graphs, and data displays |
| 📈 Charts & Counters | 8 | Animated numbers and progress indicators |
| 🖼️ Image Effects | 10 | Hover effects, filters, overlays |
| 📜 Scrolling Effects | 10 | Parallax, scroll-triggered animations |
| ⏳ Loading States | 12 | Spinners, skeletons, progress bars |
| 🔶 SVG Animation | 10 | Animated SVG graphics and icons |
| 👆 Micro Interactions | 12 | Button hovers, form feedback, tooltips |
| 📐 Layout Patterns | 8 | Grid, masonry, bento layouts |
| 🔮 Filter Effects | 8 | Blur, contrast, color filters |
| 🔘 Button Animations | 12 | Creative button hover and click effects |
| 🃏 Card Effects | 10 | Flip, tilt, expand, and reveal cards |
| 👁️ Parallax | 8 | Multi-layer depth effects |
| 📝 Form Effects | 10 | Input animations, validation feedback |
| 📺 Glitch Effects | 8 | Digital distortion and noise |
| 💫 Particle Effects | 8 | Floating particles and connected networks |
| 🌟 All Effects | 240+ | Browse everything at once |

## 🚀 Quick Start

### Option 1: Open Directly

Simply open `index.html` in your browser - no server required!

```bash
# Clone or download the repository
cd playground-3
open index.html  # macOS
# or double-click index.html on Windows/Linux
```

### Option 2: Local Server (Recommended)

For the best experience, use a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📖 Usage

1. **Browse Categories** - Click on any category in the left sidebar
2. **Explore Effects** - View live previews of each effect
3. **Get Code** - Click the "▾ Code" button to copy the implementation
4. **AI Generate** - Click "▾ Prompt" to get an AI prompt for variations
5. **Search** - Use the search box to find specific effects

## 🛠️ Customization

### Changing Colors

Edit the CSS variables in `styles/main.css`:

```css
:root {
    --primary: #6750A4;      /* Main accent color */
    --bg: #F0EBF8;            /* Page background */
    --surface: #FFFFFF;       /* Card background */
    --sidebar-bg: #EDE7F6;    /* Sidebar background */
    /* ... more variables ... */
}
```

### Adding New Effects

1. Add your effect to `js/data/effects.js`:

```javascript
const YOUR_CATEGORY = [
    {
        id: 'your-effect-id',
        name: 'Your Effect Name',
        nameZh: '效果名称',
        previewId: 'your-effect-id',
        preview: '<div>Preview HTML</div>',
        prompt: 'Create a...',
        code: '// Your code here'
    }
];
```

2. Add the preview initializer:

```javascript
const PREVIEW_INITERS = {
    'your-effect-id': function(container) {
        container.style.cssText = 'display:flex;align-items:center;';
        // Your preview implementation
    }
};
```

## 📁 Project Structure

```
playground-3/
├── index.html              # Main HTML structure
├── styles/
│   └── main.css           # All styles and themes
├── js/
│   ├── app.js             # Main application logic
│   ├── mesh.js            # Animated background mesh
│   └── data/
│       ├── categories.js  # Category definitions
│       └── effects.js     # All 240+ effects
└── README.md              # This file
```

## 🎯 Effects Reference

### Popular Effects

#### Card Hover Spotlight
```javascript
// Radial gradient that follows mouse cursor
// Perfect for interactive cards and buttons
```

#### Tilt Parallax
```javascript
// Multi-layer depth effect with mouse tracking
// Creates 3D illusion on 2D elements
```

#### Dynamic Layout
```javascript
// Auto-cycling bento grid with smooth transitions
// Great for dashboards and portfolio layouts
```

### Design Styles Included

- **Aesthetic Minimal** - Clean, photo-style layouts
- **Cyberpunk** - Neon, futuristic tech aesthetics
- **Glassmorphism** - Frosted glass blur effects
- **Neumorphism** - Soft, extruded plastic look
- **Y2K** - Early 2000s nostalgia
- **Brutalism** - Raw, bold, unpolished
- **Bauhaus** - Geometric, functional design
- And many more...

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## 📝 License

MIT License - feel free to use in personal and commercial projects.

## 👤 Credits

Designed by **BeancurdHero**

- GitHub: [BeancurdHero](https://github.com/BeancurdHero)
- X.com: [@BeancurdHero](https://x.com/BeancurdHero)

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a new branch for your effect
3. Add your effect to the appropriate category
4. Submit a pull request

## 📧 Feedback

Have suggestions or found a bug? Open an issue on GitHub!

---

**Made with ❤️ and ☕ by BeancurdHero**
