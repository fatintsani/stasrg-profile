<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'partnership_type',
        'description',
        'description_id',
        'logo_text',
        'logo_url',
        'website_url',
        'established_year',
        'is_featured',
        'is_active',
        'order',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'established_year' => 'integer',
        'order' => 'integer',
    ];
}
