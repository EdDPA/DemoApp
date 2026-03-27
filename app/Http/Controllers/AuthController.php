<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Mostrar login
    public function create()
    {
        return Inertia::render('Auth/Login');
    }

    // Procesar login
  public function store(Request $request)
{
    if (!Auth::attempt($request->only('email', 'password'))) {
        return back()->withErrors([
            'email' => 'Credenciales incorrectas',
        ]);
    }

    $request->session()->regenerate();

    return redirect('/dashboard');
}

    // Logout
    public function destroy(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
