<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StudentAttendanceController extends Controller
{
    public function index()
    {
        return inertia('Student/Attendance/Index');
    }
}
