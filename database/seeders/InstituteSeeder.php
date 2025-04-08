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
                'name' => 'Institute of Criminal Justice Education',
                'description' => 'Offers programs related to criminal justice and law enforcement.',
                'status' => 1,
            ],
            [
                'name' => 'Institute of Business and Financial Services',
                'description' => 'Provides education in business management and financial services.',
                'status' => 1,
            ],
            [
                'name' => 'Institute of Health Sciences',
                'description' => 'Focuses on health-related programs, including midwifery.',
                'status' => 1,
            ],
            [
                'name' => 'Institute of Arts and Sciences',
                'description' => 'Offers courses in various arts and sciences disciplines.',
                'status' => 1,
            ],
            [
                'name' => 'Institute of Computer Studies',
                'description' => 'Provides education in computer science and information technology.',
                'status' => 1,
            ],
            [
                'name' => 'Institute of Teacher Education',
                'description' => 'Offers programs in education, preparing students for teaching professions.',
                'status' => 1,
            ],
        ];
        Institute::insertOrIgnore($institutes);
    }
}
