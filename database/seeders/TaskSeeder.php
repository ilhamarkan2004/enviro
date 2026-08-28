<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\TaskHistory;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tasksData = [
            ['name' => 'Pembuatan laporan PROPER Tahunan', 'pic_name' => 'Andi', 'deadline_at' => '2026-09-30 00:00:00', 'status' => 1, 'priority' => 2],
            ['name' => 'Update database perusahaan', 'pic_name' => 'Budi', 'deadline_at' => '2026-09-25 00:00:00', 'status' => 0, 'priority' => 1],
            ['name' => 'Review dokumen lingkungan', 'pic_name' => 'Dewi', 'deadline_at' => '2026-09-28 00:00:00', 'status' => 2, 'priority' => 1],
            ['name' => 'Pembuatan invoice proyek', 'pic_name' => 'Citra', 'deadline_at' => '2026-09-27 00:00:00', 'status' => 1, 'priority' => 2],
            ['name' => 'Backup database server', 'pic_name' => 'Hendra', 'deadline_at' => '2026-09-26 00:00:00', 'status' => 2, 'priority' => 2],
            ['name' => 'Pembuatan dashboard monitoring', 'pic_name' => 'Lukman', 'deadline_at' => '2026-10-05 00:00:00', 'status' => 1, 'priority' => 2],
            ['name' => 'Rekap absensi karyawan', 'pic_name' => 'Sari', 'deadline_at' => '2026-10-01 00:00:00', 'status' => 0, 'priority' => 0],
            ['name' => 'Audit dokumen internal', 'pic_name' => 'Maya', 'deadline_at' => '2026-10-10 00:00:00', 'status' => 0, 'priority' => 1],
            ['name' => 'Pembuatan laporan keuangan', 'pic_name' => 'Karin', 'deadline_at' => '2026-10-15 00:00:00', 'status' => 1, 'priority' => 2],
            ['name' => 'Perbaikan sistem aplikasi', 'pic_name' => 'Rizky', 'deadline_at' => '2026-10-12 00:00:00', 'status' => 1, 'priority' => 2],
        ];

        // get a fallback user in case a name doesn't exist (e.g. superadmin)
        $fallbackUser = User::first();

        DB::beginTransaction();
        try {
            foreach ($tasksData as $data) {
                $user = User::where('name', 'like', '%' . $data['pic_name'] . '%')->first();
                $userId = $user ? $user->id : ($fallbackUser ? $fallbackUser->id : 1);
                $departmentId = $user && $user->position ? $user->position->department_id : ($fallbackUser && $fallbackUser->position ? $fallbackUser->position->department_id : 1);

                $task = Task::create([
                    'name' => $data['name'],
                    'department_id' => $departmentId,
                    'user_id' => $userId,
                    'created_by' => $fallbackUser ? $fallbackUser->id : 1,
                    'deadline_at' => $data['deadline_at'],
                    'status' => $data['status'],
                    'priority' => $data['priority'],
                    'created_at' => now()->subDays(5),
                    'updated_at' => now()->subDays(5),
                ]);

                TaskHistory::create([
                    'task_id' => $task->id,
                    'status' => 0,
                    'notes' => 'Pekerjaan dibuat',
                    'created_by' => $fallbackUser ? $fallbackUser->id : 1,
                    'created_at' => now()->subDays(5),
                    'updated_at' => now()->subDays(5),
                ]);

                if ($data['status'] >= 1) {
                    TaskHistory::create([
                        'task_id' => $task->id,
                        'status' => 1,
                        'notes' => 'Pekerjaan mulai diproses',
                        'created_by' => $userId,
                        'created_at' => now()->subDays(3),
                        'updated_at' => now()->subDays(3),
                    ]);
                }

                if ($data['status'] == 2) {
                    TaskHistory::create([
                        'task_id' => $task->id,
                        'status' => 2,
                        'notes' => 'Pekerjaan telah selesai',
                        'created_by' => $userId,
                        'created_at' => now()->subDays(1),
                        'updated_at' => now()->subDays(1),
                    ]);
                }
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
