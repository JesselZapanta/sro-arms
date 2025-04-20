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

    public function getdata(Request $request, $id)
    {
        return Attendance::with([ 'event', 'user'])
                        ->where('event', $id)
                        ->whereHas('user', function($query) use ($request) {
                            $query->where('firstname', 'like', "%{$request->search}%")
                                ->orWhere('lastname', 'like', "%{$request->search}%")
                                ->orWhere('studentId', 'like', "%{$request->search}%");
                        })
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }
}
