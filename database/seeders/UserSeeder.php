<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::insert([
            [
                'name' => 'Juan Pérez',
                'email' => 'juan@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'María López',
                'email' => 'maria@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Carlos Ramírez',
                'email' => 'carlos@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Ana Torres',
                'email' => 'ana@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Luis García',
                'email' => 'luis@example.com',
                'password' => Hash::make('password123'),
            ],
        ]);
    }
}
