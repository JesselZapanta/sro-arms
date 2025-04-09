<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserStoreRequest;
use App\Http\Requests\Admin\UserUpdateRequest;
use App\Models\Institute;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{
    public function index()
    {
        $institutes = Institute::all();

        return inertia('Admin/User/Index', [
            'institutes' => $institutes
        ]);
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
        
        User::create($data);

        return response()->json([
            'status' => 'created'
        ],200);
    }

    public function update(UserUpdateRequest $request)
    {
        $user = User::findOrFail($request->id);
        $data = $request->validated();

            
        // return $data;

        if($request->password != null){
            $data['password'] = Hash::make($data['password']);
        }else{
            unset($data['password']);
        }

        $user->update($data);

        return response()->json([
            'status' => 'updated'
        ],200);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        $user->delete();

        return response()->json([
            'status' => 'deleted'
        ],200);
    }
}
