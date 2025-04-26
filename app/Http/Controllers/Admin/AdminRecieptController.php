<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use App\Models\Attendance;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;

class AdminRecieptController extends Controller
{
    public function index()
    {
        return inertia('Admin/Reciept/Index');
    }

    public function getacedemicyears()
    {
        return AcademicYear::orderBy('id', 'desc')
                        ->get(['id','code','description']);
    }

    public function getdata(Request $request)
    {
        $search = $request->search;
        $academicYearId = $request->selectedYear;

        if ($search) {
            $user = User::where('studentId', 'like', "%$search%")
                ->orWhere('firstname', 'like', "%$search%")
                ->orWhere('lastname', 'like', "%$search%")
                ->first();
        } else {
            $user = null;
        }

        if (!$user) {
            return response()->json([
                'status' => 'user-notfound'
            ], 404);
        }

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