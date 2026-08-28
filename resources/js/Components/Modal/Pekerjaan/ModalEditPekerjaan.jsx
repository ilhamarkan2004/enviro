import { useEffect } from "react";
import { IoIosClose as CloseIcon } from "react-icons/io";
import { useForm, router, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import Select from "react-select";

const ModalEditPekerjaan = ({ isOpen, onClose, task, users, departments }) => {
    const { permissions } = usePage().props;
    
    // Format datetime-local requires YYYY-MM-DDThh:mm
    const formatDateTime = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        // Adjust for timezone offset
        const tzOffset = date.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(date - tzOffset)).toISOString().slice(0, 16);
        return localISOTime;
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        name: task?.name || "",
        department_id: task?.department_id || "",
        user_id: task?.user_id || "",
        deadline_at: formatDateTime(task?.deadline_at),
        priority: task?.priority?.toString() || "0",
        status: task?.status?.toString() || "0",
        notes: "",
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
            reset();
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("operasional.pekerjaan.update", task?.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Berhasil mengubah pekerjaan!");
                onClose();
                reset();
            },
            onError: () => {
                toast.error("Gagal mengubah pekerjaan.");
            },
        });
    };

    const handleDelete = () => {
        if (confirm("Yakin ingin menghapus pekerjaan ini?")) {
            router.delete(route("operasional.pekerjaan.destroy", task?.id), {
                onSuccess: () => {
                    toast.success("Berhasil menghapus pekerjaan!");
                    onClose();
                },
                onError: () => {
                    toast.error("Gagal menghapus pekerjaan.");
                },
            });
        }
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
                                Edit Pekerjaan
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                <CloseIcon size={25} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Nama Pekerjaan</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:ring-0 focus:outline-none placeholder:text-neutral-300 py-2 px-3"
                                    value={data.name}
                                    placeholder="Masukkan nama pekerjaan"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                {errors.name && (
                                    <span className="text-xs text-red-500">
                                        {errors.name}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Departemen</label>
                                <Select
                                    options={departments?.map((dept) => ({ value: dept.id, label: dept.name }))}
                                    value={data.department_id ? { value: data.department_id, label: departments?.find(d => d.id == data.department_id)?.name } : null}
                                    onChange={(selected) => {
                                        setData("department_id", selected ? selected.value : "");
                                        setData("user_id", "");
                                    }}
                                    placeholder="Pilih Departemen"
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
                                {errors.department_id && (
                                    <span className="text-xs text-red-500">
                                        {errors.department_id}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm">PIC (Penanggung Jawab)</label>
                                <Select
                                    options={users?.filter(u => u.department_id == data.department_id).map((usr) => ({ value: usr.id, label: usr.name }))}
                                    value={data.user_id ? { value: data.user_id, label: users?.find(u => u.id == data.user_id)?.name } : null}
                                    onChange={(selected) => setData("user_id", selected ? selected.value : "")}
                                    placeholder="Pilih PIC"
                                    isDisabled={!data.department_id}
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
                                {errors.user_id && (
                                    <span className="text-xs text-red-500">
                                        {errors.user_id}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Deadline</label>
                                <input
                                    type="datetime-local"
                                    className="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:ring-0 focus:outline-none placeholder:text-neutral-300 py-2 px-3"
                                    value={data.deadline_at}
                                    onChange={(e) =>
                                        setData("deadline_at", e.target.value)
                                    }
                                />
                                {errors.deadline_at && (
                                    <span className="text-xs text-red-500">
                                        {errors.deadline_at}
                                    </span>
                                )}
                            </div>

                            <div className="flex gap-4 w-full">
                                <div className="flex flex-col gap-2 w-1/2">
                                    <label className="text-sm">Prioritas</label>
                                    <select
                                        className="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:ring-0 focus:outline-none py-2 px-3"
                                        value={data.priority}
                                        onChange={(e) =>
                                            setData("priority", e.target.value)
                                        }
                                    >
                                        <option value="0">Rendah</option>
                                        <option value="1">Sedang</option>
                                        <option value="2">Tinggi</option>
                                    </select>
                                    {errors.priority && (
                                        <span className="text-xs text-red-500">
                                            {errors.priority}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2 w-1/2">
                                    <label className="text-sm">Status</label>
                                    <select
                                        className="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:ring-0 focus:outline-none py-2 px-3"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                    >
                                        <option value="0">Belum Mulai</option>
                                        <option value="1">Proses</option>
                                        <option value="2">Selesai</option>
                                    </select>
                                    {errors.status && (
                                        <span className="text-xs text-red-500">
                                            {errors.status}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Catatan Progres (Opsional)</label>
                                <textarea
                                    className="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:ring-0 focus:outline-none placeholder:text-neutral-300 py-2 px-3"
                                    rows="2"
                                    placeholder="Tuliskan catatan tahapan perubahan jika ada..."
                                    value={data.notes}
                                    onChange={(e) =>
                                        setData("notes", e.target.value)
                                    }
                                ></textarea>
                                {errors.notes && (
                                    <span className="text-xs text-red-500">
                                        {errors.notes}
                                    </span>
                                )}
                            </div>

                            {/* ACTION BUTTON */}
                            <div className="flex items-center justify-between pt-4 border-t mt-4">
                                {permissions.includes("pekerjaan-delete") && (
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        className="text-red-600 text-sm font-medium hover:underline"
                                    >
                                        Hapus
                                    </button>
                                )}

                                <div className="flex gap-3 ml-auto">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="rounded-xl border text-sm px-4 py-2 text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                                    >
                                        Batal
                                    </button>

                                    {permissions.includes("pekerjaan-update") && (
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="rounded-xl bg-primary-600 text-white text-sm px-5 py-2 hover:bg-primary-700"
                                        >
                                            {processing
                                                ? "Menyimpan..."
                                                : "Simpan"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalEditPekerjaan;
