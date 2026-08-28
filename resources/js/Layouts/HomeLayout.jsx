import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Head, usePage } from "@inertiajs/react";
import { FaWhatsapp } from "react-icons/fa";

const HomeLayout = ({ children }) => {
    const { webSetting } = usePage().props;
    const noWa = webSetting?.no_wa || "6289523333217";
    // Ensure the number starts with 62 instead of 0
    const formattedWa = noWa.startsWith("0") ? "62" + noWa.substring(1) : noWa;

    return (
        <div>
            <Head>
                {/* Primary Meta */}
                <title>
                    Pelatihan & Sertifikasi Profesional | PT Properindo Enviro
                    Tech
                </title>
                <meta
                    name="description"
                    content="PT Properindo Enviro Tech menyediakan jasa pelatihan soft skill, hard skill, sertifikasi, hingga penyaluran kerja yang terintegrasi untuk kebutuhan industri."
                />
            </Head>

            <Navbar />
            {children}
            <Footer />

            {/* Floating WhatsApp */}
            <a
                href={`https://wa.me/${formattedWa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-2.5 rounded-full shadow-lg transition"
            >
                <FaWhatsapp size={40} />
            </a>
        </div>
    );
};

export default HomeLayout;
