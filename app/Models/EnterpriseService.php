<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnterpriseService extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_number',
        'title',
        'title_id',
        'summary',
        'summary_id',
        'icon',
        'action_label',
        'action_label_id',
        'features',
        'target_industry',
        'lead_advisor',
        'link',
        'is_featured',
        'is_active',
        'order',
    ];

    protected $casts = [
        'features' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];
}
