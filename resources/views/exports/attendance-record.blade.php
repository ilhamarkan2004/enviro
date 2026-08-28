<table>
    <thead>
        <tr>
            <th style="text-align:left;">No</th>
            <th style="text-align:left;">Nama</th>
            <th style="text-align:left;">Email</th>
            <th style="text-align:left;">Status</th>
            <th style="text-align:left;">Presensi Pada</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($data as $i => $item)
            <tr>
                <td>{{ $i + 1 }}</td>
                <td>{{ $item->name }}</td>
                <td>{{ $item->email }}</td>
                <td>
                    @php($status = $item->record->status ?? null)

                    @switch($status)
                        @case('late')
                            Terlambat
                        @break

                        @case('present')
                            Hadir
                        @break

                        @case('izin')
                            Izin
                        @break

                        @default
                            Alpha
                    @endswitch
                </td>

                <td>
                    {{ $item->record?->checked_at ?? '-' }}
                </td>

            </tr>
        @endforeach
    </tbody>
</table>
