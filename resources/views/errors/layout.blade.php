<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('code', 'Error') - @yield('title', 'Terjadi Kesalahan') | CoE STAS-RG Telkom University</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f8fafc;
            color: #0f172a;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            -webkit-font-smoothing: antialiased;
        }
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #020617;
                color: #f8fafc;
            }
        }
        .header {
            padding: 16px 24px;
            background: #ffffff;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        @media (prefers-color-scheme: dark) {
            .header {
                background: #0f172a;
                border-color: #1e293b;
            }
        }
        .logo-box {
            display: flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
            color: inherit;
        }
        .logo-img {
            height: 32px;
            width: auto;
        }
        .main {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
        }
        .card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 40px 32px;
            max-width: 580px;
            width: 100%;
            text-align: center;
        }
        @media (prefers-color-scheme: dark) {
            .card {
                background: #0f172a;
                border-color: #1e293b;
            }
        }
        .badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #EDFBF1;
            color: #107E27;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 4px 12px;
            border-radius: 9999px;
            margin-bottom: 16px;
        }
        @media (prefers-color-scheme: dark) {
            .badge {
                background: #10381C;
                color: #3FD27B;
            }
        }
        .dot {
            width: 6px;
            height: 6px;
            background: #1AC13B;
            border-radius: 50%;
        }
        .image-container {
            width: 220px;
            height: 220px;
            margin: 0 auto 20px auto;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .image-container img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
        .title {
            font-size: 22px;
            font-weight: 800;
            letter-spacing: -0.3px;
            margin-bottom: 8px;
        }
        .desc {
            font-size: 13px;
            line-height: 1.6;
            color: #64748b;
            margin-bottom: 24px;
        }
        @media (prefers-color-scheme: dark) {
            .desc {
                color: #94a3b8;
            }
        }
        .actions {
            display: flex;
            flex-direction: column;
            gap: 10px;
            justify-content: center;
        }
        @media (min-width: 480px) {
            .actions {
                flex-direction: row;
            }
        }
        .btn-primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: #1AC13B;
            color: #ffffff;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 12px;
            border: none;
            cursor: pointer;
            transition: background 0.15s;
        }
        .btn-primary:hover {
            background: #16a331;
        }
        .btn-secondary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: transparent;
            color: #475569;
            font-size: 13px;
            font-weight: 600;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 12px;
            border: 1px solid #cbd5e1;
            cursor: pointer;
        }
        @media (prefers-color-scheme: dark) {
            .btn-secondary {
                color: #cbd5e1;
                border-color: #334155;
            }
        }
        .footer {
            padding: 16px 24px;
            background: #ffffff;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            font-size: 11px;
            color: #94a3b8;
        }
        @media (prefers-color-scheme: dark) {
            .footer {
                background: #0f172a;
                border-color: #1e293b;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <a href="/" class="logo-box">
            <img src="/assets/images/stas.png" alt="CoE STAS-RG" class="logo-img" onerror="this.style.display='none'">
            <span style="font-weight: 800; font-size: 14px; color: #107E27;">CoE STAS-RG</span>
        </a>
        <div style="font-size: 11px; font-weight: 700; color: #64748b;">
            Telkom University
        </div>
    </header>

    <main class="main">
        <div class="card">
            <div class="badge">
                <span class="dot"></span>
                <span>HTTP @yield('code') • @yield('type', 'Error')</span>
            </div>

            <div class="image-container">
                <img src="@yield('image', '/assets/icon/errors/tidakvalid.png')" alt="@yield('title')">
            </div>

            <h1 class="title">@yield('title')</h1>
            <p class="desc">@yield('message')</p>

            <div class="actions">
                @yield('actions')
                <a href="/" class="btn-primary">Kembali ke Beranda</a>
                <button onclick="window.history.back()" class="btn-secondary">Halaman Sebelumnya</button>
            </div>
        </div>
    </main>

    <footer class="footer">
        © {{ date('Y') }} Center of Excellence for Sustainable Technology & Applied Sciences (CoE STAS-RG) • Telkom University
    </footer>
</body>
</html>
