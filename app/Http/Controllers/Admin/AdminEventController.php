<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\EventStoreRequest;
use App\Http\Requests\Admin\EventUpdateRequest;
use App\Models\AcademicYear;
use App\Models\Event;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class AdminEventController extends Controller
{
    public function index()
    {
        $academicYears = AcademicYear::orderBy('id', 'desc')->get();
        return inertia('Admin/Event/Index', [
            'academicYears' => $academicYears,
        ]);
    }

    public function getdata(Request $request)
    {
        return Event::where('name', 'like', "%{$request->search}%")
                    ->orderBy($request->sortField, $request->sortOrder)   
                    ->paginate(10); 
    }

    public function store(EventStoreRequest $request)
    {
        $data = $request->validated();

        $eventDate = $data['event_date'];

        if ($data['type'] === 'AM') {
            $data['am_start'] = Carbon::parse("{$eventDate} {$data['am_start']}");
            $data['am_end'] = Carbon::parse("{$eventDate} {$data['am_end']}");
            $data['pm_start'] = null;
            $data['pm_end'] = null;
        } else if ($data['type'] === 'PM'){
            $data['pm_start'] = Carbon::parse("{$eventDate} {$data['pm_start']}");
            $data['pm_end'] = Carbon::parse("{$eventDate} {$data['pm_end']}");
            $data['am_start'] = null;
            $data['am_end'] = null;
        }
        // return $data;
        
        Event::create($data);

        return response()->json([
            'status' => 'created'
        ],200);
    }

    public function update(EventUpdateRequest $request)
    {
        $event = Event::findOrFail($request->id);
        $data = $request->validated();

        $eventDate = $data['event_date'];

        if ($data['type'] === 'AM') {
            $data['am_start'] = Carbon::parse("{$eventDate} {$data['am_start']}");
            $data['am_end'] = Carbon::parse("{$eventDate} {$data['am_end']}");
            $data['pm_start'] = null;
            $data['pm_end'] = null;
        } else if ($data['type'] === 'PM'){
            $data['pm_start'] = Carbon::parse("{$eventDate} {$data['pm_start']}");
            $data['pm_end'] = Carbon::parse("{$eventDate} {$data['pm_end']}");
            $data['am_start'] = null;
            $data['am_end'] = null;
        }
        // return $data;
        $event->update($data);

        return response()->json([
            'status' => 'updated'
        ],200);
    }

    public function destroy($id)
    {
        $event = Event::findOrFail($id);

        $event->delete();

        return response()->json([
            'status' => 'deleted'
        ],200);
    }
}
