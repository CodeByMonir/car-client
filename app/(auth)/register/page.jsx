// app/register/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaCamera,
    FaCheckCircle,
    FaTimesCircle,
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client"; // Adjust path as needed

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [photoPreview, setPhotoPreview] = useState("");
    const [passwordValidation, setPasswordValidation] = useState({
        hasUppercase: false,
        hasLowercase: false,
        hasMinLength: false,
    });

    // Validate password strength
    const validatePasswordStrength = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasMinLength = password.length >= 6;

        setPasswordValidation({
            hasUppercase,
            hasLowercase,
            hasMinLength,
        });

        return hasUppercase && hasLowercase && hasMinLength;
    };

    // Handle password change
    const handlePasswordChange = (e) => {
        const password = e.target.value;
        validatePasswordStrength(password);
    };

    // Handle photo URL change for preview
    const handlePhotoChange = (e) => {
        const url = e.target.value;
        setPhotoPreview(url);
    };

    // Handle registration
    const handleRegistration = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const registerData = Object.fromEntries(formData.entries());

        // Validate password before submitting
        const isValidPassword = validatePasswordStrength(registerData.password);
        if (!isValidPassword) {
            toast.error("Password does not meet the requirements. Please check the password criteria.");
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await authClient.signUp.email({
                ...registerData,
                callbackURL: `${window.location.origin}/login`,
            });

            if (error) {
                toast.error(error.message || "Registration failed. Please try again.");
                setLoading(false);
            } else {
                toast.success("Registration successful! Redirecting to login page...");
                setTimeout(() => {
                    router.push("/login");
                }, 1500);
            }
        } catch (err) {
            toast.error("An error occurred. Please try again.");
            setLoading(false);
        }
    };

    // Handle Google registration
    const handleGoogleRegister = async () => {
        setLoading(true);

        try {
            const { data, error } = await authClient.signUp.social({
                provider: "google",
                callbackURL: `${window.location.origin}/`,
            });

            if (error) {
                toast.error(error.message || "Google registration failed. Please try again.");
            }
            // On success, the user will be redirected by the auth client
        } catch (err) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: "#363636",
                        color: "#fff",
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: "#10b981",
                            secondary: "#fff",
                        },
                    },
                    error: {
                        duration: 4000,
                        iconTheme: {
                            primary: "#ef4444",
                            secondary: "#fff",
                        },
                    },
                }}
            />

            <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    {/* Logo/Brand */}
                    <div className="text-center">
                        <div className="flex justify-center">
                            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-2xl">C</span>
                            </div>
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Create an Account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Join us today and start your journey
                        </p>
                    </div>

                    {/* Registration Form */}
                    <div className="bg-white py-8 px-6 shadow-xl rounded-xl sm:px-10">
                        <form onSubmit={handleRegistration} className="space-y-5">
                            {/* Name Field */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            {/* Photo URL Field */}
                            <div>
                                <label
                                    htmlFor="image"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Photo URL
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaCamera className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="image"
                                        name="image"
                                        type="text"
                                        onChange={handlePhotoChange}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                        placeholder="https://example.com/photo.jpg"
                                    />
                                </div>
                                {photoPreview && (
                                    <div className="mt-2 flex items-center gap-2">
                                        <img
                                            src={photoPreview}
                                            alt="Preview"
                                            className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/150";
                                            }}
                                        />
                                        <span className="text-xs text-gray-500">Preview</span>
                                    </div>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        onChange={handlePasswordChange}
                                        required
                                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                        placeholder="Create a strong password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        ) : (
                                            <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                </div>

                                {/* Password Validation Requirements */}
                                <div className="mt-2 space-y-1">
                                    <div className="flex items-center gap-2 text-xs">
                                        {passwordValidation.hasMinLength ? (
                                            <FaCheckCircle className="text-green-500" />
                                        ) : (
                                            <FaTimesCircle className="text-gray-400" />
                                        )}
                                        <span className={passwordValidation.hasMinLength ? "text-green-600" : "text-gray-500"}>
                                            At least 6 characters
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        {passwordValidation.hasUppercase ? (
                                            <FaCheckCircle className="text-green-500" />
                                        ) : (
                                            <FaTimesCircle className="text-gray-400" />
                                        )}
                                        <span className={passwordValidation.hasUppercase ? "text-green-600" : "text-gray-500"}>
                                            At least one uppercase letter (A-Z)
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        {passwordValidation.hasLowercase ? (
                                            <FaCheckCircle className="text-green-500" />
                                        ) : (
                                            <FaTimesCircle className="text-gray-400" />
                                        )}
                                        <span className={passwordValidation.hasLowercase ? "text-green-600" : "text-gray-500"}>
                                            At least one lowercase letter (a-z)
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Register Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Creating account...</span>
                                    </div>
                                ) : (
                                    "Create Account"
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            {/* Google Register Button */}
                            <button
                                type="button"
                                onClick={handleGoogleRegister}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FcGoogle className="h-5 w-5" />
                                <span>Sign up with Google</span>
                            </button>

                            {/* Login Link */}
                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Already have an account?{" "}
                                    <Link
                                        href="/login"
                                        className="font-medium text-green-600 hover:text-green-500 transition-colors"
                                    >
                                        Sign in here
                                    </Link>
                                </p>
                            </div>
                        </form>

                        {/* Password Requirements Summary */}
                        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="text-xs text-yellow-800">
                                <span className="font-semibold">Password Requirements:</span><br />
                                ✓ Must be at least 6 characters long<br />
                                ✓ Must contain at least 1 uppercase letter (A-Z)<br />
                                ✓ Must contain at least 1 lowercase letter (a-z)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}