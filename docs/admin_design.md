# CoE STAS-RG — Admin Portal Design System & Layout Specification (`docs/admin_design.md`)

> **Center of Excellence for Sustainable Technology and Applied Sciences (CoE STAS-RG)**  
> *Telkom University*  
> **Version**: 2.5 (Admin Portal Unified Standard)  
> **Brand Color Accent**: `#1AC13B` (Emerald Accent: `#12A02E`, Soft Mint: `#EDFBF1`, Dark Surface: `#060D0A` / `#0F172A`)  
> **Typography**: Plus Jakarta Sans / Inter  
> **Core Aesthetic**: Clean White Card Architecture, 1px Crisp Borders, Unified 4-Metric Cards, Inline Labelled Filter Toolbars, High-Contrast Light & Dark Modes, 3D Empty States

---

## 1. Overview & Visual Architecture

The **CoE STAS-RG Admin Management Portal** is designed to provide research administrators, lab coordinators, and faculty staff with a structured, intuitive, and modern control center.

Every administrative section follows a standardized **4-Tier Vertical Layout Architecture**:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  1. HEADER CARD (Badge Pill, Large Title, Description, Action Buttons)       │
└──────────────────────────────────────────────────────────────────────────────┘
┌───────────────────┬───────────────────┬───────────────────┬──────────────────┐
│  2. METRIC CARD 1 │  2. METRIC CARD 2 │  2. METRIC CARD 3 │  2. METRIC CARD 4│
└───────────────────┴───────────────────┴───────────────────┴──────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│  3. FILTER TOOLBAR (Search Field, Inline KATEGORI & STATUS, View Switcher)   │
└──────────────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│  4. CONTENT AREA (Interactive Data Table / Card Grid / 3D Empty State)       │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Layout Component Anatomy

### 2.1. Tier 1: Header Banner Card

The top banner provides immediate context, section category badge, actionable quick links, and creation triggers.

- **Container**: `rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-sm`
- **Pill Badge**:
  - Top-left rounded pill with icon: `inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800`
- **Title**: `text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight`
- **Subtitle**: `text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed`
- **Action Buttons (Right Aligned)**:
  - **Secondary / External Action**: `Lihat di Beranda` or `Refresh`
    - Class: `px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 shadow-sm transition-all`
  - **Primary Action (Green)**: `+ Tambah Data Baru`
    - Class: `px-4 py-2.5 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all`

---

### 2.2. Tier 2: 4-Column KPI Metric Cards

Displays quantitative telemetry across four key metrics.

- **Grid Layout**: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`
- **Card Structure**:
  - Container: `p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between`
  - **Top Row**:
    - Metric Label: `text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500`
    - Metric Icon: Right-aligned icon in subtle colored container (e.g. `text-emerald-600 bg-emerald-50` or `text-blue-600 bg-blue-50`)
  - **Metric Value (Number)**: `text-3xl font-black text-slate-900 dark:text-white mt-2`
  - **Bottom Subtitle**: `text-xs text-slate-400 dark:text-slate-500 mt-1.5`

---

### 2.3. Tier 3: Search & Filter Toolbar

Provides responsive search and inline category/status select dropdowns.

- **Container**: `p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4`
- **Search Input (Left)**:
  - Input field with magnifying glass icon: `w-full md:max-w-md pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400`
- **Inline Filter Controls (Right)**:
  - **KATEGORI**: Inline label (`text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500`) + Select box (`px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white`)
  - **STATUS**: Inline label (`text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500`) + Select box
  - **View Mode Switcher**: Side-by-side Grid (`LayoutGrid`) and Table (`Table`) toggle buttons

---

### 2.4. Tier 4: Content Area & 3D Empty State

#### Empty State Specifications (When no items match search or list is empty):
- **Container**: `p-12 md:p-16 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm`
- **Center Graphic / 3D Icon**: Document folder with magnifying glass and emerald status mark
- **Title**: `text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-4`
- **Description**: `text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 leading-relaxed`
- **Action Button**: `mt-6 inline-flex px-5 py-2.5 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white text-xs font-bold shadow-sm`

#### Data Table Specifications:
- **Container**: `rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden`
- **Table Header**: `bg-slate-50 dark:bg-slate-800/60 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80 dark:border-slate-800`
- **Table Rows**: `hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors`

---

## 3. Color Tokens & Theme Configuration

| Role | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| **Base Surface** | `#F8FAFC` (slate-50) | `#060D0A` (deep obsidian) | Page background |
| **Card Surface** | `#FFFFFF` (pure white) | `#0F172A` (slate-900) | Content containers & modal body |
| **Border Stroke** | `#E2E8F0` (slate-200/80) | `#1E293B` (slate-800) | All 1px card boundaries |
| **Primary Brand** | `#1AC13B` | `#1AC13B` | Primary buttons, active indicators |
| **Primary Hover** | `#12A02E` | `#12A02E` | Button hover states |
| **Input Background**| `#F8FAFC` (slate-50) | `#1E293B` (slate-800) | Form fields & search bars |
| **Primary Text** | `#0F172A` (slate-900) | `#FFFFFF` | Headings & key metrics |
| **Muted Text** | `#64748B` (slate-500) | `#94A3B8` (slate-400) | Subtitles, labels, timestamps |

---

## 4. Inquiries & Contact Management Implementation

The Contact & Inquiries Admin module (`/admin/inquiries`) strictly adheres to this specification:

1. **Header Card**:
   - Badge: `📨 Pesan & Hubungan Kemitraan`
   - Title: `Manajemen Pesan & Kontak Masuk` / `Inquiries & Contact Management`
   - Description: `Kelola pesan masuk dari mitra industri, permohonan kerjasama riset, pengajuan magang MBKM, dan permohonan informasi publik.`
   - Actions: `Lihat di Beranda` (`/contact`) & `Refresh`
2. **4 KPI Metrics**:
   - `TOTAL PESAN` (`Total Inquiries`)
   - `PESAN BARU` (`Unread / New` with rose/red alert badge)
   - `SEDANG DIPROSES` (`In Progress` with amber indicator)
   - `PESAN SELESAI` (`Resolved` with emerald indicator)
3. **Filter Toolbar**:
   - Search bar: `Cari nama pengirim, email, instansi, atau subjek pesan...`
   - Inline `KATEGORI:` dropdown
   - Inline `STATUS:` dropdown
   - Grid / Table toggle
4. **Content & Detail Modal**:
   - Comprehensive table & card view with interactive status updater
   - Empty state with 3D document search graphic
   - Response drawer with internal notes and one-click email reply
