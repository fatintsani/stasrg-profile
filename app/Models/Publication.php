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
        'quartile',
        'indexing',
        'year',
        'venue',
        'doi',
        'title',
        'title_id',
        'abstract',
        'abstract_id',
        'authors',
        'pdf_url',
        'doi_url',
        'domain_tag',
        'citation_count',
        'is_featured',
        'is_active',
        'slug',
        'order',
    ];

    protected $casts = [
        'year' => 'integer',
        'citation_count' => 'integer',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];
}
