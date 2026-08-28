<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Repositories\PositionRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PositionController extends Controller
{
    private $position;

    public function __construct(PositionRepository $position)
    {
        $this->middleware('permission:position-index', ['only' => ['index', 'show']]);
        $this->middleware('permission:position-add', ['only' => ['store']]);
        $this->middleware('permission:position-update', ['only' => ['edit', 'store']]);
        $this->middleware('permission:position-delete', ['only' => ['destroy']]);
        $this->position = $position;
    }

    public function index(Request $request)
    {
        $data['positions'] = $this->position->index_pagination($request);
        $data['departments'] = \App\Models\Department::orderBy('name')->get();
        return Inertia::render('Master/Position/Index', compact('data'));
    }

    public function store(Request $request)
    {
        $this->position->store($request);
        return redirect()->back()->with('success', 'Berhasil Menyimpan Data!');
    }

    public function destroy($id)
    {
        $this->position->destroy($id);
        return redirect()->back()->with('success', 'Berhasil Menghapus Data!');
    }
}
