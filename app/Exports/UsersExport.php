<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class UsersExport implements FromView
{
    protected $request;
    protected $userRepository;

    public function __construct($request, $userRepository)
    {
        $this->request = $request;
        $this->userRepository = $userRepository;
    }

    public function view(): View
    {
        $users = $this->userRepository->getExportData($this->request);
        return view('exports.users-excel', [
            'users' => $users
        ]);
    }
}
