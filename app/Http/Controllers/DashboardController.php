<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskHistory;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $isNotAdmin = $user && !$user->hasRole('admin');
        $departmentId = $user->department_id;
        $filterDate = $request->input('date');

        $usersQuery = User::query();
        if ($isNotAdmin) {
            $usersQuery->where('department_id', $departmentId);
        }
        $totalEmployees = $usersQuery->count();

        $tasksQuery = Task::query();
        if ($isNotAdmin) {
            $tasksQuery->where('department_id', $departmentId);
        }
        if ($filterDate) {
            $tasksQuery->whereDate('created_at', $filterDate);
        }

        $totalTasks = $tasksQuery->count();
        $completedTasks = (clone $tasksQuery)->where('status', 2)->count();
        $overdueTasks = (clone $tasksQuery)->where('status', '!=', 2)->where('deadline_at', '<', now())->count();

        $statusProses = (clone $tasksQuery)->where('status', 1)->where('deadline_at', '>=', now())->count();
        $statusBelumMulai = (clone $tasksQuery)->where('status', 0)->where('deadline_at', '>=', now())->count();
        
        $chartStatus = [
            'Proses' => $statusProses,
            'Selesai' => $completedTasks,
            'Belum Mulai' => $statusBelumMulai,
            'Terlambat' => $overdueTasks,
        ];

        $picWorkload = (clone $tasksQuery)
            ->select('user_id', DB::raw('count(*) as total'))
            ->groupBy('user_id')
            ->with('pic:id,name')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->pic ? explode(' ', $item->pic->name)[0] : 'Unknown',
                    'total' => $item->total,
                ];
            })
            ->sortByDesc('total')
            ->take(8)
            ->values();

        $upcomingDeadlines = (clone $tasksQuery)
            ->with('pic:id,name')
            ->where('status', '!=', 2)
            ->orderBy('deadline_at', 'asc')
            ->limit(5)
            ->get();

        $recentActivitiesQuery = TaskHistory::with(['task:id,name', 'creator:id,name']);
        if ($isNotAdmin) {
            $recentActivitiesQuery->whereHas('task', function($q) use ($departmentId) {
                $q->where('department_id', $departmentId);
            });
        }
        if ($filterDate) {
            $recentActivitiesQuery->whereDate('created_at', $filterDate);
        }
        $recentActivities = $recentActivitiesQuery->orderBy('created_at', 'desc')->limit(5)->get();

        $departmentWorkload = (clone $tasksQuery)
            ->select('department_id', 
                DB::raw('SUM(CASE WHEN status = 2 THEN 1 ELSE 0 END) as selesai'),
                DB::raw('SUM(CASE WHEN status != 2 AND deadline_at < NOW() THEN 1 ELSE 0 END) as terlambat'),
                DB::raw('SUM(CASE WHEN status = 1 AND deadline_at >= NOW() THEN 1 ELSE 0 END) as proses'),
                DB::raw('SUM(CASE WHEN status = 0 AND deadline_at >= NOW() THEN 1 ELSE 0 END) as belum_mulai')
            )
            ->groupBy('department_id')
            ->with('department:id,name')
            ->get()
            ->map(function ($item) {
                return [
                    'department' => $item->department ? $item->department->name : 'Unknown',
                    'selesai' => (int)$item->selesai,
                    'terlambat' => (int)$item->terlambat,
                    'proses' => (int)$item->proses,
                    'belum_mulai' => (int)$item->belum_mulai,
                ];
            })
            ->values();

        return Inertia::render('Dashboard/Index', [
            'metrics' => [
                'totalEmployees' => $totalEmployees,
                'totalTasks' => $totalTasks,
                'overdueTasks' => $overdueTasks,
                'completedTasks' => $completedTasks,
            ],
            'chartStatus' => $chartStatus,
            'picWorkload' => $picWorkload,
            'upcomingDeadlines' => $upcomingDeadlines,
            'recentActivities' => $recentActivities,
            'departmentWorkload' => $departmentWorkload,
            'currentDate' => now()->format('d F Y'),
            'filterDate' => $filterDate,
        ]);
    }
}
