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
        'academicYear',
        'status'
    ];
    
    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class, 'academicYear');
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class, 'event', 'id');
    }
}
