<?php

namespace App\Http\Repositories;

use Illuminate\Validation\Rules\Password;


use App\Models\User;
use App\Traits\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;

class ProfilRepository
{
    private $response;

    public function __construct(Response $response)
    {
        $this->response = $response;
    }

    private function profileRules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . Auth::id(),
            'phone_number' => 'nullable|string|max:15',
            'gender' => 'nullable|in:L,P',
            'img' => 'nullable|file|image|max:2048',
        ];
    }

    private function passwordRules()
    {
        return [
            'old_password' => ['required'],
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->mixedCase()
                    ->numbers(),
            ],
        ];
    }



    private function request(Request $request): array
    {
        $data = [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'phone_number' => $request->input('phone_number'),
            'gender' => $request->input('gender'),
        ];

        if ($request->hasFile('img')) {
            $file = $request->file('img');
            $filename = time() . '-' . $file->getClientOriginalName();
            $path = $file->storeAs('profile-images', $filename, 'public');
            $data['img'] = 'storage/' . $path;
        }

        return $data;
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        if ($request->filled('password')) {
            $validator = Validator::make($request->all(), $this->passwordRules());

            if ($validator->fails()) {
                return [
                    'status' => false,
                    'errors' => $validator->errors(),
                ];
            }

            if (!Hash::check($request->old_password, $user->password)) {
                return [
                    'status' => false,
                    'errors' => new MessageBag([
                        'old_password' => ['Password lama tidak sesuai'],
                    ]),
                ];
            }

            $user->update([
                'password' => Hash::make($request->password),
            ]);

            return [
                'status' => true,
                'data' => $user,
            ];
        }
        $validator = Validator::make($request->all(), $this->profileRules());

        if ($validator->fails()) {
            return [
                'status' => false,
                'errors' => $validator->errors(),
            ];
        }

        $data = $this->request($request);
        $user->update($data);

        return [
            'status' => true,
            'data' => $user,
        ];
    }
}
