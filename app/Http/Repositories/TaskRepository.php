<?php

namespace App\Http\Repositories;

use App\Models\Task;
use App\Models\TaskHistory;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TaskRepository
{
    public function index($request)
    {
        $search = $request->search;
        $department_id = $request->department_id;
        $position_id = $request->position_id;
        $user_id = $request->user_id;
        $start_date = $request->start_date;
        $end_date = $request->end_date;
        $status = $request->status;
        $priority = $request->priority;
        $created_start_date = $request->created_start_date;
        $created_end_date = $request->created_end_date;
        $is_overdue = $request->is_overdue;

        $user = auth()->user();
        $isNotAdmin = $user && !$user->hasRole('admin');

        $tasks = Task::with(['department', 'pic.position.department', 'creator', 'histories.creator'])
            ->when($isNotAdmin, function ($query) use ($user) {
                $query->where('department_id', $user->department_id);
            })
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhereHas('pic', function ($q2) use ($search) {
                          $q2->where('name', 'like', "%{$search}%");
                      });
                });
            })
            ->when($department_id, function ($query, $department_id) {
                $query->whereHas('pic.position', function ($q) use ($department_id) {
                    $q->where('department_id', $department_id);
                });
            })
            ->when($position_id, function ($query, $position_id) {
                $query->whereHas('pic', function ($q) use ($position_id) {
                    $q->where('position_id', $position_id);
                });
            })
            ->when($user_id, function ($query, $user_id) {
                $query->where('user_id', $user_id);
            })
            ->when($start_date, function ($query, $start_date) {
                $query->whereDate('deadline_at', '>=', $start_date);
            })
            ->when($end_date, function ($query, $end_date) {
                $query->whereDate('deadline_at', '<=', $end_date);
            })
            ->when($created_start_date, function ($query, $created_start_date) {
                $query->whereDate('created_at', '>=', $created_start_date);
            })
            ->when($created_end_date, function ($query, $created_end_date) {
                $query->whereDate('created_at', '<=', $created_end_date);
            })
            ->when($status !== null && $status !== '', function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->when($priority !== null && $priority !== '', function ($query) use ($priority) {
                $query->where('priority', $priority);
            })
            ->when($is_overdue === '1', function ($query) {
                $query->where('deadline_at', '<', now())->where('status', '!=', 2);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return $tasks;
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {
            $task = Task::create([
                'name' => $request->name,
                'department_id' => $request->department_id,
                'user_id' => $request->user_id,
                'created_by' => auth()->id(),
                'deadline_at' => $request->deadline_at,
                'status' => $request->status ?? 0,
                'priority' => $request->priority ?? 0,
            ]);

            TaskHistory::create([
                'task_id' => $task->id,
                'status' => $task->status,
                'notes' => $request->notes ?? 'Data pekerjaan ditambahkan',
                'created_by' => auth()->id(),
            ]);

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Task store error: ' . $e->getMessage());
            return false;
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {
            $task = Task::findOrFail($id);
            
            $oldStatus = $task->status;
            $oldDeadline = $task->deadline_at;
            
            $updateData = [
                'name' => $request->name,
                'department_id' => $request->department_id,
                'user_id' => $request->user_id,
                'deadline_at' => $request->deadline_at,
                'status' => $request->status,
                'priority' => $request->priority,
            ];

            // Reset notifikasi jika deadline berubah
            if (strtotime($oldDeadline) != strtotime($request->deadline_at)) {
                $updateData['is_reminded'] = false;
                $updateData['is_overdue_notified'] = false;
            }

            $task->update($updateData);

            // Jika status berubah atau ada catatan
            if ($oldStatus != $request->status || !empty($request->notes)) {
                TaskHistory::create([
                    'task_id' => $task->id,
                    'status' => $task->status,
                    'notes' => $request->notes ?? 'Update data pekerjaan',
                    'created_by' => auth()->id(),
                ]);
            }

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Task update error: ' . $e->getMessage());
            return false;
        }
    }

    public function destroy($id)
    {
        try {
            $task = Task::findOrFail($id);
            $task->delete();
            return true;
        } catch (\Exception $e) {
            Log::error('Task destroy error: ' . $e->getMessage());
            return false;
        }
    }

    public function getExportData($request)
    {
        $search = $request->search;
        $department_id = $request->department_id;
        $position_id = $request->position_id;
        $user_id = $request->user_id;
        $start_date = $request->start_date;
        $end_date = $request->end_date;
        $status = $request->status;
        $priority = $request->priority;
        $created_start_date = $request->created_start_date;
        $created_end_date = $request->created_end_date;
        $is_overdue = $request->is_overdue;

        $user = auth()->user();
        $isNotAdmin = $user && !$user->hasRole('admin');

        return Task::with(['department', 'pic.position.department', 'creator', 'histories.creator'])
            ->when($isNotAdmin, function ($query) use ($user) {
                $query->where('department_id', $user->department_id);
            })
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhereHas('pic', function ($q2) use ($search) {
                          $q2->where('name', 'like', "%{$search}%");
                      });
                });
            })
            ->when($department_id, function ($query, $department_id) {
                $query->whereHas('pic.position', function ($q) use ($department_id) {
                    $q->where('department_id', $department_id);
                });
            })
            ->when($position_id, function ($query, $position_id) {
                $query->whereHas('pic', function ($q) use ($position_id) {
                    $q->where('position_id', $position_id);
                });
            })
            ->when($user_id, function ($query, $user_id) {
                $query->where('user_id', $user_id);
            })
            ->when($start_date, function ($query, $start_date) {
                $query->whereDate('deadline_at', '>=', $start_date);
            })
            ->when($end_date, function ($query, $end_date) {
                $query->whereDate('deadline_at', '<=', $end_date);
            })
            ->when($created_start_date, function ($query, $created_start_date) {
                $query->whereDate('created_at', '>=', $created_start_date);
            })
            ->when($created_end_date, function ($query, $created_end_date) {
                $query->whereDate('created_at', '<=', $created_end_date);
            })
            ->when($status !== null && $status !== '', function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->when($priority !== null && $priority !== '', function ($query) use ($priority) {
                $query->where('priority', $priority);
            })
            ->when($is_overdue === '1', function ($query) {
                $query->where('deadline_at', '<', now())->where('status', '!=', 2);
            })
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function processNotifications()
    {
        $now = now();
        $reminderTasks = Task::with('pic')
            ->where('status', '!=', 2)
            ->where('is_reminded', false)
            ->whereBetween('deadline_at', [$now, $now->copy()->addMinutes(15)])
            ->get();

        foreach ($reminderTasks as $task) {
            $spvs = User::role('spv')->where('department_id', $task->department_id)->get();

            if ($task->pic && $task->pic->phone_number) {
                $message = "Halo {$task->pic->name},\n\nPengingat! Pekerjaan *{$task->name}* akan mendekati deadline dalam waktu kurang dari 15 menit pada " . date('d/m/Y H:i', strtotime($task->deadline_at)) . ".\n\nMohon segera diselesaikan.";
                $this->sendWhatsAppMessage($task->pic->phone_number, $message);
            }

            foreach ($spvs as $spv) {
                if ($spv->phone_number) {
                    $messageSpv = "Halo {$spv->name},\n\nPengingat! Pekerjaan *{$task->name}* (PIC: " . ($task->pic->name ?? '-') . ") akan mendekati deadline dalam waktu kurang dari 15 menit pada " . date('d/m/Y H:i', strtotime($task->deadline_at)) . ".";
                    $this->sendWhatsAppMessage($spv->phone_number, $messageSpv);
                }
            }

            $task->update(['is_reminded' => true]);
        }

        $overdueTasks = Task::with('pic')
            ->where('status', '!=', 2)
            ->where('is_overdue_notified', false)
            ->where('deadline_at', '<', $now)
            ->get();

        foreach ($overdueTasks as $task) {
            $spvs = User::role('spv')->where('department_id', $task->department_id)->get();

            if ($task->pic && $task->pic->phone_number) {
                $message = "Halo {$task->pic->name},\n\nPekerjaan *{$task->name}* telah melewati batas waktu (Overdue) pada " . date('d/m/Y H:i', strtotime($task->deadline_at)) . ".\n\nMohon segera ditindaklanjuti.";
                $this->sendWhatsAppMessage($task->pic->phone_number, $message);
            }

            foreach ($spvs as $spv) {
                if ($spv->phone_number) {
                    $messageSpv = "Halo {$spv->name},\n\nPekerjaan *{$task->name}* (PIC: " . ($task->pic->name ?? '-') . ") telah melewati batas waktu (Overdue) pada " . date('d/m/Y H:i', strtotime($task->deadline_at)) . ".";
                    $this->sendWhatsAppMessage($spv->phone_number, $messageSpv);
                }
            }

            $task->update(['is_overdue_notified' => true]);
        }

        return [
            'reminders_sent' => $reminderTasks->count(),
            'overdue_sent' => $overdueTasks->count(),
        ];
    }

    private function sendWhatsAppMessage($target, $message)
    {
        try {
            $token = env('FONNTE_TOKEN');
            if (!$token) {
                Log::warning('FONNTE_TOKEN is not set.');
                return;
            }

            \Illuminate\Support\Facades\Http::withHeaders([
                'Authorization' => $token
            ])->post('https://api.fonnte.com/send', [
                'target' => $target,
                'message' => $message,
            ]);
        } catch (\Exception $e) {
            Log::error('Fonnte send error: ' . $e->getMessage());
        }
    }

    public function sendDailyReportTelegram()
    {
        try {
            $token = env('TELEGRAM_BOT_TOKEN');
            $chatId = env('TELEGRAM_CHAT_ID');

            if (!$token || !$chatId) {
                Log::warning('Telegram credentials not set.');
                return false;
            }

            // Get non-completed tasks
            $tasks = Task::with(['department', 'pic', 'creator'])
                ->where('status', '!=', 2)
                ->orderBy('deadline_at', 'asc')
                ->get();

            // Render PDF using DOMPDF
            $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('exports.tasks-pdf', ['tasks' => $tasks])
                ->setPaper('a4', 'landscape');
            $pdfContent = $pdf->output();

            // Send to Telegram
            $caption = "Laporan Pekerjaan Aktif (Belum Selesai)\nTanggal: " . now()->format('d M Y');
            
            $response = \Illuminate\Support\Facades\Http::attach(
                'document', 
                $pdfContent, 
                'Laporan_Pekerjaan_' . now()->format('Ymd') . '.pdf'
            )->post("https://api.telegram.org/bot{$token}/sendDocument", [
                'chat_id' => $chatId,
                'caption' => $caption
            ]);

            if ($response->successful()) {
                return true;
            } else {
                Log::error('Telegram send error: ' . $response->body());
                return false;
            }
        } catch (\Exception $e) {
            Log::error('Daily report telegram error: ' . $e->getMessage());
            return false;
        }
    }
}
