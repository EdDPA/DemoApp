<?php

namespace App\Http\Controllers;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    public function index()
    {
        $users = User::select('id', 'name', 'email')->get();

        return Inertia::render('Users', [
            'users' => $users
        ]);
    }
}
