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
        'slug',
        'summary',
        'read_time',
        'order',
    ];
}
