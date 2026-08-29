import { useEffect, useState } from 'react';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FiMail, FiLock } from 'react-icons/fi';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

export default function ResetPassword({ token, email }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'));
    };

    return (
        <AuthLayout>
            <Head title="Reset Password" />
            <div className="w-full max-w-md rounded-xl shadow-md shadow-neutral-200 p-6 md:p-8">
                <Link href="/">
                    <img
                        src="/images/logo/logo.webp"
                        alt="PT Properindo Enviro Tech"
                        className="mx-auto mb-5 w-48"
                    />
                </Link>
                <h2 className="text-center text-lg font-semibold text-neutral-900 mb-2">
                    Atur Ulang Password
                </h2>
                <p className="text-center text-sm text-neutral-600 mb-6">
                    Silakan masukkan password baru untuk akun Anda
                </p>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block mb-1.5 text-sm text-neutral-900">
                            Email
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                                <FiMail size={18} />
                            </span>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                placeholder="email@example.com"
                                className="w-full px-10 py-3 text-sm rounded-xl border border-neutral-300 bg-gray-50 text-gray-500 focus:outline-none"
                                readOnly
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1.5 text-sm text-neutral-900">
                            Password Baru
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                                <FiLock size={18} />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                placeholder="Masukkan password baru"
                                className="w-full px-10 py-3 text-sm rounded-xl border border-neutral-300 focus:border-primary-600 focus:ring-0 focus:outline-none placeholder:text-neutral-400"
                            />
                            <span
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-400"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <FaEye size={18} />
                                ) : (
                                    <FaEyeSlash size={18} />
                                )}
                            </span>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1.5 text-sm text-neutral-900">
                            Konfirmasi Password
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                                <FiLock size={18} />
                            </span>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={data.password_confirmation}
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                                placeholder="Ketik ulang password baru"
                                className="w-full px-10 py-3 text-sm rounded-xl border border-neutral-300 focus:border-primary-600 focus:ring-0 focus:outline-none placeholder:text-neutral-400"
                            />
                            <span
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-400"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <FaEye size={18} />
                                ) : (
                                    <FaEyeSlash size={18} />
                                )}
                            </span>
                        </div>
                        {errors.password_confirmation && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>
                    <div className="pt-2">
                        <button
                            type="submit"
                            className={`w-full rounded-xl py-3 text-sm font-semibold text-white ${
                                processing
                                    ? "bg-slate-400 cursor-not-allowed"
                                    : "bg-primary-600 hover:bg-primary-600/90"
                            }`}
                            disabled={processing}
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
