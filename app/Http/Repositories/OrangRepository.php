<?php

namespace App\Http\Repositories;

use App\Models\Assignment;
use App\Models\AssignmentFile;
use App\Models\User;
use App\Traits\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class OrangRepository
{
    private $response;
    private $user;
    private $assignmentFile;

    public function __construct(Response $response, User $user, AssignmentFile $assignmentFile)
    {
        $this->response = $response;
        $this->user = $user;
        $this->assignmentFile = $assignmentFile;
    }

    private function validate($id = null): array
    {
        return [
            'class_id'    => 'required|exists:classes,id',
            'name'        => 'required|string',
            'email'    => 'required|email|unique:users,email',
            'password'        => 'nullable',
            'gender'        => 'nullable',
            'phone_number' => 'nullable|regex:/^[0-9]+$/|digits_between:10,15',
            'role' => 'nullable|string',
        ];
    }

    private function request(Request $request, $isUpdate = false): array
    {
        return [
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make(
                $request->filled('password') ? $request->password : 'password'
            ),
            'gender'   => $request->gender,
            'phone_number'   => $request->phone_number,
        ];
    }


    public function index_pagination(Request $request)
    {
        $query = $this->user->query();
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }
        if ($request->filled('role')) {
            if ($request->role === 'guru') {
                $query
                    ->whereHas('roles', fn($q) => $q->where('name', 'guru'))
                    ->with('teachingClasses');

                if ($request->filled('slug')) {
                    $query->whereHas(
                        'teachingClasses',
                        fn($q) =>
                        $q->where('slug', $request->slug)
                    );
                }
            }

            if (in_array($request->role, ['user'])) {
                $query
                    ->whereHas('roles', fn($q) => $q->whereIn('name', ['user']))
                    ->with('classes');

                if ($request->filled('slug')) {
                    $query->whereHas(
                        'classes',
                        fn($q) =>
                        $q->where('slug', $request->slug)
                    );
                }
            }
        } else {
            $query->with(['classes', 'teachingClasses']);
        }

        return $query->latest()->paginate(10);
    }


    public function index(Request $request)
    {
        $query = $this->user->query();
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }
        if ($request->filled('role')) {
            if ($request->role === 'guru') {
                $query
                    ->whereHas('roles', fn($q) => $q->where('name', 'guru'))
                    ->with('teachingClasses');

                if ($request->filled('slug')) {
                    $query->whereHas(
                        'teachingClasses',
                        fn($q) =>
                        $q->where('slug', $request->slug)
                    );
                }
            }

            if (in_array($request->role, ['user'])) {
                $query
                    ->whereHas('roles', fn($q) => $q->whereIn('name', ['user']))
                    ->with('classes');

                if ($request->filled('slug')) {
                    $query->whereHas(
                        'classes',
                        fn($q) =>
                        $q->where('slug', $request->slug)
                    );
                }
            }
        } else {
            $query->with(['classes', 'teachingClasses']);
        }

        return $query->latest()->get();
    }
    public function countSiswa(Request $request)
    {
        $query = $this->user
            ->whereHas('roles', fn($q) => $q->where('name', 'user'));

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('slug')) {
            $query->whereHas(
                'classes',
                fn($q) =>
                $q->where('slug', $request->slug)
            );
        }

        return $query->count();
    }


    // public function show($slug)
    // {
    //     $user = $this->user->with(['class', 'teacher', 'attachments'])
    //         ->where('slug', $slug)
    //         ->first();

    //     if (!$assignment) {
    //         abort(404);
    //     }

    //     return $assignment;
    // }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->validate());

        if ($validator->fails()) {
            throw ValidationException::withMessages(
                $validator->errors()->toArray()
            );
        }
        $user = $this->user->create(
            $this->request($request)
        );
        $user->assignRole($request->role);
        if ($request->role === 'guru') {
            $user->teachingClasses()->attach([
                $request->class_id => [
                    'teacher_id' => $user->id
                ]
            ]);
        }

        if ($request->role === 'user') {
            $user->classes()->syncWithoutDetaching([
                $request->class_id
            ]);
        }

        return $this->response->store(
            $user->load(['roles', 'classes', 'teachingClasses']),
            'User berhasil dibuat dan dimasukkan ke kelas'
        );
    }





    public function bulk_destroy(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ids'      => 'required|array|min:1',
            'ids.*'    => 'exists:users,id',
            'class_id' => 'required|exists:classes,id',
            'role'     => 'required|in:guru,user',
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages(
                $validator->errors()->toArray()
            );
        }

        $users = $this->user->whereIn('id', $request->ids)->get();

        foreach ($users as $user) {
            if ($request->role === 'guru') {
                $user->teachingClasses()->detach($request->class_id);
            }

            if ($request->role === 'user') {
                $user->classes()->detach($request->class_id);
            }
        }

        return $this->response->destroy(
            'Berhasil mengeluarkan user dari kelas'
        );
    }


    public function deleteAttachment($id)
    {
        $attachment = $this->assignmentFile->find($id);

        if (!$attachment) {
            return $this->response->notFound();
        }

        if (Storage::exists(str_replace('storage/', '', $attachment->file_path))) {
            Storage::delete(str_replace('storage/', '', $attachment->file_path));
        }

        $attachment->delete();
        return $this->response->destroy('File berhasil dihapus!');
    }
}
