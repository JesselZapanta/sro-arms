<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use App\Models\Attendance;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentAttendanceController extends Controller
{
    public function index()
    {
        return inertia('Student/Attendance/Index');
    }

    public function getacedemicyears()
    {
        return AcademicYear::orderBy('id', 'desc')
                            ->get(['id', 'code', 'description']);
    }

    public function getdata(Request $request)
    {
        $academicYearId = $request->selectedYear;
        $user = Auth::user();

        if (!$academicYearId) {
            return response()->json([
                'status' => 'ay-notfound'
            ], 404);
        }

        $events = Event::where('academicYear', $academicYearId)->get();
        
        $attendances = Attendance::with('event:id,name')
            ->where('user', $user->id)
            ->whereIn('event', $events->pluck('id'))
            ->get()
            ->keyBy(keyBy: 'event'); // event id as key

        $totalAbsent = 0;
        $totalSanction = 0;

        $typeRequiredPhotos = [
            'WD' => ['am_start_photo_at', 'am_end_photo_at', 'pm_start_photo_at','pm_end_photo_at'],
            'AM' => ['am_start_photo_at', 'am_end_photo_at'],
            'PM' => ['pm_start_photo_at','pm_end_photo_at'],
        ];

        foreach($events as $event){
            $attendance = $attendances->get($event->id);

            $missingPhotos = 0;

            $required = $typeRequiredPhotos[$event->type] ?? [];

            foreach($required as $field){
                if(!$attendance || !$attendance->$field){
                    $missingPhotos++;
                }
            }

            if($missingPhotos > 0){
                $totalAbsent += $missingPhotos;
                $totalSanction += $missingPhotos * $event->sanction;
            }
        }

        return response()->json([
            'user' => $user,
            'events' => $events,
            'attendances' => $attendances,
            'total_absent' => $totalAbsent,
            'total_sanction' => $totalSanction,
        ], 200);
    }
}
