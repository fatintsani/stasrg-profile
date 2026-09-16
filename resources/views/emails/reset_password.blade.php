<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Recovery - CoE STAS-RG Telkom University</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #0f172a;
            -webkit-font-smoothing: antialiased;
        }
        .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #f8fafc;
            padding: 40px 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            overflow: hidden;
        }
        .header {
            background-color: #0B132B;
            padding: 32px 36px;
            text-align: left;
            border-bottom: 3px solid #1AC13B;
        }
        .brand-badge {
            display: inline-block;
            background-color: rgba(26, 193, 59, 0.15);
            border: 1px solid rgba(26, 193, 59, 0.35);
            color: #3FD27B;
            font-size: 11px;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 6px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 12px;
        }
        .header-title {
            color: #ffffff;
            font-size: 20px;
            font-weight: 800;
            margin: 0 0 6px 0;
            letter-spacing: -0.3px;
        }
        .header-subtitle {
            color: #94a3b8;
            font-size: 12px;
            margin: 0;
        }
        .content {
            padding: 36px;
        }
        .greeting {
            font-size: 15px;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 16px 0;
        }
        .paragraph {
            font-size: 13px;
            line-height: 1.65;
            color: #475569;
            margin: 0 0 18px 0;
        }
        .meta-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 18px 20px;
            margin: 22px 0;
        }
        .meta-row {
            display: table;
            width: 100%;
            margin-bottom: 8px;
        }
        .meta-row:last-child {
            margin-bottom: 0;
        }
        .meta-label {
            display: table-cell;
            width: 38%;
            font-size: 11px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }
        .meta-val {
            display: table-cell;
            font-size: 12px;
            font-weight: 600;
            color: #0f172a;
        }
        .button-wrapper {
            text-align: center;
            margin: 30px 0;
        }
        .btn-primary {
            display: inline-block;
            background-color: #1AC13B;
            color: #ffffff !important;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
            padding: 14px 32px;
            border-radius: 10px;
            letter-spacing: 0.2px;
        }
        .link-fallback {
            background-color: #f1f5f9;
            border: 1px dashed #cbd5e1;
            border-radius: 8px;
            padding: 12px 14px;
            margin-top: 24px;
            word-break: break-all;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 11px;
            color: #0f172a;
            line-height: 1.4;
        }
        .notice-box {
            margin-top: 28px;
            padding: 14px 16px;
            background-color: #EDFBF1;
            border-left: 3px solid #1AC13B;
            border-radius: 4px;
        }
        .notice-title {
            font-size: 12px;
            font-weight: 700;
            color: #107E27;
            margin: 0 0 4px 0;
        }
        .notice-text {
            font-size: 11px;
            line-height: 1.5;
            color: #1b4324;
            margin: 0;
        }
        .footer {
            background-color: #f8fafc;
            border-top: 1px solid #e2e8f0;
            padding: 24px 36px;
            text-align: center;
            font-size: 11px;
            color: #94a3b8;
            line-height: 1.6;
        }
        .footer-brand {
            font-weight: 700;
            color: #64748b;
        }
    </style>
</head>
<body>
    <table class="wrapper" role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center">
                <table class="container" role="presentation" cellpadding="0" cellspacing="0" width="100%">
                    <!-- Header -->
                    <tr>
                        <td class="header">
                            <div class="brand-badge">Center of Excellence • STAS-RG</div>
                            <h1 class="header-title">Password Recovery Authorization</h1>
                            <p class="header-subtitle">Telkom University Researcher & Management Access Portal</p>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td class="content">
                            <div class="greeting">Hello, {{ $userName }}</div>
                            <p class="paragraph">
                                We received an official security request to reset the administrative password for your account associated with <strong>{{ $userEmail }}</strong> at the Center of Excellence for Sustainable Technology and Applied Sciences (CoE STAS-RG).
                            </p>

                            <!-- Request Telemetry Box -->
                            <div class="meta-box">
                                <div class="meta-row">
                                    <div class="meta-label">Target Account:</div>
                                    <div class="meta-val">{{ $userEmail }}</div>
                                </div>
                                <div class="meta-row">
                                    <div class="meta-label">Request Timestamp:</div>
                                    <div class="meta-val">{{ $requestedAt }}</div>
                                </div>
                                <div class="meta-row">
                                    <div class="meta-label">Origin IP Address:</div>
                                    <div class="meta-val">{{ $ipAddress }}</div>
                                </div>
                                <div class="meta-row">
                                    <div class="meta-label">Token Validity:</div>
                                    <div class="meta-val">{{ $expiresInMinutes }} Minutes</div>
                                </div>
                            </div>

                            <p class="paragraph">
                                To proceed with updating your security credentials, please click the verified authorization button below:
                            </p>

                            <!-- Main CTA Button -->
                            <div class="button-wrapper">
                                <a href="{{ $resetUrl }}" class="btn-primary" target="_blank">
                                    Reset Account Password
                                </a>
                            </div>

                            <p class="paragraph" style="font-size: 12px; color: #64748b;">
                                If you are unable to click the button above, copy and paste the following secured link into your web browser:
                            </p>
                            <div class="link-fallback">
                                {{ $resetUrl }}
                            </div>

                            <!-- Security Advisory Notice -->
                            <div class="notice-box">
                                <div class="notice-title">Security Advisory / Panduan Keamanan</div>
                                <p class="notice-text">
                                    If you did not request a password reset, no further action is required. Your account credentials remain secure. Please report any unauthorized access attempts to the CoE STAS-RG systems administrator immediately.
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td class="footer">
                            <div class="footer-brand">Center of Excellence for Sustainable Technology & Applied Sciences (CoE STAS-RG)</div>
                            <div>Telkom University • Jl. Telekomunikasi No. 1, Terusan Buahbatu, Bandung 40257, Indonesia</div>
                            <div style="margin-top: 8px;">© {{ date('Y') }} Telkom University. All rights reserved.</div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
