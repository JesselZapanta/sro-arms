<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\OrganizationStoreRequest;
use App\Http\Requests\Admin\OrganizationUpdateRequest;
use App\Http\Requests\Admin\UserStoreRequest;
use App\Http\Requests\Admin\UserUpdateRequest;
use App\Http\Requests\InstituteStoreRequest;
use App\Http\Requests\InstituteUpdateRequest;
use App\Models\Institute;
use App\Models\Organization;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminOrganizationController extends Controller
{
    public function index()
    {
        return inertia('Admin/Organization/Index');
    }

    public function getdata(Request $request)
    {
        return Organization::where('name', 'like', "%{$request->search}%")
                    ->orderBy($request->sortField, $request->sortOrder)   
                    ->paginate(10); 
    }

    public function store(OrganizationStoreRequest $request)
    {
        $data = $request->validated();

        Organization::create($data);

        return response()->json([
            'status' => 'created'
        ],200);
    }

    public function update(OrganizationUpdateRequest $request)
    {
        $user = Organization::findOrFail($request->id);
        $data = $request->validated();

        $user->update($data);

        return response()->json([
            'status' => 'updated'
        ],200);
    }

    public function destroy($id)
    {
        $user = Organization::findOrFail($id);

        $user->delete();

        return response()->json([
            'status' => 'deleted'
        ],200);
    }
}
