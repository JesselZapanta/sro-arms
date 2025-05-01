<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return inertia('Admin/Dashboard');
    }

    public function getdata()
    {
        //get all the users from db
        //get all the events from the active academic year
        //total attendance for all the events in active acadmic year
        //total attandees for each event in active acadmic year

        $totalUsers = User::all()->count();

        $totalEvents = Event::whereHas('academicYear', function ($query){
                            $query->where('status', 1);
        })
        ->count();

        $totalAttendance = Attendance::wherehas('event.academicYear', function ($query) {
                            $query->where('status', 1);
        })  
        ->count();
        
        $attendanceData = Event::select('id', 'name')
                            ->withCount('attendances')
                            ->whereHas('academicYear', function ($query) {
                                $query->where('status', 1);
                            })
        ->get();

        return response()->json([
            'totalUsers' => $totalUsers,
            'totalEvents' => $totalEvents,
            'totalAttendance' => $totalAttendance,
            'attendanceData' => $attendanceData,
        ],200);
    }
}
