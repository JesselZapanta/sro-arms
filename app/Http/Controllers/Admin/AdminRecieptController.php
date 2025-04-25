<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminRecieptController extends Controller
{
    public function index()
    {
        return inertia('Admin/Reciept/Index');
    }
}
