<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResearchMetric extends Model
{
    use HasFactory;

    protected $fillable = [
        'value',
        'label',
        'label_id',
        'description',
        'description_id',
        'icon',
        'source_type',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];
}
