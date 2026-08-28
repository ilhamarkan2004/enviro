import { useState, useEffect } from "react";
import {
    Bars3Icon,
    XMarkIcon,
    AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";

import { usePage } from "@inertiajs/react";

const navigation = [
    { name: "Beranda", href: "/#beranda" },
    { name: "Tentang Kami", href: "/#tentang-kami" },
    { name: "Layanan", href: "/#layanan" },
    { name: "Kontak", href: "/kontak" },
];

export default function Navbar() {
    const { webSetting } = usePage().props;
    const urlForm = webSetting?.url_form || "#";
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm 00 py-2" : "bg-transparent py-4"}`}
        >
            <nav
                className="flex items-center justify-between px-6 lg:px-12"
                aria-label="Global"
            >
                <div className="flex lg:flex-1 items-center gap-3">
                    <a
                        href="#"
                        className="-m-1.5 p-1.5 flex items-center gap-2"
                    >
                        <div className="bg-white px-3 py-3 rounded-full">
                            {" "}
                            <img
                                src="/images/logo/logo.webp"
                                alt=""
                                className="w-32"
                            />
                        </div>
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-8">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-sm  leading-6 text-gray-900 hover:text-secondary-500 transition"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center gap-4">
                    <a
                        href={urlForm}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md bg-secondary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary-600 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600"
                    >
                        Daftar Sekarang
                    </a>
                </div>
            </nav>

            <Dialog
                as="div"
                className="lg:hidden"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-2xl">
                    <div className="flex items-center justify-between">
                        <a
                            href="#"
                            className="-m-1.5 p-1.5 flex items-center gap-2"
                        >
                            <span className="sr-only">
                                PT Properindo Enviro Tech
                            </span>
                            <div className="bg-white px-3 py-3 rounded-full flex items-center justify-center">
                                <img
                                    src="/images/logo/logo.webp"
                                    alt="PT Properindo Enviro Tech"
                                    className="w-28 sm:w-32"
                                />
                            </div>
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50 hover:text-secondary-500 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                <a
                                    href="/login"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-secondary-500 transition-colors"
                                >
                                    Log in
                                </a>
                                <a
                                    href={urlForm}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 block w-full rounded-md bg-secondary-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary-600 transition-colors"
                                >
                                    Daftar Sekarang
                                </a>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}
