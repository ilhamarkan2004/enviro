<table>
    <thead>
        <tr>
            <th style="text-align:left;">No</th>
            <th style="text-align:left;">Nama</th>
            <th style="text-align:left;">Email</th>
            <th style="text-align:left;">Poin</th>
            <th style="text-align:left;">Diserahkan Pada</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($data as $i => $item)
            <tr>
                <td>{{ $i + 1 }}</td>
                <td>{{ $item->name }}</td>
                <td>{{ $item->email }}</td>
                <td>{{ $item?->assignment_answer?->score ?? '-' }}</td>
                <td>{{ $item?->assignment_answer?->submitted_at ?? '-' }}</td>


            </tr>
        @endforeach
    </tbody>
</table>
