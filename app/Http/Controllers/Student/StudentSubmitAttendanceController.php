<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\Student\SubmitAttendanceStoreRequest;
use App\Models\Attendance;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class StudentSubmitAttendanceController extends Controller
{
    public function index($id)
    {
        return inertia('Student/Event/SubmitAttendance', [
            'id' => $id,
        ]);
    }

    public function getdata($id)
    {
        $event =  Event::findOrFail($id);
        $attendance = Attendance::where('user', Auth::user()->id)->where('event', $event->id)->first();

        return response()->json([
            'event' => $event,
            'attendance' => $attendance,
        ], 200);
    }


    public function upload(SubmitAttendanceStoreRequest $request, $id)
    {
        $event = Event::findOrFail($id);
        $user = Auth::user()->id;
        $attendance = Attendance::where('user', $user)->where('event', $event->id)->first();

        $data = $request->validated();
        $data['user'] = $user;
        $data['event'] = $event->id;

        if($request->hasFile('am_start_photo')) {
            if($event->am_start)
            $data['am_start_photo'] = $request->file('am_start_photo')->store('attendances', 'public');
            $data['am_start_photo_at'] = Carbon::now()->setTimezone('Asia/Manila');
        }

        if($request->hasFile('am_end_photo')) {
            $data['am_end_photo'] = $request->file('am_end_photo')->store('attendances', 'public');
            $data['am_end_photo_at'] = Carbon::now()->setTimezone('Asia/Manila');
        }

        if($request->hasFile('pm_start_photo')) {
            $data['pm_start_photo'] = $request->file('pm_start_photo')->store('attendances', 'public');
            $data['pm_start_photo_at'] = Carbon::now()->setTimezone('Asia/Manila');
        }

        if($request->hasFile('pm_end_photo')) {
            $data['pm_end_photo'] = $request->file('pm_end_photo')->store('attendances', 'public');
            $data['pm_end_photo_at'] = Carbon::now()->setTimezone('Asia/Manila');
        }

        if($attendance){
            $attendance->update($data);

            return response()->json([
                'status' => 'updated',
            ], 200); 
        } else{
            Attendance::create($data);

            return response()->json([
                'status' => 'uploaded',
            ], 200); 
        }
    }   
}
