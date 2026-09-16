<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    use HasFactory;

    protected $fillable = [
        'badge',
        'badge_type',
        'year',
        'venue',
        'doi',
        'title',
        'authors',
        'pdf_url',
        'doi_url',
        'order',
    ];

    protected $casts = [
        'year' => 'integer',
    ];
}
