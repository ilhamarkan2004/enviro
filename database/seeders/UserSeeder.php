<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'user-index',
            'user-add',
            'user-update',
            'user-delete',
            'role-index',
            'role-add',
            'role-update',
            'role-delete',
            'department-index',
            'department-add',
            'department-update',
            'department-delete',
            'position-index',
            'position-add',
            'position-update',
            'position-delete',
            'pekerjaan-index',
            'pekerjaan-add',
            'pekerjaan-update',
            'pekerjaan-delete',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }

        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $spvRole = Role::firstOrCreate(['name' => 'spv']);
        $employeeRole = Role::firstOrCreate(['name' => 'employee']);

        $allPermissions = Permission::all();
        $adminRole->syncPermissions($allPermissions);

        $pekerjaanPermissions = Permission::where('name', 'like', 'pekerjaan-%')->get();
        $spvRole->syncPermissions($pekerjaanPermissions);
        
        $employeePermissions = Permission::where('name', 'like', 'pekerjaan-%')
            ->where('name', '!=', 'pekerjaan-delete')
            ->get();
        $employeeRole->syncPermissions($employeePermissions);

        $admin = User::firstOrCreate(['email' => 'admin@example.com'], [
            'name' => 'Admin',
            'phone_number' => '0812346677884',
            'gender' => 'L',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        $admin->assignRole('admin');
    }
}
