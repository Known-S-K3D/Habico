<?php

// namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Foundation\Auth\User as Authenticatable;
// use Illuminate\Notifications\Notifiable;
// use Laravel\Sanctum\HasApiTokens; // ✅ IMPORTANT

// class User extends Authenticatable
// {
//     use HasApiTokens, HasFactory, Notifiable; // ✅ This enables createToken()

//     protected $fillable = [
//         'name',
//         'email',
//         'password',
//         'role',
//     ];

//     protected $hidden = [
//         'password',
//         'remember_token',
//     ];

//     protected $casts = [
//         'email_verified_at' => 'datetime',
//     ];

//     public function setPasswordAttribute($value)
//     {
//         if (!empty($value)) {
//             $this->attributes['password'] = bcrypt($value);
//         }
//     }

//     public function isAdmin(): bool
//     {
//         return $this->role === 'admin';
//     }

//     public function isUser(): bool
//     {
//         return $this->role === 'user';
//     }
// }


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'role'
    ];
}
