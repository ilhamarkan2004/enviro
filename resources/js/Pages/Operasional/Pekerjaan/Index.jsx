import moment from "moment";
import { FiSearch, FiFilter, FiDownload } from "react-icons/fi";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useState, useRef, useEffect } from "react";
import PaginationDashboard from "@/Components/Pagination/PaginationDashboard";
import { FaPlus, FaFilePdf, FaFileExcel } from "react-icons/fa6";
import { MdOutlineRemoveRedEye, MdHistory } from "react-icons/md";
import { router, usePage, Head } from "@inertiajs/react";
import ModalTambahPekerjaan from "@/Components/Modal/Pekerjaan/ModalTambahPekerjaan";
import ModalEditPekerjaan from "@/Components/Modal/Pekerjaan/ModalEditPekerjaan";
import ModalHistoryPekerjaan from "@/Components/Modal/Pekerjaan/ModalHistoryPekerjaan";
import ModalFilterPekerjaan from "@/Components/Modal/Pekerjaan/ModalFilterPekerjaan";

export default function Index({ tasks, departments, positions, users }) {
    const { permissions } = usePage().props;
    const debounceRef = useRef(null);
    const searchParams = new URLSearchParams(window.location.search);
    
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [departmentId, setDepartmentId] = useState(searchParams.get("department_id") || "");
    const [positionId, setPositionId] = useState(searchParams.get("position_id") || "");
    const [userId, setUserId] = useState(searchParams.get("user_id") || "");
    const [startDate, setStartDate] = useState(searchParams.get("start_date") || "");
    const [endDate, setEndDate] = useState(searchParams.get("end_date") || "");
    const [status, setStatus] = useState(searchParams.get("status") || "");
    const [priority, setPriority] = useState(searchParams.get("priority") || "");
    const [createdStartDate, setCreatedStartDate] = useState(searchParams.get("created_start_date") || "");
    const [createdEndDate, setCreatedEndDate] = useState(searchParams.get("created_end_date") || "");
    const [isOverdue, setIsOverdue] = useState(searchParams.get("is_overdue") || "");
    
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showExportDropdown, setShowExportDropdown] = useState(false);
    const [task, setTask] = useState();

    useEffect(() => {
        clearTimeout(debounceRef.current);
        const currentParams = new URLSearchParams(window.location.search);
        const page = currentParams.get("page") || 1;

        debounceRef.current = setTimeout(() => {
            router.get(
                route(route().current()),
                { 
                    search, department_id: departmentId, position_id: positionId, user_id: userId, 
                    start_date: startDate, end_date: endDate, status, priority, 
                    created_start_date: createdStartDate, created_end_date: createdEndDate, is_overdue: isOverdue, page 
                },
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                },
            );
        }, 500);
    }, [search, departmentId, positionId, userId, startDate, endDate, status, priority, createdStartDate, createdEndDate, isOverdue]);

    const handleApplyFilter = (filters) => {
        setDepartmentId(filters.departmentId);
        setPositionId(filters.positionId);
        setUserId(filters.userId);
        setStartDate(filters.startDate || "");
        setEndDate(filters.endDate || "");
        setStatus(filters.status || "");
        setPriority(filters.priority || "");
        setCreatedStartDate(filters.createdStartDate || "");
        setCreatedEndDate(filters.createdEndDate || "");
        setIsOverdue(filters.isOverdue || "");
    };

    const handleExport = (type) => {
        const queryParams = new URLSearchParams({
            search,
            department_id: departmentId,
            position_id: positionId,
            user_id: userId,
            start_date: startDate,
            end_date: endDate,
            status,
            priority,
            created_start_date: createdStartDate,
            created_end_date: createdEndDate,
            is_overdue: isOverdue
        }).toString();
        
        const url = `/operasional/pekerjaan/export/${type}?${queryParams}`;
        
        if (type === 'pdf') {
            window.open(url, '_blank');
        } else {
            window.location.href = url;
        }
        
        setShowExportDropdown(false);
    };

    return (
        <DefaultLayout>
            <Head title="Pekerjaan" />
            <div className="flex flex-col gap-5">
                {/* HEADER & FILTERS */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <p className="text-base sm:text-2xl font-semibold">
                        Pekerjaan
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:max-w-md ml-auto">
                        
                        <div className="relative w-full">
                            <FiSearch
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={16}
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari pekerjaan..."
                                className="w-full pl-9 pr-3 py-2 rounded-xl text-sm border border-neutral-300 placeholder:text-neutral-400 focus:border-primary-600 focus:ring-0 focus:outline-none"
                            />
                        </div>
                        
                        <button
                            onClick={() => setShowFilterModal(true)}
                            className="flex gap-2 items-center justify-center bg-primary-700 hover:bg-primary-800 text-white text-sm px-4 py-2 rounded-xl w-full sm:w-auto"
                        >
                            <FiFilter />
                            Filter
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                        <p className="text-lg font-medium">Daftar Pekerjaan</p>
                        <div className="flex gap-2 relative w-full sm:w-auto">
                            {permissions.includes("pekerjaan-add") && (
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="flex gap-1 justify-center items-center bg-primary-600 hover:bg-primary-600/90 text-neutral-50 text-sm px-5 py-2 rounded-full flex-1 sm:flex-none"
                                >
                                    <FaPlus />
                                    Tambah Pekerjaan
                                </button>
                            )}
                            <div className="relative flex-1 sm:flex-none">
                                <button
                                    onClick={() => setShowExportDropdown(!showExportDropdown)}
                                    className="flex gap-1 w-full justify-center items-center bg-green-600 hover:bg-green-700 text-neutral-50 text-sm px-5 py-2 rounded-full"
                                >
                                    <FiDownload />
                                    Export
                                </button>
                                
                                {showExportDropdown && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setShowExportDropdown(false)}></div>
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-20 border border-gray-100 py-1">
                                            <button
                                                onClick={() => handleExport('pdf')}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                            >
                                                <FaFilePdf className="text-red-500" /> Export PDF
                                            </button>
                                            <button
                                                onClick={() => handleExport('excel')}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                            >
                                                <FaFileExcel className="text-green-500" /> Export Excel
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="text-left text-sm whitespace-nowrap">
                                    <th className="min-w-[25px] px-4 py-4 xl:pl-11">No</th>
                                    <th className="min-w-[200px] px-4 py-4">Pekerjaan</th>
                                    <th className="min-w-[150px] px-4 py-4">PIC</th>
                                    <th className="min-w-[150px] px-4 py-4">Departemen</th>
                                    <th className="min-w-[120px] px-4 py-4">Tanggal Dibuat</th>
                                    <th className="min-w-[120px] px-4 py-4">Deadline</th>
                                    <th className="min-w-[120px] px-4 py-4">Status</th>
                                    <th className="min-w-[100px] px-4 py-4">Prioritas</th>
                                    <th className="px-4 py-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks?.data?.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 text-sm text-neutral-700 whitespace-nowrap"
                                    >
                                        <td className="px-4 py-5 pl-9 xl:pl-11">
                                            {tasks?.from + index}
                                        </td>
                                        <td className="px-4 py-5">
                                            {item.name}
                                        </td>
                                        <td className="px-4 py-5">
                                            {item.pic?.name || "-"}
                                        </td>
                                        <td className="px-4 py-5">
                                            {item.department?.name || "-"}
                                        </td>
                                        <td className="px-4 py-5">
                                            {item.created_at ? moment(item.created_at).format('DD/MM/YYYY HH:mm') : "-"}
                                        </td>
                                        <td className="px-4 py-5">
                                            {item.deadline_at ? moment(item.deadline_at).format('DD/MM/YYYY HH:mm') : "-"}
                                        </td>
                                        <td className="px-4 py-5">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    item.status === 2
                                                        ? "bg-green-100 text-green-800"
                                                        : item.status === 1
                                                        ? "bg-blue-100 text-blue-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {item.status === 2 ? "Selesai" : item.status === 1 ? "Proses" : "Belum Mulai"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-5">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    item.priority === 2
                                                        ? "bg-red-100 text-red-800"
                                                        : item.priority === 1
                                                        ? "bg-orange-100 text-orange-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {item.priority === 2 ? "Tinggi" : item.priority === 1 ? "Sedang" : "Rendah"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setTask(item);
                                                        setShowHistoryModal(true);
                                                    }}
                                                    className="rounded-full border border-teal-600 text-teal-600 flex items-center gap-1.5 px-3 py-1 text-sm font-medium"
                                                    title="Lihat Riwayat"
                                                >
                                                    <MdHistory size={18} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setTask(item);
                                                        setShowEditModal(true);
                                                    }}
                                                    className="rounded-full border border-primary-600 text-primary-600 flex items-center gap-1.5 px-3 py-1 text-sm font-medium text-primary"
                                                    title="Lihat/Edit Detail"
                                                >
                                                    <MdOutlineRemoveRedEye size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <PaginationDashboard
                        links={tasks?.links}
                        meta={tasks}
                    />
                </div>

                {/* MODAL TAMBAH */}
                {showAddModal && (
                    <ModalTambahPekerjaan
                        isOpen={showAddModal}
                        onClose={() => setShowAddModal(false)}
                        departments={departments}
                        users={users}
                    />
                )}

                {/* MODAL EDIT */}
                {showEditModal && (
                    <ModalEditPekerjaan
                        isOpen={showEditModal}
                        onClose={() => setShowEditModal(false)}
                        task={task}
                        departments={departments}
                        users={users}
                    />
                )}
                
                {/* MODAL HISTORY */}
                {showHistoryModal && (
                    <ModalHistoryPekerjaan
                        isOpen={showHistoryModal}
                        onClose={() => setShowHistoryModal(false)}
                        task={task}
                    />
                )}
                
                {/* MODAL FILTER */}
                {showFilterModal && (
                    <ModalFilterPekerjaan
                        isOpen={showFilterModal}
                        onClose={() => setShowFilterModal(false)}
                        onApply={handleApplyFilter}
                        departments={departments}
                        positions={positions}
                        users={users}
                        currentFilters={{ departmentId, positionId, userId, startDate, endDate, status, priority, createdStartDate, createdEndDate, isOverdue }}
                    />
                )}
            </div>
        </DefaultLayout>
    );
}
