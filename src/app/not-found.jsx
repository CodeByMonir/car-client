// app/not-found.jsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    FaCar,
    FaHome,
    FaArrowLeft,
    FaSearch,
    FaExclamationTriangle,
} from "react-icons/fa";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-20">
            <div className="max-w-2xl mx-auto text-center">
                {/* Animated Car Icon */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-blue-100 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <div className="relative inline-block animate-bounce">
                        <div className="bg-blue-600 rounded-full p-8 inline-block shadow-2xl">
                            <FaCar className="text-6xl text-white" />
                        </div>
                    </div>
                </div>

                {/* Error Code */}
                <h1 className="text-8xl md:text-9xl font-bold text-blue-600 mb-4 animate-fadeInUp">
                    404
                </h1>

                {/* Error Message */}
                <div className="mb-8 animate-fadeInUp animation-delay-200">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Oops! Car Not Found
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                        <FaExclamationTriangle className="text-yellow-500" />
                        <p className="text-lg">
                            The page you're looking for has driven off somewhere else
                        </p>
                    </div>
                    <p className="text-gray-600 max-w-md mx-auto">
                        It seems like the page you requested doesn't exist or has been
                        moved. Don't worry, we'll help you find your way back!
                    </p>
                </div>

                {/* Search Suggestions */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 max-w-md mx-auto animate-fadeInUp animation-delay-400">
                    <div className="flex items-center gap-2 text-gray-700 mb-3">
                        <FaSearch className="text-blue-600" />
                        <h3 className="font-semibold">You might be looking for:</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                        <Link
                            href="/cars"
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors"
                        >
                            Browse Cars
                        </Link>
                        <Link
                            href="/my-bookings"
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors"
                        >
                            My Bookings
                        </Link>
                        <Link
                            href="/add-car"
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors"
                        >
                            Add a Car
                        </Link>
                        <Link
                            href="/login"
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors"
                        >
                            Login/Register
                        </Link>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-600">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                    >
                        <FaArrowLeft />
                        Go Back
                    </button>

                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                    >
                        <FaHome />
                        Back to Home
                    </Link>

                    <Link
                        href="/cars"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                    >
                        <FaCar />
                        Explore Cars
                    </Link>
                </div>

                {/* Fun Illustration */}
                <div className="mt-12 text-center animate-fadeInUp animation-delay-800">
                    <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                        <span>🚗</span>
                        <span>Lost? Let us guide you back to the road!</span>
                        <span>🚙</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
      `}</style>
        </div>
    );
}