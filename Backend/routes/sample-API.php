<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;

// 🔐 Public authentication routes
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);

// 🔐 Protected routes (requires Sanctum auth)
Route::middleware('auth:sanctum')->group(function () {
    // Authenticated user info
    Route::get('/user', [AuthController::class, 'user']);

    // Logout (should only be accessible when logged in)
    Route::post('/logout', [AuthController::class, 'logout']);

    // Product management
    Route::apiResource('products', ProductController::class);
});
