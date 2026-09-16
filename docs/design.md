# CoE STAS-RG — Design System & UI/UX Specification (`docs/design.md`)

> **Center of Excellence for Sustainable Technology and Applied Sciences (CoE STAS-RG)**  
> *Telkom University*  
> **Version**: 2.0 (Modern Minimalist Release)  
> **Primary Brand Color**: `#1AC13B` (Emerald Accent: `#12A02E`, Soft Mint: `#EDFBF1`)  
> **Typography**: Plus Jakarta Sans  
> **Core Aesthetic**: Minimalist, Clean, High-Contrast Modern 2026 UI, **Zero Drop Shadows**, Crisp 1px Borders, Icon-First (No Emojis), Framer Motion Micro-Interactions

---

## 1. Executive Summary & Design Philosophy

The **CoE STAS-RG** web platform adheres to a modern, minimalist scientific design system inspired by leading enterprise and academic platforms (Linear, Vercel, Supabase). It strips away visual clutter (such as excessive pill badges, heavy shadows, and non-standard emojis) in favor of crisp typography, disciplined whitespace, and sharp 1px border geometry.

### Core Design Principles
1. **Modern Minimalist Simplicity**: Clean layouts with purpose-driven elements. Eliminates repetitive badge clutter; section context is communicated through strong typographic hierarchy and clean spacing.
2. **Strict Flat Precision (No Drop Shadows)**: Strictly zero drop shadows (`box-shadow: none !important;`). Depth is achieved through 1px border strokes (`border-slate-200/90`, `dark:border-slate-800`), layered background surfaces, and subtle mint/emerald tints.
3. **High-Contrast Typography & Hierarchy**: Powered by **Plus Jakarta Sans** with clean letter-spacing, clear hierarchy (`h1` 64px black, `h2` 32-36px bold, body 14-15px regular), and high contrast in both Light and Dark modes.
4. **Pure Vector Iconography (No Emojis)**: Exclusively uses **Lucide React** vector icons for visual cues. Non-standard emojis/emotes are strictly omitted.
5. **Dual Theme Architecture (Light & Dark Mode)**:
   - **Light Mode**: Pure `#FFFFFF` backgrounds with slate-900 typography and `#1AC13B` emerald accents.
   - **Dark Mode**: Deep `#080B11` / `#020617` obsidian slate surfaces with crisp `#1E293B` borders and `#1AC13B` emerald highlights.
6. **Instant 1-Click Bilingual Experience**: Pure circular vector flag toggle (🇬🇧 / 🇮🇩) for instant language switching between English and Bahasa Indonesia.
7. **Refined Physics-Based Micro-Animations**: Smooth Framer Motion transitions (`whileInView`, `layout`, opacity and subtle translateY) that feel snappy and fluid without excessive delays.

---

## 2. Color Palette & Token Architecture

```
Primary Brand:         #1AC13B (RGB: 26, 193, 59)
Primary Brand Dark:    #12A02E (Active / Hover / Deep Text)
Light Surface Base:    #FFFFFF (Pure White)
Light Card Surface:    #FFFFFF (1px border-slate-200/90)
Light Accent Surface:  #F4FAF5 / #EDFBF1 (Mint tint)
Dark Surface Base:     #080B11 (Deep Obsidian Slate)
Dark Card Surface:     #0F172A / #111827 (1px border-slate-800)
Footer Background:     #0A1C12 (Deep Obsidian Forest)
Border Neutral (Light):#E2E8F0 (Slate 200)
Border Neutral (Dark): #1E293B (Slate 800)
Border Brand Accent:   #B2EFC3 (Light) / #143B22 (Dark)
```

### Complete Color Tokens

