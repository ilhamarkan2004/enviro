import HomeLayout from "@/Layouts/HomeLayout";
import React, { useState, useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";

const Service = ({ data }) => {
    const categories = data?.language || [];

    const [billing, setBilling] = useState(categories?.[0]?.id || null);

    const activeCategory = categories.find((item) => item.id === billing);

    return (
        <HomeLayout>
            <div
                id="layanan"
                className="w-full bg-[url('/images/bg/background.svg')] py-20 px-5 text-white"
            >
                <div className="max-w-6xl mx-auto text-center">
                    {/* Header */}
                    <p className="text-sm tracking-wide">Our Pricing</p>
                    <h2 className="text-3xl md:text-4xl font-semibold mt-2 leading-tight">
                        Choose From Our Lowest <br /> Plans and Prices
                    </h2>

                    {/* TOGGLE CATEGORY */}
                    <div className="mt-6 inline-flex bg-white/20 rounded-full p-1">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setBilling(category.id)}
                                className={`px-6 py-2 rounded-full font-medium ${
                                    billing === category.id
                                        ? "bg-white text-primary-800"
                                        : "text-white"
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* PACKAGES */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {activeCategory?.packages?.map((pkg) => (
                            <div
                                key={pkg.id}
                                className="bg-white text-primary-800 rounded-2xl shadow-xl p-8 flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-center font-semibold tracking-wide">
                                        {pkg.name}
                                    </h3>

                                    {/* PRICE */}
                                    <div className="bg-primary-800 text-white rounded-md py-4 px-6 text-center mt-6">
                                        <span className="text-3xl font-bold">
                                            Rp{" "}
                                            {pkg.price.toLocaleString("id-ID")}
                                        </span>
                                        {/* <span className="ml-1 text-sm opacity-80">
                                            /{activeCategory.name}
                                        </span> */}
                                    </div>

                                    {/* BENEFITS */}
                                    <ul className="mt-8 space-y-3 text-sm text-left">
                                        {pkg.benefits?.map((benefit, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center gap-2"
                                            >
                                                <FaCircleCheck className="text-green-500" />
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button className="mt-10 bg-primary-800 text-white border border-primary-800 py-3 rounded-md hover:bg-white hover:text-primary-800 transition">
                                    Book Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default Service;
