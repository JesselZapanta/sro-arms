<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GenerateReciept extends Model
{
    protected $table = 'generate_reciepts';

    protected $fillable = [
        'no',
        'name',
        'amount ',
    ];
}
