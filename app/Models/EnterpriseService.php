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
        'summary',
        'icon',
        'action_label',
        'order',
    ];
}
