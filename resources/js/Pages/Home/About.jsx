import HomeLayout from "@/Layouts/HomeLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft } from "react-icons/fa";

const About = () => {
    return (
        <HomeLayout>
            <div id="about-us" className="flex flex-col md:flex-row gap-10 items-center justify-center my-20 px-5 md:px-10 lg:px-14 xl:px-24">
                <img
                    src="/images/hero2.svg"
                    className="w-full md:w-1/2 order-1 md:order-none"
                />

                <div className="flex flex-col gap-y-2 w-full md:w-1/2 text-center md:text-left">
                    <p className="text-gray-900 font-bold text-5xl">
                        Welcome to Our English Course!
                    </p>
                    <p className="text-gray-500">
                        Kami membantu Anda belajar lebih cepat dengan bimbingan
                        profesional yang memahami kebutuhan Anda. Nikmati
                        pembelajaran premium, materi praktis, dan dukungan
                        hingga benar-benar mahir!
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                        {/* cards tetap sama */}
                        <div className="bg-gray-100 w-full max-w-xs px-5 py-2 font-medium flex items-center gap-2 text-primary mx-auto md:mx-0">
                            <FaCircleCheck />
                            <p>Mentor Berpengalaman</p>
                        </div>

                        <div className="bg-gray-100 w-full max-w-xs px-5 py-2 font-medium flex items-center gap-2 text-primary mx-auto md:mx-0">
                            <FaCircleCheck />
                            <p>Kurikulum Terstruktur</p>
                        </div>

                        <div className="bg-gray-100 w-full max-w-xs px-5 py-2 font-medium flex items-center gap-2 text-primary mx-auto md:mx-0">
                            <FaCircleCheck />
                            <p>Kelas Live Interaktif</p>
                        </div>

                        <div className="bg-gray-100 w-full max-w-xs px-5 py-2 font-medium flex items-center gap-2 text-primary mx-auto md:mx-0">
                            <FaCircleCheck />
                            <p>Akses Rekaman Kelas</p>
                        </div>

                        <div className="bg-gray-100 w-full max-w-xs px-5 py-2 font-medium flex items-center gap-2 text-primary mx-auto md:mx-0">
                            <FaCircleCheck />
                            <p>Jadwal Fleksibel</p>
                        </div>

                        <div className="bg-gray-100 w-full max-w-xs px-5 py-2 font-medium flex items-center gap-2 text-primary mx-auto md:mx-0">
                            <FaCircleCheck />
                            <p>Sertifikat Resmi</p>
                        </div>
                    </div>

                    <div className="flex gap-5 mt-5 justify-center md:justify-start">
                        <Link className="text-gray-50 text-sm bg-primary-800 border border-primary-800 px-5 py-2.5 rounded-md">
                            Get Start Now
                        </Link>
                        <Link className="text-primary-800 border border-primary-800 px-5 py-2.5 rounded-md">
                            View all Services
                        </Link>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default About;
