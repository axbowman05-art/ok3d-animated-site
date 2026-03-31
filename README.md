# OK3D Prints — Animated Marketing Site

A visually stunning, scroll-driven animated marketing website for OK3D Prints — a functional parts 3D printing service. Built as a high-impact side project to compare against the standard site, targeting Framer/Webflow-level polish while converting B2B buyers into quote requests.

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** — utility-first styling
- **GSAP 3 + ScrollTrigger** — scroll-driven animations, pinned horizontal scroll
- **Lenis** — smooth scrolling synced to GSAP ticker
- **Framer Motion** — component/page transitions, mobile carousel
- **React Hook Form + Zod** — multi-step quote form with validation

## Features

### Single-Page Scrolling Experience

| Section | Highlights |
|---------|-----------|
| **Hero** | Character-by-character text reveal, floating glow orbs, parallax fade on scroll |
| **What We Do** | Animated counters, staggered card reveals, accent bar animations |
| **Materials** | Color-coded cards with 3D rotateY reveal, mobile horizontal snap scroll |
| **Process** | GSAP pinned horizontal scroll with scrub progress bar, mobile vertical fallback |
| **Gallery** | Self-drawing wireframe SVG placeholders, diagonal stagger, hover overlays |
| **Testimonials** | Depth-staggered cards, mobile auto-rotating carousel |
| **CTA** | Radial spotlight gradient, pulsing button, split-text headline |

### Quote Page (`/quote`)

- 4-step form: Contact → Project → Details → Confirm
- Spring-animated progress bar
- Animated step transitions (slide left/right)
- Zod validation with floating labels
- SVG checkmark success animation

### Micro-Interactions

- **Magnetic buttons** — CTA buttons pull toward cursor, spring back on leave
- **Scroll progress bar** — 2px accent line at top of viewport
- **Card hover** — lift with shadow transition
- **Nav** — transparent → blurred background, animated active section underline
- **Button press** — scale to 0.97 for tactile feel

### Accessibility & Performance

- Full `prefers-reduced-motion` support — all animations disabled, content renders in final state
- Mobile-optimized — parallax/magnetic effects disabled on touch, Process section vertical fallback
- Code-split sections via `next/dynamic` with `ssr: false`
- Lenis smooth scroll disabled when reduced motion is preferred

## Design

- Dark theme: `#0a0a0a` background, `#0ea5e9` accent, `#111827` cards, `#1e293b` borders
- Fonts: Inter (headings/body), JetBrains Mono (spec numbers, labels)
- Placeholder wireframe SVGs in gallery (self-drawing stroke animation)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Single-page home (7 sections)
│   ├── globals.css
│   ├── quote/page.tsx          # Multi-step quote form
│   └── api/quote/route.ts      # Form submission (console.log)
├── components/
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ScrollProgress.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── WhatWeDo.tsx
│   │   ├── Materials.tsx
│   │   ├── Process.tsx
│   │   ├── Gallery.tsx
│   │   ├── Testimonials.tsx
│   │   └── CTA.tsx
│   └── ui/
│       ├── Button.tsx           # Magnetic hover effect
│       ├── SplitText.tsx        # Character-by-character GSAP animation
│       ├── AnimatedCounter.tsx  # Number counting on scroll
│       ├── GlowOrb.tsx         # Ambient floating gradient
│       ├── GridPattern.tsx      # SVG dot-grid background
│       └── ParallaxImage.tsx
├── lib/
│   ├── gsap-utils.ts           # Shared animation presets
│   ├── content.ts              # All hardcoded content
│   └── types.ts
└── hooks/
    ├── useReducedMotion.ts
    └── useMediaQuery.ts
```

## Build

```bash
npm run build
```

Produces a static export with dynamic API route for quote submissions.

## Status

**v1 — First iteration complete.** All 7 sections and the quote page are built and rendering. Animations and polish are functional but still being refined. Not yet pushed to GitHub (pending remote fix).
