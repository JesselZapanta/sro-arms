<?php

namespace Database\Seeders;

use App\Models\AcademicYear;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AcademicYearSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $academicYears = [
            [
                'code' => '231',
                'description' => '1ST SEM AY 2023-2024',
                'status' => 0,
                'start_date' => '2023-08-01 00:00:00',
                'end_date' => '2023-12-31 00:00:00',
            ],
            [
                'code' => '232',
                'description' => '2ND SEM AY 2023-2024',
                'status' => 0,
                'start_date' => '2024-01-01 00:00:00',
                'end_date' => '2024-05-31 00:00:00',
            ],
            [
                'code' => '233',
                'description' => 'SUMMER AY 2023-2024',
                'status' => 0,
                'start_date' => '2024-05-31 00:00:00',
                'end_date' => '2024-07-31 00:00:00',
            ],
            [
                'code' => '241',
                'description' => '1ST SEM AY 2024-2025',
                'status' => 0,
                'start_date' => '2024-08-01 00:00:00',
                'end_date' => '2024-12-27 00:00:00',
            ],
            [
                'code' => '242',
                'description' => '2ND SEM AY 2024-2025',
                'status' => 1,
                'start_date' => '2025-01-01 00:00:00',
                'end_date' => '2025-5-31 00:00:00',
            ],
        ];

        AcademicYear::insertOrIgnore($academicYears);
    }
}
