<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResearchProject extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'category_tag',
        'title',
        'slug',
        'image_url',
        'lead_researcher',
        'summary',
        'featured',
        'order',
    ];

    protected $casts = [
        'featured' => 'boolean',
    ];
}
