<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class StudentDashboardController extends Controller
{
    public function index()
    {
        return inertia('Student/Dashboard');
    }

    public function getdata()
    {
        return Event::whereHas('academicYear', function ($query) {
            $query->where('status', 1);
        })
        ->count();
    }
}
