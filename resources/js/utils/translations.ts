export type Language = 'EN' | 'ID';

export interface TranslationDictionary {
    nav: {
        home: string;
        about: string;
        team: string;
        research: string;
        projects: string;
        publications: string;
        more: string;
        services: string;
        partners: string;
        news: string;
        events: string;
        contact: string;
        login: string;
        searchTooltip: string;
        themeTooltip: string;
        langTooltip: string;
    };
    hero: {
        pill: string;
        titlePart1: string;
        titleHighlight: string;
        titlePart2: string;
        subtitle: string;
        exploreBtn: string;
        partnerBtn: string;
        accreditationUniv: string;
        accreditationFaculty: string;
    };
    metrics: {
        projects: string;
        projectsDesc: string;
        applications: string;
        applicationsDesc: string;
        partners: string;
        partnersDesc: string;
        researchers: string;
        researchersDesc: string;
    };
    about: {
        pill: string;
        title: string;
        p1: string;
        p2: string;
        quote: string;
        directorName: string;
        directorTitle: string;
        pillars: {
            appliedRd: { title: string; desc: string };
            industryIntegration: { title: string; desc: string };
            capacityBuilding: { title: string; desc: string };
            sustainableImpact: { title: string; desc: string };
        };
    };
    domains: {
        pill: string;
        title: string;
        subtitle: string;
        actionLink: string;
        exploreLink: string;
        items: Array<{ title: string; summary: string }>;
    };
    projects: {
        pill: string;
        title: string;
        tabs: { all: string; smartMfg: string; sustEnergy: string; supplyChain: string };
        lead: string;
        viewCaseStudy: string;
    };
    publications: {
        pill: string;
        title: string;
        subtitle: string;
        browseAll: string;
        authors: string;
        pdfLink: string;
        doiLink: string;
    };
    services: {
        pill: string;
        title: string;
        subtitle: string;
        actionLink: string;
        exploreService: string;
    };
    partners: {
        pill: string;
        title: string;
        viewAll: string;
    };
    news: {
        pill: string;
        title: string;
        subtitle: string;
        viewAll: string;
        readMore: string;
    };
    events: {
        pill: string;
        title: string;
        subtitle: string;
        calendarLink: string;
        registerBtn: string;
        brochureLink: string;
    };
    cta: {
        pill: string;
        titlePart1: string;
        titleHighlight: string;
        subtitle: string;
        b1: string;
        b2: string;
        b3: string;
        initiateBtn: string;
        scheduleBtn: string;
        officialContact: string;
    };
    footer: {
        desc: string;
        univ: string;
        faculty: string;
        colFocus: string;
        colPubs: string;
        colServices: string;
        colConnect: string;
        rights: string;
        privacy: string;
        terms: string;
        ethics: string;
        sitemap: string;
    };
    auth: {
        title: string;
        subtitle: string;
        emailLabel: string;
        emailOrUsernameLabel: string;
        emailOrUsernamePlaceholder: string;
        passwordLabel: string;
        passwordPlaceholder: string;
        rememberMe: string;
        keepSignedIn: string;
        forgotPass: string;
        resetPassword: string;
        signInBtn: string;
        ssoBtn: string;
        googleBtn: string;
        passkeyBtn: string;
        ssoTelkomBtn: string;
        orContinueWith: string;
        noAccount: string;
        requestAccess: string;
        tabLogin: string;
        tabRegister: string;
        fullNameLabel: string;
        usernameLabel: string;
        usernamePlaceholder: string;
        institutionLabel: string;
        roleLabel: string;
        confirmPassLabel: string;
        signUpBtn: string;
        haveAccount: string;
        backToHome: string;
        showcasePill: string;
        showcaseTitle: string;
        showcaseDesc: string;
        badgeSSL: string;
        badgeSSO: string;
        badgeAudit: string;
        successLogin: string;
        successRegister: string;
        testimonialAuthor: string;
        testimonialHandle: string;
        testimonialQuote: string;
        forgotPasswordTitle: string;
        forgotPasswordSubtitle: string;
        forgotPasswordSendBtn: string;
        forgotPasswordSuccess: string;
        backToSignIn: string;
    };
    search: {
        placeholder: string;
        domainsLabel: string;
        projectsLabel: string;
        pubsLabel: string;
        pressEsc: string;
        knowledgeBase: string;
    };
}

