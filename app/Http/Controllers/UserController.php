<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Repositories\DepartmentRepository;
use App\Http\Repositories\PositionRepository;
use App\Http\Repositories\RoleRepository;
use App\Http\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    private $user;
    private $role;
    private $departement;
    private $position;

    public function __construct(UserRepository $user,RoleRepository $role, DepartmentRepository $departement, PositionRepository $position)
    {
        $this->middleware('permission:user-index', ['only' => ['index', 'show']]);
        $this->middleware('permission:user-add', ['only' => ['store']]);
        $this->middleware('permission:user-update', ['only' => ['edit', 'store']]);
        $this->middleware('permission:user-delete', ['only' => ['destroy']]);
        $this->user = $user;
        $this->role = $role;
        $this->departement = $departement;
        $this->position = $position;
    }

    public function index(Request $request)
    {
        $data['users'] = $this->user->index_pagination($request);
        $data['roles'] = $this->role->index($request);
        $data['departements'] = $this->departement->index($request);
        $data['positions'] = $this->position->index($request);
        return Inertia::render('User/Index', compact('data'));
    }

    public function store(Request $request)
    {
        $data =  $this->user->store($request);
        return redirect()->back()->with('success', 'Berhasil Menambahkan Data!');
    }
    public function destroy($id)
    {
        $data = $this->user->destroy($id);
        return redirect()->back()->with('success', 'Berhasil Menghapus Data!');
    }

    public function exportPdf(Request $request)
    {
        $users = $this->user->getExportData($request);
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('exports.users-pdf', compact('users'));
        return $pdf->stream('laporan-user.pdf');
    }

    public function exportExcel(Request $request)
    {
        return \Maatwebsite\Excel\Facades\Excel::download(new \App\Exports\UsersExport($request, $this->user), 'laporan-user.xlsx');
    }
}
