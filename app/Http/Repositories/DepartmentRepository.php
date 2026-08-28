<?php

namespace App\Http\Repositories;

use App\Models\Department;
use App\Traits\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DepartmentRepository
{
    private $response;
    private $department;

    public function __construct(Response $response, Department $department)
    {
        $this->response = $response;
        $this->department = $department;
    }

    private function validate(): array
    {
        return [
            'name' => 'required|string|max:255',
            'status' => 'required|in:0,1',
        ];
    }

    public function index(Request $request)
    {
        $query = $this->department;

        if ($request->filled('search')) {
            $query = $query->where('name', 'like', '%' . $request->search . '%');
        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    public function index_pagination(Request $request)
    {
        $query = $this->department;

        if ($request->filled('search')) {
            $query = $query->where('name', 'like', '%' . $request->input('search') . '%');
        }

        return $query->orderBy('created_at', 'desc')->paginate(10);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->validate());
        if ($validator->fails()) {
            return $this->response->validationError($validator->errors());
        }

        $data = [
            'name' => $request->input('name'),
            'status' => $request->input('status'),
        ];

        $department = $this->department->updateOrCreate(
            ['id' => $request->input('id')],
            $data
        );

        return $request->filled('id')
            ? $this->response->update($department)
            : $this->response->store($department);
    }

    public function destroy($id)
    {
        $department = $this->department->find($id);

        if (!$department) {
            return $this->response->notFound();
        }

        $department->delete();
        return $this->response->destroy($department);
    }
}
