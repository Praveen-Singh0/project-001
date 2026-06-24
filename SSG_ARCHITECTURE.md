# SSG & Client Boundaries

All marketing routes use `export const dynamic = "force-static"` in `src/app/**/page.tsx` and `src/app/layout.tsx`.

## Architecture

```
app/page.tsx          → Server Component (SSG HTML at build time)
app/layout.tsx        → Server Component
providers/Providers.tsx → Client (theme + loader shell only)
```

## `"use client"` is required for

| Component | Reason |
|-----------|--------|
| `Providers`, `AppShell`, `LoadingScreen` | Loader state, localStorage |
| `Navbar`, `Footer` | Scroll state, mobile menu, pathname, theme toggle |
| `Hero`, `GlobalTrust` | Canvas / RAF animations |
| `HomeEffects`, `AuroraBackground`, `ParticleField` | Canvas, mouse tracking |
| `CustomCursor`, `MagneticButton` | DOM mouse APIs |
| `Contact` | Form state |
| `Testimonials`, `TechStack` | Carousel / expand state |
| `WhyChooseUs`, `Services`, `Projects` | Theme inline styles + hover handlers |
| Page shells with `useState` | `ServicesPage`, `ContactPage`, etc. |

## Server Components (no `"use client"`)

| Component | Notes |
|-----------|--------|
| `About` | Uses CSS variables + `glass-card` hover |
| `app/page.tsx` | Composes home sections at build time |
| Legal pages (`privacy-policy`, `terms`) | Static prose via `LegalPageLayout` client wrapper only |

## To convert more sections to Server Components

Replace `useTheme()` inline colors with `var(--foreground)`, `bg-background`, `text-muted-foreground`, and CSS `:hover` instead of `onMouseEnter`.
