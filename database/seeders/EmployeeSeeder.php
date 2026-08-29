<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Department;
use App\Models\Position;
use Illuminate\Support\Facades\Hash;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $employees = [
            ['name' => 'Andi Saputra', 'department' => 'Finance', 'position' => 'Finance Supervisor', 'email' => 'andi@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'spv'],
            ['name' => 'Budi Santoso', 'department' => 'IT', 'position' => 'Programmer Junior', 'email' => 'budi@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'employee'],
            ['name' => 'Citra Lestari', 'department' => 'HR', 'position' => 'HR Administrator', 'email' => 'citra@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'employee'],
            ['name' => 'Dewi Anggraini', 'department' => 'Environment', 'position' => 'Environmental Staff', 'email' => 'dewi@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'employee'],
            ['name' => 'Eko Pratama', 'department' => 'Operation', 'position' => 'Operational Supervisor', 'email' => 'eko@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'spv'],
            ['name' => 'Hendra Wijaya', 'department' => 'IT', 'position' => 'IT Supervisor', 'email' => 'hendra@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'spv'],
            ['name' => 'Lukman Hakim', 'department' => 'IT', 'position' => 'System Analyst', 'email' => 'lukman@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'employee'],
            ['name' => 'Maya Putri', 'department' => 'HR', 'position' => 'HR Supervisor', 'email' => 'maya@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'spv'],
            ['name' => 'Taufik Hidayat', 'department' => 'Environment', 'position' => 'Environmental Supervisor', 'email' => 'taufik@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'spv'],
            ['name' => 'Rizky Maulana', 'department' => 'IT', 'position' => 'Web Developer', 'email' => 'rizky@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'employee'],
            ['name' => 'Sari Kurnia', 'department' => 'Finance', 'position' => 'Finance Staff', 'email' => 'sari@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'employee'],
            ['name' => 'Karin Novilda', 'department' => 'Finance', 'position' => 'Finance Staff', 'email' => 'karin@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'employee'],
            ['name' => 'Fajar Sidik', 'department' => 'Marketing', 'position' => 'Marketing Supervisor', 'email' => 'fajar@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'spv'],
            ['name' => 'Gita Gutawa', 'department' => 'Marketing', 'position' => 'Marketing Staff', 'email' => 'gita@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'employee'],
            ['name' => 'Hasan Basri', 'department' => 'Legal', 'position' => 'Legal Supervisor', 'email' => 'hasan@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'spv'],
            ['name' => 'Intan Nuraini', 'department' => 'Legal', 'position' => 'Legal Staff', 'email' => 'intan@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'employee'],
            ['name' => 'Joko Anwar', 'department' => 'Engineering', 'position' => 'Engineering Manager', 'email' => 'joko@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'spv'],
            ['name' => 'Kiki Fatmala', 'department' => 'Engineering', 'position' => 'Engineer', 'email' => 'kiki@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'employee'],
            ['name' => 'Lestari Ayu', 'department' => 'Engineering', 'position' => 'Engineer', 'email' => 'lestari@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'employee'],
            ['name' => 'Mamat Alkatiri', 'department' => 'Operation', 'position' => 'Operator', 'email' => 'mamat@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'employee'],
            ['name' => 'Nina Zatulini', 'department' => 'Operation', 'position' => 'Operator', 'email' => 'nina@properindoenviro.co.id', 'phone' => '087731292919', 'role' => 'employee'],
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
                    'status' => 1,
                ]
            );

            $user->assignRole($data['role']);
        }
    }
}