| Token | Hex Value | Usage / Role |
|---|---|---|
| `--color-brand-25` | `#F6FDF8` | Lightest surface background |
| `--color-brand-50` | `#EDFBF1` | Subtle icon container and tag fill |
| `--color-brand-100` | `#D8F7E0` | Hover states and subtle selection borders |
| `--color-brand-200` | `#B2EFC3` | Accent border stroke for featured callouts |
| `--color-brand-500` | **`#1AC13B`** | **Primary Brand Color**: CTA buttons, highlighted titles, icons |
| `--color-brand-600` | `#12A02E` | Button hover state, interactive links |
| `--color-brand-700` | `#107E27` | High-contrast text on light green elements |
| `--color-footer-bg` | `#0A1C12` | **Footer Primary Background**: Deep Obsidian Forest |
| `--color-dark-bg` | `#080B11` | Dark Mode base surface |
| `--color-dark-card` | `#0F172A` | Dark Mode card surface |
| `text-slate-900` | `#0F172A` | Primary heading and high-emphasis body text (Light Mode) |
| `text-slate-100` | `#F1F5F9` | Primary heading and high-emphasis body text (Dark Mode) |
| `text-slate-600` | `#475569` | Secondary descriptive text and excerpts (Light Mode) |
| `text-slate-400` | `#94A3B8` | Secondary descriptive text (Dark Mode), DOI citations |

---

## 3. Brand Identity & Typography

