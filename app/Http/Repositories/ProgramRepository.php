<?php

namespace App\Http\Repositories;

use App\Models\Program;
use App\Traits\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProgramRepository
{
    private $response;
    private $program;

    public function __construct(Response $response, Program $program)
    {
        $this->response = $response;
        $this->program = $program;
    }

    private function validate(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:0,1',
            'img' => 'nullable|image|max:2048',
        ];
    }

    private function request(Request $request): array
    {
        $data = [
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'status' => $request->input('status', 1),
        ];

        if ($request->hasFile('img')) {
            $file = $request->file('img');
            $filename = time() . '-' . $file->getClientOriginalName();
            $path = $file->storeAs('program-images', $filename, 'public');
            $data['img'] = 'storage/' . $path;
        }

        return $data;
    }

    public function index_pagination(Request $request)
    {
        $query = $this->program->query();

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->input('search') . '%');
        }

        return $query->orderBy('created_at', 'desc')->paginate(10);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->validate());
        if ($validator->fails()) {
            return $this->response->validationError($validator->errors());
        }

        $data = $this->request($request);
        if ($request->filled('id')) {
            $existing = $this->program->find($request->id);
            if ($existing && $existing->img && $request->hasFile('img')) {
                if (Storage::disk('public')->exists(str_replace('storage/', '', $existing->img))) {
                    Storage::disk('public')->delete(str_replace('storage/', '', $existing->img));
                }
            }
        }

        $program = $this->program->updateOrCreate(
            ['id' => $request->input('id')],
            $data
        );

        return $request->filled('id')
            ? $this->response->update($program)
            : $this->response->store($program);
    }

    public function destroy($id)
    {
        $program = $this->program->find($id);

        if (!$program) {
            return $this->response->notFound();
        }

        if ($program->img && Storage::disk('public')->exists(str_replace('storage/', '', $program->img))) {
            Storage::disk('public')->delete(str_replace('storage/', '', $program->img));
        }

        $program->delete();
        return $this->response->destroy($program);
    }
}
