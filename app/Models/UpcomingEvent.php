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
        'title',
        'description',
        'location',
        'primary_action_text',
        'secondary_action_text',
        'order',
    ];
}
