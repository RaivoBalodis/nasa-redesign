# 🚀 NASA Space Explorer

React + TypeScript aplikācija, kas izmanto NASA APOD (Astronomy Picture of the Day) API.

## ✨ Funkcionalitāte

- 🌌 Dienas kosmosa attēls ar pilnu aprakstu
- 📅 Meklēšana pēc datuma (no 1995-06-16 līdz šodienai)
- 🖼️ Pēdējo 7 dienu galerija ar modālu skatu
- ⏳ Loading un Error stāvokļi visos skatos
- 📱 Pilnībā responsīvs dizains

## 🛠️ Tehnoloģijas

- **React 18** — SPA, komponentes, hooks
- **TypeScript** — tipu drošība, interfeisi
- **Axios** — HTTP pieprasījumi uz NASA API
- **Tailwind CSS** — responsīvs dizains
- **Vite** — build rīks

## 🚀 Palaišana lokāli

```bash
git clone <repo-url>
cd nasa-explorer
npm install
cp .env.example .env
# .env failā ieraksti savu NASA API atslēgu
npm run dev
```

### NASA API atslēga (bezmaksas)

1. Aizej uz https://api.nasa.gov/
2. Aizpildi formu → "Generate API Key"
3. Saņem atslēgu uz e-pastu
4. Ieraksti `.env` failā: `VITE_NASA_API_KEY=tavs_key_šeit`

> Bez API atslēgas strādā ar `DEMO_KEY` — ir ātruma ierobežojumi (30 req/stundā).

## 📁 Projekta struktūra

```
src/
├── features/
│   ├── apod/
│   │   ├── api.ts        ← Axios pieprasījumi uz NASA API
│   │   ├── types.ts      ← TypeScript interfeisi
│   │   └── ApodCard.tsx  ← Dienas attēla komponente
│   └── gallery/
│       ├── api.ts        ← Axios pieprasījumi (datumu diapazons)
│       ├── types.ts      ← TypeScript interfeisi
│       └── Gallery.tsx   ← Galerijas komponente ar modālu
├── components/
│   └── Navbar.tsx        ← Navigācija
├── App.tsx               ← Galvenā komponente, globālais stāvoklis
├── main.tsx
└── index.css
```

## 👥 Komanda

- [Vārds Uzvārds]
- [Vārds Uzvārds]
- [Vārds Uzvārds]
- [Vārds Uzvārds]

## 📄 Licence

MIT
