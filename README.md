# STAS-RG Official Website

Official website of **Center of Excellence Sustainable Technology and Applied Sciences Research Group (CoE STAS-RG)** — a research, innovation, and collaboration platform of Telkom University.

---

## 📖 About

STAS-RG focuses on research, consulting, project implementation, SCM software solutions, customization, industrial attachment, certification, professional & student training, seminars, expos, publications, and scientific collaboration.

The website is designed to showcase:

* **Research Areas**: Deep focus on 8 strategic research domains including Industry 4.0, Green Tech, SCM, and Applied AI.
* **Research Projects & Publication Flyers**: High-fidelity publication flyers, A4 standard documents, and interactive digital showcases.
* **Publications**: Peer-reviewed journals (Q1/Scopus/IEEE), conference proceedings, and policy whitepapers.
* **Researchers & Team**: Faculty researchers, principal investigators, postdoctoral fellows, and student scholars.
* **Services & Solutions**: Custom industrial R&D, supply chain optimization advisory, ESG & carbon accounting, and technology licensing.
* **Industry & Academic Partners**: Collaborative network spanning national enterprises, ministries, and international research universities.
* **News & Insights**: Research breakthroughs, grant awards, and laboratory milestones.
* **Events & Symposia**: Academic workshops, international conferences, and technical training.
* **Achievements & Impact**: Real-world industrial deployment metrics and citations.

---

## 🛠 Tech Stack

* **Backend**: Laravel 12 (PHP 8.2+)
* **Full-Stack Adapter**: Inertia.js (v2)
* **Frontend**: React 19 + TypeScript
* **Styling**: Tailwind CSS (v4)
* **Animations**: Framer Motion
* **Database**: PostgreSQL / SQLite (Development)
* **Icons**: Lucide React (Vector Icons only)
* **Typography**: Plus Jakarta Sans (Google Fonts)

---

## 🎨 Design System & Aesthetics

The interface follows a modern, high-precision research-institution aesthetic:

* **Primary Color**: Emerald Green (`#1AC13B`) with Forest Green (`#107E27`) and Soft Mint (`#EDFBF1`)
* **Dark Mode Palette**: Deep Obsidian (`#020617` / `#0B132B`) with crisp slate borders
* **Typography**: **Plus Jakarta Sans** with clean numerical hierarchy and mono tags
* **Responsive Design**: Mobile-first architecture with adaptive headers, drawers, and fluid grids
* **Editorial & Tech-Oriented UI**: Modern card layouts with crisp 1px borders
* **Zero Drop Shadows**: Clean minimalist look (`box-shadow: none !important;`)
* **Micro-Interactions**: Subtle, purposeful Framer Motion transitions
* **Multi-Language Support**: Full bilingual translation system (🇮🇩 Bahasa Indonesia / 🇬🇧 English)
* **CMS-Driven Content**: Real-time database synchronisation with seeders and Eloquent models

---

## 🏛 Architecture

```text
Laravel 12 (Backend & API)
   │
   ├── Controllers (Landing, Auth, Admin CMS)
   ├── Models & Database Migrations (Eloquent ORM)
   ├── Policies & Authentication (Session & Passkey)
   └── Route Handlers
          │
          ↓
      Inertia.js (Zero-API Glue Layer)
          │
          ↓
   React 19 + TypeScript (Frontend SPA)
          │
          ├── Public Views (Landing Showcase, Focus Domains, Projects, Contact)
          ├── Authentication Portal (Login, Register, Forgot Password)
          └── Admin Dashboard (Metrics, Flyer Hub, Navigation, Support)
          │
          ↓
     Tailwind CSS v4 (Styling Tokens)
          │
          ↓
    Framer Motion (Transitions & Micro-interactions)
```

---

## 📦 Core Modules

```text
Public Website
├── Home / Hero Showcase
├── About CoE STAS-RG
├── Research Areas (8 Focus Domains)
├── Projects & Innovation Flyers
├── Publications (Indexed Q1, Scopus, IEEE)
├── Services & Industrial Consulting
├── Team & Researcher Directory
├── Partners & Collaborators Network
├── News & Insights
├── Events & Academic Symposia
├── Achievements & Impact Metrics
├── Facilities & Specialized Labs
├── Careers & Research Grants
└── Contact & Exploration Call

Authentication Portal
├── Sign In (Email / Username + Password)
├── Passkey Biometric Auth (WebAuthn / FIDO2)
├── Telkom University Single Sign-On (SSO)
├── Google OAuth 2.0 Integration
├── Quick Demo Admin Auto-fill Chip
├── Register / Researcher Account Creation
└── Forgot Password & Recovery Dispatcher

Admin CMS Portal (/admin)
├── Dashboard Overview & Statistics (6 Metric Cards)
├── Project Riset & Flyer Hub (Table, Multi-filter & Sort)
├── Distribusi Klaster Riset (Progress Bar Visualizer)
├── Pintasan Navigasi Cepat (Quick Action Cards)
├── Developer Support WhatsApp Widget (0831-3297-9214)
├── Site Settings & Configuration
├── Researcher Directory Management
├── Asset Library & Media Manager
└── Activity Logs & Support Tickets
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
* **PHP >= 8.2**
* **Composer**
* **Node.js >= 20.x** and **npm**
* **PostgreSQL** or **SQLite**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/stasrg/stasrg-profile.git
   cd stasrg_profile
   ```

2. **Install PHP dependencies**:
   ```bash
   composer install
   ```

3. **Install JavaScript dependencies**:
   ```bash
   npm install
   ```

4. **Environment Setup**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Database Migration & Seeding**:
   ```bash
   php artisan migrate --seed
   ```

6. **Start Development Servers**:
   ```bash
   # Terminal 1: Run Vite asset builder
   npm run dev

   # Terminal 2: Run Laravel backend server
   php artisan serve
   ```
   *Or run concurrently with Composer:*
   ```bash
   composer run dev
   ```

7. **Access the application**:
   * **Public Landing Page**: `http://localhost:8000/`
   * **Admin Portal**: `http://localhost:8000/admin`
   * **Default Admin Credentials**:
     * **Email**: `admin@stasrg.com`
     * **Password**: `password`

---

## 🧪 Testing & Code Quality

Run automated PHPUnit feature and unit test suites:

```bash
php artisan test
```

Build and validate production frontend assets:

```bash
npm run build
```

---

## 🎯 Goal

Build a scalable and professional digital platform that represents STAS-RG's **research excellence, technological innovation, industry collaboration, and institutional impact**.

---

## 📄 License & Attribution

Developed for **Center of Excellence Sustainable Technology and Applied Sciences (CoE STAS-RG)** — Telkom University. All rights reserved.
