<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ErrorController extends Controller
{
    /**
     * Display the error page for a specific HTTP status.
     */
    public function show(Request $request, int $status = 404): Response
    {
        $allowedStatuses = [400, 401, 403, 404, 419, 422, 429, 500, 503];

        if (! in_array($status, $allowedStatuses)) {
            $status = 404;
        }

        return Inertia::render('Error', [
            'status' => $status,
            'siteConfig' => [
                'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            ],
        ]);
    }
}
