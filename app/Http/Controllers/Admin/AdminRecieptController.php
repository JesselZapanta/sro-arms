<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
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
        $academicYear = $request->selectedYear;

        $user = User::where('id', 'like', "%$search%")
                    ->orWhere('firstname', 'like', "%$search%")
                    ->orWhere('lastname', 'like', "%$search%")
                    ->first();

        if(!$user){
            return response()->json([
                'status' => 'notfound'
            ],404);
        }
        
    }
}
