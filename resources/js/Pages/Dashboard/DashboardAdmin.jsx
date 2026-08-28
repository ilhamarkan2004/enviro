import DefaultLayout from "@/Layouts/DefaultLayout";
import { useState } from "react";
import {  Link, router , Head } from "@inertiajs/react";
import {
    MdPayments,
    MdSchool,
    MdAssignment,
    MdHowToReg,
    MdMoreHoriz,
} from "react-icons/md";
import moment from "moment";

export default function DashboardAdmin({ data }) {
    const [filter, setFilter] = useState("Harian");

    console.log(data);

    const handleApplyFilter = (filters) => {
        router.get(route(route().current()), filters, {
            preserveState: true,
            replace: true,
            preserveScroll: true,
        });
    };

    return (
        <DefaultLayout>
            <Head title="Dashboard" />
            <div className="space-y-8">
                {/* SUMMARY CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <SummaryCard
                        title="Jumlah Kelas"
                        value={data?.count_class}
                        color="green"
                        icon={<MdPayments size={22} />}
                    />
                    <SummaryCard
                        title="Jumlah Tugas"
                        value={data?.count_assignment}
                        color="blue"
                        icon={<MdSchool size={22} />}
                    />
                    <SummaryCard
                        title="Jumlah Modul"
                        value={data?.count_post}
                        color="purple"
                        icon={<MdAssignment size={22} />}
                    />
                    <SummaryCard
                        title="Jumlah Kehadiran"
                        value={data?.count_attendance + "%"}
                        color="orange"
                        icon={<MdHowToReg size={22} />}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-2xl overflow-hidden">
                        <div className="p-6 flex justify-between items-center ">
                            <h2 className="text-lg font-bold">Tugas Terbaru</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-xs uppercase">
                                    <tr>
                                        <th className="px-6 py-4">Tugas</th>
                                        <th className="px-6 py-4">Kelas</th>
                                        <th className="px-6 py-4">
                                            Jumlah Pengumpulan
                                        </th>
                                        <th className="px-6 py-4">Tenggat</th>
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

                    {/* ATTENDANCE */}
                    <div className="bg-white rounded-2xl p-6 h-fit">
                        <h2 className="text-lg font-bold mb-4">
                            Presensi Terbaru
                        </h2>
                        <div className="flex flex-col gap-6">
                            {data?.attendances?.map((item) => (
                                <Progress key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* YOUR CLASSES */}
                <div className="bg-white rounded-2xl overflow-hidden">
                    <div className="p-6 flex justify-between items-center">
                        <h2 className="text-lg font-bold">Data Kelas</h2>
                        <Link
                            href={route("pembelajaran.class.index")}
                            className="bg-primary-600 text-white text-sm px-4 py-2 rounded-lg"
                        >
                            Lihat Semua Kelas
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
                        {data?.classes?.map((item) => (
                            <ClassCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

/* ================= COMPONENTS ================= */

function SummaryCard({ title, value, badge, color, icon }) {
    return (
        <div className="bg-white p-6 rounded-2xl relative overflow-hidden">
            <div
                className={
                    color === "green"
                        ? "absolute -right-6 -top-6 w-24 h-24 bg-green-100 rounded-full opacity-50"
                        : color === "blue"
                        ? "absolute -right-6 -top-6 w-24 h-24 bg-blue-100 rounded-full opacity-50"
                        : color === "purple"
                        ? "absolute -right-6 -top-6 w-24 h-24 bg-purple-100 rounded-full opacity-50"
                        : color === "orange"
                        ? "absolute -right-6 -top-6 w-24 h-24 bg-orange-100 rounded-full opacity-50"
                        : "absolute -right-6 -top-6 w-24 h-24 bg-slate-100 rounded-full opacity-50"
                }
            />
            <div className="relative">
                <div className="flex justify-between mb-4">
                    <div
                        className={
                            color === "green"
                                ? "p-2 bg-green-100 text-green-600 rounded-lg"
                                : color === "blue"
                                ? "p-2 bg-blue-100 text-blue-600 rounded-lg"
                                : color === "purple"
                                ? "p-2 bg-purple-100 text-purple-600 rounded-lg"
                                : color === "orange"
                                ? "p-2 bg-orange-100 text-orange-600 rounded-lg"
                                : "p-2 bg-slate-100 text-slate-600 rounded-lg"
                        }
                    >
                        {icon}
                    </div>
                    {badge && (
                        <span
                            className={
                                color === "green"
                                    ? "text-xs font-semibold text-green-600"
                                    : color === "blue"
                                    ? "text-xs font-semibold text-blue-600"
                                    : color === "purple"
                                    ? "text-xs font-semibold text-purple-600"
                                    : color === "orange"
                                    ? "text-xs font-semibold text-orange-600"
                                    : "text-xs font-semibold text-slate-600"
                            }
                        >
                            {badge}
                        </span>
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

            <td className="px-6 py-4 text-gray-500">
                {item?.total_submitted} / {item?.class?.students?.length}
            </td>

            <td className="px-6 py-4">
                {item?.deadline_at
                    ? moment(item.deadline_at).format("DD MMM YYYY, HH:mm")
                    : "-"}
            </td>
        </tr>
    );
}

function Progress({ item }) {
    return (
        <div className="">
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                    {item?.name ?? "-"}
                </span>
                <span className="text-sm text-gray-500">
                    {item?.class?.students?.length
                        ? Math.round(
                              (item?.total_present_students /
                                  item?.class?.students?.length) *
                                  100
                          )
                        : 0}
                    %
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{
                        width: `${
                            item?.class?.students?.length
                                ? Math.round(
                                      (item?.total_present_students /
                                          item?.class?.students?.length) *
                                          100
                                  )
                                : 0
                        }%`,
                    }}
                />
            </div>
        </div>
    );
}

function ClassCard({ item }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className="relative rounded-xl border border-gray-200 p-5 transition"
            onClick={() => open && setOpen(false)}
        >
            <div className="flex justify-between mb-4">
                <div className="flex flex-col gap-1">
                    {" "}
                    <span className="bg-green-100 w-fit text-green-700 text-xs px-2 py-1 rounded font-medium">
                        {item?.package?.language_category?.language?.name ??
                            "-"}
                    </span>
                    <div className="flex gap-1 flex-wrap">
                        <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded font-medium">
                            {item?.package?.language_category?.name ?? "-"}
                        </span>
                        <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded font-medium">
                            {item?.package?.name ?? "-"}
                        </span>
                    </div>
                </div>

                {/* BUTTON */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(!open);
                    }}
                >
                    <MdMoreHoriz className="text-gray-400" size={22} />
                </button>
            </div>

            {/* DROPDOWN */}
            {open && (
                <div
                    className="absolute right-4 top-14 z-10 w-40 bg-white border rounded-lg shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Link
                        href={route("pembelajaran.post.index", item?.slug)}
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setOpen(false)}
                    >
                        Lihat Detail
                    </Link>

                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(
                                route("pembelajaran.post.index", item?.slug)
                            );
                            alert("Link berhasil disalin");
                            setOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                        Salin Link
                    </button>
                </div>
            )}

            <h3 className="text-lg font-medium">{item?.name ?? "-"}</h3>

            <p className="text-sm text-gray-500 mb-4">
                {item?.created_at
                    ? moment(item.created_at).format(
                          "ddd, DD MMM YYYY [at] HH:mm"
                      )
                    : "-"}
            </p>

            <div className="flex items-center -space-x-2 mb-4">
                {item?.students?.slice(0, 2).map((s, i) => (
                    <img
                        key={i}
                        src={s.img || `/images/profile/profil.jpg`}
                        className="w-8 h-8 rounded-full border-2 border-white"
                    />
                ))}

                {item?.students?.length > 2 && (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                        +{item.students.length - 2}
                    </div>
                )}
            </div>

            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                <div
                    className="bg-primary-600 h-1.5 rounded-full"
                    style={{
                        width: `${
                            item?.total_students
                                ? Math.round(
                                      (item?.total_present_students /
                                          item?.total_students) *
                                          100
                                  )
                                : 0
                        }%`,
                    }}
                />
            </div>

            <p className="text-xs text-gray-500 text-right">
                {item?.total_students
                    ? Math.round(
                          (item?.total_present_students /
                              item?.total_students) *
                              100
                      )
                    : 0}
                % Persentase Kehadiran
            </p>
        </div>
    );
}
