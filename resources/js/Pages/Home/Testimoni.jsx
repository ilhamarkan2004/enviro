import HomeLayout from "@/Layouts/HomeLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft } from "react-icons/fa";

const Testimoni = () => {
    return (
        <HomeLayout>
            <div
                id="testimoni"
                className="py-20 bg-gray-50 px-5 md:px-10 lg:px-14 xl:px-24"
            >
                <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900">
                    What Our Students Say
                </h2>
                <p className="text-center text-gray-500 mt-2">
                    Real experiences from our active learners
                </p>

                <div className="mt-10">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        autoplay={{ delay: 3000 }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {[
                            {
                                name: "Sarah Putri",
                                school: "SMA Negeri 5 Jakarta",
                                comment:
                                    "Kelasnya enak banget, mentornya sabar, dan aku jadi lebih berani speaking!",
                            },
                            {
                                name: "Adi Nugraha",
                                school: "Universitas Brawijaya",
                                comment:
                                    "Belajar jadi lebih mudah karena materinya praktis dan langsung dipraktekkan.",
                            },
                            {
                                name: "Lisa Mareta",
                                school: "SMA Katolik St. Louis 1",
                                comment:
                                    "Mentoringnya bikin ngerti banget! Recommended buat pemula.",
                            },
                            {
                                name: "Sarah Putri",
                                school: "SMA Negeri 5 Jakarta",
                                comment:
                                    "Kelasnya enak banget, mentornya sabar, dan aku jadi lebih berani speaking!",
                            },
                            {
                                name: "Adi Nugraha",
                                school: "Universitas Brawijaya",
                                comment:
                                    "Belajar jadi lebih mudah karena materinya praktis dan langsung dipraktekkan.",
                            },
                            {
                                name: "Lisa Mareta",
                                school: "SMA Katolik St. Louis 1",
                                comment:
                                    "Mentoringnya bikin ngerti banget! Recommended buat pemula.",
                            },
                        ].map((item, i) => (
                            <SwiperSlide key={i}>
                                <div className="relative bg-white rounded-xl p-6 h-full">
                                    {/* ICON PETIK DUA */}
                                    <div className="w-fit bg-primary-800 text-white p-3 rounded-full">
                                        <FaQuoteLeft className="text-sm" />
                                    </div>

                                    {/* NAMA + SEKOLAH */}
                                    <div className="mt-4">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {item.school}
                                        </p>
                                    </div>

                                    {/* KOMENTAR */}
                                    <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                                        “{item.comment}”
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </HomeLayout>
    );
};

export default Testimoni;
