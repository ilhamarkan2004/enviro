<table>
    <thead>
    <tr>
        <th>No</th>
        <th>Pekerjaan</th>
        <th>PIC</th>
        <th>Departemen</th>
        <th>Posisi</th>
        <th>Tanggal Dibuat</th>
        <th>Deadline</th>
        <th>Status</th>
        <th>Prioritas</th>
    </tr>
    </thead>
    <tbody>
    @foreach($tasks as $index => $task)
        <tr>
            <td>{{ $index + 1 }}</td>
            <td>{{ $task->name }}</td>
            <td>{{ $task->pic ? $task->pic->name : '-' }}</td>
            <td>{{ $task->department ? $task->department->name : '-' }}</td>
            <td>{{ $task->pic && $task->pic->position ? $task->pic->position->name : '-' }}</td>
            <td>{{ \Carbon\Carbon::parse($task->created_at)->format('d/m/Y H:i') }}</td>
            <td>{{ $task->deadline_at ? \Carbon\Carbon::parse($task->deadline_at)->format('d/m/Y H:i') : '-' }}</td>
            <td>
                @if($task->status == 2) Selesai
                @elseif($task->status == 1) Proses
                @else Belum Mulai
                @endif
            </td>
            <td>
                @if($task->priority == 2) Tinggi
                @elseif($task->priority == 1) Sedang
                @else Rendah
                @endif
            </td>
        </tr>
    @endforeach
    </tbody>
</table>
