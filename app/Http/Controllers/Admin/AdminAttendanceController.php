<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Event;
use Illuminate\Http\Request;

class AdminAttendanceController extends Controller
{
    public function index($id)
    {
        return inertia('Admin/Event/Attendance', [
            'id' => $id
        ]);
    }

    public function getdata(Request $request)
    {
        return $request;
    }

    
    // public function getdata(Request $request)
    // {
    //     return Attendance::with('users')
    //                 ->where('name', 'like', "%{$request->search}%")
    //                 ->orderBy($request->sortField, $request->sortOrder)   
    //                 ->paginate(10); 
    // }
}
