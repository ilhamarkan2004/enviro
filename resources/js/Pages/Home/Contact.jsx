import React from "react";
import HomeLayout from "@/Layouts/HomeLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    FaEnvelope,
    FaInstagram,
    FaLocationDot,
    FaPhone,
    FaGlobe,
} from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
    // webSetting and kontak are provided globally by HandleInertiaRequests middleware
    const { webSetting, kontak } = usePage().props;

    // Fallbacks if data is empty
    const email = webSetting?.email || "info@tamiamanahsejahtera.com";
    const instagram =
        kontak?.find((k) => k.name?.toLowerCase().includes("instagram"))?.url ||
        "@tamiamanahsejahtera";
    const address =
        webSetting?.alamat || "Jl. Contoh Alamat No. 123, Kota, Indonesia";
    const phone = webSetting?.no_wa || "+62 812 3456 7890";

    // We try to extract just the handle from the IG URL for display if it's a URL
    const igHandle = instagram.includes("instagram.com/")
        ? "@" +
          instagram.split("instagram.com/")[1].replace("/", "").split("?")[0]
        : instagram;

    return (
        <HomeLayout>
            <Head title="Contact Us" />

            {/* Main Contact Section */}
            <div className="py-20 bg-slate-50 min-h-[70vh] flex flex-col justify-center">
                <div className="mx-auto max-w-7xl px-6 lg:px-12 w-full">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center">
                        {/* Left Content */}
                        <div className="w-full lg:w-1/2 flex flex-col gap-2 text-center lg:text-left bg-white p-8 rounded-2xl">
                            <h3 className="text-secondary-500 font-bold text-lg tracking-wider uppercase">
                                Hubungi Kami
                            </h3>
                            <h1 className="text-xl md:text-2xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                                Siap mewujudkan karier impian Anda?
                            </h1>
                            <p className="text-gray-500 lg:text-base text-sm leading-relaxed mt-4">
                                PT Properindo Enviro Tech adalah lembaga
                                pelatihan dan sertifikasi profesional yang
                                berdedikasi untuk mempersiapkan talenta terbaik
                                Indonesia. Kami menyediakan layanan bimbingan
                                karier, pelatihan skill, dan penyaluran kerja
                                yang dirancang khusus untuk kebutuhan industri
                                saat ini.
                            </p>
                        </div>

                        {/* Right Content - Single Image */}
                        <div className="w-full lg:w-1/2">
                            <img
                                src="/images/hero/2.png"
                                alt="Contact Illustration"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src =
                                        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop";
                                }}
                            />
                        </div>
                    </div>

                    {/* Bottom Contact Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                        {kontak && kontak.length > 0 ? (
                            kontak.map((item, index) => {
                                const n = item.name?.toLowerCase() || "";
                                let Icon = FaGlobe;
                                let iconColor = "text-secondary-500";
                                let bgColor = "bg-[#fdf8ed]";

                                if (n.includes("email") || n.includes("mail")) {
                                    Icon = FaEnvelope;
                                } else if (
                                    n.includes("instagram") ||
                                    n.includes("ig")
                                ) {
                                    Icon = FaInstagram;
                                } else if (
                                    n.includes("whatsapp") ||
                                    n.includes("wa")
                                ) {
                                    Icon = FaWhatsapp;
                                    iconColor = "text-green-500";
                                    bgColor = "bg-green-50";
                                } else if (
                                    n.includes("lokasi") ||
                                    n.includes("alamat") ||
                                    n.includes("visit")
                                ) {
                                    Icon = FaLocationDot;
                                } else if (
                                    n.includes("telepon") ||
                                    n.includes("telp") ||
                                    n.includes("phone") ||
                                    n.includes("call")
                                ) {
                                    Icon = FaPhone;
                                }

                                return (
                                    <a
                                        key={index}
                                        href={item.url || "#"}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5 hover:-translate-y-2 transition-transform duration-300"
                                    >
                                        <div
                                            className={`w-14 h-14 ${bgColor} rounded-xl flex items-center justify-center shrink-0 overflow-hidden`}
                                        >
                                            {item.img ? (
                                                <img
                                                    src={`/${item.img}`}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Icon
                                                    className={`w-6 h-6 ${iconColor}`}
                                                />
                                            )}
                                        </div>
                                        <div className="overflow-hidden">
                                            <h4
                                                className="font-bold text-gray-900 text-lg mb-1 truncate"
                                                title={item.name}
                                            >
                                                {item.name}
                                            </h4>
                                            <p
                                                className="text-gray-500 text-sm truncate"
                                                title={item.description}
                                            >
                                                {item.description}
                                            </p>
                                        </div>
                                    </a>
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center py-8 text-gray-500">
                                Belum ada data kontak.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default Contact;
