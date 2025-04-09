<?php

namespace Database\Seeders;

use App\Models\Organization;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrganizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $organizations = [
            [
                'name' => 'JAMEX',
                'description' => 'Junior Association for Marketing Executives',
                'status' => 1,
            ],
            [
                'name' => 'VOSS',
                'description' => 'Voice of the Student\'s Society',
                'status' => 1,
            ],
            [
                'name' => 'TMS FIL',
                'description' => 'Tanyag na mga Mag-aaral sa Samahang Filipino',
                'status' => 1,
            ],
            [
                'name' => 'TEEMS',
                'description' => 'Troop of Educators and Enthusiasts of Mathematics',
                'status' => 1,
            ],
            [
                'name' => 'PSC',
                'description' => 'Political Science Club',
                'status' => 1,
            ],
            [
                'name' => 'JPEG.COM',
                'description' => 'Junior Programming Enthusiasts Group of Computer Students',
                'status' => 1,
            ],
            [
                'name' => 'AYOA',
                'description' => 'Association of Young Office Administrators',
                'status' => 1,
            ],
        ];


        Organization::insertOrIgnore($organizations);
    }
}

