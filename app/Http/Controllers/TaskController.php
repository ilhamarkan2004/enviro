<?php

namespace App\Http\Controllers;

use App\Http\Repositories\TaskRepository;
use App\Models\Department;
use App\Models\Position;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Exports\TasksExport;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;

class TaskController extends Controller
{
    protected $taskRepository;

    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function index(Request $request)
    {
        $tasks = $this->taskRepository->index($request);
        $user = auth()->user();
        if ($user && !$user->hasRole('admin')) {
            $departments = Department::where('id', $user->department_id)->get();
            $positions = Position::where('department_id', $user->department_id)->get();
            $users = User::where('department_id', $user->department_id)->get();
        } else {
            $departments = Department::all();
            $positions = Position::all();
            $users = User::all();
        }

        return Inertia::render('Operasional/Pekerjaan/Index', compact('tasks', 'departments', 'positions', 'users'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'department_id' => 'required|exists:departments,id',
            'user_id' => 'required|exists:users,id',
            'deadline_at' => 'nullable|date',
        ]);

        $this->taskRepository->store($request);
        return back();
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'department_id' => 'required|exists:departments,id',
            'user_id' => 'required|exists:users,id',
            'deadline_at' => 'nullable|date',
            'status' => 'required|integer',
        ]);

        $this->taskRepository->update($request, $id);
        return back();
    }

    public function destroy($id)
    {
        $this->taskRepository->destroy($id);
        return back();
    }

    public function exportPdf(Request $request)
    {
        $tasks = $this->taskRepository->getExportData($request);
        
        $pdf = Pdf::loadView('exports.tasks-pdf', compact('tasks'));
        return $pdf->stream('laporan-pekerjaan.pdf');
    }

    public function exportExcel(Request $request)
    {
        $tasks = $this->taskRepository->getExportData($request);
        return Excel::download(new TasksExport($tasks), 'laporan-pekerjaan.xlsx');
    }
}
