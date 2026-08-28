<?php

namespace App\Http\Repositories;

use App\Models\Layanan;
use App\Traits\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class LayananRepository
{
    private $response;
    private $layanan;

    public function __construct(Response $response, Layanan $layanan)
    {
        $this->response = $response;
        $this->layanan = $layanan;
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
            $path = $file->storeAs('layanan-images', $filename, 'public');
            $data['img'] = 'storage/' . $path;
        }

        return $data;
    }

    public function index_pagination(Request $request)
    {
        $query = $this->layanan->query();

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
            $existing = $this->layanan->find($request->id);
            if ($existing && $existing->img && $request->hasFile('img')) {
                if (Storage::disk('public')->exists(str_replace('storage/', '', $existing->img))) {
                    Storage::disk('public')->delete(str_replace('storage/', '', $existing->img));
                }
            }
        }

        $layanan = $this->layanan->updateOrCreate(
            ['id' => $request->input('id')],
            $data
        );

        return $request->filled('id')
            ? $this->response->update($layanan)
            : $this->response->store($layanan);
    }

    public function destroy($id)
    {
        $layanan = $this->layanan->find($id);

        if (!$layanan) {
            return $this->response->notFound();
        }

        if ($layanan->img && Storage::disk('public')->exists(str_replace('storage/', '', $layanan->img))) {
            Storage::disk('public')->delete(str_replace('storage/', '', $layanan->img));
        }

        $layanan->delete();
        return $this->response->destroy($layanan);
    }
}
