import { useEffect } from "react";
import { IoIosClose as CloseIcon } from "react-icons/io";
import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

const ModalTambahDepartment = ({ isOpen, onClose }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        status: "1",
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

        post(route("master.department.store"), {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
                reset();
                toast.success("Berhasil menambah departement!");
            },
            onError: () => {
                toast.error("Gagal menambah departement.");
            },
        });
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
                                Tambah Departement
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-600 hover:text-gray-800 focus:outline-none"
                            >
                                <CloseIcon size={25} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="py-4 space-y-5"
                        >
                            <div className="flex flex-col gap-2">
                                <label className="text-sm">
                                    Nama Departement
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:ring-0 focus:outline-none placeholder:text-neutral-300 py-2 px-3"
                                    value={data.name}
                                    placeholder="Masukkan nama departement"
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

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl bg-primary-600 hover:bg-primary-600/90 text-white py-2.5 text-sm font-semibold transition-colors"
                            >
                                Simpan
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalTambahDepartment;
