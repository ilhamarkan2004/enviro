<?php

namespace App\Exports;

use App\Http\Repositories\AssignmentAnswerRepository;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\Exportable;

class AssignmentAnswerExport implements FromView
{
    use Exportable;

    protected $request;
    protected $assignmentAnswer;
    protected $kelasSlug;
    protected $postSlug;

    public function __construct(Request $request, AssignmentAnswerRepository $assignmentAnswer, $postSlug, $kelasSlug)
    {
        $this->request = $request;
        $this->assignmentAnswer = $assignmentAnswer;
        $this->kelasSlug = $kelasSlug;
        $this->postSlug = $postSlug;
    }


    public function view(): View
    {
        $data = $this->assignmentAnswer->index(
            $this->request,
            $this->postSlug,
            $this->kelasSlug
        );


        return view('exports.assignment', [
            'data' => $data,
        ]);
    }
}
