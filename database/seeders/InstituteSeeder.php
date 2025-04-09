<?php

namespace Database\Seeders;

use App\Models\Institute;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InstituteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $institutes = [
            [
                'name' => 'ICJE',
                'description' => 'Institute of Criminal Justice Education',
                'status' => 1,
            ],
            [
                'name' => 'IBFS',
                'description' => 'Institute of Business and Financial Services',
                'status' => 1,
            ],
            [
                'name' => 'IHS',
                'description' => 'Institute of Health Sciences',
                'status' => 1,
            ],
            [
                'name' => 'IAS',
                'description' => 'Institute of Arts and Sciences',
                'status' => 1,
            ],
            [
                'name' => 'ICS',
                'description' => 'Institute of Computer Studies',
                'status' => 1,
            ],
            [
                'name' => 'ITE',
                'description' => 'Institute of Teacher Education',
                'status' => 1,
            ],
        ];

        Institute::insertOrIgnore($institutes);
    }
}
