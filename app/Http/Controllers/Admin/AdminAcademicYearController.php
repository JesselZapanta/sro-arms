<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AcademicYearStoreRequest;
use App\Http\Requests\Admin\AcademicYearUpdateRequest;
use App\Models\AcademicYear;
use Auth;
use Illuminate\Http\Request;

class AdminAcademicYearController extends Controller
{
    public function index()
    {
        return inertia('Admin/AcademicYear/Index');
    }

    public function getdata(Request $request)
    {
        return AcademicYear::where('code', 'like', "%{$request->search}%")
                    ->orderBy($request->sortField, $request->sortOrder)   
                    ->paginate(10); 
    }

    public function store(AcademicYearStoreRequest $request)
    {
        $data = $request->validated();

        AcademicYear::create($data);

        // if($data['status'] == 1){
        //     AcademicYear::where('id', '!=', $data['id'])->update(['status' => 0]);
        // }

        return response()->json([
            'status' => 'created'
        ],200);
    }

    public function update(AcademicYearUpdateRequest $request)
    {
        $academicYear = AcademicYear::findOrFail($request->id);
        $data = $request->validated();

        $academicYear->update($data);

        return response()->json([
            'status' => 'updated'
        ],200);
    }

    public function destroy($id)
    {
        $academicYear = AcademicYear::findOrFail($id);

        $academicYear->delete();

        return response()->json([
            'status' => 'deleted'
        ],200);
    }
}
