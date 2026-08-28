<?php

namespace App\Http\Repositories;

use App\Models\Keunggulan;
use App\Traits\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class KeunggulanRepository
{
    private $response;
    private $keunggulan;

    public function __construct(Response $response, Keunggulan $keunggulan)
    {
        $this->response = $response;
        $this->keunggulan = $keunggulan;
    }

    private function validate(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:0,1',
            'img' => 'nullable|image|max:2048',
        ];
    }

    private function request(Request $request): array
    {
        $data = [
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'status' => $request->input('status', 1),
        ];

        if ($request->hasFile('img')) {
            $file = $request->file('img');
            $filename = time() . '-' . $file->getClientOriginalName();
            $path = $file->storeAs('keunggulan-images', $filename, 'public');
            $data['img'] = 'storage/' . $path;
        }

        return $data;
    }

    public function index_pagination(Request $request)
    {
        $query = $this->keunggulan->query();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->input('search') . '%');
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
            $existing = $this->keunggulan->find($request->id);
            if ($existing && $existing->img && $request->hasFile('img')) {
                if (Storage::disk('public')->exists(str_replace('storage/', '', $existing->img))) {
                    Storage::disk('public')->delete(str_replace('storage/', '', $existing->img));
                }
            }
        }

        $keunggulan = $this->keunggulan->updateOrCreate(
            ['id' => $request->input('id')],
            $data
        );

        return $request->filled('id')
            ? $this->response->update($keunggulan)
            : $this->response->store($keunggulan);
    }

    public function destroy($id)
    {
        $keunggulan = $this->keunggulan->find($id);

        if (!$keunggulan) {
            return $this->response->notFound();
        }

        if ($keunggulan->img && Storage::disk('public')->exists(str_replace('storage/', '', $keunggulan->img))) {
            Storage::disk('public')->delete(str_replace('storage/', '', $keunggulan->img));
        }

        $keunggulan->delete();
        return $this->response->destroy($keunggulan);
    }
}
