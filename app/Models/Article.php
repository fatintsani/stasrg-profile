<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'tag',
        'date',
        'title',
        'title_id',
        'slug',
        'summary',
        'summary_id',
        'content',
        'content_id',
        'image_url',
        'author',
        'read_time',
        'external_url',
        'is_featured',
        'is_active',
        'order',
        'published_at',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'order' => 'integer',
        'published_at' => 'datetime',
    ];
}
