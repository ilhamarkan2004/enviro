<?php

namespace App\Http\Repositories;

use App\Models\Testimonial;
use App\Traits\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TestimonialRepository
{
    private $response;
    private $testimonial;

    public function __construct(Response $response, Testimonial $testimonial)
    {
        $this->response = $response;
        $this->testimonial = $testimonial;
    }

    private function validate(): array
    {
        return [
            'name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:0,1',
        ];
    }

    private function request(Request $request): array
    {
        return [
            'name' => $request->input('name'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'status' => $request->input('status', 1),
        ];
    }

    public function index_pagination(Request $request)
    {
        $query = $this->testimonial->query();

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

        $testimonial = $this->testimonial->updateOrCreate(
            ['id' => $request->input('id')],
            $data
        );

        return $request->filled('id')
            ? $this->response->update($testimonial)
            : $this->response->store($testimonial);
    }

    public function destroy($id)
    {
        $testimonial = $this->testimonial->find($id);

        if (!$testimonial) {
            return $this->response->notFound();
        }

        $testimonial->delete();
        return $this->response->destroy($testimonial);
    }
}
