<?php

namespace App\Http\Repositories;

use App\Models\Kontak;
use App\Traits\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class KontakRepository
{
    private $response;
    private $kontak;

    public function __construct(Response $response, Kontak $kontak)
    {
        $this->response = $response;
        $this->kontak = $kontak;
    }

    private function validate(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'url' => 'nullable|string',
            'status' => 'required|in:0,1',
            'img' => 'nullable|image|max:2048',
        ];
    }

    private function request(Request $request): array
    {
        $data = [
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'url' => $request->input('url'),
            'status' => $request->input('status', 1),
        ];

        if ($request->hasFile('img')) {
            $file = $request->file('img');
            $filename = time() . '-' . $file->getClientOriginalName();
            $path = $file->storeAs('kontak-images', $filename, 'public');
            $data['img'] = 'storage/' . $path;
        }

        return $data;
    }

    public function index_pagination(Request $request)
    {
        $query = $this->kontak->query();

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
            $existing = $this->kontak->find($request->id);
            if ($existing && $existing->img && $request->hasFile('img')) {
                if (Storage::disk('public')->exists(str_replace('storage/', '', $existing->img))) {
                    Storage::disk('public')->delete(str_replace('storage/', '', $existing->img));
                }
            }
        }

        $kontak = $this->kontak->updateOrCreate(
            ['id' => $request->input('id')],
            $data
        );

        return $request->filled('id')
            ? $this->response->update($kontak)
            : $this->response->store($kontak);
    }

    public function destroy($id)
    {
        $kontak = $this->kontak->find($id);

        if (!$kontak) {
            return $this->response->notFound();
        }

        if ($kontak->img && Storage::disk('public')->exists(str_replace('storage/', '', $kontak->img))) {
            Storage::disk('public')->delete(str_replace('storage/', '', $kontak->img));
        }

        $kontak->delete();
        return $this->response->destroy($kontak);
    }
}
