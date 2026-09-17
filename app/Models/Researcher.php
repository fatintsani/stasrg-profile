<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Researcher extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'title_degree',
        'role',
        'role_id',
        'specialization',
        'specialization_id',
        'department',
        'institution',
        'email',
        'phone',
        'bio',
        'bio_id',
        'avatar_url',
        'scholar_url',
        'scopus_id',
        'orcid',
        'linkedin_url',
        'focus_areas',
        'publications_count',
        'projects_count',
        'is_featured',
        'is_active',
        'order',
    ];

    protected $casts = [
        'focus_areas' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'publications_count' => 'integer',
        'projects_count' => 'integer',
        'order' => 'integer',
    ];
}
