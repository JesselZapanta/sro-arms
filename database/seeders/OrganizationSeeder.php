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
                'name' => 'Junior Association for Marketing Executives',
                'description' => 'Develops marketing skills among students.',
                'status' => 1,
            ],
            [
                'name' => 'Voice of the Student\'s Society',
                'description' => 'Represents education students and addresses their concerns.',
                'status' => 1,
            ],
            [
                'name' => 'Tanyag na mga Mag-aaral sa Samahang Filipino',
                'description' => 'Promotes the Filipino language and culture.',
                'status' => 1,
            ],
            [
                'name' => 'Troop of Educators and Enthusiasts of Mathematics',
                'description' => 'Enhances student interest and skills in mathematics.',
                'status' => 1,
            ],
            [
                'name' => 'Political Science Club',
                'description' => 'Engages students in politics and governance discussions.',
                'status' => 1,
            ],
            [
                'name' => 'Junior Programming Enthusiasts Group of Computer Students',
                'description' => 'Represents IT students and organizes tech-focused activities.',
                'status' => 1,
            ],
            [
                'name' => 'Association of Young Office Administrators',
                'description' => 'Prepares students for administrative and office careers.',
                'status' => 1,
            ],
        ];

        Organization::insertOrIgnore($organizations);
    }
}

