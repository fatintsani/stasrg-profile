export type Language = 'EN' | 'ID';

export interface TranslationDictionary {
    nav: {
        home: string;
        about: string;
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
            research: 'Research',
            projects: 'Projects',
            publications: 'Publications',
            more: 'More',
            services: 'Enterprise Services',
            partners: 'Partners & Network',
            news: 'News & Insights',
            events: 'Upcoming Events',
            contact: 'Contact',
            login: 'Login',
            searchTooltip: 'Search research assets',
            themeTooltip: 'Toggle Dark / Light mode',
            langTooltip: 'Switch language to Indonesian',
        },
        hero: {
            pill: 'CENTER OF EXCELLENCE FOR SUSTAINABLE TECHNOLOGY & APPLIED SCIENCE RESEARCH',
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
            pill: 'WHO WE ARE',
            title: 'A Premier Hub for Groundbreaking Science and Applied Industrial Engineering',
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
            pill: 'RESEARCH FOCUS AREAS',
            title: 'Multidisciplinary Scientific Domains',
            subtitle: 'Eight specialized research divisions driving breakthroughs across sustainable engineering, smart manufacturing, and industrial computing.',
            actionLink: 'View Domain Framework',
            exploreLink: 'Explore Domain',
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
            pill: 'PROJECT PORTFOLIO',
            title: 'Featured Research Projects',
            tabs: {
                all: 'All',
                smartMfg: 'Smart Manufacturing',
                sustEnergy: 'Sustainable Energy',
                supplyChain: 'Supply Chain',
            },
            lead: 'Lead Researcher:',
            viewCaseStudy: 'View Project Case Study',
        },
        publications: {
            pill: 'SCHOLARLY PUBLICATIONS',
            title: 'Peer-Reviewed Academic Repository',
            subtitle: 'Discover high-impact research papers, journal articles, and international conference proceedings indexed in Scopus and Web of Science.',
            browseAll: 'Browse Complete Repository (150+)',
            authors: 'Authors:',
            pdfLink: 'PDF Link',
            doiLink: 'DOI Link',
        },
        services: {
            pill: 'SERVICES & INDUSTRIAL CONSULTANCY',
            title: 'Translating Science into Enterprise Value',
            subtitle: 'We partner with multinational enterprises, growing manufacturers, and state agencies to deploy production-ready engineering solutions.',
            actionLink: 'Consultancy Framework',
            exploreService: 'Explore Service',
        },
        partners: {
            pill: 'COLLABORATIVE NETWORK',
            title: 'Trusted by Industry & Government',
        },
        news: {
            pill: 'NEWS & INSIGHTS',
            title: 'News & Research Insights',
            subtitle: 'Latest research breakthroughs, industry grant announcements, and policy thought leadership.',
            viewAll: 'View All Insights',
            readMore: 'Read More',
        },
        events: {
            pill: 'EVENTS & WEBINARS',
            title: 'Upcoming Events & Symposia',
            subtitle: 'Engage directly with leading scientists, engineering practitioners, and international domain authorities.',
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
            desc: 'Center of Excellence for Sustainable Technology & Applied Science Research Group (CoE STAS-RG). Pioneering industrial decarbonization, smart manufacturing, and resilient operations research.',
            univ: 'Telkom University',
            faculty: 'Center of Excellence (CoE)',
            colFocus: 'Research Focus',
            colPubs: 'Publications',
            colServices: 'Enterprise Services',
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
            usernamePlaceholder: 'e.g. alex_researcher',
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
            domainsLabel: 'Research Domains',
            projectsLabel: 'Featured Projects',
            pubsLabel: 'Academic Publications',
            pressEsc: 'Press ESC to exit',
            knowledgeBase: 'CoE STAS-RG Knowledge Base',
        },
    },
    ID: {
        nav: {
            home: 'Beranda',
            about: 'Tentang Kami',
            research: 'Riset',
            projects: 'Proyek',
            publications: 'Publikasi',
            more: 'Lainnya',
            services: 'Layanan Industri',
            partners: 'Mitra & Kolaborasi',
            news: 'Berita & Wawasan',
            events: 'Agenda Acara',
            contact: 'Kontak',
            login: 'Masuk',
            searchTooltip: 'Cari aset riset & publikasi',
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
            title: 'Pusat Unggulan Riset Sains Mutakhir & Rekayasa Industri Terapan',
            p1: 'Center of Excellence for Sustainable Technology & Applied Science (CoE STAS-RG) menyatukan para peneliti, mitra industri, dan ilmuwan global untuk menciptakan solusi sosio-teknis mutakhir bagi ekosistem industri Asia Tenggara.',
            p2: 'Bergerak pada titik temu riset operasi, manufaktur cerdas, ekonomi sirkular, dan dekarbonisasi industri, kami mentransformasikan model teoretis menjadi implementasi skala industri yang tangguh.',
            quote: 'Mempelopori teknologi berkelanjutan dengan dampak nyata. Kami membangun solusi yang melampaui batas laboratorium.',
            directorName: 'Prof. Dr. Ir. Adiwijaya, S.Si., M.Si.',
            directorTitle: 'Penasihat Utama & Direktur Riset',
            pillars: {
                appliedRd: {
                    title: 'R&D Terapan',
                    desc: 'Menerjemahkan terobosan teoretis menjadi solusi teruji skala industri di Asia Tenggara.',
                },
                industryIntegration: {
                    title: 'Integrasi Industri',
                    desc: 'Menjembatani riset laboratorium dengan sistem eksekusi manufaktur langsung.',
                },
                capacityBuilding: {
                    title: 'Pengembangan SDM',
                    desc: 'Mencetak generasi insinyur, data scientist, dan pemimpin industri masa depan.',
                },
                sustainableImpact: {
                    title: 'Dampak Berkelanjutan',
                    desc: 'Menargetkan dekarbonisasi net-zero terukur, efisiensi energi, dan sirkularitas ESG.',
                },
            },
        },
        domains: {
            pill: 'FOKUS BIDANG RISET',
            title: 'Domain Ilmiah Multidisiplin',
            subtitle: 'Delapan divisi riset terspesialisasi yang mendorong inovasi rekayasa berkelanjutan, manufaktur cerdas, dan komputasi industri.',
            actionLink: 'Kerangka Kerja Domain',
            exploreLink: 'Pelajari Domain',
            items: [
                { title: 'Teknologi Berkelanjutan & Sistem Hijau', summary: 'Kerangka eko-efisiensi, analisis siklus hidup karbon, dan material sirkular.' },
                { title: 'Manufaktur Cerdas & Industri 4.0', summary: 'Sistem siber-fisik, robotika otonom, lantai pabrik digital, dan arsitektur MES cerdas.' },
                { title: 'Optimasi Rantai Pasok & Logistik', summary: 'Jaringan logistik prediktif, rute maritim, digital twin inventaris, dan pasokan tangguh.' },
                { title: 'Sains Data Terapan & AI Industri', summary: 'Jaringan saraf berbasis fisika, computer vision penjaminan mutu, dan telemetri edge AI.' },
                { title: 'Teknologi Lingkungan & Ekonomi Sirkular', summary: 'Upcycling limbah industri, pengolahan air limbah bio-reaktor, dan pemanfaatan sumber daya sekunder.' },
                { title: 'Energi Terbarukan & Sistem Smart Grid', summary: 'Penjadwalan microgrid, analitik baterai penyimpan energi, dan pengelolaan energi bersih terdesentralisasi.' },
                { title: 'Ergonomi Terapan & Faktor Manusia', summary: 'Antarmuka manusia-mesin, asesmen beban kerja kognitif, ergonomi pekerja, dan keselamatan kerja.' },
                { title: 'Otomasi & Digitalisasi Industri', summary: 'Integrasi PLC, telemetri SCADA, jaringan sensor IoT industri, dan otomatisasi proses.' },
            ],
        },
        projects: {
            pill: 'PORTOFOLIO PROYEK',
            title: 'Proyek Riset Unggulan',
            tabs: {
                all: 'Semua',
                smartMfg: 'Manufaktur Cerdas',
                sustEnergy: 'Energi Berkelanjutan',
                supplyChain: 'Rantai Pasok',
            },
            lead: 'Peneliti Utama:',
            viewCaseStudy: 'Lihat Studi Kasus',
        },
        publications: {
            pill: 'PUBLIKASI ILMIAH',
            title: 'Repositori Akademik Peer-Reviewed',
            subtitle: 'Temukan makalah riset bereputasi tinggi, artikel jurnal internasional Q1, dan prosiding konferensi yang terindeks Scopus & Web of Science.',
            browseAll: 'Buka Seluruh Repositori (150+)',
            authors: 'Penulis:',
            pdfLink: 'Tautan PDF',
            doiLink: 'Tautan DOI',
        },
        services: {
            pill: 'LAYANAN & KONSULTANSI INDUSTRI',
            title: 'Menerjemahkan Sains Menjadi Nilai Industri',
            subtitle: 'Kami bermitra dengan perusahaan multinasional, industri manufaktur, dan lembaga pemerintah untuk mengimplementasikan solusi rekayasa siap produksi.',
            actionLink: 'Kerangka Konsultansi',
            exploreService: 'Pelajari Layanan',
        },
        partners: {
            pill: 'JARINGAN KOLABORASI',
            title: 'Dipercaya oleh Industri & Lembaga Pemerintah',
        },
        news: {
            pill: 'BERITA & WAWASAN',
            title: 'Berita Riset & Wawasan Terkini',
            subtitle: 'Terobosan riset terbaru, pengumuman hibah kemitraan industri, dan laporan kebijakan strategis.',
            viewAll: 'Lihat Semua Artikel',
            readMore: 'Baca Selengkapnya',
        },
        events: {
            pill: 'AGENDA & WEBINAR',
            title: 'Agenda Simposium & Masterclass',
            subtitle: 'Berinteraksi langsung dengan para ilmuwan terkemuka, praktisi rekayasa, dan pakar industri global.',
            calendarLink: 'Kalender Akademik',
            registerBtn: 'Daftar Sekarang',
            brochureLink: 'Unduh Brosur',
        },
        cta: {
            pill: 'BERKOLABORASI BERSAMA KAMI',
            titlePart1: 'Siap Berinovasi Bersama?',
            titleHighlight: 'CoE STAS-RG',
            subtitle: 'Kolaborasikan riset bersama para peneliti terbaik, manfaatkan fasilitas laboratorium terakreditasi, dan terapkan solusi berbasis sains untuk kemajuan industri Anda.',
            b1: 'Pengembangan proyek R&D bersama',
            b2: 'Jalur talenta & program magang industri',
            b3: 'Konsultansi & advisori eksekutif',
            initiateBtn: 'Ajukan Proposal Kolaborasi',
            scheduleBtn: 'Jadwalkan Diskusi Eksplorasi',
            officialContact: 'Kontak Resmi:',
        },
        footer: {
            desc: 'Pusat Unggulan Riset Teknologi Berkelanjutan & Sains Terapan (CoE STAS-RG). Memelopori dekarbonisasi industri, manufaktur cerdas, dan riset operasi tangguh.',
            univ: 'Telkom University',
            faculty: 'Pusat Unggulan Iptek (CoE)',
            colFocus: 'Fokus Riset',
            colPubs: 'Publikasi Ilmiah',
            colServices: 'Layanan Industri',
            colConnect: 'Tautan & Kontak',
            rights: 'Hak cipta dilindungi undang-undang.',
            privacy: 'Kebijakan Privasi',
            terms: 'Ketentuan Asosiasi',
            ethics: 'Etika Akademik',
            sitemap: 'Peta Situs',
        },
        auth: {
            title: 'Selamat Datang',
            subtitle: 'Akses akun Anda dan lanjutkan kolaborasi riset bersama kami',
            emailLabel: 'Alamat Email / ID Single Sign-On',
            emailOrUsernameLabel: 'Alamat Email atau Username',
            emailOrUsernamePlaceholder: 'Masukkan alamat email atau username Anda',
            passwordLabel: 'Kata Sandi',
            passwordPlaceholder: 'Masukkan kata sandi Anda',
            rememberMe: 'Biarkan saya tetap masuk',
            keepSignedIn: 'Biarkan saya tetap masuk',
            forgotPass: 'Reset kata sandi',
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
            usernamePlaceholder: 'contoh: alex_researcher',
            institutionLabel: 'Institusi / Departemen / Organisasi',
            roleLabel: 'Kategori Peneliti',
            confirmPassLabel: 'Konfirmasi Kata Sandi',
            signUpBtn: 'Daftar Sekarang',
            haveAccount: 'Sudah memiliki akun?',
            backToHome: 'Kembali ke Beranda',
            showcasePill: 'GERBANG AKSES RISET & DATA TERSERTIFIKASI',
            showcaseTitle: 'Portal Terpadu Peneliti Akademik & Kolaborator Industri',
            showcaseDesc: 'Akses aman menuju klaster komputasi performa tinggi, ruang kerja kolaborasi proyek, repositori data industri, dan alur publikasi ilmiah.',
            badgeSSL: 'Enkripsi SSL 256-Bit',
            badgeSSO: 'Terintegrasi SSO Telkom Univ',
            badgeAudit: 'Standar ISO/IEC 27001',
            successLogin: 'Autentikasi berhasil! Mengalihkan ke portal riset...',
            successRegister: 'Pendaftaran berhasil dikirim! Tautan verifikasi telah dikirim ke email institusi Anda.',
            testimonialAuthor: 'Prof. Dr. Ir. Adiwijaya',
            testimonialHandle: '@telkomuniversity',
            testimonialQuote: 'Platform riset yang luar biasa! Pengalaman pengguna sangat mulus dan integrasi data laboratorium adalah yang kami butuhkan.',
            forgotPasswordTitle: 'Lupa Kata Sandi?',
            forgotPasswordSubtitle: 'Masukkan email institusi atau username yang terdaftar dan kami akan mengirimkan tautan verifikasi aman untuk mengatur ulang kata sandi Anda.',
            forgotPasswordSendBtn: 'Kirim Tautan Reset',
            forgotPasswordSuccess: 'Petunjuk reset kata sandi telah dikirim ke email institusi Anda. Silakan periksa kotak masuk dan folder spam Anda.',
            backToSignIn: 'Kembali ke Halaman Masuk',
        },
        search: {
            placeholder: 'Cari topik riset, makalah ilmiah, proyek, atau layanan...',
            domainsLabel: 'Domain Riset',
            projectsLabel: 'Proyek Unggulan',
            pubsLabel: 'Publikasi Ilmiah',
            pressEsc: 'Tekan ESC untuk keluar',
            knowledgeBase: 'Pangkalan Data CoE STAS-RG',
        },
    },
};
