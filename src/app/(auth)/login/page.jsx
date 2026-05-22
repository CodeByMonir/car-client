// app/login/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaCheckCircle,
    FaTimesCircle,
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
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

    // Handle password change for real-time validation
    const handlePasswordChange = (e) => {
        const password = e.target.value;
        if (password) {
            validatePasswordStrength(password);
        } else {
            setPasswordValidation({
                hasUppercase: false,
                hasLowercase: false,
                hasMinLength: false,
            });
        }
    };


    const authenticateUser = async (provider, credentials = null) => {
        setLoading(true);

        try {
            let result;

            if (provider === "email" && credentials) {

                result = await authClient.signIn.email({
                    email: credentials.email,
                    password: credentials.password,
                    callbackURL: `${window.location.origin}/`,
                });
            } else if (provider === "google") {

                result = await authClient.signIn.social({
                    provider: "google",
                    callbackURL: `${window.location.origin}/`,
                });
            } else {
                throw new Error("Invalid authentication provider");
            }

            const { data, error } = result;

            if (error) {
                toast.error(error.message || `${provider} login failed. Please try again.`);
                setLoading(false);
                return false;
            }

            // Verify token was created successfully
            try {
                const { data: tokenData, error: tokenError } = await authClient.token();
                if (tokenError || !tokenData) {
                    throw new Error("Failed to retrieve authentication token");
                }
                console.log("Token retrieved successfully", tokenData);
            } catch (tokenErr) {
                console.error("Token retrieval error:", tokenErr);
                toast.error("Authentication token error. Please try again.");
                setLoading(false);
                return false;
            }

            toast.success(`${provider === "email" ? "Login" : "Google login"} successful! Redirecting...`);
            setTimeout(() => {
                router.push("/");
            }, 1500);
            return true;

        } catch (err) {
            toast.error("An error occurred. Please try again.");
            setLoading(false);
            return false;
        }
    };


    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const loginData = {
            email: formData.get("email"),
            password: formData.get("password"),
        };


        const isValidPassword = validatePasswordStrength(loginData.password);
        if (!isValidPassword) {
            toast.error("Password does not meet the requirements. Please check the password criteria.");
            return;
        }

        await authenticateUser("email", loginData);

    };


    const handleGoogleLogin = async () => {
        await authenticateUser("google");
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

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    {/* Logo/Brand */}
                    <div className="text-center">
                        <div className="flex justify-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-2xl">C</span>
                            </div>
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Sign in to your account to continue
                        </p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-white py-8 px-6 shadow-xl rounded-xl sm:px-10">
                        <form onSubmit={handleLogin} className="space-y-6">
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
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="you@example.com"
                                    />
                                </div>
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
                                        autoComplete="current-password"
                                        onChange={handlePasswordChange}
                                        required
                                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="••••••••"
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

                            {/* Forgot Password Link */}
                            <div className="flex items-center justify-end">
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                                >
                                    Forgot your password?
                                </Link>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    "Sign In"
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

                            {/* Google Login Button */}
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FcGoogle className="h-5 w-5" />
                                <span>Sign in with Google</span>
                            </button>

                            {/* Register Link */}
                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{" "}
                                    <Link
                                        href="/register"
                                        className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                                    >
                                        Create an account
                                    </Link>
                                </p>
                            </div>
                        </form>

                        {/* Demo Credentials Info */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-xs text-blue-800">
                                <span className="font-semibold">Password Requirements:</span><br />
                                ✓ Must be at least 6 characters long<br />
                                ✓ Must contain at least 1 uppercase letter (A-Z)<br />
                                ✓ Must contain at least 1 lowercase letter (a-z)
                            </p>
                            <p className="text-xs text-blue-600 mt-2">
                                <span className="font-semibold">Demo Note:</span> Use a password that meets the requirements above
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}