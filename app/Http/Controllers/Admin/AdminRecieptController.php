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
        //search id, firstname or last name on user based on request->search
        //get all the events under the selected academic year
        //get all the attendance on the event in the selected user
        //calculate the total absent and the total sanction

        $search =  $request->search;
        $academicYearId = $request->selectedYear;

        $user = User::where('studentId', 'like', "%$search%")
                    ->orWhere('firstname', 'like', "%$search%")
                    ->orWhere('lastname', 'like', "%$search%")
                    ->first();

        if(!$user){
            return response()->json([
                'status' => 'notfound'
            ],404);
        }

        $events = Event::where('academicYear', $academicYearId)->get();
        $attendances = Attendance::where('user', $user->id)
                                ->whereIn('event', $events->pluck('id'))
                                ->get()
                                ->keyBy('event');

        $totalAbsent = 0;
        $totalSanction = 0;

        foreach ($events as $event) {
            $attendance = $attendances->get($event->id);
            $missingPhotos = 0;

            if($event->type == 'WD'){
                $required = ['am_start_photo_at', 'am_end_photo_at','pm_start_photo_at','pm_end_photo_at'];
            }elseif($event->type == 'AM'){
                $required = ['am_start_photo_at', 'am_end_photo_at'];
            }elseif($event->type == 'PM'){
                $required = ['pm_start_photo_at','pm_end_photo_at'];
            }else{
                $required = [];
            }

            foreach($required as $field){
                if(!$attendance || !$attendance->$field){
                    $missingPhotos++;
                }
            }

            if($missingPhotos > 0){
                $totalAbsent += $missingPhotos;
                $totalSanction = $missingPhotos * $event->sanction;
            }
        }

        return response()->json([
            'user' => $user,
            'total_absent' => $totalAbsent,
            'total_sanction' => $totalSanction,
            'attendances' => $attendances,
        ]);
    }
}
//77656