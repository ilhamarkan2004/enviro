<?php

namespace App\Exports;

use App\Http\Repositories\AttendanceRecordRepository;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\Exportable;

class AttendanceRecordExport implements FromView
{
    use Exportable;

    protected $request;
    protected $attendanceRecord;
    protected $kelasSlug;
    protected $attendanceSlug;

    public function __construct(Request $request, AttendanceRecordRepository $attendanceRecord, $attendanceSlug, $kelasSlug)
    {
        $this->request = $request;
        $this->attendanceRecord = $attendanceRecord;
        $this->kelasSlug = $kelasSlug;
        $this->attendanceSlug = $attendanceSlug;
    }


    public function view(): View
    {
        $data = $this->attendanceRecord->index(
            $this->request,
            $this->attendanceSlug,
            $this->kelasSlug
        );


        return view('exports.attendance-record', [
            'data' => $data,
        ]);
    }
}
