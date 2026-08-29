import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head, usePage, router } from "@inertiajs/react";
import ReactApexChart from "react-apexcharts";
import { FiUsers, FiBriefcase, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import moment from "moment";
import Datepicker from "react-tailwindcss-datepicker";
import { useState } from "react";

const Dashboard = () => {
    const { 
        auth, 
        metrics, 
        chartStatus, 
        picWorkload, 
        upcomingDeadlines, 
        recentActivities,
        departmentWorkload,
        currentDate,
        filterDate 
    } = usePage().props;

    const [dateValue, setDateValue] = useState({ 
        startDate: filterDate || null, 
        endDate: filterDate || null 
    });

    const handleDateChange = (newValue) => {
        setDateValue(newValue);
        router.get(route('dashboard'), { date: newValue?.startDate || '' }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const donutOptions = {
        chart: { type: 'donut', fontFamily: 'inherit' },
        labels: ['Proses', 'Selesai', 'Belum Mulai', 'Terlambat'],
        colors: ['#3b82f6', '#10b981', '#9ca3af', '#ef4444'],
        plotOptions: {
            pie: { donut: { size: '70%' } }
        },
        dataLabels: { enabled: false },
        legend: { position: 'bottom' }
    };
    
    const donutSeries = [
        chartStatus.Proses || 0,
        chartStatus.Selesai || 0,
        chartStatus['Belum Mulai'] || 0,
        chartStatus.Terlambat || 0
    ];

    const barOptions = {
        chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'inherit' },
        plotOptions: {
            bar: { borderRadius: 4, horizontal: true, dataLabels: { position: 'top' } }
        },
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            offsetX: 15,
            style: { fontSize: '12px', colors: ['#304758'] }
        },
        xaxis: {
            max: (max) => { return max === 0 ? 1 : max + Math.max(2, max * 0.2) },
            categories: picWorkload.map(p => p.name),
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                formatter: function (val) {
                    return Math.round(val);
                }
            }
        },
        yaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        grid: {
            show: false,
        },
        stroke: {
            show: false,
        },
        colors: ['#205a45'],
    };

    const barSeries = [{
        name: 'Tugas',
        data: picWorkload.map(p => p.total)
    }];

    const areaOptions = {
        chart: { type: 'area', toolbar: { show: false }, fontFamily: 'inherit' },
        colors: ['#10b981', '#3b82f6', '#ef4444', '#9ca3af'],
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 2 },
        xaxis: {
            categories: departmentWorkload.map(d => d.department),
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return Math.round(val);
                }
            }
        },
        grid: {
            borderColor: '#f3f4f6',
            strokeDashArray: 4,
            xaxis: {
                lines: { show: false }
            }
        },
        fill: {
            type: 'gradient',
            gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 90, 100] }
        },
        legend: { 
            position: 'top',
            horizontalAlign: 'center',
            markers: { radius: 12 }
        },
    };

    const areaSeries = [
        { name: 'Selesai', data: departmentWorkload.map(d => d.selesai) },
        { name: 'Proses', data: departmentWorkload.map(d => d.proses) },
        { name: 'Terlambat', data: departmentWorkload.map(d => d.terlambat) },
        { name: 'Belum Mulai', data: departmentWorkload.map(d => d.belum_mulai) }
    ];

    return (
        <DefaultLayout>
            <Head title="Dashboard" />
            
            <div className="flex flex-col gap-6 w-full">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end bg-white p-6 rounded-xl border border-gray-100 shadow-sm gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Selamat datang, {auth?.user?.name.split(' ')[0]} 👋
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Berikut adalah ringkasan aktivitas dan pekerjaan saat ini.
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 w-full md:w-64">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{currentDate}</p>
                        <Datepicker
                            value={dateValue}
                            onChange={handleDateChange}
                            asSingle={true}
                            useRange={false}
                            displayFormat="DD MMM YYYY"
                            placeholder="Filter Tanggal Dibuat"
                            inputClassName="w-full rounded-xl text-sm border border-gray-200 focus:border-primary-600 focus:ring-0 focus:outline-none py-2 px-3 bg-gray-50"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-2xl">
                            <FiUsers />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Karyawan</p>
                            <h3 className="text-2xl font-bold text-gray-800">{metrics.totalEmployees}</h3>
                        </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center text-2xl">
                            <FiBriefcase />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Pekerjaan</p>
                            <h3 className="text-2xl font-bold text-gray-800">{metrics.totalTasks}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-lg flex items-center justify-center text-2xl">
                            <FiAlertCircle />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Terlambat</p>
                            <h3 className="text-2xl font-bold text-gray-800">{metrics.overdueTasks}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-50 text-green-500 rounded-lg flex items-center justify-center text-2xl">
                            <FiCheckCircle />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Selesai</p>
                            <h3 className="text-2xl font-bold text-gray-800">{metrics.completedTasks}</h3>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Status Pekerjaan</h2>
                        <div className="h-64 flex items-center justify-center">
                            <ReactApexChart options={donutOptions} series={donutSeries} type="donut" height="250" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">8 PIC dengan Beban Terbanyak</h2>
                        <div className="h-64">
                            <ReactApexChart options={barOptions} series={barSeries} type="bar" height="250" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm w-full">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Beban Pekerjaan per Departemen</h2>
                    <div className="h-72">
                        <ReactApexChart options={areaOptions} series={areaSeries} type="area" height="100%" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="flex items-center gap-2 mb-4">
                            <FiAlertCircle className="text-yellow-500 text-xl" />
                            <h2 className="text-lg font-bold text-gray-800">Deadline Terdekat</h2>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead>
                                    <tr className="border-b border-gray-100 text-gray-500">
                                        <th className="py-3 px-2 font-medium">Pekerjaan</th>
                                        <th className="py-3 px-2 font-medium">PIC</th>
                                        <th className="py-3 px-2 font-medium">Deadline</th>
                                        <th className="py-3 px-2 font-medium">Status</th>
                                        <th className="py-3 px-2 font-medium">Prioritas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {upcomingDeadlines.length > 0 ? (
                                        upcomingDeadlines.map((task, idx) => (
                                            <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                                <td className="py-3 px-2">
                                                    <p className="font-medium text-gray-800 truncate max-w-[200px]" title={task.name}>{task.name}</p>
                                                </td>
                                                <td className="py-3 px-2">{task.pic?.name || '-'}</td>
                                                <td className="py-3 px-2">
                                                    <span className={moment(task.deadline_at).isBefore(moment()) ? 'text-red-500 font-medium' : 'text-gray-700'}>
                                                        {moment(task.deadline_at).format('DD/MM/YYYY HH:mm')}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                                        task.status === 0 ? 'bg-gray-100 text-gray-600' :
                                                        task.status === 1 ? 'bg-blue-100 text-blue-600' :
                                                        'bg-green-100 text-green-600'
                                                    }`}>
                                                        {task.status === 0 ? 'Belum Mulai' : task.status === 1 ? 'Proses' : 'Selesai'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2">
                                                    {task.priority === 2 && <span className="flex items-center gap-1 text-red-500"><span className="w-2 h-2 rounded-full bg-red-500"></span> Tinggi</span>}
                                                    {task.priority === 1 && <span className="flex items-center gap-1 text-yellow-500"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Sedang</span>}
                                                    {task.priority === 0 && <span className="flex items-center gap-1 text-blue-500"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Rendah</span>}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="py-8 text-center text-gray-500">Tidak ada data</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Aktivitas Terbaru</h2>
                        <div className="flex flex-col gap-4">
                            {recentActivities.length > 0 ? (
                                recentActivities.map((act, idx) => (
                                    <div key={idx} className="flex gap-3 text-sm">
                                        <div className="flex flex-col items-center">
                                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                                            {idx !== recentActivities.length - 1 && <div className="w-px h-full bg-gray-200 mt-1"></div>}
                                        </div>
                                        <div className="pb-3">
                                            <p className="text-gray-800">
                                                <span className="font-medium">{act.creator?.name || 'Sistem'}</span> 
                                                {' '}{act.notes} {act.task?.name && <span className="font-semibold text-gray-900">"{act.task.name}"</span>}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">{moment(act.created_at).fromNow()}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 text-center py-4">Belum ada aktivitas</p>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </DefaultLayout>
    );
};

export default Dashboard;
