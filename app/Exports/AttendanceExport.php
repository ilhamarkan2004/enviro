<?php

namespace App\Exports;

use App\Http\Repositories\AttendanceRepository;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\Exportable;

class AttendanceExport implements FromView
{
    use Exportable;

    protected $request;
    protected $attendance;

    public function __construct(Request $request, AttendanceRepository $attendance)
    {
        $this->request = $request;
        $this->attendance = $attendance;
    }


    public function view(): View
    {
        $data = $this->attendance->index(
            $this->request,
        );


        return view('exports.attendance', [
            'data' => $data,
        ]);
    }
}
