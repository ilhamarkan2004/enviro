<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Repositories\DepartmentRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    private $department;

    public function __construct(DepartmentRepository $department)
    {
        $this->middleware('permission:department-index', ['only' => ['index', 'show']]);
        $this->middleware('permission:department-add', ['only' => ['store']]);
        $this->middleware('permission:department-update', ['only' => ['edit', 'store']]);
        $this->middleware('permission:department-delete', ['only' => ['destroy']]);
        $this->department = $department;
    }

    public function index(Request $request)
    {
        $data['departments'] = $this->department->index_pagination($request);
        return Inertia::render('Master/Department/Index', compact('data'));
    }

    public function store(Request $request)
    {
        $this->department->store($request);
        return redirect()->back()->with('success', 'Berhasil Menyimpan Data!');
    }

    public function destroy($id)
    {
        $this->department->destroy($id);
        return redirect()->back()->with('success', 'Berhasil Menghapus Data!');
    }
}
