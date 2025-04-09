<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\EventStoreRequest;
use App\Http\Requests\Admin\EventUpdateRequest;
use App\Models\Event;
use Auth;
use Illuminate\Http\Request;

class AdminEventController extends Controller
{
    public function index()
    {
        return inertia('Admin/Event/Index');
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

        Event::create($data);

        return response()->json([
            'status' => 'created'
        ],200);
    }

    public function update(EventUpdateRequest $request)
    {
        $event = Event::findOrFail($request->id);
        $data = $request->validated();

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
