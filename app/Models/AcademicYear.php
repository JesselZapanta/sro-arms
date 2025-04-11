<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AcademicYear extends Model
{
    protected $table = 'academic_years';
    
    protected $fillable = [
        'code',
        'description',
        'status',
        'start_date',
        'end_date',
    ];
}
