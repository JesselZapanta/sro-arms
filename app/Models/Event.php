<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'events';

    protected $fillable = [
        'name',
        'event_date',
        'type',
        'am_start',
        'am_end',
        'pm_start',
        'pm_end',
        'sanction',
        'status'
    ];
    protected $casts = [
        'event_date' => 'date',
        'am_start' => 'datetime',
        'am_end' => 'datetime',
        'pm_start' => 'datetime',
        'pm_end' => 'datetime',
    ];
    
}
