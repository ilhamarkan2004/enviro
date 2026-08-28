<?php

namespace App\Http\Repositories;

use App\Models\Position;
use App\Traits\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PositionRepository
{
    private $response;
    private $position;

    public function __construct(Response $response, Position $position)
    {
        $this->response = $response;
        $this->position = $position;
    }

    private function validate(): array
    {
        return [
            'name' => 'required|string|max:255',
            'department_id' => 'required|exists:departments,id',
            'status' => 'required|in:0,1',
        ];
    }

    public function index(Request $request)
    {
        $query = $this->position->with('department');

        if ($request->filled('search')) {
            $query = $query->where('name', 'like', '%' . $request->search . '%');
        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    public function index_pagination(Request $request)
    {
        $query = $this->position->with('department');

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
            'department_id' => $request->input('department_id'),
            'status' => $request->input('status'),
        ];

        $position = $this->position->updateOrCreate(
            ['id' => $request->input('id')],
            $data
        );

        return $request->filled('id')
            ? $this->response->update($position)
            : $this->response->store($position);
    }

    public function destroy($id)
    {
        $position = $this->position->find($id);

        if (!$position) {
            return $this->response->notFound();
        }

        $position->delete();
        return $this->response->destroy($position);
    }
}
