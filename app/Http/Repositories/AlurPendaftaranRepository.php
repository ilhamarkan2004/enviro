<?php

namespace App\Http\Repositories;

use App\Models\AlurPendaftaran;
use Illuminate\Http\Request;

class AlurPendaftaranRepository
{
    protected $model;

    public function __construct(AlurPendaftaran $model)
    {
        $this->model = $model;
    }

    public function getAll(Request $request)
    {
        return $this->model
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->latest()
            ->paginate(10);
    }

    public function validationRules()
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:0,1',
        ];
    }

    public function store(Request $request)
    {
        $data = [
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'status' => $request->input('status', 1),
        ];

        return $this->model->create($data);
    }

    public function update(Request $request, $id)
    {
        $alurPendaftaran = $this->model->findOrFail($id);

        $data = [
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'status' => $request->input('status', 1),
        ];

        return $alurPendaftaran->update($data);
    }

    public function destroy($id)
    {
        $alurPendaftaran = $this->model->findOrFail($id);
        return $alurPendaftaran->delete();
    }
}
