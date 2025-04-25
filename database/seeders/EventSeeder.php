<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'name' => 'Seeder Event 1',
                'event_date' => '2025-04-25',
                'type' => 'AM',
                'am_start' => '2025-04-25 07:00:00',
                'am_end' => '2025-04-25 11:30:00',
                'pm_start' => null,
                'pm_end' => null,
                'sanction' => '20',
                'academicYear' => 11,
                'status' => 1,
            ],
            [
                'name' => 'Seeder Event 2',
                'event_date' => '2025-05-25',
                'type' => 'PM',
                'am_start' => null,
                'am_end' => null,
                'pm_start' => '2025-05-25 13:00:00',
                'pm_end' => '2025-05-25 17:00:00',
                'sanction' => '20',
                'academicYear' => 11,
                'status' => 1,
            ],
            [
                'name' => 'Seeder Event 3',
                'event_date' => '2025-06-25',
                'type' => 'WD',
                'am_start' => '2025-06-25 07:00:00',
                'am_end' => '2025-06-25 11:30:00',
                'pm_start' => '2025-06-25 13:00:00',
                'pm_end' => '2025-06-25 17:00:00',
                'sanction' => '20',
                'academicYear' => 11,
                'status' => 1,
            ],
        ];

        Event::insertOrIgnore($events);
    }
}

