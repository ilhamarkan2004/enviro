<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Repositories\TaskRepository;

class CronController extends Controller
{
    private $taskRepository;

    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function notifyTasks()
    {
        $result = $this->taskRepository->processNotifications();

        return response()->json([
            'success' => true,
            'message' => 'Notifications processed successfully.',
            'data' => $result
        ]);
    }

    public function sendDailyReport()
    {
        $result = $this->taskRepository->sendDailyReportTelegram();

        if ($result) {
            return response()->json([
                'success' => true,
                'message' => 'Daily report PDF sent successfully via Telegram.'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Failed to send daily report.'
        ], 500);
    }
}
