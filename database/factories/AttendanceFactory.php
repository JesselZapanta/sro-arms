<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Attendance>
 */
class AttendanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user' => fake()->numberBetween(1,50),
            'event' => 1,

            'am_start_photo_at' => '2025-06-25 07:00:00',
            'am_start_photo' => "attendances/OUy3P2Szw3RI9NpYUIw3ZinOSRrfoaMAWfy12vgy.png",

            'am_end_photo_at' => '2025-06-25 11:30:00',
            'am_end_photo' => "attendances/OUy3P2Szw3RI9NpYUIw3ZinOSRrfoaMAWfy12vgy.png",

            'pm_start_photo_at' => '2025-06-25 13:00:00',
            'pm_start_photo' => "attendances/OUy3P2Szw3RI9NpYUIw3ZinOSRrfoaMAWfy12vgy.png",

            'pm_end_photo_at' => '2025-06-25 17:00:00',
            'pm_end_photo' => "attendances/OUy3P2Szw3RI9NpYUIw3ZinOSRrfoaMAWfy12vgy.png",
        ];
    }
}

