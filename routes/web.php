<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

Route::get('/', fn () => redirect()->route('login'));

// Login
Route::get('/login', [AuthController::class, 'create'])->name('login');
Route::post('/login', [AuthController::class, 'store']);

// Logout
Route::post('/logout', [AuthController::class, 'destroy']);

// Dashboard 
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return inertia('Dashboard');
    });

    Route::get('/users', [UserController::class, 'index']);

    Route::get('/users/create', function () {
        return Inertia::render('UserCreate');
    })->name('user-create');

});


