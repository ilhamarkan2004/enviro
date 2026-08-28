import React, { useState, useEffect } from "react";
import Select from "react-select";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";

const ModalFilterUser = ({ isOpen, onClose, onApply, departments, positions, roles, currentFilters }) => {
    const [departmentId, setDepartmentId] = useState(currentFilters.departmentId || "");
    const [positionId, setPositionId] = useState(currentFilters.positionId || "");
    const [role, setRole] = useState(currentFilters.role || "");

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setDepartmentId(currentFilters.departmentId || "");
            setPositionId(currentFilters.positionId || "");
            setRole(currentFilters.role || "");
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen, currentFilters]);

    const handleApply = () => {
        onApply({ departmentId, positionId, role });
        onClose();
    };

    const handleReset = () => {
        setDepartmentId("");
        setPositionId("");
        setRole("");
        onApply({ departmentId: "", positionId: "", role: "" });
        onClose();
    };

    return (
        <div
            className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-200 ease-in-out ${
                isOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
        >
            <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div 
                    className="fixed inset-0 bg-black bg-opacity-20 transition-opacity" 
                    onClick={onClose}
                    aria-hidden="true"
                ></div>

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
                                Filter User
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
                                <label className="text-sm">Departemen</label>
                                <Select
                                    options={[
                                        { value: "", label: "Semua" },
                                        ...departments?.map((dept) => ({
                                            value: dept.id,
                                            label: dept.name,
                                        }))
                                    ]}
                                    value={
                                        departmentId
                                            ? {
                                                  value: departmentId,
                                                  label: departments?.find((d) => d.id == departmentId)?.name || "Semua",
                                              }
                                            : { value: "", label: "Semua" }
                                    }
                                    onChange={(selected) => {
                                        setDepartmentId(selected.value);
                                        // Reset position when department changes
                                        setPositionId("");
                                    }}
                                    placeholder="Pilih Departemen..."
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
                                <label className="text-sm">Posisi/Jabatan</label>
                                <Select
                                    options={[
                                        { value: "", label: "Semua" },
                                        ...positions
                                            ?.filter(pos => !departmentId || pos.department_id == departmentId)
                                            .map((pos) => ({
                                                value: pos.id,
                                                label: pos.name,
                                            }))
                                    ]}
                                    value={
                                        positionId
                                            ? {
                                                  value: positionId,
                                                  label: positions?.find((p) => p.id == positionId)?.name || "Semua",
                                              }
                                            : { value: "", label: "Semua" }
                                    }
                                    onChange={(selected) => setPositionId(selected.value)}
                                    placeholder="Pilih Posisi..."
                                    className="text-sm"
                                    isDisabled={departmentId && !positions?.some(pos => pos.department_id == departmentId)}
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
                                <label className="text-sm">Role (Peran)</label>
                                <Select
                                    options={[
                                        { value: "", label: "Semua" },
                                        ...roles?.map((r) => ({
                                            value: r.name,
                                            label: r.name,
                                        }))
                                    ]}
                                    value={
                                        role
                                            ? {
                                                  value: role,
                                                  label: roles?.find((r) => r.name === role)?.name || "Semua",
                                              }
                                            : { value: "", label: "Semua" }
                                    }
                                    onChange={(selected) => setRole(selected.value)}
                                    placeholder="Pilih Role..."
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
                        </div>

                        <div className="mt-8 flex justify-end gap-2 border-t pt-4">
                            <button
                                onClick={handleReset}
                                className="rounded-full border border-neutral-300 px-5 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
                            >
                                Reset
                            </button>
                            <button
                                onClick={handleApply}
                                className="rounded-full bg-primary-600 px-5 py-2 text-sm font-medium text-white hover:bg-primary-700"
                            >
                                Terapkan Filter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalFilterUser;
