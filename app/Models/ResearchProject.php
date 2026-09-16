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
        'title_id',
        'slug',
        'image_url',
        'lead_researcher',
        'summary',
        'summary_id',
        'tech_stack',
        'case_study_url',
        'funding_source',
        'start_year',
        'end_year',
        'featured',
        'is_active',
        'order',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'is_active' => 'boolean',
        'tech_stack' => 'array',
        'order' => 'integer',
        'start_year' => 'integer',
        'end_year' => 'integer',
    ];
}
