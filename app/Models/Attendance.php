<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;
    
    protected $table = 'attendances';

    protected $fillable = [
        'user',
        'event',

        'am_start_photo_at',
        'am_start_photo',

        'am_end_photo_at',
        'am_end_photo',

        'pm_start_photo_at',
        'pm_start_photo',

        'pm_end_photo_at',
        'pm_end_photo'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user');
    }   
    public function event()
    {
        return $this->belongsTo(Event::class, 'event');
    }   
}
