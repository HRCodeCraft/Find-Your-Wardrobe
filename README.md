<div align="center">

# 👗 Find Your Wardrobe

### Koi naya kapda nahi, naya look zaroor!

**Apne existing clothes ki photos upload karo, event choose karo — AI tumhara perfect outfit suggest karega.**

Find Your Wardrobe uses Claude AI (Vision + Text) to analyze your wardrobe photos, auto-tag each item, and generate styled outfit combinations with accessories pairing — all in Hinglish.

[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Claude AI](https://img.shields.io/badge/AI-Claude%20Sonnet-D97706?style=flat-square)](https://console.anthropic.com)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

</div>

---

## Why Find Your Wardrobe?

Ghar mein kapde bhar bhar ke hain — lekin jab bhi koi event aata hai toh lagta hai "kuch hai hi nahi pehenne ko."

Find Your Wardrobe solves this by letting **Claude AI look at your actual clothes** and suggest the best combination for your specific event — with styling tips and accessories pairing included.

> Ghar mein jo hai, usi mein stylist banna — yahi hai idea.

---

## Features

### Core
- **AI Auto-Tagging** — Upload a photo and Claude Vision automatically detects category, color, style, and occasion tags
- **9 Event Types** — Wedding, Birthday Party, Office, Casual Meetup, Concert, Date Night, Festive, Graduation, Sports
- **Outfit Suggestion** — AI picks the best combination from your wardrobe for the chosen event
- **Accessories Pairing** — Suggestions for what to pair (jewellery, bags, shoes) even if not in your wardrobe
- **Styling Tips** — 2–3 Hinglish tips to level up the look
- **Why It Works** — AI explains why this outfit is perfect for the occasion

### UX
- **Drag & Drop Upload** — Multiple photos at once
- **Wardrobe Grid** — Visual cards with auto-detected tags
- **Remove Items** — Hover over a card to remove it
- **Hinglish UI** — Friendly Indian English + Hindi mix throughout

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| AI — Vision | Claude Sonnet (claude-sonnet-4-6) — clothing photo analysis |
| AI — Text | Claude Sonnet (claude-sonnet-4-6) — outfit suggestion in Hinglish |
| API | Next.js Route Handlers (no separate backend needed) |
| State | React useState (no database — MVP local state) |
| Deployment | Vercel (recommended) |

---

## How It Works

```
User uploads clothing photo(s)
          ↓
Image sent to Claude Vision API
          ↓
Claude detects: category, color, description, style tags
          ↓
Clothing cards appear in wardrobe grid
          ↓
User selects an event (Wedding / Party / Office / etc.)
          ↓
All wardrobe items + event sent to Claude Text API
          ↓
Claude returns: outfit combo + accessories + styling tips (in Hinglish)
          ↓
Result displayed with "Why It Works" explanation
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Claude API key — get one free at [console.anthropic.com](https://console.anthropic.com)

### 1. Clone

```bash
git clone https://github.com/HRCodeCraft/Find-Your-Wardrobe.git
cd Find-Your-Wardrobe
```

### 2. Install

```bash
npm install
```

### 3. Add API Key

`.env.local` file mein apni key daalo:

```env
ANTHROPIC_API_KEY=sk-ant-api03-...your-key-here...
```

> Claude API key milegi: **console.anthropic.com → API Keys → Create Key**
> New account pe **$5 free credits** milte hain — thousands of requests ke liye kaafi hai.

### 4. Run

```bash
npm run dev
```

Open **http://localhost:3000** — apne kapde upload karo aur shuru karo!

---

## Project Structure

```
Find-Your-Wardrobe/
├── src/
│   ├── app/
│   │   ├── page.tsx                        # Main app — full user flow
│   │   ├── layout.tsx                      # Root layout + metadata
│   │   ├── globals.css                     # Tailwind + custom utilities
│   │   └── api/
│   │       ├── analyze-clothing/
│   │       │   └── route.ts               # Claude Vision — photo → tags
│   │       └── suggest-outfit/
│   │           └── route.ts               # Claude Text — wardrobe → outfit
│   ├── components/
│   │   ├── UploadZone.tsx                  # Drag & drop file uploader
│   │   ├── ClothingCard.tsx                # Individual clothing item card
│   │   ├── EventSelector.tsx               # 9 events grid
│   │   └── OutfitResult.tsx                # AI suggestion result card
│   └── types/
│       └── wardrobe.ts                     # Shared TypeScript types
├── .env.local                              # API key (not committed)
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```

---

## Supported Events

| Event | Emoji | Description |
|---|---|---|
| Wedding | 💍 | Shaadi / Nikah |
| Birthday Party | 🎂 | Party time! |
| Office | 💼 | Professional look |
| Casual Meetup | ☕ | Friends gathering |
| Concert | 🎵 | Music / Live show |
| Date Night | 🌙 | Romantic evening |
| Festive | 🪔 | Diwali / Eid / Holi |
| Graduation | 🎓 | Convocation day |
| Sports / Gym | 🏃 | Active & sporty |

---

## Roadmap

- [ ] Weather-based outfit suggestions (OpenWeather API)
- [ ] Outfit Calendar — plan outfits for 7 days ahead
- [ ] Laundry Tracker — mark items as dirty / available
- [ ] Capsule Wardrobe Builder — 20 pieces, 100+ looks
- [ ] Packing List Generator — trip ke liye kya pack karein
- [ ] Supabase integration — save wardrobe across sessions
- [ ] Virtual Try-On — AI-generated preview of the outfit

---

## Contributing

Pull requests welcome. Naya event type, feature, ya UI improvement add karna chahte ho — pehle ek issue open karo.

---

## License

MIT — free to use, modify, and distribute.

---

<div align="center">

Built with Claude AI · Next.js · Tailwind CSS

**Agar useful laga toh star karo ⭐**

</div>
