import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen flex font-dinnext text-neutral-900">
            <div className="hidden lg:flex w-1/2 relative">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 5000 }}
                    pagination={{
                        clickable: true,
                        renderBullet: (index, className) => {
                            return `<span class="${className} ${
                                index === 0 ? "w-10" : "w-5"
                            } h-1 mx-1 rounded-full bg-red-600 inline-block transition-all"></span>`;
                        },
                    }}
                    modules={[Pagination, Autoplay]}
                    className="w-full h-full"
                >
                    <SwiperSlide>
                        <div
                            className="w-full h-full bg-cover bg-center relative"
                            style={{
                                backgroundImage: "url(/images/auth/1.webp)",
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                            <div className="absolute bottom-20 px-10 z-10">
                                <p className="text-white text-3xl font-medium">
                                    Selamat Datang di PT Properindo Enviro Tech
                                </p>
                                <p className="text-gray-100 text-sm mt-2">
                                    Sistem Manajemen Tugas dan Kinerja terpadu
                                    untuk memastikan produktivitas dan
                                    efektivitas tim dalam mencapai target
                                    perusahaan.
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="w-full h-full bg-cover bg-center relative"
                            style={{
                                backgroundImage: "url(/images/auth/2.webp)",
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                            <div className="absolute bottom-20 px-10 z-10">
                                <p className="text-white text-3xl font-medium">
                                    Kelola Pekerjaan Lebih Terorganisir
                                </p>
                                <p className="text-gray-100 text-sm mt-2">
                                    Pantau dan selesaikan setiap tugas dengan
                                    mudah. Kolaborasi antar departemen menjadi
                                    lebih efektif, transparan, dan efisien.
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="w-full h-full bg-cover bg-center relative"
                            style={{
                                backgroundImage: "url(/images/auth/3.webp)",
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                            <div className="absolute bottom-20 px-10 z-10">
                                <p className="text-white text-3xl font-medium">
                                    Pantau Progres Kinerja Anda
                                </p>
                                <p className="text-gray-100 text-sm mt-2">
                                    Lacak riwayat pekerjaan dan pencapaian
                                    kinerja secara real-time untuk mendukung
                                    pertumbuhan perusahaan yang berkelanjutan.
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>

                <style jsx global>{`
                    .swiper-pagination {
                        position: absolute;
                        bottom: 10px;
                        left: 0;
                        width: 100%;
                        text-align: left;
                        padding-left: 40px;
                    }
                    .swiper-pagination-bullet {
                        background-color: rgba(255, 255, 255, 0.5);
                        border-radius: 4px;
                        height: 4px;
                        opacity: 1;
                    }
                    .swiper-pagination-bullet-active {
                        background-color: rgba(255, 255, 255, 1);
                        width: 45px !important;
                        border-radius: 4px;
                        transition:
                            width 0.3s ease,
                            background-color 0.3s ease;
                    }
                `}</style>
            </div>

            <div className="flex w-full lg:w-1/2 items-center justify-center bg-white">
                {children}
            </div>
        </div>
    );
}
