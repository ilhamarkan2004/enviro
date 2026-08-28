<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class TasksExport implements FromView, ShouldAutoSize
{
    protected $tasks;

    public function __construct($tasks)
    {
        $this->tasks = $tasks;
    }

    public function view(): View
    {
        return view('exports.tasks-excel', [
            'tasks' => $this->tasks
        ]);
    }
}
