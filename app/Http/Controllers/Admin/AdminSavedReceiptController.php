<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GenerateReciept;
use Illuminate\Http\Request;

class AdminSavedReceiptController extends Controller
{
    public function index()
    {
        return inertia('Admin/SavedReceipt/Index');
    }
    public function getdata(Request $request)
    {
        return GenerateReciept::where('name', 'like', "%{$request->search}%")
                    ->orderBy($request->sortField, $request->sortOrder)   
                    ->paginate(10); 
    }

}
