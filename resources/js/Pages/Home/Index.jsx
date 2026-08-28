import { Head, usePage } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";
import {
    PlayIcon,
    CheckCircleIcon,
    AcademicCapIcon,
    BriefcaseIcon,
    DocumentCheckIcon,
    UserGroupIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
export default function Index({ auth, data }) {
    const { webSetting } = usePage().props;
    const noWa = webSetting?.no_wa || "6289523333217";
    const formattedWa = noWa.startsWith("0") ? "62" + noWa.substring(1) : noWa;
    const urlForm = webSetting?.url_form || "#";

    const partners = [
        "Pertamina",
        "Telkom Indonesia",
        "PLN",
        "Bank Syariah Indonesia",
        "Astra",
        "Mitra Industri",
    ];

    const testimonials = [
        {
            name: "Ahmad Dwi Putra",
            role: "Alumni Digital Marketing",
            text: "Pelatihan di PT Properindo Enviro Tech sangat bermanfaat. Materinya mudah dipahami dan saya berhasil mendapatkan pekerjaan sesuai bidang saya.",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
        },
        {
            name: "Siti Nurhaliza",
            role: "Alumni Akuntansi Dasar",
            text: "Mentor yang sangat sabar dan berpengalaman. Sekarang saya lebih percaya diri dalam mengatur laporan keuangan perusahaan.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
        },
        {
            name: "Budi Santoso",
            role: "Alumni Pemrograman Web",
            text: "Fasilitas lengkap dan kurikulum yang up-to-date. Berkat pelatihan ini, saya langsung disalurkan ke perusahaan IT terkemuka.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
        },
    ];

    const programs = [
        {
            title: "Soft Skill Bootcamp",
            image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400&h=250",
        },
        {
            title: "Hard Skill Intensive",
            image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400&h=250",
        },
        {
            title: "Career Preparation",
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=400&h=250",
        },
        {
            title: "Interview Class",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=250",
        },
        {
            title: "Leadership Camp",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400&h=250",
        },
        {
            title: "Digital Skill",
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400&h=250",
        },
    ];

    const team = [
        {
            name: "Andi Pratama",
            role: "Direktur Utama",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200",
        },
        {
            name: "Rina Febriani",
            role: "Trainer & Coach",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
        },
        {
            name: "Dimas Setiawan",
            role: "Career Coach",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
        },
        {
            name: "Siti Aisyah",
            role: "HR Consultant",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
        },
    ];

    return (
        <HomeLayout>
            <Head title="Wujudkan Karier Impian" />

            <div className="bg-white font-sans text-gray-800 selection:bg-secondary-500 selection:text-white">
                <main>
                    {/* Hero Section */}
                    <div id="beranda" className="relative isolate pt-14">
                        {/* Background decorative */}
                        <div
                            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                            aria-hidden="true"
                        >
                            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-secondary-200 to-primary-200 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
                        </div>

                        <div className="py-20 sm:py-32 lg:pb-40">
                            <div className="mx-auto max-w-7xl px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center gap-12">
                                <div className="lg:w-1/2">
                                    <h1 className="text-4xl font-bold tracking-tight text-primary-900 sm:text-5xl lg:text-6xl">
                                        Bersama Kami, <br /> Wujudkan Karier{" "}
                                        <br /> Impian{" "}
                                        <span className="text-secondary-500">
                                            Anda
                                        </span>
                                    </h1>
                                    <p className="mt-6 text-lg leading-8 text-gray-600">
                                        Pelatihan Soft Skill, Hard Skill,
                                        Sertifikasi hingga Penyaluran Kerja
                                        dalam satu ekosistem untuk mempersiapkan
                                        masa depan yang lebih baik.
                                    </p>
                                    <div className="mt-10 flex items-center gap-x-6">
                                        <a
                                            href={urlForm}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-md bg-primary-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-800 transition flex items-center gap-2"
                                        >
                                            Daftar Sekarang{" "}
                                            <ChevronRightIcon className="w-4 h-4 stroke-2" />
                                        </a>
                                        <a
                                            href={`https://wa.me/${formattedWa}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-md border border-gray-300 px-6 py-3 text-sm font-semibold leading-6 text-primary-900 flex items-center gap-2 hover:bg-gray-50 transition"
                                        >
                                            Konsultasi Gratis{" "}
                                            <CheckCircleIcon className="w-4 h-4" />
                                        </a>
                                    </div>
                                    <div className="mt-10 flex items-center gap-4">
                                        <div className="flex -space-x-3">
                                            <img
                                                className="inline-block h-12 w-12 rounded-full ring-2 ring-white object-cover"
                                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100"
                                                alt=""
                                            />
                                            <img
                                                className="inline-block h-12 w-12 rounded-full ring-2 ring-white object-cover"
                                                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100"
                                                alt=""
                                            />
                                            <img
                                                className="inline-block h-12 w-12 rounded-full ring-2 ring-white object-cover"
                                                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100&h=100"
                                                alt=""
                                            />
                                            <img
                                                className="inline-block h-12 w-12 rounded-full ring-2 ring-white object-cover"
                                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <div className="flex text-secondary-500">
                                                <StarIconSolid className="w-5 h-5" />
                                                <StarIconSolid className="w-5 h-5" />
                                                <StarIconSolid className="w-5 h-5" />
                                                <StarIconSolid className="w-5 h-5" />
                                                <StarIconSolid className="w-5 h-5" />
                                                <span className="text-primary-900 font-bold ml-2">
                                                    4.9
                                                </span>
                                                <span className="text-gray-500 text-sm ml-1">
                                                    (200+ ulasan)
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Dipercaya oleh ratusan peserta
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-1/2 relative mt-16 lg:mt-0">
                                    <div className="relative rounded-t-full bg-primary-900 overflow-hidden w-full max-w-sm md:max-w-md mx-auto aspect-[3/4] shadow-2xl">
                                        <img
                                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800&h=1000"
                                            alt="Professional Man"
                                            className="object-cover w-full h-full object-top mix-blend-luminosity opacity-90"
                                        />
                                        <div className="absolute inset-0 bg-primary-900/10"></div>
                                    </div>
                                    {/* Floating Cards */}
                                    <div className="absolute inset-y-0 -right-2 md:-right-8 lg:-right-12 flex flex-col justify-center gap-8 sm:gap-12 z-10 pointer-events-none">
                                        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-xl flex items-center gap-3 sm:gap-4 transition-transform self-end mr-4 md:mr-6 lg:mr-8 pointer-events-auto hover:scale-105">
                                            <div className="bg-primary-50 p-2 sm:p-3 rounded-xl text-primary-600">
                                                <AcademicCapIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </div>
                                            <div className="font-bold text-primary-900 text-xs sm:text-sm">
                                                Pelatihan
                                                <br />
                                                Berkualitas
                                            </div>
                                        </div>
                                        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-xl flex items-center gap-3 sm:gap-4 transition-transform self-end pointer-events-auto hover:scale-105">
                                            <div className="bg-secondary-50 p-2 sm:p-3 rounded-xl text-secondary-500">
                                                <DocumentCheckIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </div>
                                            <div className="font-bold text-primary-900 text-xs sm:text-sm">
                                                Sertifikat
                                                <br />
                                                Resmi
                                            </div>
                                        </div>
                                        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-xl flex items-center gap-3 sm:gap-4 transition-transform self-end mr-4 md:mr-6 lg:mr-8 pointer-events-auto hover:scale-105">
                                            <div className="bg-blue-50 p-2 sm:p-3 rounded-xl text-blue-600">
                                                <BriefcaseIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </div>
                                            <div className="font-bold text-primary-900 text-xs sm:text-sm">
                                                Penyaluran
                                                <br />
                                                Kerja
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="py-16 bg-white border-y border-gray-100 relative overflow-hidden">
                        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-gray-100">
                                <div className="flex flex-col lg:flex-row items-center justify-center gap-4 text-center lg:text-left">
                                    <div className="text-primary-900">
                                        <UserGroupIcon className="w-12 h-12" />
                                    </div>
                                    <div>
                                        <div className="text-4xl font-black text-secondary-500 mb-1">
                                            500+
                                        </div>
                                        <div className="text-sm text-primary-900 font-bold">
                                            Peserta
                                            <br />
                                            Telah Bergabung
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row items-center justify-center gap-4 text-center lg:text-left">
                                    <div className="text-primary-900">
                                        <BriefcaseIcon className="w-12 h-12" />
                                    </div>
                                    <div>
                                        <div className="text-4xl font-black text-secondary-500 mb-1">
                                            100+
                                        </div>
                                        <div className="text-sm text-primary-900 font-bold">
                                            Perusahaan
                                            <br />
                                            Mitra
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row items-center justify-center gap-4 text-center lg:text-left">
                                    <div className="text-primary-900">
                                        <AcademicCapIcon className="w-12 h-12" />
                                    </div>
                                    <div>
                                        <div className="text-4xl font-black text-secondary-500 mb-1">
                                            50+
                                        </div>
                                        <div className="text-sm text-primary-900 font-bold">
                                            Program
                                            <br />
                                            Pelatihan
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row items-center justify-center gap-4 text-center lg:text-left">
                                    <div className="text-primary-900">
                                        <CheckCircleIcon className="w-12 h-12" />
                                    </div>
                                    <div>
                                        <div className="text-4xl font-black text-secondary-500 mb-1">
                                            95%
                                        </div>
                                        <div className="text-sm text-primary-900 font-bold">
                                            Tingkat Kepuasan
                                            <br />
                                            Peserta
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* About Us */}
                    <div id="tentang-kami" className="py-16 sm:py-20 bg-white">
                        <div className="mx-auto max-w-7xl px-6 lg:px-12">
                            <div className="flex flex-col lg:flex-row items-center gap-16">
                                <div className="lg:w-1/2 relative w-full">
                                    <div className="relative rounded-3xl overflow-hidden aspect-video md:aspect-[4/3]">
                                        <img
                                            src="/images/hero/1.webp"
                                            alt="Training Session"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -z-10 top-1/2 -translate-y-1/2 -left-8 w-32 h-48 bg-secondary-100 rounded-full blur-3xl"></div>
                                </div>
                                <div className="lg:w-1/2">
                                    <h3 className="text-secondary-500 font-bold mb-2 tracking-wide uppercase text-sm">
                                        Tentang Kami
                                    </h3>
                                    <h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl mb-6">
                                        PT Properindo Enviro Tech
                                    </h2>
                                    <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                                        Kami adalah perusahaan yang bergerak di
                                        bidang pengembangan sumber daya manusia
                                        melalui pelatihan, sertifikasi, dan
                                        penyaluran kerja yang terintegrasi
                                        dengan kebutuhan industri.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        {(data?.tentangKami?.length > 0
                                            ? data.tentangKami
                                            : [
                                                  {
                                                      name: "Instruktur Profesional",
                                                      description:
                                                          "Dibimbing oleh praktisi dan ahli di bidangnya",
                                                  },
                                                  {
                                                      name: "Materi Sesuai Industri",
                                                      description:
                                                          "Kurikulum update sesuai kebutuhan dunia kerja",
                                                  },
                                                  {
                                                      name: "Sertifikat Resmi",
                                                      description:
                                                          "Sertifikat diakui dan meningkatkan nilai kompetensi",
                                                  },
                                                  {
                                                      name: "Pendampingan Karier",
                                                      description:
                                                          "Dibantu sampai siap kerja dan mendapatkan pekerjaan",
                                                  },
                                              ]
                                        ).map((card, idx) => (
                                            <div
                                                key={idx}
                                                className="flex gap-4 items-start"
                                            >
                                                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
                                                    {card.img ? (
                                                        <img
                                                            src={`/${card.img}`}
                                                            alt={card.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <UserGroupIcon className="w-6 h-6" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-primary-900 mb-1">
                                                        {card.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-500 leading-relaxed">
                                                        {card.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Services Section */}
                    <div id="layanan" className="py-16 bg-gray-50">
                        <div className="mx-auto max-w-7xl px-6 lg:px-12">
                            <div className="text-center max-w-2xl mx-auto mb-16">
                                <h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl mb-4">
                                    Layanan Kami
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Solusi lengkap untuk meningkatkan kompetensi
                                    dan karier Anda
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {data?.layanan?.length > 0 ? (
                                    data.layanan.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white rounded-3xl overflow-hidden transition-all duration-300 flex flex-col group hover:-translate-y-2 hover:shadow"
                                        >
                                            <div className="overflow-hidden">
                                                <img
                                                    src={
                                                        item.img
                                                            ? `/${item.img}`
                                                            : "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400&h=250"
                                                    }
                                                    alt={
                                                        item.title || item.name
                                                    }
                                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <h3 className="text-xl font-bold text-primary-900 mb-2">
                                                    {item.title || item.name}
                                                </h3>
                                                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center col-span-full">
                                        Belum ada layanan yang ditambahkan.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Why Choose Us */}
                    <div className="bg-primary-900 py-16 relative overflow-hidden">
                        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
                            <div className="text-center max-w-2xl mx-auto mb-16">
                                <h2 className="text-3xl font-bold tracking-tight text-secondary-500 sm:text-4xl">
                                    Mengapa Memilih
                                    <br />
                                    <p className="text-slate-50">
                                        PT Properindo Enviro Tech?
                                    </p>
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {(data?.keunggulan?.length > 0
                                    ? data.keunggulan
                                    : [
                                          {
                                              name: "Mentor Profesional",
                                              description:
                                                  "Instruktur berpengalaman di dunia industri yang siap membimbing Anda secara langsung. Dapatkan wawasan praktis, tips ahli, dan panduan karier dari para profesional yang telah sukses di bidangnya untuk memastikan Anda siap bersaing di pasar tenaga kerja.",
                                          },
                                          {
                                              name: "Materi Update",
                                              description:
                                                  "Materi pembelajaran selalu diperbarui secara berkala menyesuaikan dengan kebutuhan perusahaan dan tren industri terbaru. Kurikulum kami dirancang khusus bersama praktisi agar keahlian yang Anda pelajari selalu relevan dan siap diterapkan di dunia kerja nyata.",
                                          },
                                          {
                                              name: "Peluang Kerja",
                                              description:
                                                  "Terhubung dengan berbagai perusahaan mitra strategis yang aktif mencari talenta berkualitas. Kami memberikan fasilitas penyaluran kerja dan rekomendasi langsung agar Anda bisa lebih cepat meraih pekerjaan impian setelah menyelesaikan program.",
                                          },
                                          {
                                              name: "Sertifikat Resmi",
                                              description:
                                                  "Dapatkan sertifikat resmi yang akan meningkatkan kredibilitas dan nilai jual Anda di mata rekruter. Buktikan kompetensi Anda dengan kredensial yang diakui secara luas, memberikan Anda keunggulan kompetitif yang kuat di pasar kerja yang semakin kompetitif.",
                                          },
                                      ]
                                ).map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-gradient-to-b from-white/10 to-transparent border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-start hover:-translate-y-2 hover:from-white/15 transition-all duration-300 group text-left"
                                    >
                                        <div className="w-16 h-16 shrink-0 bg-primary-900/50 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform shadow-inner">
                                            {item.img ? (
                                                <img
                                                    src={`/${item.img}`}
                                                    alt={item.name}
                                                    className="w-8 h-8 object-contain"
                                                />
                                            ) : (
                                                <StarIconSolid className="w-8 h-8 text-secondary-500" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-3">
                                                {item.name}
                                            </h3>
                                            <p className="text-slate-50 text-sm leading-relaxed text-justify">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Decorative dot pattern */}
                        <div className="absolute top-0 right-0 p-8 opacity-20">
                            <div className="grid grid-cols-5 gap-4">
                                {[...Array(25)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-2 h-2 bg-white rounded-full"
                                    ></div>
                                ))}
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-8 opacity-20">
                            <div className="grid grid-cols-5 gap-4">
                                {[...Array(25)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-2 h-2 bg-white rounded-full"
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Registration Flow */}
                    <div className="py-16 bg-white">
                        <div className="mx-auto max-w-7xl px-6 lg:px-12 text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl mb-20">
                                Alur Pendaftaran
                            </h2>
                            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start relative gap-y-12">
                                {/* Connecting Line Desktop */}
                                <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] border-t-[3px] border-dashed border-[#d2a341] z-0"></div>

                                {(data?.alurPendaftaran?.length > 0
                                    ? data.alurPendaftaran
                                    : [
                                          {
                                              name: "Daftar Online",
                                              description:
                                                  "Isi form pendaftaran secara mudah",
                                          },
                                          {
                                              name: "Verifikasi Data",
                                              description:
                                                  "Tim kami akan memverifikasi data Anda",
                                          },
                                          {
                                              name: "Mengikuti Pelatihan",
                                              description:
                                                  "Belajar bersama instruktur berpengalaman",
                                          },
                                          {
                                              name: "Mendapat Sertifikat",
                                              description:
                                                  "Sertifikat resmi setelah menyelesaikan program",
                                          },
                                          {
                                              name: "Penyaluran Kerja",
                                              description:
                                                  "Kami bantu salurkan ke perusahaan mitra",
                                          },
                                      ]
                                ).map((step, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col items-center lg:w-1/5 relative group px-2"
                                    >
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-secondary-500 text-white text-xl font-bold z-10 relative">
                                            {idx + 1}
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-2">
                                            {step.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 px-4 leading-relaxed">
                                            {step.description}
                                        </p>

                                        {/* Connecting Line Mobile */}
                                        {idx < 4 && (
                                            <div className="lg:hidden mt-8 text-secondary-200">
                                                <ChevronRightIcon className="w-8 h-8 rotate-90" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Featured Programs */}
                    <div id="program" className="py-16 bg-gray-50">
                        <div className="mx-auto max-w-7xl px-6 lg:px-12">
                            <h2 className="text-3xl font-bold tracking-tight text-primary-900 text-center sm:text-4xl mb-16">
                                Program Unggulan Kami
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {(data?.program?.length > 0
                                    ? data.program
                                    : programs
                                ).map((prog, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 aspect-video cursor-pointer"
                                    >
                                        <img
                                            src={
                                                prog.img
                                                    ? `/${prog.img}`
                                                    : prog.image
                                            }
                                            alt={prog.name || prog.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent flex items-end p-8">
                                            <h3 className="text-xl font-bold text-white group-hover:text-secondary-500 transition-colors">
                                                {prog.name || prog.title}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Team */}
                    <div className="py-16 bg-white">
                        <div className="mx-auto max-w-7xl px-6 lg:px-12">
                            <div className="text-center max-w-2xl mx-auto mb-20">
                                <h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl mb-4">
                                    Tim Profesional Kami
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    Belajar langsung dari para ahli
                                    berpengalaman yang siap membimbing
                                    kesuksesan karier Anda.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                                {(data?.team?.length > 0
                                    ? data.team
                                    : team
                                ).map((member, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col items-center group"
                                    >
                                        <div className="relative mb-6">
                                            <img
                                                src={
                                                    member.img
                                                        ? `/${member.img}`
                                                        : member.image
                                                }
                                                alt={member.name}
                                                className="w-48 h-48 rounded-full object-cover shadow-xl border-4 border-white group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 rounded-full ring-4 ring-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110 group-hover:scale-100"></div>
                                        </div>
                                        <h3 className="text-xl font-bold text-primary-900">
                                            {member.name}
                                        </h3>
                                        <p className="text-secondary-500 font-medium mt-1">
                                            {member.description || member.role}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Testimonial */}
                    <div className="py-16 bg-white">
                        <div className="mx-auto max-w-7xl px-6 lg:px-12">
                            <div className="bg-primary-900 rounded-[3rem] p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
                                {/* Header */}
                                <div className="flex flex-col sm:flex-row justify-between items-center mb-12 relative z-10 gap-6">
                                    <h2 className="text-3xl font-bold">
                                        Apa Kata Mereka?
                                    </h2>
                                    <div className="flex gap-4">
                                        <button className="swiper-button-prev-custom w-12 h-12 rounded-full bg-secondary-500 text-white flex items-center justify-center hover:bg-secondary-600 transition-colors z-10 cursor-pointer">
                                            <ChevronRightIcon className="w-6 h-6 rotate-180" />
                                        </button>
                                        <button className="swiper-button-next-custom w-12 h-12 rounded-full bg-secondary-500 text-white flex items-center justify-center hover:bg-secondary-600 transition-colors z-10 cursor-pointer">
                                            <ChevronRightIcon className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>

                                {/* Swiper Slider */}
                                <Swiper
                                    modules={[Navigation, Autoplay]}
                                    navigation={{
                                        prevEl: ".swiper-button-prev-custom",
                                        nextEl: ".swiper-button-next-custom",
                                    }}
                                    autoplay={{
                                        delay: 5000,
                                        disableOnInteraction: false,
                                    }}
                                    loop={true}
                                    spaceBetween={30}
                                    slidesPerView={1}
                                    breakpoints={{
                                        768: { slidesPerView: 2 },
                                    }}
                                    className="relative z-10 !pb-4"
                                >
                                    {(data?.testimonial?.length > 0
                                        ? data.testimonial
                                        : testimonials
                                    ).map((testi, idx) => (
                                        <SwiperSlide key={idx}>
                                            <div className="bg-primary-800 rounded-3xl p-8 border border-white/10 h-full flex flex-col justify-between">
                                                <p className="italic text-primary-200 text-lg mb-8 leading-relaxed">
                                                    "
                                                    {testi.description ||
                                                        testi.text}
                                                    "
                                                </p>
                                                <div>
                                                    <h4 className="font-bold text-white">
                                                        {testi.name}
                                                    </h4>
                                                    <p className="text-sm text-primary-300">
                                                        {testi.title ||
                                                            testi.role}
                                                    </p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* Decorative Quotes */}
                                <div className="absolute top-10 right-10 text-9xl text-primary-800 font-serif opacity-50 leading-none select-none pointer-events-none">
                                    "
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </HomeLayout>
    );
}
