import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { useForm, router, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import { IoImageOutline } from "react-icons/io5";
import Select from "react-select";

const ModalEditUser = ({
    isOpen,
    onClose,
    user,
    roles,
    departments,
    positions,
}) => {
    const { permissions } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        id: user?.id || "",
        name: user?.name || "",
        email: user?.email || "",
        password: "",
        phone_number: user?.phone_number || "",
        gender: user?.gender || "",
        role: user?.roles?.[0]?.name || "",
        department_id: user?.department_id || "",
        position_id: user?.position_id || "",
        dob: user?.dob || "",
        status: user?.status?.toString() || "1",
        img: null,
    });

    /**
     * Update data ketika user berubah
     */
    useEffect(() => {
        if (user && isOpen) {
            setData({
                id: user.id || "",
                name: user.name || "",
                email: user.email || "",
                password: "",
                phone_number: user.phone_number || "",
                gender: user.gender || "",
                role: user.roles?.[0]?.name || "",
                department_id: user.department_id || "",
                position_id: user.position_id || "",
                dob: user.dob || "",
                status: user.status?.toString() || "1",
                img: null,
            });
        }
    }, [user, isOpen]);

    /**
     * Lock scroll ketika modal terbuka
     */
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    /**
     * Submit
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("setting.user.store"), {
            preserveScroll: true,
            forceFormData: true,

            onSuccess: () => {
                toast.success("Berhasil mengubah user!");
                onClose();
                reset();
            },

            onError: () => {
                toast.error("Gagal mengubah user.");
            },
        });
    };

    /**
     * Delete
     */
    const handleDelete = () => {
        if (confirm("Yakin ingin menghapus user?")) {
            router.delete(route("setting.user.destroy", user?.id), {
                onSuccess: () => {
                    toast.success("Berhasil menghapus user!");
                    onClose();
                },

                onError: () => {
                    toast.error("Gagal menghapus user.");
                },
            });
        }
    };

    /**
     * Upload image
     */
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setData("img", file);
        }
    };

    /**
     * React Select options
     */
    const roleOptions =
        roles?.map((role) => ({
            value: role.name,
            label: role.name,
        })) || [];

    const departmentOptions =
        departments?.map((department) => ({
            value: department.id,
            label: department.name,
        })) || [];

    const positionOptions =
        positions
            ?.filter(p => !data.department_id || p.department_id == data.department_id)
            .map((position) => ({
                value: position.id,
                label: position.name,
            })) || [];

    const genderOptions = [
        {
            value: "L",
            label: "Laki-laki",
        },
        {
            value: "P",
            label: "Perempuan",
        },
    ];

    /**
     * Selected value
     */
    const selectedRole =
        roleOptions.find((option) => option.value === data.role) || null;

    const selectedDepartment =
        departmentOptions.find(
            (option) => String(option.value) === String(data.department_id),
        ) || null;

    const selectedPosition =
        positionOptions.find(
            (option) => String(option.value) === String(data.position_id),
        ) || null;

    const selectedGender =
        genderOptions.find((option) => option.value === data.gender) || null;

    /**
     * Style React Select
     */
    const selectStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: "42px",
            borderRadius: "0.75rem",
            borderColor: state.isFocused ? "#184680" : "#d4d4d4",
            boxShadow: "none",
            fontSize: "14px",

            "&:hover": {
                borderColor: "#184680",
            },
        }),

        menu: (base) => ({
            ...base,
            zIndex: 9999,
            fontSize: "14px",
        }),

        option: (base, state) => ({
            ...base,
            fontSize: "14px",
            backgroundColor: state.isSelected
                ? "#184680"
                : state.isFocused
                  ? "#f3f4f6"
                  : "white",
            color: state.isSelected ? "white" : "#404040",
        }),

        placeholder: (base) => ({
            ...base,
            color: "#a3a3a3",
        }),
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 transition-opacity duration-200 ease-in-out dark:bg-white dark:bg-opacity-10 ${
                isOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
        >
            <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-0">
                <div
                    className={`relative mx-auto w-full max-w-2xl transform rounded-xl overflow-y-auto scrollbar-hidden max-h-[40rem] bg-white shadow-lg transition-transform duration-200 ease-in-out dark:bg-boxdark ${
                        isOpen
                            ? "translate-y-0 scale-100"
                            : "translate-y-10 scale-95"
                    }`}
                >
                    <div className="px-6 pb-4 text-sm">
                        {/* HEADER */}
                        <div className="mb-4 flex items-center justify-between sticky z-10 bg-white top-0 py-4">
                            <h3 className="text-black text-base font-semibold">
                                Edit User
                            </h3>

                            <button
                                type="button"
                                onClick={onClose}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                <IoIosClose size={25} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* NAMA */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Nama</label>

                                <input
                                    type="text"
                                    required
                                    className="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:outline-none focus:ring-0 py-2 px-3"
                                    value={data.name}
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

                            {/* EMAIL */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Email</label>

                                <input
                                    type="email"
                                    required
                                    className="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:outline-none focus:ring-0 py-2 px-3"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                {errors.email && (
                                    <span className="text-xs text-red-500">
                                        {errors.email}
                                    </span>
                                )}
                            </div>

                            {/* PASSWORD */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Password</label>

                                <input
                                    type="password"
                                    className="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:outline-none focus:ring-0 py-2 px-3"
                                    value={data.password}
                                    placeholder="Kosongkan jika tidak diubah"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                {errors.password && (
                                    <span className="text-xs text-red-500">
                                        {errors.password}
                                    </span>
                                )}
                            </div>

                            {/* ROLE */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Role</label>

                                <Select
                                    options={roleOptions}
                                    value={selectedRole}
                                    onChange={(selected) =>
                                        setData("role", selected?.value || "")
                                    }
                                    placeholder="Pilih Role"
                                    isSearchable
                                    isClearable
                                    styles={selectStyles}
                                    noOptionsMessage={() =>
                                        "Role tidak ditemukan"
                                    }
                                />

                                {errors.role && (
                                    <span className="text-xs text-red-500">
                                        {errors.role}
                                    </span>
                                )}
                            </div>

                            {/* DEPARTEMEN */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Departemen</label>

                                <Select
                                    options={departmentOptions}
                                    value={selectedDepartment}
                                    onChange={(selected) => {
                                        setData(
                                            "department_id",
                                            selected?.value || "",
                                        );

                                        // Reset jabatan ketika departemen berubah
                                        setData("position_id", "");
                                    }}
                                    placeholder="Pilih Departemen"
                                    isSearchable
                                    isClearable
                                    styles={selectStyles}
                                    noOptionsMessage={() =>
                                        "Departemen tidak ditemukan"
                                    }
                                />

                                {errors.department_id && (
                                    <span className="text-xs text-red-500">
                                        {errors.department_id}
                                    </span>
                                )}
                            </div>

                            {/* JABATAN */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Jabatan</label>

                                <Select
                                    options={positionOptions}
                                    value={selectedPosition}
                                    onChange={(selected) =>
                                        setData(
                                            "position_id",
                                            selected?.value || "",
                                        )
                                    }
                                    placeholder="Pilih Jabatan"
                                    isSearchable
                                    isClearable
                                    isDisabled={!data.department_id}
                                    styles={selectStyles}
                                    noOptionsMessage={() =>
                                        "Jabatan tidak ditemukan"
                                    }
                                />

                                {errors.position_id && (
                                    <span className="text-xs text-red-500">
                                        {errors.position_id}
                                    </span>
                                )}
                            </div>

                            {/* NOMOR TELEPON */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Nomor Telepon</label>

                                <input
                                    type="text"
                                    className="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:outline-none focus:ring-0 py-2 px-3"
                                    value={data.phone_number}
                                    onChange={(e) =>
                                        setData("phone_number", e.target.value)
                                    }
                                />

                                {errors.phone_number && (
                                    <span className="text-xs text-red-500">
                                        {errors.phone_number}
                                    </span>
                                )}
                            </div>

                            {/* GENDER */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Jenis Kelamin</label>

                                <Select
                                    options={genderOptions}
                                    value={selectedGender}
                                    onChange={(selected) =>
                                        setData("gender", selected?.value || "")
                                    }
                                    placeholder="Pilih Gender"
                                    isSearchable
                                    isClearable
                                    styles={selectStyles}
                                    noOptionsMessage={() =>
                                        "Gender tidak ditemukan"
                                    }
                                />

                                {errors.gender && (
                                    <span className="text-xs text-red-500">
                                        {errors.gender}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Status</label>

                                <Select
                                    options={[
                                        { value: "1", label: "Aktif" },
                                        { value: "0", label: "Tidak Aktif" },
                                    ]}
                                    value={{
                                        value: data.status,
                                        label: data.status === "1" ? "Aktif" : "Tidak Aktif",
                                    }}
                                    onChange={(selected) =>
                                        setData("status", selected?.value || "1")
                                    }
                                    placeholder="Pilih Status"
                                    isSearchable={false}
                                    styles={selectStyles}
                                    className="text-sm"
                                />

                                {errors.status && (
                                    <span className="text-xs text-red-500">
                                        {errors.status}
                                    </span>
                                )}
                            </div>

                            {/* TANGGAL LAHIR */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Tanggal Lahir</label>

                                <input
                                    type="date"
                                    className="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:outline-none focus:ring-0 py-2 px-3"
                                    value={data.dob}
                                    onChange={(e) =>
                                        setData("dob", e.target.value)
                                    }
                                />

                                {errors.dob && (
                                    <span className="text-xs text-red-500">
                                        {errors.dob}
                                    </span>
                                )}
                            </div>

                            {/* FOTO */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Foto</label>

                                {data.img ? (
                                    <div className="relative group">
                                        <img
                                            src={URL.createObjectURL(data.img)}
                                            alt="Uploaded"
                                            className="h-64 w-full rounded-lg object-cover"
                                        />

                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                            <label
                                                htmlFor="img"
                                                className="bg-primary-600 text-sm text-white px-4 py-2 rounded-md shadow hover:bg-primary-600/90 transition cursor-pointer"
                                            >
                                                Pilih Gambar Lain
                                            </label>
                                        </div>

                                        <input
                                            id="img"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                ) : user?.img ? (
                                    <div className="relative group">
                                        <img
                                            src={`/${user.img}`}
                                            alt={user.name}
                                            className="h-64 w-full rounded-lg object-cover"
                                        />

                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                            <label
                                                htmlFor="img"
                                                className="bg-primary-600 text-sm text-white px-4 py-2 rounded-md shadow hover:bg-primary-600/90 transition cursor-pointer"
                                            >
                                                Ganti Gambar
                                            </label>
                                        </div>

                                        <input
                                            id="img"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                ) : (
                                    <label className="border-gray-300 bg-white flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed">
                                        <div className="flex flex-col items-center justify-center gap-1.5">
                                            <IoImageOutline
                                                size={37}
                                                className="text-neutral-500"
                                            />

                                            <p className="text-primary-600 text-base">
                                                Unggah Gambar
                                            </p>

                                            <p className="text-neutral-500 text-sm">
                                                Format: JPG, PNG (Maks. 5MB)
                                            </p>
                                        </div>

                                        <input
                                            id="img"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                )}

                                {errors.img && (
                                    <span className="text-xs text-red-500">
                                        {errors.img}
                                    </span>
                                )}
                            </div>

                            {/* ACTION BUTTON */}
                            <div className="flex items-center justify-between pt-4 border-t mt-4">
                                {permissions.includes("user-delete") && (
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

                                    {permissions.includes("user-update") && (
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

export default ModalEditUser;
