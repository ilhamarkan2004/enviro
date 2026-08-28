import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head, usePage } from "@inertiajs/react";

const Dashboard = () => {
    const { auth } = usePage().props;

    return (
        <DefaultLayout>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6 w-full bg-white p-5 rounded-xl border border-gray-100">
                <h1 className="text-xl font-semibold text-gray-800">
                    Selamat Datang, {auth?.user?.name}!
                </h1>
                <p className="text-gray-600 text-sm">
                    Ini adalah halaman Dashboard utama sistem PT Properindo Enviro Tech.
                </p>
            </div>
        </DefaultLayout>
    );
};

export default Dashboard;
