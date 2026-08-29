<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\TaskHistory;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaskSeeder extends Seeder
{
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
            ['name' => 'Strategi Pemasaran Q4', 'pic_name' => 'Fajar', 'deadline_at' => '2026-11-01 00:00:00', 'status' => 1, 'priority' => 2],
            ['name' => 'Desain Brosur Baru', 'pic_name' => 'Gita', 'deadline_at' => '2026-10-20 00:00:00', 'status' => 0, 'priority' => 1],
            ['name' => 'Review Kontrak Vendor', 'pic_name' => 'Hasan', 'deadline_at' => '2026-09-29 00:00:00', 'status' => 2, 'priority' => 2],
            ['name' => 'Pembuatan Draft MoU', 'pic_name' => 'Intan', 'deadline_at' => '2026-10-05 00:00:00', 'status' => 1, 'priority' => 1],
            ['name' => 'Perencanaan Struktur Mesin', 'pic_name' => 'Joko', 'deadline_at' => '2026-12-01 00:00:00', 'status' => 0, 'priority' => 2],
            ['name' => 'Maintenance Mesin A', 'pic_name' => 'Kiki', 'deadline_at' => '2026-08-24 00:00:00', 'status' => 1, 'priority' => 2],
            ['name' => 'Kalibrasi Sensor', 'pic_name' => 'Lestari', 'deadline_at' => '2026-09-28 00:00:00', 'status' => 2, 'priority' => 1],
            ['name' => 'Inspeksi Lapangan', 'pic_name' => 'Mamat', 'deadline_at' => '2026-10-15 00:00:00', 'status' => 1, 'priority' => 1],
            ['name' => 'Pembersihan Area Produksi', 'pic_name' => 'Nina', 'deadline_at' => '2026-09-30 00:00:00', 'status' => 2, 'priority' => 0],
            ['name' => 'Pengadaan Barang Inventaris', 'pic_name' => 'Sari', 'deadline_at' => '2026-10-02 00:00:00', 'status' => 0, 'priority' => 1],
            ['name' => 'Rekonsiliasi Bank', 'pic_name' => 'Karin', 'deadline_at' => '2026-08-26 00:00:00', 'status' => 1, 'priority' => 2],
            ['name' => 'Pelatihan Keselamatan Kerja', 'pic_name' => 'Eko', 'deadline_at' => '2026-10-10 00:00:00', 'status' => 0, 'priority' => 1],
            ['name' => 'Evaluasi Kinerja Tahunan', 'pic_name' => 'Maya', 'deadline_at' => '2026-12-15 00:00:00', 'status' => 0, 'priority' => 2],
            ['name' => 'Update SOP Lingkungan', 'pic_name' => 'Taufik', 'deadline_at' => '2026-10-25 00:00:00', 'status' => 1, 'priority' => 2],
            ['name' => 'Testing Aplikasi Baru', 'pic_name' => 'Lukman', 'deadline_at' => '2026-09-27 00:00:00', 'status' => 2, 'priority' => 1],
        ];

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
