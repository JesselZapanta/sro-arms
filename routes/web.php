<?php

use App\Http\Controllers\Admin\AdminAcademicYearController;
use App\Http\Controllers\Admin\AdminAttendanceController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminEventController;
use App\Http\Controllers\Admin\AdminInstituteController;
use App\Http\Controllers\Admin\AdminOrganizationController;
use App\Http\Controllers\Admin\AdminRecieptController;
use App\Http\Controllers\Admin\AdminSavedReceiptController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Officer\OfficerDashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Student\StudentAttendanceController;
use App\Http\Controllers\Student\StudentDashboardController;
use App\Http\Controllers\Student\StudentEventController;
use App\Http\Controllers\Student\StudentSubmitAttendanceController;
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

    //academic-year
    Route::get('/admin/academic-year', [AdminAcademicYearController::class, 'index'])->name('admin.academic-year'); 
    Route::get('/admin/academic-year/getdata', [AdminAcademicYearController::class, 'getdata']);
    Route::post('/admin/academic-year/store', [AdminAcademicYearController::class, 'store']);
    Route::put('/admin/academic-year/update/{id}', [AdminAcademicYearController::class, 'update']);
    Route::delete('/admin/academic-year/destroy/{id}',[AdminAcademicYearController::class, 'destroy']);

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

    //event
    Route::get('/admin/event', [AdminEventController::class, 'index'])->name('admin.event'); 
    Route::get('/admin/event/getdata', [AdminEventController::class, 'getdata']);
    Route::post('/admin/event/store', [AdminEventController::class, 'store']);
    Route::put('/admin/event/update/{id}', [AdminEventController::class, 'update']);
    Route::delete('/admin/event/destroy/{id}',[AdminEventController::class, 'destroy']);

    Route::get('/admin/attendance/{id}', [AdminAttendanceController::class, 'index'])->name('admin.attendance');
    Route::get('/admin/attendance/getdata/{id}', [AdminAttendanceController::class, 'getdata']);

    //receipt
    Route::get('/admin/receipt', [AdminRecieptController::class, 'index'])->name('admin.receipt');
    Route::get('/admin/receipt/getacedemicyears', [AdminRecieptController::class, 'getacedemicyears']);
    Route::get('/admin/receipt/getdata', [AdminRecieptController::class, 'getdata']);
    Route::get('/admin/receipt/getid', [AdminRecieptController::class, 'getId']);
    Route::post('/admin/receipt/store', [AdminRecieptController::class, 'store']);

    Route::get('/admin/saved-receipt', [AdminSavedReceiptController::class, 'index'])->name('admin.saved-receipt');
    Route::get('/admin/saved-receipt/getdata', [AdminSavedReceiptController::class, 'getdata']);
});

Route::middleware(['auth', 'student'])->group(function() {
    Route::get('/student/dashboard', [StudentDashboardController::class, 'index'])->name('student.dashboard'); 

    Route::get('/student/event', [StudentEventController::class, 'index'])->name('student.event'); 
    Route::get('/student/event/getdata', [StudentEventController::class, 'getdata']);

    Route::get('/student/attendance', [StudentAttendanceController::class, 'index'])->name('student.attendance'); 
    Route::get('/student/submit-attendance/{id}', [StudentSubmitAttendanceController::class, 'index'])->name('student.submit-attendance'); 
    Route::get('/student/submit-attendance/getdata/{id}', [StudentSubmitAttendanceController::class, 'getdata']);
    Route::post('/student/submit-attendance/upload/{id}', [StudentSubmitAttendanceController::class, 'upload']);
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
