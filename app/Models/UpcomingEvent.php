<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UpcomingEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'tag',
        'date_display',
        'time_display',
        'title',
        'title_id',
        'description',
        'description_id',
        'speaker_name',
        'speaker_title',
        'location',
        'registration_link',
        'brochure_url',
        'image_url',
        'quota_text',
        'primary_action_text',
        'secondary_action_text',
        'is_featured',
        'is_active',
        'order',
        'event_date',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'order' => 'integer',
        'event_date' => 'date',
    ];
}
