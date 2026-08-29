import { FiSearch, FiFilter, FiDownload } from "react-icons/fi";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useState, useRef, useEffect } from "react";
import PaginationDashboard from "@/Components/Pagination/PaginationDashboard";
import { FaPlus, FaFilePdf, FaFileExcel } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { router, usePage, Head } from "@inertiajs/react";
import ModalTambahUser from "@/Components/Modal/User/ModalTambahUser";
import ModalEditUser from "@/Components/Modal/User/ModalEditUser";
import ModalFilterUser from "@/Components/Modal/User/ModalFilterUser";

export default function Index({ data }) {
    const { permissions } = usePage().props;
    const debounceRef = useRef(null);
    const searchParams = new URLSearchParams(window.location.search);
    
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [departmentId, setDepartmentId] = useState(searchParams.get("department_id") || "");
    const [positionId, setPositionId] = useState(searchParams.get("position_id") || "");
    const [role, setRole] = useState(searchParams.get("role") || "");
    
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showExportDropdown, setShowExportDropdown] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        clearTimeout(debounceRef.current);
        const currentParams = new URLSearchParams(window.location.search);
        const page = currentParams.get("page") || 1;

        debounceRef.current = setTimeout(() => {
            router.get(
                route(route().current()),
                { search, department_id: departmentId, position_id: positionId, role, page },
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                }
            );
        }, 500);
    }, [search, departmentId, positionId, role]);

    const handleApplyFilter = (filters) => {
        setDepartmentId(filters.departmentId);
        setPositionId(filters.positionId);
        setRole(filters.role);
    };

    const handleExport = (type) => {
        const queryParams = new URLSearchParams({
            search,
            department_id: departmentId,
            position_id: positionId,
            role: role
        }).toString();
        
        const url = `/setting/user/export/${type}?${queryParams}`;
        window.open(url, '_blank');
        setShowExportDropdown(false);
    };

    return (
        <DefaultLayout>
            <Head title="User" />
            <div className="flex flex-col gap-5">
                {/* HEADER & SEARCH */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <p className="text-base sm:text-2xl font-semibold">User</p>
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
                                placeholder="Cari user..."
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
                        <p className="text-lg font-medium">Daftar User</p>
                        <div className="flex gap-2 relative w-full sm:w-auto">
                            {permissions.includes("user-add") && (
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="flex gap-1 justify-center items-center bg-primary-600 hover:bg-primary-600/90 text-neutral-50 text-sm px-5 py-2 rounded-full flex-1 sm:flex-none"
                                >
                                    <FaPlus />
                                    Tambah User
                                </button>
                            )}
                            <div className="relative flex-1 sm:flex-none">
                                <button
                                    onClick={() => setShowExportDropdown(!showExportDropdown)}
                                    className="flex w-full justify-center gap-1 items-center bg-green-600 hover:bg-green-700 text-neutral-50 text-sm px-5 py-2 rounded-full"
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
                    <div className="max-w-full overflow-x-auto ">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="text-left text-sm">
                                    <th className="min-w-[25px] px-4 py-4 xl:pl-11" />
                                    <th className="min-w-[120px] px-4 py-4">
                                        Foto
                                    </th>
                                    <th className="min-w-[200px] px-4 py-4">
                                        Nama
                                    </th>
                                    <th className="min-w-[200px] px-4 py-4">
                                        Email
                                    </th>
                                    <th className="min-w-[150px] px-4 py-4">
                                        Telepon
                                    </th>
                                    <th className="min-w-[120px] px-4 py-4">
                                        Gender
                                    </th>
                                    <th className="min-w-[120px] px-4 py-4">
                                        Status
                                    </th>
                                    <th className="min-w-[180px] px-4 py-4">
                                        Departemen
                                    </th>
                                    <th className="min-w-[180px] px-4 py-4">
                                        Jabatan
                                    </th>
                                    <th className="min-w-[150px] px-4 py-4">
                                        Role
                                    </th>

                                    <th className="px-4 py-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.users?.data?.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 text-sm text-neutral-700"
                                    >
                                        <td className="px-4 py-5 pl-9 xl:pl-11">
                                            {data?.users?.from + index}
                                        </td>
                                        <td className="px-4 py-5">
                                            <img
                                                src={
                                                    item?.img
                                                        ? `${window.location.origin}/${item.img}`
                                                        : `/images/profile/profil.jpg`
                                                }
                                                alt={
                                                    item?.name ||
                                                    "Default Profil"
                                                }
                                                className="w-12 h-12 object-cover rounded-full"
                                            />
                                        </td>
                                        <td className="px-4 py-5">
                                            {item.name}
                                        </td>
                                        <td className="px-4 py-5">
                                            {item.email}
                                        </td>
                                        <td className="px-4 py-5">
                                            {item.phone_number || "-"}
                                        </td>
                                        <td className="px-4 py-5">
                                            {item.gender === "L"
                                                ? "Laki-laki"
                                                : item.gender === "P"
                                                  ? "Perempuan"
                                                  : "-"}
                                        </td>
                                        <td className="px-4 py-5">
                                            {item.status == 1 ? (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Aktif</span>
                                            ) : (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Tidak Aktif</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-5">
                                            {item.department?.name || "-"}
                                        </td>

                                        <td className="px-4 py-5">
                                            {item.position?.name || "-"}
                                        </td>
                                        <td className="px-4 py-5">
                                            {item.roles?.length > 0
                                                ? item.roles[0].name
                                                : "-"}
                                        </td>

                                        <td className="px-4 py-5">
                                            <button
                                                onClick={() => {
                                                    setUser(item);
                                                    setShowEditModal(true);
                                                }}
                                                className="rounded-full border border-primary-600 text-primary-600 flex items-center gap-1.5 px-3 py-1 text-sm font-medium text-primary"
                                            >
                                                <MdOutlineRemoveRedEye
                                                    size={18}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        </div>

                        <PaginationDashboard
                            links={data?.users?.links}
                            meta={data?.users}
                        />
                </div>

                {/* MODAL TAMBAH */}
                {showAddModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn">
                        <div className="bg-white p-6 rounded shadow-lg">
                            <ModalTambahUser
                                isOpen={showAddModal}
                                onClose={() => setShowAddModal(!showAddModal)}
                                roles={data.roles}
                                departments={data.departements}
                                positions={data.positions}
                            />
                        </div>
                    </div>
                )}

                {/* MODAL EDIT */}
                {showEditModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn">
                        <div className="bg-white p-6 rounded shadow-lg">
                            <ModalEditUser
                                isOpen={showEditModal}
                                onClose={() => setShowEditModal(!showEditModal)}
                                user={user}
                                roles={data.roles}
                                departments={data.departements}
                                positions={data.positions}
                            />
                        </div>
                    </div>
                )}

                {/* MODAL FILTER */}
                {showFilterModal && (
                    <ModalFilterUser
                        isOpen={showFilterModal}
                        onClose={() => setShowFilterModal(false)}
                        onApply={handleApplyFilter}
                        departments={data.departements}
                        positions={data.positions}
                        roles={data.roles}
                        currentFilters={{ departmentId, positionId, role }}
                    />
                )}
            </div>
        </DefaultLayout>
    );
}
