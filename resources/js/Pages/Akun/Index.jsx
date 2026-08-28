import DefaultLayout from "@/Layouts/DefaultLayout";
import { useState, useRef } from "react";
import {  usePage, useForm , Head } from "@inertiajs/react";
import { FiCamera, FiInfo } from "react-icons/fi";
import { BsPencilFill } from "react-icons/bs";
import { RiLock2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

export default function Index({ user }) {
    const { auth } = usePage().props;

    const fileInputRef = useRef(null);
    const [previewImg, setPreviewImg] = useState(null);

    const profileForm = useForm({
        name: auth?.user?.name ?? "",
        email: auth?.user?.email ?? "",
        phone_number: auth?.user?.phone_number ?? "",
        img: null,
    });

    const passwordForm = useForm({
        old_password: "",
        password: "",
        password_confirmation: "",
    });

    const submitProfile = (e) => {
        e.preventDefault();

        profileForm.post(route("setting.akun.store"), {
            forceFormData: true,
            onSuccess: () => {
                setPreviewImg(null);
                toast.success("Berhasil mengubah data!");
            },
            onError: () => {
                toast.error("Gagal mengubah data.");
            },
        });
    };

    const submitPassword = (e) => {
        e.preventDefault();

        passwordForm.post(route("setting.akun.store"), {
            onSuccess: () => {
                passwordForm.reset();
                toast.success("Berhasil mengubah password!");
            },
            onError: () => {
                toast.error("Gagal mengubah password.");
            },
        });
    };

    return (
        <DefaultLayout>
            <Head title="Akun" />
            <main>
                <div className="mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">
                            Pengaturan Profil
                        </h1>
                        <p className="text-slate-500">
                            Kelola informasi profil dan keamanan akun Anda.
                        </p>
                    </div>
                    <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                        <div className="p-6 border-b border-slate-100">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <BsPencilFill className="text-primary-600" />
                                Edit Profil
                            </h2>
                        </div>

                        <div className="p-6">
                            <form
                                onSubmit={submitProfile}
                                className="space-y-6"
                            >
                                {/* FOTO */}
                                <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                                    <div className="relative">
                                        <img
                                            src={
                                                previewImg
                                                    ? previewImg
                                                    : auth?.user?.img
                                                      ? `${window.location.origin}/${auth.user.img}`
                                                      : "/images/profile/profil.jpg"
                                            }
                                            className="w-24 h-24 rounded-full object-cover object-center border-4 border-white shadow-sm"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                fileInputRef.current.click()
                                            }
                                            className="absolute bottom-0 right-0 bg-primary-600 text-white p-1.5 rounded-full shadow-lg hover:scale-105 transition-transform"
                                        >
                                            <FiCamera size={14} />
                                        </button>
                                    </div>

                                    <div>
                                        <h3 className="font-medium">
                                            Foto Profil
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-2">
                                            JPG / PNG, maksimal 2MB
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                fileInputRef.current.click()
                                            }
                                            className="px-4 py-2 text-sm font-medium text-primary bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                        >
                                            Ganti Foto
                                        </button>
                                    </div>
                                </div>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;

                                        profileForm.setData("img", file);
                                        setPreviewImg(
                                            URL.createObjectURL(file),
                                        );
                                    }}
                                />

                                {/* NAMA */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm">Nama</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:ring-0 focus:outline-none placeholder:text-neutral-300 py-2 px-3"
                                            value={profileForm.data.name}
                                            onChange={(e) =>
                                                profileForm.setData(
                                                    "name",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {profileForm.errors.name && (
                                            <span className="text-xs text-red-500">
                                                {profileForm.errors.name}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm">Email</label>
                                        <input
                                            type="email"
                                            className="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:ring-0 focus:outline-none placeholder:text-neutral-300 py-2 px-3"
                                            value={profileForm.data.email}
                                            onChange={(e) =>
                                                profileForm.setData(
                                                    "email",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {profileForm.errors.email && (
                                            <span className="text-xs text-red-500">
                                                {profileForm.errors.email}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label className="text-sm">No HP</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:ring-0 focus:outline-none placeholder:text-neutral-300 py-2 px-3"
                                            value={
                                                profileForm.data.phone_number
                                            }
                                            onChange={(e) =>
                                                profileForm.setData(
                                                    "phone_number",
                                                    e.target.value.replace(
                                                        /[^0-9]/g,
                                                        "",
                                                    ),
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button
                                        disabled={profileForm.processing}
                                        className="bg-primary-600 text-white text-sm py-2.5 px-4 rounded-xl"
                                    >
                                        Simpan Perubahan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                    <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-12">
                        <div className="p-6 border-b border-slate-100">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <RiLock2Fill className="text-primary-600" />
                                Ubah Password
                            </h2>
                        </div>

                        <div className="p-6">
                            <form
                                onSubmit={submitPassword}
                                className="space-y-6"
                            >
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm">
                                        Password Lama
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:ring-0 focus:outline-none py-2 px-3"
                                        value={passwordForm.data.old_password}
                                        onChange={(e) =>
                                            passwordForm.setData(
                                                "old_password",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {passwordForm.errors.old_password && (
                                        <span className="text-xs text-red-500">
                                            {passwordForm.errors.old_password}
                                        </span>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm">
                                            Password Baru
                                        </label>
                                        <input
                                            type="password"
                                            className="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:ring-0 focus:outline-none py-2 px-3"
                                            value={passwordForm.data.password}
                                            onChange={(e) =>
                                                passwordForm.setData(
                                                    "password",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {passwordForm.errors.password && (
                                            <span className="text-xs text-red-500">
                                                {passwordForm.errors.password}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm">
                                            Konfirmasi Password
                                        </label>
                                        <input
                                            type="password"
                                            className="w-full rounded-xl text-sm border border-neutral-300 focus:border-primary-600 focus:ring-0 focus:outline-none py-2 px-3"
                                            value={
                                                passwordForm.data
                                                    .password_confirmation
                                            }
                                            onChange={(e) =>
                                                passwordForm.setData(
                                                    "password_confirmation",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {passwordForm.errors
                                            .password_confirmation && (
                                            <span className="text-xs text-red-500">
                                                {
                                                    passwordForm.errors
                                                        .password_confirmation
                                                }
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg flex gap-3">
                                    <FiInfo className="text-blue-500 text-xl" />
                                    <p className="text-sm text-blue-700">
                                        Pastikan password Anda minimal 8
                                        karakter dengan kombinasi huruf besar,
                                        huruf kecil, dan angka.
                                    </p>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button className="bg-primary-600 text-white text-sm py-2.5 px-4 rounded-xl">
                                        Perbarui Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
        </DefaultLayout>
    );
}
