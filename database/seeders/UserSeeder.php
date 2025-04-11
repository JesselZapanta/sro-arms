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
                'status' => 1, // 1: admin
            ],
        ];

        User::insertOrIgnore($users);
    }
}
