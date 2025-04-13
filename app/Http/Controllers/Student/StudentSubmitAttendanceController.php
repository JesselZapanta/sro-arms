<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class StudentSubmitAttendanceController extends Controller
{
    public function index($id)
    {
        return inertia('Student/Event/SubmitAttendance', [
            'id' => $id,
        ]);
    }

    public function getevent($id)
    {
        return Event::findOrFail($id);
    }
}
