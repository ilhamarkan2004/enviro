<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Department;
use App\Models\Position;
use Illuminate\Support\Facades\Hash;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = [
            ['name' => 'Andi Saputra', 'department' => 'Finance', 'position' => 'Finance Supervisor', 'email' => 'andi@properindoenviro.co.id', 'phone' => '083853162643', 'role' => 'spv'],
            ['name' => 'Budi Santoso', 'department' => 'IT', 'position' => 'Programmer Junior', 'email' => 'budi@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'employee'],
            ['name' => 'Citra Lestari', 'department' => 'HR', 'position' => 'HR Administrator', 'email' => 'citra@properindoenviro.co.id', 'phone' => '082257105950', 'role' => 'employee'],
            ['name' => 'Dewi Anggraini', 'department' => 'Environment', 'position' => 'Environmental Staff', 'email' => 'dewi@properindoenviro.co.id', 'phone' => '085791356060', 'role' => 'employee'],
            ['name' => 'Eko Pratama', 'department' => 'Operation', 'position' => 'Operational Supervisor', 'email' => 'eko@properindoenviro.co.id', 'phone' => '081234567890', 'role' => 'spv'],
            ['name' => 'Hendra Wijaya', 'department' => 'IT', 'position' => 'IT Supervisor', 'email' => 'hendra@properindoenviro.co.id', 'phone' => '081234567891', 'role' => 'spv'],
            ['name' => 'Lukman Hakim', 'department' => 'IT', 'position' => 'System Analyst', 'email' => 'lukman@properindoenviro.co.id', 'phone' => '081234567892', 'role' => 'employee'],
            ['name' => 'Maya Putri', 'department' => 'HR', 'position' => 'HR Supervisor', 'email' => 'maya@properindoenviro.co.id', 'phone' => '081234567893', 'role' => 'spv'],
            ['name' => 'Taufik Hidayat', 'department' => 'Environment', 'position' => 'Environmental Supervisor', 'email' => 'taufik@properindoenviro.co.id', 'phone' => '081234567894', 'role' => 'spv'],
            ['name' => 'Rizky Maulana', 'department' => 'IT', 'position' => 'Web Developer', 'email' => 'rizky@properindoenviro.co.id', 'phone' => '081234567895', 'role' => 'employee'],
        ];

        foreach ($employees as $data) {
            $department = Department::firstOrCreate(
                ['name' => $data['department']],
                ['status' => 1]
            );

            $position = Position::firstOrCreate(
                ['name' => $data['position'], 'department_id' => $department->id],
                ['status' => 1]
            );

            $user = User::updateOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'phone_number' => $data['phone'],
                    'password' => Hash::make('password'),
                    'department_id' => $department->id,
                    'position_id' => $position->id,
                ]
            );

            $user->assignRole($data['role']);
        }
    }
}
