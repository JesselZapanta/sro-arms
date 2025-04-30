<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use App\Models\Attendance;
use App\Models\Event;
use App\Models\GenerateReciept;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

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
            $user = User::where('studentId',  $search)
                ->orWhere('firstname',  $search)
                ->orWhere('lastname',  $search)
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
    
    // ayaw nalng mag get id - save it first 
    // public function getId()
    // {
    //     $receipt =  GenerateReciept::orderBy('id', 'desc')->limit(1);

    //     if($receipt){
    //         $no = $receipt->no + 1;
    //     } else {
    //         $no = 100000;
    //     }

    //     return response()->json([
    //         'no' => $no,
    //     ], 200);    
    // }

    public function store(Request $request)
    {   
        $request->validate([
            'name' => ['required'],
            'amount' => ['required', 'numeric'],
        ]);

        //check if there is a similar name and amount in db, if true dont insert 

        $existingReceipt  = GenerateReciept::where('name', $request['name'])
                                    ->where('amount',$request['amount'])
                                    ->first();

        if($existingReceipt){
            return response()->json([
                'status' => 'created',
                'receipt' => $existingReceipt->id
            ], 200);
        }

        $receipt  = GenerateReciept::create([
                'date' => Carbon::now()->setTimezone('Asia/Manila'),
                'name' => $request->name,
                'amount' => $request->amount,
            ]);

        return response()->json([
            'status' => 'created',
            'receipt' => $receipt->id// pasa ang id sa newly created receipt
        ], 200);
    }

}