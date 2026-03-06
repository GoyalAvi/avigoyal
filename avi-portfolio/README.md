# Avi Goyal — Portfolio

## 📁 File Structure

```
avi-portfolio/
├── index.html      — HTML structure only (no inline CSS or JS)
├── style.css       — All styles (variables, layout, animations, components)
├── preloader.js    — Boot screen logic (runs before main JS)
├── main.js         — All portfolio interactivity
└── README.md       — This file
```

## ✏️ How to Edit

### Change content (text, links, jobs, projects)
→ Edit **`index.html`**

### Change colors, fonts, spacing, layout
→ Edit **`style.css`**
- CSS variables (colors, fonts) are at the very top inside `:root { }`
- Each section has a comment header like `/* ══ HERO ══ */`

### Change animations or interactive behaviour
→ Edit **`main.js`**
- Each feature has a comment like `// ── HERO TYPING ──`
- Language translations (EN/DE) are in the `TRANSLATIONS` object near the bottom

### Change preloader text/timing
→ Edit **`preloader.js`**
- The `lines` array holds each boot message and its delay in ms
- `dismiss` timeout controls max display time (currently 2200ms)

## 🚀 Deploy

### Netlify (easiest)
Drag & drop this folder at **netlify.com/drop**

### Vercel
```bash
npx vercel deploy
```

### GitHub Pages
Push to a repo → Settings → Pages → Deploy from main branch

### Local preview
```bash
python3 -m http.server 3000
# then open http://localhost:3000
```

> ⚠️ Must be served over HTTP (not opened as a file://) so the JS modules load correctly.
