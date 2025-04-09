<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminInstituteController;
use App\Http\Controllers\Admin\AdminOrganizationController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Officer\OfficerDashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Student\StudentDashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login')
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');

Route::middleware(['auth', 'admin'])->group(function() {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard'); 

    //user
    Route::get('/admin/user', [AdminUserController::class, 'index'])->name('admin.user'); 
    Route::get('/admin/user/getdata', [AdminUserController::class, 'getdata']);
    Route::post('/admin/user/store', [AdminUserController::class, 'store']);
    Route::put('/admin/user/update/{id}', [AdminUserController::class, 'update']);
    Route::delete('/admin/user/destroy/{id}',[AdminUserController::class, 'destroy']);

    //institute
    Route::get('/admin/institute', [AdminInstituteController::class, 'index'])->name('admin.institute'); 
    Route::get('/admin/institute/getdata', [AdminInstituteController::class, 'getdata']);
    Route::post('/admin/institute/store', [AdminInstituteController::class, 'store']);
    Route::put('/admin/institute/update/{id}', [AdminInstituteController::class, 'update']);
    Route::delete('/admin/institute/destroy/{id}',[AdminInstituteController::class, 'destroy']);

    //organization
    Route::get('/admin/organization', [AdminOrganizationController::class, 'index'])->name('admin.organization'); 
    Route::get('/admin/organization/getdata', [AdminOrganizationController::class, 'getdata']);
    Route::post('/admin/organization/store', [AdminOrganizationController::class, 'store']);
    Route::put('/admin/organization/update/{id}', [AdminOrganizationController::class, 'update']);
    Route::delete('/admin/organization/destroy/{id}',[AdminOrganizationController::class, 'destroy']);
});

Route::middleware(['auth', 'student'])->group(function() {
    Route::get('/student/dashboard', [StudentDashboardController::class, 'index'])->name('student.dashboard'); 
});

Route::middleware(['auth', 'officer'])->group(function() {
    Route::get('/officer/dashboard', [OfficerDashboardController::class, 'index'])->name('officer.dashboard'); 
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
