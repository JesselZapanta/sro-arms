<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserStoreRequest;
use App\Http\Requests\Admin\UserUpdateRequest;
use App\Http\Requests\InstituteStoreRequest;
use App\Http\Requests\InstituteUpdateRequest;
use App\Models\Institute;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
        $user = Institute::findOrFail($request->id);
        $data = $request->validated();

        $user->update($data);

        return response()->json([
            'status' => 'updated'
        ],200);
    }

    public function destroy($id)
    {
        $user = Institute::findOrFail($id);

        $user->delete();

        return response()->json([
            'status' => 'deleted'
        ],200);
    }
}
