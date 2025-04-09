<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\InstituteStoreRequest;
use App\Http\Requests\Admin\InstituteUpdateRequest;
use App\Models\Institute;
use Auth;
use Illuminate\Http\Request;

class AdminInstituteController extends Controller
{
    public function index()
    {
        return inertia('Admin/Institute/Index');
    }

    public function getdata(Request $request)
    {
        return Institute::where('name', 'like', "%{$request->search}%")
                    ->orderBy($request->sortField, $request->sortOrder)   
                    ->paginate(10); 
    }

    public function store(InstituteStoreRequest $request)
    {
        $data = $request->validated();

        Institute::create($data);

        return response()->json([
            'status' => 'created'
        ],200);
    }

    public function update(InstituteUpdateRequest $request)
    {
        $institute = Institute::findOrFail($request->id);
        $data = $request->validated();

        $institute->update($data);

        return response()->json([
            'status' => 'updated'
        ],200);
    }

    public function destroy($id)
    {
        $institute = Institute::findOrFail($id);

        $institute->delete();

        return response()->json([
            'status' => 'deleted'
        ],200);
    }
}
