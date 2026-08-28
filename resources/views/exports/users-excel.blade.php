<table>
    <thead>
    <tr>
        <th>No</th>
        <th>Nama</th>
        <th>Email</th>
        <th>Telepon</th>
        <th>Gender</th>
        <th>Departemen</th>
        <th>Jabatan</th>
        <th>Role</th>
        <th>Tanggal Dibuat</th>
    </tr>
    </thead>
    <tbody>
    @foreach($users as $index => $user)
        <tr>
            <td>{{ $index + 1 }}</td>
            <td>{{ $user->name }}</td>
            <td>{{ $user->email }}</td>
            <td>{{ $user->phone_number ?? '-' }}</td>
            <td>{{ $user->gender == 'L' ? 'Laki-laki' : ($user->gender == 'P' ? 'Perempuan' : '-') }}</td>
            <td>{{ $user->department ? $user->department->name : '-' }}</td>
            <td>{{ $user->position ? $user->position->name : '-' }}</td>
            <td>{{ count($user->roles) > 0 ? $user->roles[0]->name : '-' }}</td>
            <td>{{ \Carbon\Carbon::parse($user->created_at)->format('d/m/Y H:i') }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
