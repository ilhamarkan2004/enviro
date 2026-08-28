<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Repositories\ProfilRepository;
use App\Traits\Response;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfilController extends Controller
{
    private $profil;
    private $response;

    public function __construct(
        Response $response,
        ProfilRepository $profil
    ) {
        $this->response = $response;
        $this->profil = $profil;
    }

    public function index(Request $request)
    {
        return Inertia::render('Akun/Index');
    }
    public function store(Request $request)
    {
        $result = $this->profil->store($request);

        if (!$result['status']) {
            return redirect()
                ->back()
                ->withErrors($result['errors'])
                ->withInput();
        }

        return redirect()
            ->back()
            ->with('success', 'Berhasil memperbarui profil!');
    }
}
