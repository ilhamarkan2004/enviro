<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Pekerjaan</title>
    <style>
          page {
            size: A4;
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

        .space {
            padding: 0cm;
        }

        .title {
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 30px;
        }

        .subtitle {
            text-align: center;
            font-size: 12px;
            margin-bottom: 35px;
        }

        .content-table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
        }

        .content-table td {
            vertical-align: top;
            padding: 2px 5px;
        }

        .signature-table {
            width: 100%;
            margin-top: 10px;
        }

        .signature-table td {
            vertical-align: top;
            text-align: center;
            padding: 20px 0;
        }

        .bold {
            font-weight: bold;
        }

        .right {
            text-align: right;
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
        .status-badge {
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: bold;
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

    <h2 class="title">Laporan Daftar Pekerjaan</h2>

    <table style="width: 100%; margin-bottom: 20px; border-collapse: separate; border-spacing: 0;">
        <thead>
            <tr style="background-color: #205a4584; color: #fff;">
                <th style="padding: 8px; border-radius: 8px 0 0 8px; text-align: left;" width="5%">No</th>
                <th style="padding: 8px; text-align: left;" width="20%">Pekerjaan</th>
                <th style="padding: 8px; text-align: left;" width="18%">PIC</th>
                <th style="padding: 8px; text-align: left;" width="17%">Departemen</th>
                <th style="padding: 8px; text-align: left;" width="13%">Dibuat</th>
                <th style="padding: 8px; text-align: left;" width="12%">Deadline</th>
                <th style="padding: 8px; text-align: left;" class="text-center" width="8%">Status</th>
                <th style="padding: 8px; border-radius: 0 8px 8px 0; text-align: left;" width="7%">Prioritas</th>
            </tr>
        </thead>
        <tbody>
            @foreach($tasks as $index => $task)
                <tr>
                    <td style="padding: 8px;">{{ $index + 1 }}</td>
                    <td style="padding: 8px;">{{ $task->name }}</td>
                    <td style="padding: 8px;">{{ $task->pic ? $task->pic->name : '-' }}</td>
                    <td style="padding: 8px;">{{ $task->department ? $task->department->name : '-' }}</td>
                    <td style="padding: 8px;">{{ $task->created_at ? \Carbon\Carbon::parse($task->created_at)->format('d/m/Y H:i') : '-' }}</td>
                    <td style="padding: 8px;">
                        {{ $task->deadline_at ? \Carbon\Carbon::parse($task->deadline_at)->format('d/m/Y H:i') : '-' }}
                        @if($task->deadline_at && \Carbon\Carbon::parse($task->deadline_at)->isPast() && $task->status != 2)
                            <br><span style="color: red; font-size: 10px; font-weight: bold;">(Terlambat)</span>
                        @endif
                    </td>
                    <td style="padding: 8px;" class="text-center">
                        @if($task->status == 2) Selesai
                        @elseif($task->status == 1) Proses
                        @else Belum Mulai
                        @endif
                    </td>
                    <td style="padding: 8px;" class="text-center">
                        @if($task->priority == 2) Tinggi
                        @elseif($task->priority == 1) Sedang
                        @else Rendah
                        @endif
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>
</html>
