<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan User</title>
    <style>
          page {
            size: A4 landscape;
            margin: 10mm 15mm;
        }

        body {
            font-family: Arial, sans-serif;
            color: #000;
            margin: 0;
            padding: 0;
            font-size: 12px;
            text-align: justify;
        }

        .header {
            width: 100%;
            border-bottom: 1px solid #000;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .header table {
            width: 100%;
            border: none;
        }
        .header td {
            border: none;
            vertical-align: middle;
        }
        .logo {
            width: 100px;
        }
        .company-info {
            text-align: left;
        }
        .company-name {
            font-size: 16px;
            font-weight: bold;
            margin: 0 0 5px 0;
            text-transform: uppercase;
        }
        .company-address {
            font-size: 12px;
            margin: 0;
        }
        h2.title {
            text-align: center;
            font-size: 14px;
            margin-bottom: 20px;
            text-transform: uppercase;
        }
        table.data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        table.data-table th, table.data-table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
        }
        table.data-table th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        .text-center {
            text-align: center;
        }
    </style>
</head>
<body>

    <div class="header">
        <table>
            <tr>
                <td width="80%" class="company-info">
                    <h1 class="company-name">{{ env('APP_NAME', 'PT PROPERINDO ENVIRO TECH') }}</h1>
                    <p class="company-address">{{ env('APP_ADDRESS', 'Keputih Tegal Timur II No. 64 Keputih Sukolilo, Surabaya 60111 Jawa Timur') }}</p>
                </td>
                <td width="20%" style="text-align: right;">
                    <?php 
                        $path = public_path('images/logo/logo.webp');
                        $type = pathinfo($path, PATHINFO_EXTENSION);
                        if(file_exists($path)) {
                            $data = file_get_contents($path);
                            $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
                            echo '<img src="'.$base64.'" class="logo" />';
                        }
                    ?>
                </td>
            </tr>
        </table>
    </div>

    <h2 class="title">Laporan Daftar User</h2>

    <table style="width: 100%; margin-bottom: 20px; border-collapse: separate; border-spacing: 0;">
        <thead>
            <tr style="background-color: #205a4584; color: #fff;">
                <th style="padding: 8px; border-radius: 8px 0 0 8px; text-align: left;" width="5%">No</th>
                <th style="padding: 8px; text-align: left;" width="20%">Nama</th>
                <th style="padding: 8px; text-align: left;" width="20%">Email</th>
                <th style="padding: 8px; text-align: left;" width="12%">Telepon</th>
                <th style="padding: 8px; text-align: center;" width="8%">Gender</th>
                <th style="padding: 8px; text-align: left;" width="15%">Departemen</th>
                <th style="padding: 8px; text-align: left;" width="10%">Jabatan</th>
                <th style="padding: 8px; border-radius: 0 8px 8px 0; text-align: left;" width="10%">Role</th>
            </tr>
        </thead>
        <tbody>
            @foreach($users as $index => $user)
                <tr>
                    <td style="padding: 8px;">{{ $index + 1 }}</td>
                    <td style="padding: 8px;">{{ $user->name }}</td>
                    <td style="padding: 8px;">{{ $user->email }}</td>
                    <td style="padding: 8px;">{{ $user->phone_number ?? '-' }}</td>
                    <td style="padding: 8px;" class="text-center">{{ $user->gender == 'L' ? 'L' : ($user->gender == 'P' ? 'P' : '-') }}</td>
                    <td style="padding: 8px;">{{ $user->department ? $user->department->name : '-' }}</td>
                    <td style="padding: 8px;">{{ $user->position ? $user->position->name : '-' }}</td>
                    <td style="padding: 8px;">{{ count($user->roles) > 0 ? $user->roles[0]->name : '-' }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>
</html>
