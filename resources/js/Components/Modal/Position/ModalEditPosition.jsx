import { useEffect } from "react";
import { IoIosClose as CloseIcon } from "react-icons/io";
import { useForm, router, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";

const ModalEditPosition = ({ isOpen, onClose, position, departments }) => {
    const { permissions } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        id: position?.id || "",
        name: position?.name || "",
        department_id: position?.department_id || "",
        status: position?.status?.toString() || "1",
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

        post(route("master.position.store"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Berhasil mengubah posisi!");
                onClose();
                reset();
            },
            onError: () => {
                toast.error("Gagal mengubah posisi.");
            },
        });
    };

    const handleDelete = () => {
        if (confirm("Yakin ingin menghapus posisi?")) {
            router.delete(route("master.position.destroy", position?.id), {
                onSuccess: () => {
                    toast.success("Berhasil menghapus posisi!");
                    onClose();
                },
                onError: () => {
                    toast.error("Gagal menghapus posisi.");
                },
            });
        }
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 transition-opacity duration-200 ease-in-out ${
                isOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
        >
            <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-0">
                <div
                    className={`relative mx-auto w-full max-w-md transform rounded-xl overflow-y-auto bg-white shadow-lg transition-transform duration-200 ease-in-out ${
                        isOpen
                            ? "translate-y-0 scale-100"
                            : "translate-y-10 scale-95"
                    }`}
                >
                    <div className="px-6 pb-4 text-sm">
                        <div className="mb-4 flex items-center justify-between sticky z-10 bg-white top-0 py-4">
                            <h3 className="text-black text-base font-semibold">
                                Edit Posisi
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                <CloseIcon size={25} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Nama Posisi</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:ring-0 focus:outline-none placeholder:text-neutral-300 py-2 px-3"
                                    value={data.name}
                                    placeholder="Masukkan nama posisi"
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
                                <select
                                    required
                                    className="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:ring-0 focus:outline-none py-2 px-3"
                                    value={data.department_id}
                                    onChange={(e) =>
                                        setData("department_id", e.target.value)
                                    }
                                >
                                    <option value="" disabled>Pilih Departemen</option>
                                    {departments?.map((dept) => (
                                        <option key={dept.id} value={dept.id}>
                                            {dept.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.department_id && (
                                    <span className="text-xs text-red-500">
                                        {errors.department_id}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Status</label>
                                <select
                                    className="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:ring-0 focus:outline-none py-2 px-3"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                >
                                    <option value="1">Aktif</option>
                                    <option value="0">Tidak Aktif</option>
                                </select>
                                {errors.status && (
                                    <span className="text-xs text-red-500">
                                        {errors.status}
                                    </span>
                                )}
                            </div>

                            {/* ACTION BUTTON */}
                            <div className="flex items-center justify-between pt-4 border-t mt-4">
                                {permissions.includes("position-delete") && (
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

                                    {permissions.includes("position-update") && (
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

export default ModalEditPosition;
