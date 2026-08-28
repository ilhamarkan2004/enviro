import { useEffect, useState } from "react";
import { IoIosClose as CloseIcon } from "react-icons/io";
import Select from "react-select";
import Datepicker from "react-tailwindcss-datepicker";

const ModalFilterPekerjaan = ({ isOpen, onClose, onApply, departments, positions, users, currentFilters }) => {
    const [departmentId, setDepartmentId] = useState(currentFilters.departmentId || "");
    const [positionId, setPositionId] = useState(currentFilters.positionId || "");
    const [userId, setUserId] = useState(currentFilters.userId || "");
    const [status, setStatus] = useState(currentFilters.status || "");
    const [priority, setPriority] = useState(currentFilters.priority || "");
    const [isOverdue, setIsOverdue] = useState(currentFilters.isOverdue || "");
    const [dateRange, setDateRange] = useState({
        startDate: currentFilters.startDate || null,
        endDate: currentFilters.endDate || null
    });
    const [createdDateRange, setCreatedDateRange] = useState({
        startDate: currentFilters.createdStartDate || null,
        endDate: currentFilters.createdEndDate || null
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Set current filters to local state when modal opens
            setDepartmentId(currentFilters.departmentId || "");
            setPositionId(currentFilters.positionId || "");
            setUserId(currentFilters.userId || "");
            setStatus(currentFilters.status || "");
            setPriority(currentFilters.priority || "");
            setIsOverdue(currentFilters.isOverdue || "");
            setDateRange({
                startDate: currentFilters.startDate || null,
                endDate: currentFilters.endDate || null
            });
            setCreatedDateRange({
                startDate: currentFilters.createdStartDate || null,
                endDate: currentFilters.createdEndDate || null
            });
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen, currentFilters]);

    const handleApply = () => {
        onApply({ 
            departmentId, 
            positionId, 
            userId, 
            status, 
            priority, 
            isOverdue,
            startDate: dateRange.startDate, 
            endDate: dateRange.endDate,
            createdStartDate: createdDateRange.startDate,
            createdEndDate: createdDateRange.endDate
        });
        onClose();
    };

    const handleReset = () => {
        setDepartmentId("");
        setPositionId("");
        setUserId("");
        setStatus("");
        setPriority("");
        setIsOverdue("");
        setDateRange({ startDate: null, endDate: null });
        setCreatedDateRange({ startDate: null, endDate: null });
        onApply({ 
            departmentId: "", positionId: "", userId: "", status: "", priority: "", isOverdue: "", 
            startDate: null, endDate: null, createdStartDate: null, createdEndDate: null 
        });
        onClose();
    };

    return (
        <div
            className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-200 ease-in-out ${
                isOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
        >
            <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                {/* Backdrop */}
                <div 
                    className="fixed inset-0 bg-black bg-opacity-20 transition-opacity" 
                    onClick={onClose}
                    aria-hidden="true"
                ></div>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

                <div
                    className={`relative inline-block w-full max-w-md transform rounded-xl bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle duration-200 ease-in-out ${
                        isOpen
                            ? "translate-y-0 scale-100 opacity-100"
                            : "translate-y-4 scale-95 opacity-0 sm:translate-y-0 sm:scale-95"
                    }`}
                >
                    <div className="px-6 pb-4 pt-5 text-sm">
                        <div className="mb-4 flex items-center justify-between sticky z-10 bg-white top-0 py-4 border-b">
                            <h3 className="text-black text-base font-semibold">
                                Filter Pekerjaan
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                <CloseIcon size={25} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Tanggal Dibuat</label>
                                <Datepicker
                                    value={createdDateRange}
                                    onChange={newValue => setCreatedDateRange(newValue)}
                                    showShortcuts={true}
                                    inputClassName="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:ring-0 focus:outline-none py-2 px-3"
                                    placeholder="Pilih rentang tanggal dibuat"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Tenggat Waktu (Deadline)</label>
                                <Datepicker
                                    value={dateRange}
                                    onChange={newValue => setDateRange(newValue)}
                                    showShortcuts={true}
                                    inputClassName="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:ring-0 focus:outline-none py-2 px-3"
                                    placeholder="Pilih rentang tanggal deadline"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Status Keterlambatan</label>
                                <Select
                                    options={[
                                        { value: "", label: "Semua" },
                                        { value: "1", label: "Terlambat" }
                                    ]}
                                    value={isOverdue ? { value: isOverdue, label: isOverdue === "1" ? "Terlambat" : "Semua" } : { value: "", label: "Semua" }}
                                    onChange={(selected) => setIsOverdue(selected.value)}
                                    placeholder="Pilih Status Keterlambatan..."
                                    className="text-sm"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            borderRadius: "0.75rem",
                                            borderColor: "#d4d4d8",
                                            boxShadow: "none",
                                        })
                                    }}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Status</label>
                                <Select
                                    options={[
                                        { value: "", label: "Semua Status" },
                                        { value: "0", label: "Belum Mulai" },
                                        { value: "1", label: "Proses" },
                                        { value: "2", label: "Selesai" }
                                    ]}
                                    value={status ? { value: status, label: status === "0" ? "Belum Mulai" : status === "1" ? "Proses" : "Selesai" } : { value: "", label: "Semua Status" }}
                                    onChange={(selected) => setStatus(selected.value)}
                                    placeholder="Pilih Status..."
                                    className="text-sm"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            borderRadius: "0.75rem",
                                            borderColor: "#d4d4d8",
                                            boxShadow: "none",
                                        })
                                    }}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Prioritas</label>
                                <Select
                                    options={[
                                        { value: "", label: "Semua Prioritas" },
                                        { value: "0", label: "Rendah" },
                                        { value: "1", label: "Sedang" },
                                        { value: "2", label: "Tinggi" }
                                    ]}
                                    value={priority ? { value: priority, label: priority === "0" ? "Rendah" : priority === "1" ? "Sedang" : "Tinggi" } : { value: "", label: "Semua Prioritas" }}
                                    onChange={(selected) => setPriority(selected.value)}
                                    placeholder="Pilih Prioritas..."
                                    className="text-sm"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            borderRadius: "0.75rem",
                                            borderColor: "#d4d4d8",
                                            boxShadow: "none",
                                        })
                                    }}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Departemen</label>
                                <Select
                                    options={[
                                        { value: "", label: "Semua Departemen" },
                                        ...departments.map((dept) => ({ value: dept.id, label: dept.name }))
                                    ]}
                                    value={departmentId ? { value: departmentId, label: departments.find(d => d.id == departmentId)?.name } : { value: "", label: "Semua Departemen" }}
                                    onChange={(selected) => {
                                        setDepartmentId(selected.value);
                                        setPositionId(""); // Reset position when department changes
                                    }}
                                    placeholder="Cari Departemen..."
                                    className="text-sm"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            borderRadius: "0.75rem",
                                            borderColor: "#d4d4d8", // neutral-300
                                            boxShadow: "none",
                                            "&:hover": {
                                                borderColor: "#10b981", // primary-600 approx depending on config, just generic green or primary
                                            }
                                        })
                                    }}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Posisi</label>
                                <Select
                                    options={[
                                        { value: "", label: "Semua Posisi" },
                                        ...positions
                                            .filter(pos => !departmentId || pos.department_id == departmentId)
                                            .map((pos) => ({ value: pos.id, label: pos.name }))
                                    ]}
                                    value={positionId ? { value: positionId, label: positions.find(p => p.id == positionId)?.name } : { value: "", label: "Semua Posisi" }}
                                    onChange={(selected) => setPositionId(selected.value)}
                                    placeholder="Cari Posisi..."
                                    className="text-sm"
                                    isDisabled={!!departmentId === false && positions.length > 0} // Optional: user requested to select department first. "perlu menselect departemen dulu baru muncul list2 posisi"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            borderRadius: "0.75rem",
                                            borderColor: "#d4d4d8",
                                            boxShadow: "none",
                                        })
                                    }}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm">PIC (Penanggung Jawab)</label>
                                <Select
                                    options={[
                                        { value: "", label: "Semua PIC" },
                                        ...users.map((usr) => ({ value: usr.id, label: usr.name }))
                                    ]}
                                    value={userId ? { value: userId, label: users.find(u => u.id == userId)?.name } : { value: "", label: "Semua PIC" }}
                                    onChange={(selected) => setUserId(selected.value)}
                                    placeholder="Cari PIC..."
                                    className="text-sm"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            borderRadius: "0.75rem",
                                            borderColor: "#d4d4d8",
                                            boxShadow: "none",
                                        })
                                    }}
                                />
                            </div>

                            {/* ACTION BUTTON */}
                            <div className="flex items-center justify-end pt-4 border-t mt-4 gap-3">
                                <button
                                    onClick={handleReset}
                                    className="rounded-xl border text-sm px-4 py-2 text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                                >
                                    Reset Filter
                                </button>

                                <button
                                    onClick={handleApply}
                                    className="rounded-xl bg-primary-600 text-white text-sm px-5 py-2 hover:bg-primary-700 font-medium"
                                >
                                    Terapkan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalFilterPekerjaan;
