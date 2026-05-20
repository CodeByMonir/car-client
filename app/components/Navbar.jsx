// components/layouts/Navbar.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
    const { data: session, isPending } = useSession();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // Ensure hydration matches by waiting until component is mounted on client
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    // Get user info from session
    const isLoggedIn = !!session;
    const userName = session?.user?.name || "";
    const userEmail = session?.user?.email || "";
    const userImage = session?.user?.image || "";

    const handleLogout = async () => {
        await signOut();
        setIsDropdownOpen(false);
        router.push("/");
    };

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/cars", label: "Explore Cars" },
    ];

    const isActive = (path) => pathname === path;

    // Show loading state while checking session (only after hydration to prevent mismatch)
    if (isPending && isHydrated) {
        return (
            <nav className="bg-white shadow-lg w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="shrink-0">
                            <Link href="/" className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">C</span>
                                </div>
                                <span className="font-bold text-xl text-gray-800">CarRental</span>
                            </Link>
                        </div>
                        <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="bg-white shadow-lg w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="shrink-0">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">C</span>
                            </div>
                            <span className="font-bold text-xl text-gray-800">CarRental</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`transition-colors duration-200 ${isActive(link.href)
                                    ? "text-blue-600 font-semibold"
                                    : "text-gray-700 hover:text-blue-600"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Conditional Rendering based on login status */}
                        {isLoggedIn ? (
                            // Logged In: Show Add Car and Profile Dropdown
                            <>
                                <Link
                                    href="/add-car"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    + Add Car
                                </Link>

                                {/* Profile Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center space-x-2 focus:outline-none"
                                    >
                                        {userImage ? (
                                            <img
                                                src={userImage}
                                                alt={userName}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                        ) : (
                                                <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                                <span className="text-white font-semibold">
                                                    {userName?.charAt(0)?.toUpperCase() || "U"}
                                                </span>
                                            </div>
                                        )}
                                        <span className="text-gray-700 hidden lg:block">
                                            {userName?.split(" ")[0] || "User"}
                                        </span>
                                        <svg
                                            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isDropdownOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setIsDropdownOpen(false)}
                                            />
                                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 z-20">
                                                <div className="py-2">
                                                    <div className="px-4 py-3 border-b border-gray-100">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {userName || "User"}
                                                        </p>
                                                        <p className="text-xs text-gray-500 truncate">
                                                            {userEmail || "user@example.com"}
                                                        </p>
                                                    </div>

                                                    <Link
                                                        href="/add-car"
                                                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                                        onClick={() => setIsDropdownOpen(false)}
                                                    >
                                                        <svg
                                                            className="w-5 h-5 mr-3"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M12 4v16m8-8H4"
                                                            />
                                                        </svg>
                                                        Add Car
                                                    </Link>

                                                    <Link
                                                        href="/my-bookings"
                                                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                                        onClick={() => setIsDropdownOpen(false)}
                                                    >
                                                        <svg
                                                            className="w-5 h-5 mr-3"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                        My Bookings
                                                    </Link>

                                                    <Link
                                                        href="/my-added-cars"
                                                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                                        onClick={() => setIsDropdownOpen(false)}
                                                    >
                                                        <svg
                                                            className="w-5 h-5 mr-3"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                                            />
                                                        </svg>
                                                        My Added Cars
                                                    </Link>

                                                    <div className="border-t border-gray-100 mt-2 pt-2">
                                                        <button
                                                            onClick={handleLogout}
                                                            className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
                                                        >
                                                            <svg
                                                                className="w-5 h-5 mr-3"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                                />
                                                            </svg>
                                                            Logout
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        ) : (
                            // Not Logged In: Show Login/Register buttons
                            <div className="flex items-center space-x-3">
                                <Link
                                    href="/login"
                                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100">
                        <div className="flex flex-col space-y-3">
                            <Link
                                href="/"
                                className="text-gray-700 hover:text-blue-600 px-2 py-1"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/cars"
                                className="text-gray-700 hover:text-blue-600 px-2 py-1"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Explore Cars
                            </Link>

                            {isLoggedIn ? (
                                <>
                                    <Link
                                        href="/add-car"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        + Add Car
                                    </Link>
                                    <Link
                                        href="/my-bookings"
                                        className="text-gray-700 hover:text-blue-600 px-2 py-1"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        My Bookings
                                    </Link>
                                    <Link
                                        href="/my-added-cars"
                                        className="text-gray-700 hover:text-blue-600 px-2 py-1"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        My Added Cars
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="text-red-600 px-2 py-1 text-left"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                    <div className="flex flex-col space-y-2 px-2">
                                    <Link
                                        href="/login"
                                            className="text-center text-gray-700 hover:text-blue-600 px-4 py-2 border border-gray-300 rounded-lg"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                            className="text-center bg-blue-600 text-white px-4 py-2 rounded-lg"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}