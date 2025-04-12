<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StudentEventController extends Controller
{
    public function index()
    {
        return inertia('Student/Event/Index');
    }
}
