import { Link, usePage } from "@inertiajs/react";

export default function Footer() {
    const { webSetting } = usePage().props;
    const noWa = webSetting?.no_wa || "6289523333217";
    const formattedWa = noWa.startsWith("0") ? "62" + noWa.substring(1) : noWa;
    const urlForm = webSetting?.url_form || "#";

    return (
        <footer id="kontak" className="bg-primary-900 pt-10 pb-7">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap gap-8 md:gap-0">
                    <div className="w-full md:w-1/2">
                        <div className="max-w-md">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 rtl:space-x-reverse mb-6"
                            >
                                <div className="bg-white px-3 py-2 rounded-xl inline-flex items-center justify-center">
                                    <img
                                        src="/images/logo/logo.webp"
                                        alt="PT Properindo Enviro Tech"
                                        className="h-10"
                                    />
                                </div>
                            </Link>

                            <p className="text-neutral-50 text-justify text-sm">
                                PT Properindo Enviro Tech adalah perusahaan yang
                                bergerak di bidang pengembangan sumber daya
                                manusia melalui pelatihan, sertifikasi, dan
                                penyaluran kerja yang terintegrasi dengan
                                kebutuhan industri untuk membantu Anda meraih
                                karier impian.
                            </p>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div>
                            <p className="text-sm font-semibold text-white mb-5">
                                Halaman Utama
                            </p>

                            <div className="flex flex-col gap-3 text-sm text-neutral-50">
                                <Link href="/#beranda">Beranda</Link>
                                <Link href="/#tentang-kami">Tentang Kami</Link>
                                <Link href="/#program">Program</Link>
                                <Link href="/#layanan">Layanan</Link>
                                <Link href="/kontak">Kontak</Link>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-white mb-5">
                                Halaman Penting
                            </p>

                            <div className="flex flex-col gap-3 text-sm text-neutral-50">
                                <a
                                    href={urlForm}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Daftar Sekarang
                                </a>
                                <a
                                    href={`https://wa.me/${formattedWa}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Konsultasi
                                </a>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-white mb-5">
                                Hubungi Kami
                            </p>

                            <div className="flex flex-col gap-3 text-sm text-neutral-50">
                                {usePage().props.kontak?.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2"
                                    >
                                        <span className="font-semibold">
                                            {item.name}:
                                        </span>{" "}
                                        {item.description}
                                    </a>
                                ))}
                                {(!usePage().props.kontak ||
                                    usePage().props.kontak.length === 0) && (
                                    <>
                                        <a href="#">Belum ada kontak aktif</a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <p className="text-sm text-white text-center">
                        © Copyright 2026, Semua Hak Dilindungi oleh PT
                        Properindo Enviro Tech.
                    </p>
                </div>
            </div>
        </footer>
    );
}
