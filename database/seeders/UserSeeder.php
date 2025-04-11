<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'firstname' => 'ARMS',
                'middlename' => null,
                'lastname' => 'Admin',
                'institute' => 'SRO Federated',
                'organization' => 'SRO Federated',
                'studentId' => '123456',
                'email' => 'arms@gmail.com',
                'password' => Hash::make('arms'),
                'role' => 1, // 1: admin
                'status' => 1, // 1: active
            ],
            [
                'firstname' => 'ARMS',
                'middlename' => null,
                'lastname' => 'Student',
                'institute' => 'ICS',
                'organization' => 'JPEG.COM',
                'studentId' => '123',
                'email' => 'student@gmail.com',
                'password' => Hash::make('student'),
                'role' => 2, // 1: Student
                'status' => 1, // 1: active
            ],
            [
                'firstname' => 'ARMS',
                'middlename' => null,
                'lastname' => 'Officer',
                'institute' => 'SRO Federated',
                'organization' => 'SRO Federated',
                'studentId' => '321',
                'email' => 'officer@gmail.com',
                'password' => Hash::make('officer'),
                'role' => 2, // 1: Officer
                'status' => 1, // 1: active
            ],
        ];

        User::insertOrIgnore($users);
    }
}
