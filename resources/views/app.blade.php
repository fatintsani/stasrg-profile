<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        
        <!-- Primary SEO Meta Tags -->
        <title inertia>{{ config('app.name', 'CoE STAS-RG - Center of Excellence for Sustainable Technology and Applied Science') }}</title>
        <meta name="title" content="CoE STAS-RG - Center of Excellence for Sustainable Technology and Applied Science | Telkom University">
        <meta name="description" content="Center of Excellence for Sustainable Technology & Applied Science Research Group (CoE STAS-RG) at Telkom University. Driving scientific breakthroughs in smart manufacturing, renewable energy, supply chain optimization, and industrial AI.">
        <meta name="keywords" content="CoE STAS-RG, STAS RG, Telkom University, Sustainable Technology, Applied Science, Smart Manufacturing, Industry 4.0, Supply Chain Optimization, Industrial AI, Green Systems, Circular Economy, Decarbonization, Bandung, Indonesia">
        <meta name="author" content="CoE STAS-RG Telkom University">
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
        <meta name="theme-color" content="#1AC13B">
        <meta name="application-name" content="CoE STAS-RG">

        <!-- Favicon and App Icons -->
        <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('stas.png') }}">
        <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('stas.png') }}">
        <link rel="shortcut icon" href="{{ asset('stas.png') }}">
        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('stas.png') }}">

        <!-- Canonical URL -->
        <link rel="canonical" href="{{ url()->current() }}">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:site_name" content="CoE STAS-RG Telkom University">
        <meta property="og:title" content="CoE STAS-RG - Center of Excellence for Sustainable Technology and Applied Science">
        <meta property="og:description" content="Advancing Sustainable Technology Through Research & Innovation. Explore our 8 multidisciplinary scientific domains, featured industrial projects, and peer-reviewed repository.">
        <meta property="og:image" content="{{ asset('stas.png') }}">
        <meta property="og:image:width" content="512">
        <meta property="og:image:height" content="512">
        <meta property="og:image:alt" content="CoE STAS-RG Official Logo">
        <meta property="og:locale" content="en_US">

        <!-- Twitter Meta Tags -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@stas_rg">
        <meta name="twitter:creator" content="@stas_rg">
        <meta name="twitter:title" content="CoE STAS-RG - Sustainable Technology & Applied Science">
        <meta name="twitter:description" content="Pioneering industrial research in smart manufacturing, supply chain optimization, and sustainable systems at Telkom University.">
        <meta name="twitter:image" content="{{ asset('stas.png') }}">

        <!-- JSON-LD Structured Data (Schema.org) -->
        <script type="application/ld+json">
        {!! json_encode([
            '@context' => 'https://schema.org',
            '@type' => 'ResearchOrganization',
            'name' => 'Center of Excellence for Sustainable Technology and Applied Science (CoE STAS-RG)',
            'alternateName' => 'CoE STAS-RG',
            'url' => url('/'),
            'logo' => asset('stas.png'),
            'description' => 'Center of Excellence for Sustainable Technology and Applied Science - Research Group at Telkom University.',
            'parentOrganization' => [
                '@type' => 'CollegeOrUniversity',
                'name' => 'Telkom University',
                'url' => 'https://telkomuniversity.ac.id',
            ],
            'department' => [
                '@type' => 'EducationalOrganization',
                'name' => 'School of Industrial and Systems Engineering (FRI)',
                'url' => 'https://fri.telkomuniversity.ac.id',
            ],
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => 'Jl. Telekomunikasi No. 1, Terusan Buahbatu',
                'addressLocality' => 'Bandung',
                'addressRegion' => 'Jawa Barat',
                'postalCode' => '40257',
                'addressCountry' => 'ID',
            ],
            'contactPoint' => [
                '@type' => 'ContactPoint',
                'email' => 'stasrg@telkomuniversity.ac.id',
                'telephone' => '+62-22-7564108',
                'contactType' => 'academic affairs',
            ],
            'knowsAbout' => [
                'Sustainable Technology',
                'Smart Manufacturing',
                'Industry 4.0',
                'Supply Chain Optimization',
                'Applied Data Science',
                'Industrial AI',
                'Circular Economy',
                'Renewable Energy Microgrids',
            ],
        ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) !!}
        </script>

        <!-- Plus Jakarta Sans Google Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">

        <!-- Scripts & Styles -->
        @viteReactRefresh
        @vite(['resources/js/app.tsx', 'resources/css/app.css'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased text-slate-800 bg-[#FBFDFB] selection:bg-[#1AC13B]/20 selection:text-[#0F5A1F]">
        @inertia
    </body>
</html>