export const translations: Record<Language, TranslationDictionary> = {
    EN: {
        nav: {
            home: 'Home',
            about: 'About',
            team: 'Our Team',
            research: 'Research Areas',
            projects: 'Research Projects',
            publications: 'Publications',
            more: 'More',
            services: 'Services & Consulting',
            partners: 'Partners',
            news: 'News & Articles',
            events: 'Events & Workshops',
            contact: 'Contact',
            login: 'Login',
            searchTooltip: 'Search research assets',
            themeTooltip: 'Toggle Dark / Light mode',
            langTooltip: 'Switch language to Indonesian',
        },
        hero: {
            pill: 'CENTER OF EXCELLENCE FOR SUSTAINABLE TECHNOLOGY & APPLIED SCIENCE',
            titlePart1: 'Advancing',
            titleHighlight: 'Sustainable Technology',
            titlePart2: 'Through Research & Innovation',
            subtitle: 'CoE STAS-RG bridges academic excellence and real-world industrial needs to drive pioneering sustainable technology, operational research, and industrial automation solutions for a resilient tomorrow.',
            exploreBtn: 'Explore Our Research',
            partnerBtn: 'Partner With Us',
            accreditationUniv: 'Telkom University',
            accreditationFaculty: 'Center of Excellence',
        },
        metrics: {
            projects: 'Research Projects',
            projectsDesc: 'Completed & Active Industrial Tracks',
            applications: 'Industrial Applications',
            applicationsDesc: 'Tested in Real-World Environments',
            partners: 'Strategic Partners',
            partnersDesc: 'Global & National Collaborators',
            researchers: 'Principal Researchers',
            researchersDesc: 'And Interdisciplinary Fellows',
        },
        about: {
            pill: 'ABOUT US',
            title: 'Center of Excellence for Science & Applied Industrial Technology',
            p1: 'The Center of Excellence for Sustainable Technology & Applied Science (CoE STAS-RG) unites multidisciplinary researchers, industry partners, and global scholars to build advanced socio-technical solutions for Southeast Asia\'s growing industrial ecosystems.',
            p2: 'Operating at the intersection of operations research, digital manufacturing, circular economy, and decarbonization strategies, we transform theoretical models into hardened, real-world deployment.',
            quote: 'Pioneering sustainable technology with impact. We build solutions that scale beyond laboratories.',
            directorName: 'Prof. Dr. Ir. Adiwijaya, S.Si., M.Si.',
            directorTitle: 'Lead Advisor & Research Director',
            pillars: {
                appliedRd: {
                    title: 'Applied R&D',
                    desc: 'Translating theoretical breakthroughs into scalable, industrially hardened solutions across Southeast Asia.',
                },
                industryIntegration: {
                    title: 'Industry Integration',
                    desc: 'Bridging academic laboratory research with direct manufacturing execution systems and real-world deployment.',
                },
                capacityBuilding: {
                    title: 'Capacity Building',
                    desc: 'Training next-generation engineers, data scientists, and executive industrial leaders.',
                },
                sustainableImpact: {
                    title: 'Sustainable Impact',
                    desc: 'Targeting measurable net-zero decarbonization, energy efficiency, and ESG circularity metrics.',
                },
            },
        },
        domains: {
            pill: 'RESEARCH FOCUS',
            title: 'Key Research Areas',
            subtitle: 'Our primary research divisions driving breakthroughs across sustainable engineering, smart manufacturing, and industrial computing.',
            actionLink: 'View All Research Areas',
            exploreLink: 'Explore This Area',
            items: [
                { title: 'Sustainable Technology & Green Systems', summary: 'Eco-efficiency frameworks, carbon lifecycle analysis, and circular materials development.' },
                { title: 'Smart Manufacturing & Industry 4.0', summary: 'Cyber-physical systems, autonomous robotics, digital shopfloors, and intelligent MES architectures.' },
                { title: 'Supply Chain & Logistics Optimization', summary: 'Predictive logistics networks, maritime routing, inventory digital twins, and resilient sourcing models.' },
                { title: 'Applied Data Science & Industrial AI', summary: 'Physics-informed neural networks, computer vision quality assurance, and edge AI telemetry.' },
                { title: 'Environmental Tech & Circular Economy', summary: 'Industrial waste upcycling, bio-reactor wastewater treatment, and secondary resource harvesting.' },
                { title: 'Renewable Energy & Smart Grid Systems', summary: 'Microgrid scheduling, battery energy storage analytics, and decentralized green power management.' },
                { title: 'Applied Ergonomics & Human Factors', summary: 'Human-machine interfaces, cognitive workload assessment, worker ergonomics, and occupational safety.' },
                { title: 'Industrial Automation & Digitalization', summary: 'PLC integration, SCADA telemetry, industrial IoT sensor meshes, and process automation.' },
            ],
        },
        projects: {
            pill: 'RESEARCH PROJECTS',
            title: 'Featured Research Projects',
            tabs: {
                all: 'All',
                smartMfg: 'Smart Manufacturing',
                sustEnergy: 'Sustainable Energy',
                supplyChain: 'Supply Chain',
            },
            lead: 'Lead Researcher:',
            viewCaseStudy: 'View Project Details',
        },
        publications: {
            pill: 'PUBLICATIONS',
            title: 'Academic Publications & Journals',
            subtitle: 'Discover high-impact research papers, journal articles, and international conference proceedings indexed in Scopus and Web of Science.',
            browseAll: 'Browse All Publications',
            authors: 'Authors:',
            pdfLink: 'PDF Link',
            doiLink: 'DOI Link',
        },
        services: {
            pill: 'SERVICES & CONSULTING',
            title: 'Industrial Research & Consulting Services',
            subtitle: 'We partner with multinational enterprises, growing manufacturers, and state agencies to deploy production-ready engineering solutions.',
            actionLink: 'Service Guidelines',
            exploreService: 'Explore Service',
        },
        partners: {
            pill: 'OUR PARTNERS',
            title: 'Trusted by Industry & Government Partners',
            viewAll: 'Explore All Industry & Research Partners',
        },
        news: {
            pill: 'NEWS & ARTICLES',
            title: 'Latest News & Research Articles',
            subtitle: 'Latest research breakthroughs, industry grant announcements, and technological innovations.',
            viewAll: 'View All Articles',
            readMore: 'Read More',
        },
        events: {
            pill: 'EVENTS & WORKSHOPS',
            title: 'Upcoming Symposia & Workshops',
            subtitle: 'Engage directly with leading scientists, engineering practitioners, and international industry authorities.',
            calendarLink: 'Full Academic Calendar',
            registerBtn: 'Register Now',
            brochureLink: 'Download Brochure',
        },
        cta: {
            pill: 'INNOVATE WITH US',
            titlePart1: 'Ready to Innovate Together?',
            titleHighlight: 'CoE STAS-RG',
            subtitle: 'Collaborate with top researchers, access advanced laboratory testing beds, and deploy science-backed solutions engineered specifically for your enterprise.',
            b1: 'Co-develop R&D projects',
            b2: 'Talent & internship pipeline',
            b3: 'Executive advisory & consulting',
            initiateBtn: 'Initiate Collaborative Proposal',
            scheduleBtn: 'Schedule an Exploration Call',
            officialContact: 'Official Contact:',
        },
        footer: {
            desc: 'Center of Excellence for Sustainable Technology & Applied Science (CoE STAS-RG). Pioneering industrial decarbonization, smart manufacturing, and resilient operations research.',
            univ: 'Telkom University',
            faculty: 'Center of Excellence (CoE)',
            colFocus: 'Research Areas',
            colPubs: 'Publications',
            colServices: 'Services & Consulting',
            colConnect: 'Connect & Visit',
            rights: 'All rights reserved.',
            privacy: 'Privacy Policy',
            terms: 'Terms of Association',
            ethics: 'Academic Ethics',
            sitemap: 'Sitemap',
        },
        auth: {
            title: 'Welcome',
            subtitle: 'Access your account and continue your journey with us',
            emailLabel: 'Email Address / Single Sign-On ID',
            emailOrUsernameLabel: 'Email Address or Username',
            emailOrUsernamePlaceholder: 'Enter your email or username',
            passwordLabel: 'Password',
            passwordPlaceholder: 'Enter your password',
            rememberMe: 'Keep me signed in',
            keepSignedIn: 'Keep me signed in',
            forgotPass: 'Reset password',
            resetPassword: 'Reset password',
            signInBtn: 'Sign In',
            ssoBtn: 'Continue with SSO Telkom University',
            googleBtn: 'Continue with Google',
            passkeyBtn: 'Continue with Passkey',
            ssoTelkomBtn: 'Continue with SSO Telkom University',
            orContinueWith: 'Or continue with',
            noAccount: 'New to our platform?',
            requestAccess: 'Create Account',
            tabLogin: 'Sign In',
            tabRegister: 'Create Account',
            fullNameLabel: 'Full Name with Academic Title',
            usernameLabel: 'Username / Account ID',
            usernamePlaceholder: 'Enter your account username',
            institutionLabel: 'Institution / Department / Organization',
            roleLabel: 'Researcher Category',
            confirmPassLabel: 'Confirm Password',
            signUpBtn: 'Create Account',
            haveAccount: 'Already have an account?',
            backToHome: 'Back to Landing Page',
            showcasePill: 'SECURE RESEARCH & DATA GATEWAY',
            showcaseTitle: 'Unified Portal for Academic & Industrial Researchers',
            showcaseDesc: 'Securely access high-performance computing clusters, collaborative project workspaces, industrial datasets, and scientific publication pipelines.',
            badgeSSL: '256-Bit SSL Encrypted',
            badgeSSO: 'Telkom Univ SSO Ready',
            badgeAudit: 'ISO/IEC 27001 Standard',
            successLogin: 'Authentication successful! Redirecting to research portal...',
            successRegister: 'Registration submitted! A verification link has been sent to your institutional email.',
            testimonialAuthor: 'Prof. Dr. Ir. Adiwijaya',
            testimonialHandle: '@telkomuniversity',
            testimonialQuote: 'Amazing platform! The user experience is seamless and the laboratory data integration is exactly what we needed.',
            forgotPasswordTitle: 'Forgot Password?',
            forgotPasswordSubtitle: 'Enter your registered institutional email or username and we will send you a secure verification link to reset your credentials.',
            forgotPasswordSendBtn: 'Send Reset Link',
            forgotPasswordSuccess: 'Reset instructions have been dispatched to your institutional email. Please check your inbox and spam folder.',
            backToSignIn: 'Back to Sign In',
        },
        search: {
            placeholder: 'Search research topics, papers, projects, services...',
            domainsLabel: 'Research Areas',
            projectsLabel: 'Research Projects',
            pubsLabel: 'Publications',
            pressEsc: 'Press ESC to exit',
            knowledgeBase: 'CoE STAS-RG Knowledge Base',
        },
    },
    ID: {
        nav: {
            home: 'Beranda',
            about: 'Tentang Kami',
            team: 'Tim Peneliti',
            research: 'Bidang Riset',
            projects: 'Proyek Riset',
            publications: 'Publikasi',
            more: 'Lainnya',
            services: 'Layanan & Konsultasi',
            partners: 'Mitra Kerjasama',
            news: 'Berita & Artikel',
            events: 'Agenda & Acara',
            contact: 'Kontak',
            login: 'Masuk',
            searchTooltip: 'Cari topik riset & publikasi',
            themeTooltip: 'Ganti Mode Gelap / Terang',
            langTooltip: 'Ganti bahasa ke Bahasa Inggris',
        },
        hero: {
            pill: 'PUSAT UNGGULAN RISET TEKNOLOGI BERKELANJUTAN & SAINS TERAPAN',
            titlePart1: 'Memajukan',
            titleHighlight: 'Teknologi Berkelanjutan',
            titlePart2: 'Melalui Riset & Inovasi Terdepan',
            subtitle: 'CoE STAS-RG menjembatani keunggulan akademik dan kebutuhan riil industri untuk mendorong riset operasional, otomasi industri, dan teknologi hijau demi masa depan yang tangguh.',
            exploreBtn: 'Jelajahi Riset Kami',
            partnerBtn: 'Bermitra Bersama Kami',
            accreditationUniv: 'Telkom University',
            accreditationFaculty: 'Pusat Unggulan Iptek (CoE)',
        },
        metrics: {
            projects: 'Proyek Riset',
            projectsDesc: 'Jalur Riset Industri Aktif & Selesai',
            applications: 'Aplikasi Industri',
            applicationsDesc: 'Teruji pada Lingkungan Nyata',
            partners: 'Mitra Strategis',
            partnersDesc: 'Kolaborator Nasional & Global',
            researchers: 'Peneliti Utama',
            researchersDesc: 'Beserta Fellow Antardisiplin',
        },
        about: {
            pill: 'TENTANG KAMI',
            title: 'Pusat Riset Sains Terapan & Inovasi Rekayasa Industri',
            p1: 'Center of Excellence for Sustainable Technology & Applied Science (CoE STAS-RG) menyatukan para peneliti, mitra industri, dan ilmuwan global untuk menciptakan solusi nyata bagi ekosistem industri di Indonesia dan Asia Tenggara.',
            p2: 'Bergerak pada bidang riset operasi, manufaktur cerdas, ekonomi sirkular, dan teknologi ramah lingkungan, kami mentransformasikan inovasi laboratorium menjadi penerapan skala industri.',
            quote: 'Mempelopori teknologi berkelanjutan dengan dampak nyata. Kami membangun solusi yang melampaui batas laboratorium.',
            directorName: 'Prof. Dr. Ir. Adiwijaya, S.Si., M.Si.',
            directorTitle: 'Penasihat Utama & Direktur Riset',
            pillars: {
                appliedRd: {
                    title: 'Riset Terapan',
                    desc: 'Menerjemahkan ide dan inovasi menjadi solusi teruji untuk kebutuhan industri.',
                },
                industryIntegration: {
                    title: 'Integrasi Industri',
                    desc: 'Menghubungkan riset laboratorium dengan penerapan langsung di pabrik dan dunia usaha.',
                },
                capacityBuilding: {
                    title: 'Pengembangan SDM',
                    desc: 'Mencetak tenaga ahli, insinyur muda, data scientist, dan praktisi industri masa depan.',
                },
                sustainableImpact: {
                    title: 'Dampak Berkelanjutan',
                    desc: 'Menghadirkan efisiensi energi, pengurangan emisi karbon, dan keberlanjutan lingkungan.',
                },
            },
        },
        domains: {
            pill: 'FOKUS RISET',
            title: 'Bidang Riset Unggulan',
            subtitle: 'Fokus bidang penelitian utama kami dalam pengembangan teknologi ramah lingkungan, manufaktur cerdas, dan digitalisasi industri.',
            actionLink: 'Lihat Semua Bidang Riset',
            exploreLink: 'Pelajari Bidang Ini',
            items: [
                { title: 'Teknologi Berkelanjutan & Sistem Hijau', summary: 'Efisiensi energi, analisis siklus hidup karbon, dan pengembangan material ramah lingkungan.' },
                { title: 'Manufaktur Cerdas & Industri 4.0', summary: 'Sistem otomasi, robotika cerdas, pabrik digital, dan integrasi sistem produksi.' },
                { title: 'Optimasi Rantai Pasok & Logistik', summary: 'Perencanaan logistik terpadu, rute distribusi optimal, dan manajemen pergudangan cerdas.' },
                { title: 'Sains Data Terapan & AI Industri', summary: 'Penerapan kecerdasan buatan, computer vision kendali mutu, dan analitik data industri.' },
                { title: 'Teknologi Lingkungan & Daur Ulang', summary: 'Pemanfaatan kembali limbah industri, pengolahan air bersih, dan efisiensi sumber daya.' },
                { title: 'Energi Terbarukan & Smart Grid', summary: 'Pengelolaan energi terbarukan, sistem penyimpanan baterai, dan jaringan listrik pintar.' },
                { title: 'Ergonomi Kerja & Keselamatan', summary: 'Desain kerja ramah manusia, kenyamanan operasional, dan pencegahan kecelakaan kerja.' },
                { title: 'Otomasi & Digitalisasi Pabrik', summary: 'Integrasi kontrol PLC, sensor IoT industri, pemantauan mesin, dan otomasi alur kerja.' },
            ],
        },
        projects: {
            pill: 'PROYEK RISET',
            title: 'Proyek Riset & Inovasi Terpilih',
            tabs: {
                all: 'Semua',
                smartMfg: 'Manufaktur Cerdas',
                sustEnergy: 'Energi Terbarukan',
                supplyChain: 'Rantai Pasok',
            },
            lead: 'Ketua Peneliti:',
            viewCaseStudy: 'Lihat Detail Proyek',
        },
        publications: {
            pill: 'PUBLIKASI ILMIAH',
            title: 'Publikasi & Jurnal Ilmiah',
            subtitle: 'Koleksi artikel jurnal ilmiah internasional, makalah riset terakreditasi, dan prosiding konferensi dari para peneliti STAS-RG.',
            browseAll: 'Lihat Semua Publikasi',
            authors: 'Penulis:',
            pdfLink: 'Unduh PDF',
            doiLink: 'Tautan DOI',
        },
        services: {
            pill: 'LAYANAN & KONSULTASI',
            title: 'Layanan Riset & Konsultasi Industri',
            subtitle: 'Kami mendampingi perusahaan, pelaku industri manufaktur, dan instansi pemerintah dalam menerapkan solusi teknologi terapan.',
            actionLink: 'Panduan Layanan',
            exploreService: 'Pelajari Layanan',
        },
        partners: {
            pill: 'MITRA KERJASAMA',
            title: 'Dipercaya oleh Mitra Industri & Lembaga Riset Terkemuka',
            viewAll: 'Lihat Seluruh Ekosistem Kemitraan & Riset',
        },
        news: {
            pill: 'BERITA & ARTIKEL',
            title: 'Berita & Artikel Riset Terkini',
            subtitle: 'Informasi terbaru seputar terobosan riset, kerjasama industri, dan kegiatan ilmiah CoE STAS-RG.',
            viewAll: 'Lihat Semua Berita',
            readMore: 'Baca Selengkapnya',
        },
        events: {
            pill: 'AGENDA & ACARA',
            title: 'Agenda Simposium, Workshop & Pelatihan',
            subtitle: 'Ikuti simposium ilmiah, masterclass eksekutif, dan workshop laboratorium bersama para pakar.',
            calendarLink: 'Kalender Kegiatan',
            registerBtn: 'Daftar Sekarang',
            brochureLink: 'Unduh Brosur',
        },
        cta: {
            pill: 'KOLABORASI RISET',
            titlePart1: 'Siap Berinovasi Bersama',
            titleHighlight: 'CoE STAS-RG?',
            subtitle: 'Kolaborasikan riset bersama peneliti kami, manfaatkan fasilitas laboratorium modern, dan kembangkan solusi teknologi untuk kemajuan industri Anda.',
            b1: 'Kerjasama proyek riset & inovasi (R&D)',
            b2: 'Program magang dan talenta industri',
            b3: 'Konsultasi teknis & pendampingan ahli',
            initiateBtn: 'Ajukan Proposal Kerjasama',
            scheduleBtn: 'Jadwalkan Konsultasi',
            officialContact: 'Kontak Resmi:',
        },
        footer: {
            desc: 'Pusat Unggulan Riset Teknologi Berkelanjutan & Sains Terapan (CoE STAS-RG). Mengembangkan teknologi ramah lingkungan, otomasi manufaktur, dan inovasi industri.',
            univ: 'Telkom University',
            faculty: 'Pusat Unggulan Iptek (CoE)',
            colFocus: 'Bidang Riset',
            colPubs: 'Publikasi',
            colServices: 'Layanan & Konsultasi',
            colConnect: 'Kontak & Lokasi',
            rights: 'Hak cipta dilindungi undang-undang.',
            privacy: 'Kebijakan Privasi',
            terms: 'Ketentuan Penggunaan',
            ethics: 'Etika Akademik',
            sitemap: 'Peta Situs',
        },
        auth: {
            title: 'Selamat Datang',
            subtitle: 'Masuk ke akun Anda untuk mengakses portal riset dan kolaborasi',
            emailLabel: 'Alamat Email / ID Pengguna',
            emailOrUsernameLabel: 'Alamat Email atau Username',
            emailOrUsernamePlaceholder: 'Masukkan alamat email atau username Anda',
            passwordLabel: 'Kata Sandi',
            passwordPlaceholder: 'Masukkan kata sandi Anda',
            rememberMe: 'Biarkan saya tetap masuk',
            keepSignedIn: 'Biarkan saya tetap masuk',
            forgotPass: 'Lupa kata sandi?',
            resetPassword: 'Reset kata sandi',
            signInBtn: 'Masuk Akun',
            ssoBtn: 'Lanjutkan dengan SSO Telkom University',
            googleBtn: 'Lanjutkan dengan Google',
            passkeyBtn: 'Lanjutkan dengan Passkey',
            ssoTelkomBtn: 'Lanjutkan dengan SSO Telkom University',
            orContinueWith: 'Atau lanjutkan dengan',
            noAccount: 'Belum memiliki akun?',
            requestAccess: 'Daftar Akun Baru',
            tabLogin: 'Masuk',
            tabRegister: 'Daftar Akun',
            fullNameLabel: 'Nama Lengkap Beserta Gelar',
            usernameLabel: 'Username / ID Pengguna',
            usernamePlaceholder: 'Masukkan username akun Anda',
            institutionLabel: 'Institusi / Departemen / Organisasi',
            roleLabel: 'Kategori Peneliti',
            confirmPassLabel: 'Konfirmasi Kata Sandi',
            signUpBtn: 'Daftar Sekarang',
            haveAccount: 'Sudah memiliki akun?',
            backToHome: 'Kembali ke Beranda',
            showcasePill: 'PORTAL RISET & KOLABORASI RESMI',
            showcaseTitle: 'Pusat Akses Terpadu Peneliti & Mitra Industri',
            showcaseDesc: 'Akses fasilitas komputasi, workspace proyek riset, data pengujian laboratorium, dan repositori publikasi karya ilmiah.',
            badgeSSL: 'Keamanan SSL 256-Bit',
            badgeSSO: 'Terintegrasi SSO Telkom Univ',
            badgeAudit: 'Standar ISO/IEC 27001',
            successLogin: 'Autentikasi berhasil! Mengalihkan ke portal riset...',
            successRegister: 'Pendaftaran berhasil! Tautan verifikasi telah dikirim ke email institusi Anda.',
            testimonialAuthor: 'Prof. Dr. Ir. Adiwijaya',
            testimonialHandle: '@telkomuniversity',
            testimonialQuote: 'Platform yang sangat memudahkan kolaborasi riset antar universitas dan industri.',
            forgotPasswordTitle: 'Lupa Kata Sandi?',
            forgotPasswordSubtitle: 'Masukkan email atau username Anda untuk menerima instruksi reset kata sandi.',
            forgotPasswordSendBtn: 'Kirim Tautan Reset',
            forgotPasswordSuccess: 'Instruksi reset kata sandi telah dikirim ke email Anda. Silakan periksa kotak masuk atau spam.',
            backToSignIn: 'Kembali ke Halaman Masuk',
        },
        search: {
            placeholder: 'Cari bidang riset, publikasi, proyek, layanan...',
            domainsLabel: 'Bidang Riset',
            projectsLabel: 'Proyek Riset',
            pubsLabel: 'Publikasi Ilmiah',
            pressEsc: 'Tekan ESC untuk keluar',
            knowledgeBase: 'Pusat Pengetahuan CoE STAS-RG',
        },
    },
};
