// components/sections/Banner.jsx
"use client";

import Link from "next/link";
import { FaCar, FaArrowRight } from "react-icons/fa";

export default function Banner() {
    return (
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                <div className="text-center md:text-left md:flex md:items-center md:justify-between">
                    <div className="md:w-1/2">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            Find Your Perfect
                            <span className="block text-yellow-400">Rental Car</span>
                        </h1>
                        <p className="text-lg md:text-xl mb-8 text-blue-100">
                            Discover the best deals on premium car rentals. Choose from our
                            wide range of vehicles for any occasion. Book now and drive away
                            with confidence!
                        </p>
                        <Link
                            href="/cars"
                            className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105"
                        >
                            <FaCar className="text-xl" />
                            Explore Cars
                            <FaArrowRight className="ml-2" />
                        </Link>
                    </div>

                    <div className="hidden md:block md:w-1/2 mt-10 md:mt-0">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&h=400&fit=crop"
                                alt="Luxury Car"
                                className="rounded-lg shadow-2xl"
                            />
                            <div className="absolute -bottom-5 -left-5 bg-white rounded-lg p-3 shadow-lg">
                                <div className="flex items-center gap-2">
                                    <div className="text-yellow-500 text-2xl">⭐</div>
                                    <div>
                                        <p className="text-gray-800 font-bold">4.9/5</p>
                                        <p className="text-gray-600 text-sm">5000+ Reviews</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}