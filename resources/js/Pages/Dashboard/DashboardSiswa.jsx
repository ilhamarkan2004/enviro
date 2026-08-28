import DefaultLayout from "@/Layouts/DefaultLayout";
import { useState } from "react";
import {  Link, router, usePage , Head } from "@inertiajs/react";
import {
    MdPlayCircleFilled,
    MdAssignmentTurnedIn,
    MdCoPresent,
    MdPendingActions,
    MdSchedule,
    MdVideocam,
    MdPerson,
    MdMic,
    MdEditNote,
    MdBook,
    MdCheckCircle,
    MdCancel,
    MdHistory,
    MdCalendarToday,
    MdPeople,
} from "react-icons/md";
import {
    MdChecklist,
    MdInsights,
    MdHourglassTop,
    MdAccessTimeFilled,
} from "react-icons/md";
import moment from "moment";
import { TbFileText } from "react-icons/tb";

export default function DashboardSiswa({ data }) {
    const [filter, setFilter] = useState("Harian");
    const { props } = usePage();
    const authUser = props.auth?.user;
    console.log(data);

    return (
        <DefaultLayout>
            <Head title="Dashboard" />
            <div className="space-y-8">
                {/* HERO */}
                <div className="bg-primary-800 rounded-2xl p-8 relative overflow-hidden shadow-lg">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-white space-y-2">
                            <h2 className="text-3xl font-bold">
                                Selamat datang kembali, {authUser?.name}! 👋
                            </h2>
                            <p className="text-blue-100 max-w-xl text-sm">
                                Tetap semangat dalam belajar. Progresmu sudah
                                berjalan dengan baik, teruskan hingga target
                                pembelajaran tercapai secara optimal.
                            </p>
                        </div>

                        <Link
                            href={route("pembelajaran.class.index")}
                            className="bg-gray-50 text-primary-600 font-bold py-3 px-6 h-fit rounded-xl flex items-center gap-2"
                        >
                            <MdPlayCircleFilled size={24} />
                            Lanjutkan Pembelajaran
                        </Link>
                    </div>
                </div>

                {/* SUMMARY */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <SummaryCard
                        title="Jumlah Tugas"
                        value={data?.count_assignment}
                        badge="+12%"
                        color="blue"
                        icon={<MdChecklist size={26} />}
                    />
                    <SummaryCard
                        title="Jumlah Kehadiran"
                        value={`${data?.count_attendance ?? 0} %`}
                        badge="Avg"
                        color="green"
                        icon={<MdInsights size={26} />}
                    />
                    <SummaryCard
                        title="Tugas Belum Diserahkan"
                        value={data?.count_not_submit}
                        badge="Urgent"
                        color="orange"
                        icon={<MdHourglassTop size={26} />}
                    />
                    <SummaryCard
                        title="Jumlah Kelas"
                        value={data?.count_class}
                        color="purple"
                        icon={<MdAccessTimeFilled size={26} />}
                    />
                </div>

                {/* MAIN */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* CURRENT CLASS */}
                        <div className="bg-white rounded-2xl overflow-hidden p-6">
                            <div className="  flex justify-between mb-6">
                                <h3 className="font-bold text-lg">
                                    Data Kelas Terbaru
                                </h3>
                                <Link
                                    href={route("pembelajaran.class.index")}
                                    className="text-primary-600 text-sm"
                                >
                                    Lihat Selengkapnya
                                </Link>
                            </div>

                            <div className="flex flex-col gap-6">
                                {data?.classes?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col md:flex-row gap-4 md:gap-6"
                                    >
                                        {/* IMAGE */}
                                        <div className="w-full md:w-1/3 rounded-xl overflow-hidden relative">
                                            <img
                                                src="/images/card/bg.webp"
                                                className="object-cover w-full h-40 md:h-36"
                                                alt={item?.name}
                                            />
                                        </div>

                                        {/* CONTENT */}
                                        <div className="flex-1 space-y-4">
                                            <div className="space-y-2">
                                                <h4 className="text-lg md:text-xl font-bold">
                                                    {item?.name}
                                                </h4>

                                                <div
                                                    className="tiny-mce-text text-sm text-gray-500 text-ellipsis line-clamp-3 md:line-clamp-2"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.description,
                                                    }}
                                                />
                                            </div>

                                            {/* INFO */}
                                            <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm text-gray-600">
                                                <span className="flex items-center gap-2">
                                                    <MdPerson />
                                                    {item?.teachers
                                                        ?.map((t) => t.name)
                                                        .join(" | ")}
                                                </span>

                                                <span className="flex items-center gap-2">
                                                    <MdPeople />
                                                    {
                                                        item?.students?.length
                                                    }{" "}
                                                    Siswa
                                                </span>
                                            </div>

                                            {/* PROGRESS */}
                                            <div className="w-full bg-gray-200 h-1.5 rounded-full">
                                                <div
                                                    className="bg-secondary h-1.5 rounded-full transition-all"
                                                    style={{
                                                        width: `${
                                                            item?.total_assignments
                                                                ? Math.round(
                                                                      (item.total_answered /
                                                                          item.total_assignments) *
                                                                          100,
                                                                  )
                                                                : 0
                                                        }%`,
                                                    }}
                                                />
                                            </div>

                                            <p className="text-xs text-right text-gray-500">
                                                {item?.total_assignments
                                                    ? Math.round(
                                                          (item.total_answered /
                                                              item.total_assignments) *
                                                              100,
                                                      )
                                                    : 0}
                                                % Tugas Diserahkan
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ASSIGNMENTS */}
                        <div className="bg-white rounded-2xl overflow-hidden">
                            <div className="p-6">
                                <h3 className="font-bold text-lg">
                                    Tugas Terbaru
                                </h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-xs uppercase">
                                        <tr>
                                            <th className="px-6 py-4">Tugas</th>
                                            <th className="px-6 py-4">Kelas</th>
                                            <th className="px-3 py-4">
                                                Status
                                            </th>
                                            <th className="px-6 py-4">
                                                Tenggat
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {data?.assignments?.map((item) => (
                                            <AssignmentRow
                                                key={item.id}
                                                item={item}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="space-y-8">
                        {/* LATEST ATTENDANCE */}
                        <div className="bg-white rounded-2xl p-6">
                            <h3 className="font-bold text-lg mb-6">Presensi</h3>

                            <div className="relative pl-4 border-l-2 border-gray-200 space-y-6">
                                {data.attendances?.map((attendance, index) => (
                                    <AttendanceItem
                                        key={index}
                                        attendance={attendance}
                                    />
                                ))}
                            </div>

                            <a
                                href={route("pembelajaran.presensi.index")}
                                className="w-full mt-6 py-2 text-sm text-gray-500 border border-dashed rounded-lg flex items-center justify-center gap-2"
                            >
                                <MdHistory />
                                Lihat Selengkapnya
                            </a>
                        </div>

                        {/* UPCOMING CLASSES */}
                        <div className="bg-primary-600 text-white rounded-2xl p-6">
                            <h3 className="font-bold text-lg mb-4">
                                Modul Terbaru
                            </h3>

                            <div className="space-y-4">
                                {data?.posts?.map((post) => (
                                    <UpcomingClass key={post.id} post={post} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

/* ================= COMPONENT ================= */

function SummaryCard({ title, value, badge, color, icon }) {
    return (
        <div className="bg-white p-6 rounded-2xl relative overflow-hidden">
            <div
                className={`absolute -right-6 -top-6 w-24 h-24 bg-${color}-100 rounded-full opacity-50`}
            />
            <div className="relative">
                <div className="flex justify-between mb-4">
                    <div
                        className={`p-2 bg-${color}-50 text-${color}-600 rounded-lg`}
                    >
                        {icon}
                    </div>
                    {badge && (
                        <span
                            className={`text-xs font-semibold text-${color}-600`}
                        ></span>
                    )}
                </div>
                <h3 className="text-sm text-gray-500">{title}</h3>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    );
}

function AssignmentRow({ item }) {
    return (
        <tr className="hover:bg-gray-50 text-sm text-gray-700">
            <td className="px-6 py-4 font-medium">{item?.name ?? "-"}</td>

            <td className="px-6 py-4 text-gray-500">
                {item?.class?.name ?? "-"}
            </td>

            <td className="px-3 py-4">
                {item?.has_submitted ? (
                    <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                        Diserahkan
                    </span>
                ) : (
                    <span className="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                        Belum diserahkan
                    </span>
                )}
            </td>

            <td className="px-6 py-4">
                {item?.deadline_at
                    ? moment(item.deadline_at).format("DD MMM YYYY, HH:mm")
                    : "-"}
            </td>
        </tr>
    );
}

function AttendanceItem({ attendance }) {
    return (
        <div className="relative">
            {/* Dot indicator */}
            <div
                className={`absolute -left-[22.5px] top-1 w-3 h-3 rounded-full ${
                    !attendance?.record
                        ? "bg-red-400"
                        : attendance.record.status === "Present"
                        ? "bg-green-500"
                        : attendance.record.status === "Late"
                        ? "bg-yellow-500"
                        : attendance.record.status === "Izin"
                        ? "bg-blue-500"
                        : "bg-gray-400"
                }`}
            />

            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <p className="font-bold text-sm">
                        {attendance?.class?.name}
                    </p>
                    <p className="text-xs text-gray-500">{attendance?.name}</p>
                    <p className="text-xs text-gray-500">
                        {moment(attendance?.open_at).format(
                            "ddd, DD MMM YYYY, hh:mm A"
                        )}
                    </p>
                </div>

                <span
                    className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-1 ${
                        !attendance?.record
                            ? "text-red-600 bg-red-100"
                            : attendance.record.status === "Present"
                            ? "text-green-600 bg-green-100"
                            : attendance.record.status === "Late"
                            ? "text-yellow-600 bg-yellow-100"
                            : attendance.record.status === "Izin"
                            ? "text-blue-600 bg-blue-100"
                            : "text-gray-600 bg-gray-100"
                    }`}
                >
                    {!attendance?.record ? (
                        <MdCancel />
                    ) : attendance.record.status === "Present" ? (
                        <MdCheckCircle />
                    ) : (
                        <MdCancel />
                    )}
                    {!attendance?.record
                        ? "Alpha"
                        : attendance.record.status === "Present"
                        ? "Hadir"
                        : attendance.record.status === "Late"
                        ? "Terlambat"
                        : attendance.record.status === "Izin"
                        ? "Izin"
                        : attendance.record.status}
                </span>
            </div>
        </div>
    );
}


function UpcomingClass({ post }) {
    return (
        <div className="bg-white/10 p-4 rounded-xl flex gap-4 items-center">
            <div className="bg-white/95 text-primary-800 rounded-lg w-12 h-12 flex flex-col items-center justify-center">
                <TbFileText size={28} />
            </div>

            <div className="flex flex-col gap-1">
                <p className="font-bold text-sm">{post?.name}</p>
                <p className="text-xs text-gray-200 flex gap-1">
                    <MdCalendarToday size={14} />
                    {`${moment(post.created_at).format("D MMM YYYY hh:mm A")} `}
                </p>
            </div>
        </div>
    );
}
