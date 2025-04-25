<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'firstName' => fake()->firstName(),
            'middlename' => fake()->lastName(),
            'lastname' => fake()->lastName(),
            'institute' => fake()->randomElement(['ICJE', 'IBFS', 'IHS','IAS','ITE', 'ICS']),
            'organization' => fake()->randomElement(['JAMEX','VOSS','TMS FIL','TEEMS','PSC','JPEG.COM','AYOA']),
            'studentId' => fake()->unique()->numberBetween(10000, 99999),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'role' => 1,
            'status' => 1,
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}


// [
//                 'firstname' => 'ARMS',
//                 'middlename' => null,
//                 'lastname' => 'Student',
//                 'institute' => 'ICS',
//                 'organization' => 'JPEG.COM',
//                 'studentId' => '123',
//                 'email' => 'student@gmail.com',
//                 'password' => Hash::make('student'),
//                 'role' => 2, // 1: Student
//                 'status' => 1, // 1: active
//             ],