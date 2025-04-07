<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserStoreRequest;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{
    public function index()
    {
        return inertia('Admin/User/Index');
    }

    public function getdata(Request $request)
    {
        return User::where('id' , '!=', Auth::user()->id)
                    ->where(function($query) use ($request){
                        $query->where('firstname', 'like', "%{$request->search}%")
                            ->orWhere('middlename', 'like', "%{$request->search}%")
                            ->orWhere('lastname', 'like', "%{$request->search}%")
                            ->orWhere('email', 'like', "%{$request->search}%");
                    })
                    ->orderBy($request->sortField, $request->sortOrder)   
                    ->paginate(10); 
    }

    public function store(UserStoreRequest $request)
    {
        $data = $request->validated();

        $data['password'] = Hash::make($data['password']);
        
        return response()->json([
            'status' => 'created'
        ],200);
    }

    public function update()
    {

    }

    public function destroy()
    {

    }
}