### Official Logo Format (`BrandLogo.tsx`)
- **Asset**: Official high-resolution [`/stas.png`](file:///d:/INTERN/STAS%20RG%20Profile/stasrg_profile/public/stas.png) (pure image without white background box).
- **Typography Structure**:
  - Top Line: "**STAS** Research Group" (`STAS` font-extrabold `800`, `Research Group` font-normal `400` with single uniform text color).
  - Subtitle: `Sustainable Technology and Applied Sciences` in clean medium tracking.

### Favicon & SEO Architecture
- Multi-resolution favicons (`32x32`, `16x16`, `180x180` Apple Touch Icon) referencing `/stas.png`.
- Full Open Graph, Twitter Summary Large Card, and Schema.org `ResearchOrganization` JSON-LD integration.
- `public/robots.txt` and `public/sitemap.xml` for search index discovery.

### Typography Scale (Plus Jakarta Sans)

```css
font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
```

| Level | Size (Desktop / Mobile) | Weight | Line Height | Tracking |
|---|---|---|---|---|
| **Hero Title (`h1`)** | 60px / 36px | 900 (Black) | 1.12 | -0.03em |
| **Section Title (`h2`)** | 32px / 24px | 800 (ExtraBold) | 1.2 | -0.02em |
| **Card Title (`h3`)** | 17px / 15px | 700 (Bold) | 1.3 | -0.01em |
| **Body Text** | 15px / 14px | 400 (Regular) | 1.6 | Normal |
| **Category Tag / Subtitle** | 12px / 11px | 600 (SemiBold) | 1.2 | +0.02em |
| **Metadata & Footnotes** | 12px / 11px | 500 (Medium) | 1.4 | Normal |

---

## 4. UI Layout & Component Architecture

### 1. Navigation Bar (`Navbar.tsx`)
- **Sticky Glassmorphism**: `bg-white/90 dark:bg-[#080B11]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80`.
- **Menu Hierarchy**: `Home`, `About`, `Domains`, `Projects`, `Publications`, `More` (Dropdown for `Services`, `Partners`, `News`, `Events`), `Contact`.
- **Frameless Tool Suite**:
  1. **1-Click Language Switcher**: Pure vector circular Flag icon (`Indonesia` 🇮🇩 / `UK` 🇬🇧) without text or globe icons (`bg-transparent border-0`).
  2. **Theme Mode Toggle**: Frameless Sun/Moon toggle for Light and Dark modes (`bg-transparent border-0`).
  3. **Search Trigger**: Opens `SearchModal.tsx` (`bg-transparent border-0`).
- **Primary CTA**: **Login Button** (`LogIn` icon) linking directly to `/login`.

### 2. Streamlined Section Headings (`SectionHeading.tsx`)
- Replaces loud repetitive badges with a clean, modern headline layout:
  - Subtle category label (e.g. `Research Focus`, `Projects Portfolio`) styled as a simple high-contrast text label or clean minimalist tag.
  - Strong, readable section title with tight tracking.
  - Clear, concise subtitle and right-aligned action link with animated arrow.

### 3. Landing Page Sections (11 Dynamic Modules)
1. **`HeroSection.tsx`**:
   - Official subtle background photo (`hero_bg.jpeg` with `opacity-15` / `opacity-10`) with ambient gradient overlay and upward bottom-to-top gradient fade.
   - Clean single tag, high-impact headline with `#1AC13B` emerald highlight, primary and secondary action buttons, and institutional accreditation pill.
2. **`MetricsBar.tsx`**:
   - Full-width pure white container (`w-full bg-white dark:bg-slate-950`) housing a 4-column flat metric card (`50+` Projects, `30+` Applications, `20+` Strategic Partners, `15+` Researchers).
3. **`AboutSection.tsx`**:
   - Clean 2-column layout: Left narrative with Director's quote card (`Prof. Dr. Ir. Adiwijaya`); Right 2x2 grid of core pillars (`Applied R&D`, `Industry Integration`, `Capacity Building`, `Sustainable Impact`) using Lucide icons.
4. **`DomainsSection.tsx`**:
   - 8 Scientific Research Domains in a 4x2 responsive grid with minimalist domain numbering (`01 / DOMAIN`) and Lucide vector icons.
5. **`ProjectsSection.tsx`**:
   - Sleek category filter tabs (`All`, `Smart Manufacturing`, `Sustainable Energy`, `Supply Chain`), high-res photography, lead researcher badges, and case study triggers.
6. **`PublicationsSection.tsx`**:
   - Scopus/WoS Q1 Journal tags, citation metadata, and direct PDF/DOI link triggers.
7. **`ServicesSection.tsx`**:
   - 6 Enterprise Consultancy & R&D service cards with numbered indicators.
8. **`PartnersSection.tsx`**:
   - Official partner logos (natural full color in Light mode, pure white `dark:brightness-0 dark:invert` in Dark mode).
9. **`NewsSection.tsx`**:
   - 3-column articles with tags, publication dates, and read times.
10. **`EventsSection.tsx`**:
    - Upcoming symposia & masterclasses with hybrid/offline location indicators.
11. **`CtaBanner.tsx`**:
    - Mint-gradient callout with 3 value checkmarks and proposal request buttons.
12. **`Footer.tsx`**:
    - Deep Obsidian Forest (`#0A1C12`) with white "**STAS** Research Group" logo, address, contact, and 5 comprehensive columns.

### 4. Dedicated Authentication Portal (`resources/js/Pages/Auth/Login.tsx`)
- **Route**: `/login` and `/register` (via `AuthController.php`).
- **Split Screen Layout**:
  - **Left Form Column**: Minimalist `Welcome` headline, Email/Username field, Password field with eye toggle, Keep me signed in checkbox & Reset password link, high-contrast Sign In CTA, and multi-provider options:
    1. **Google OAuth 2.0** (`Continue with Google` with official colored G icon).
    2. **FIDO2 / WebAuthn Passkey** (`Continue with Passkey` with key/biometric icon).
    3. **Telkom University SSO** (`Continue with SSO Telkom University` with institutional badge).
    4. "New to our platform? **Create Account**" (smooth toggle to full registration fields).
  - **Right Visual Artwork Column**: Modern `rounded-[32px]` container featuring a 3D abstract fluid emerald silk wave sculpture (`/assets/images/auth_artwork.jpg`) with floating glassmorphism testimonial card (`Prof. Dr. Ir. Adiwijaya`).
- **Tools**: Pure Flag icon language toggle (🇬🇧 / 🇮🇩), frameless theme toggle, and Back to Home button.

---

## 5. Responsive Breakpoint Guidelines

- **Mobile (`< 640px`)**: Single-column vertical stacks, compact tags, frameless icon header tools, full-width touch buttons.
- **Tablet (`640px – 1023px`)**: 2-column card layouts, horizontal metric blocks, condensed navigation.
- **Desktop (`1024px – 1439px`)**: 4-column domain grids, 3-column project/news grids, "More" dropdown navigation, sticky header.
- **Ultra-Wide (`≥ 1440px`)**: Centered 1280px container (`max-w-7xl`) with comfortable margins and whitespace.

---

## 6. Build & Deployment Commands

```bash
# 1. Install Dependencies
composer install
npm install

# 2. Run Database Migrations & Seeders
php artisan migrate:fresh --seed

# 3. Build Production Bundle
npm run build

# 4. Run Test Suite
php artisan test
```
