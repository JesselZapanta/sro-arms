<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function dashboard()
    {
        if(Auth::check()){
        $userRole = Auth::user()->role;

            if($userRole === 1){
                return redirect()->route('admin.dashboard');
            }else if ($userRole === 2){
                return redirect()->route('student.dashboard');
            } 
        }
    }
}
