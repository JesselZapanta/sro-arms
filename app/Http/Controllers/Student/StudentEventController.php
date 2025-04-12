<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;

class StudentEventController extends Controller
{
    public function index()
    {
        $academicYears = AcademicYear::orderBy('id', 'desc')->get();
        return inertia('Student/Event/Index',[
            'academicYears' => $academicYears,
        ]);
    }

    public function getdata(Request $request)
    {
        return Event::where('status', 1)
                    ->where(function($query) use ($request){
                        $query->where('name', 'like', "%{$request->search}%")
                            ->where('academicYear', 'like', "%{$request->year}%");
                    })
                    ->orderBy($request->sortField, $request->sortOrder)   
                    ->paginate(perPage: 20); 
    }
}
