<table>
    <thead>
        <tr>
            <th style="text-align:left;">No</th>
            <th style="text-align:left;">Kelas</th>
            <th style="text-align:left;">Nama</th>
            <th style="text-align:left;">Guru</th>

             @unless (auth()->user()->hasRole('user'))
                <th style="text-align:left;">Honor Tutor</th>
            @endunless

            <th style="text-align:left;">Tanggal</th>
        </tr>
    </thead>

    <tbody>
        @foreach ($data as $i => $item)
            <tr>
                <td>{{ $i + 1 }}</td>

                <td>
                    <p>{{ $item->class->name ?? '-' }}</p>
                </td>

                <td>{{ $item->name ?? '-' }}</td>
                <td>{{ $item->teacher->name ?? '-' }}</td>

                @unless (auth()->user()->hasRole('user'))
                    <td>
                        {{ $item->teacher_salary }}
                    </td>
                @endunless
                <td>
                    {{ $item->created_at }}
                </td>
            </tr>
        @endforeach
    </tbody>
</table>
