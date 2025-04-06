<?php

namespace App\Http\Controllers\Officer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OfficerDashboardController extends Controller
{
    public function index()
    {
        return inertia('Student/Dashboard');
    }
}
