<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResearchDomain extends Model
{
    use HasFactory;

    protected $fillable = [
        'domain_number',
        'title',
        'title_id',
        'slug',
        'icon',
        'summary',
        'summary_id',
        'focus_areas',
        'lead_researcher',
        'link',
        'order',
        'is_active',
    ];

    protected $casts = [
        'focus_areas' => 'array',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Get localized title based on application locale.
     */
    public function getLocalizedTitle(string $locale = 'en'): string
    {
        if ($locale === 'id' && !empty($this->title_id)) {
            return $this->title_id;
        }

        return $this->title ?? '';
    }

    /**
     * Get localized summary based on application locale.
     */
    public function getLocalizedSummary(string $locale = 'en'): string
    {
        if ($locale === 'id' && !empty($this->summary_id)) {
            return $this->summary_id;
        }

        return $this->summary ?? '';
    }
}
