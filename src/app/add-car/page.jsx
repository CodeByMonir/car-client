// app/add-car/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import {
    FaCar,
    FaMoneyBillWave,
    FaImage,
    FaUsers,
    FaMapMarkerAlt,
    FaAlignLeft,
    FaCheckCircle,
    FaTimesCircle,
    FaArrowLeft,
    FaUpload,
    FaSpinner,
} from "react-icons/fa";
import { MdElectricCar, MdLocalGasStation } from "react-icons/md";

export default function AddCarPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [formData, setFormData] = useState({
        carName: "",
        dailyRentPrice: "",
        carType: "",
        imageUrl: "",
        seatCapacity: "",
        pickupLocation: "",
        description: "",
        availabilityStatus: "Available",
        fuelType: "Petrol",
        transmission: "Automatic",
        year: new Date().getFullYear(),
    });

    const [errors, setErrors] = useState({});

    // Car type options
    const carTypes = [
        { value: "Sedan", label: "Sedan", icon: "🚗" },
        { value: "SUV", label: "SUV", icon: "🚙" },
        { value: "Hatchback", label: "Hatchback", icon: "🚘" },
        { value: "Luxury", label: "Luxury", icon: "✨" },
        { value: "Sports", label: "Sports", icon: "🏎️" },
        { value: "Electric", label: "Electric", icon: "⚡" },
    ];

    // Location options
    const locations = [
        "Dhaka Airport",
        "Gulshan, Dhaka",
        "Banani, Dhaka",
        "Uttara, Dhaka",
        "Mirpur, Dhaka",
        "Motijheel, Dhaka",
        "Dhanmondi, Dhaka",
        "Mohakhali, Dhaka",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleImageChange = (e) => {
        const url = e.target.value;
        setFormData((prev) => ({ ...prev, imageUrl: url }));
        setImagePreview(url);
        if (errors.imageUrl) {
            setErrors((prev) => ({ ...prev, imageUrl: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.carName.trim()) {
            newErrors.carName = "Car name is required";
        } else if (formData.carName.length < 2) {
            newErrors.carName = "Car name must be at least 2 characters";
        }

        if (!formData.dailyRentPrice) {
            newErrors.dailyRentPrice = "Daily rent price is required";
        } else if (formData.dailyRentPrice <= 0) {
            newErrors.dailyRentPrice = "Price must be greater than 0";
        }

        if (!formData.carType) {
            newErrors.carType = "Please select a car type";
        }

        if (!formData.imageUrl.trim()) {
            newErrors.imageUrl = "Image URL is required";
        } else if (!formData.imageUrl.match(/^https?:\/\/.+\..+/)) {
            newErrors.imageUrl = "Please enter a valid image URL";
        }

        if (!formData.seatCapacity) {
            newErrors.seatCapacity = "Seat capacity is required";
        } else if (formData.seatCapacity < 1 || formData.seatCapacity > 15) {
            newErrors.seatCapacity = "Seat capacity must be between 1 and 15";
        }

        if (!formData.pickupLocation) {
            newErrors.pickupLocation = "Please select a pickup location";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        } else if (formData.description.length < 20) {
            newErrors.description = "Description must be at least 20 characters";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please fix the errors before submitting");
            return;
        }

        setLoading(true);

        try {
            // Prepare data for API
            const carData = {
                ...formData,
                dailyRentPrice: parseFloat(formData.dailyRentPrice),
                seatCapacity: parseInt(formData.seatCapacity),
                ownerId: session?.user?.id,
                ownerName: session?.user?.name,
                ownerEmail: session?.user?.email,
                createdAt: new Date().toISOString(),
            };

            // API call - Replace with your actual endpoint
            const response = await fetch("/api/cars", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(carData),
            });

            if (response.ok) {
                toast.success("Car added successfully!");
                setTimeout(() => {
                    router.push("/my-added-cars");
                }, 1500);
            } else {
                const error = await response.json();
                toast.error(error.message || "Failed to add car. Please try again.");
            }
        } catch (error) {
            console.error("Error adding car:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Simulated API for demo (remove this when you have real API)
    const handleDemoSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please fix the errors before submitting");
            return;
        }

        setLoading(true);

        // Simulate API delay
        setTimeout(() => {
            toast.success("Car added successfully! (Demo)");
            setTimeout(() => {
                router.push("/my-added-cars");
            }, 1500);
            setLoading(false);
        }, 1500);
    };

    return (
        <>
            <Toaster position="top-right" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <Link
                            href="/my-added-cars"
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-4"
                        >
                            <FaArrowLeft />
                            Back to My Cars
                        </Link>
                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                Add New Car
                            </h1>
                            <p className="text-gray-600">
                                List your car for rent and start earning
                            </p>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                <FaCar />
                                Car Listing Details
                            </h2>
                            <p className="text-blue-100 text-sm mt-1">
                                Fill in all the information about your car
                            </p>
                        </div>

                        <form onSubmit={handleDemoSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Car Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Car Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <FaCar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            name="carName"
                                            value={formData.carName}
                                            onChange={handleChange}
                                            placeholder="e.g., Toyota Camry, BMW X5"
                                            className={`w-full pl-10 pr-3 py-2 border ${errors.carName ? "border-red-500" : "border-gray-300"
                                                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                        />
                                    </div>
                                    {errors.carName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.carName}</p>
                                    )}
                                </div>

                                {/* Daily Rent Price */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Daily Rent Price ($) <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="number"
                                            name="dailyRentPrice"
                                            value={formData.dailyRentPrice}
                                            onChange={handleChange}
                                            placeholder="e.g., 89"
                                            className={`w-full pl-10 pr-3 py-2 border ${errors.dailyRentPrice ? "border-red-500" : "border-gray-300"
                                                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                        />
                                    </div>
                                    {errors.dailyRentPrice && (
                                        <p className="mt-1 text-sm text-red-600">{errors.dailyRentPrice}</p>
                                    )}
                                </div>

                                {/* Car Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Car Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="carType"
                                        value={formData.carType}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border ${errors.carType ? "border-red-500" : "border-gray-300"
                                            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                    >
                                        <option value="">Select Car Type</option>
                                        {carTypes.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.icon} {type.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.carType && (
                                        <p className="mt-1 text-sm text-red-600">{errors.carType}</p>
                                    )}
                                </div>

                                {/* Seat Capacity */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Seat Capacity <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="number"
                                            name="seatCapacity"
                                            value={formData.seatCapacity}
                                            onChange={handleChange}
                                            placeholder="e.g., 4, 5, 7"
                                            className={`w-full pl-10 pr-3 py-2 border ${errors.seatCapacity ? "border-red-500" : "border-gray-300"
                                                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                        />
                                    </div>
                                    {errors.seatCapacity && (
                                        <p className="mt-1 text-sm text-red-600">{errors.seatCapacity}</p>
                                    )}
                                </div>

                                {/* Pickup Location */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Pickup Location <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <select
                                            name="pickupLocation"
                                            value={formData.pickupLocation}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-3 py-2 border ${errors.pickupLocation ? "border-red-500" : "border-gray-300"
                                                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                        >
                                            <option value="">Select Location</option>
                                            {locations.map((loc) => (
                                                <option key={loc} value={loc}>
                                                    {loc}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.pickupLocation && (
                                        <p className="mt-1 text-sm text-red-600">{errors.pickupLocation}</p>
                                    )}
                                </div>

                                {/* Availability Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Availability Status <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="availabilityStatus"
                                                value="Available"
                                                checked={formData.availabilityStatus === "Available"}
                                                onChange={handleChange}
                                                className="w-4 h-4 text-green-600"
                                            />
                                            <span className="flex items-center gap-1">
                                                <FaCheckCircle className="text-green-500" />
                                                Available
                                            </span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="availabilityStatus"
                                                value="Unavailable"
                                                checked={formData.availabilityStatus === "Unavailable"}
                                                onChange={handleChange}
                                                className="w-4 h-4 text-red-600"
                                            />
                                            <span className="flex items-center gap-1">
                                                <FaTimesCircle className="text-red-500" />
                                                Unavailable
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                {/* Image URL */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Image URL <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="url"
                                            name="imageUrl"
                                            value={formData.imageUrl}
                                            onChange={handleImageChange}
                                            placeholder="https://example.com/car-image.jpg"
                                            className={`w-full pl-10 pr-3 py-2 border ${errors.imageUrl ? "border-red-500" : "border-gray-300"
                                                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                        />
                                    </div>
                                    {errors.imageUrl && (
                                        <p className="mt-1 text-sm text-red-600">{errors.imageUrl}</p>
                                    )}

                                    {/* Image Preview */}
                                    {imagePreview && (
                                        <div className="mt-3">
                                            <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                                            <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-gray-300">
                                                <img
                                                    src={imagePreview}
                                                    alt="Car preview"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = "https://via.placeholder.com/160x160?text=Invalid+URL";
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <FaAlignLeft className="absolute left-3 top-3 text-gray-400" />
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows="5"
                                            placeholder="Describe your car including features, condition, mileage, etc. (Minimum 20 characters)"
                                            className={`w-full pl-10 pr-3 py-2 border ${errors.description ? "border-red-500" : "border-gray-300"
                                                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                        ></textarea>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        {errors.description && (
                                            <p className="text-sm text-red-600">{errors.description}</p>
                                        )}
                                        <p className="text-xs text-gray-500 ml-auto">
                                            {formData.description.length}/20+ characters
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Optional Fields Section */}
                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Additional Information (Optional)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Fuel Type
                                        </label>
                                        <select
                                            name="fuelType"
                                            value={formData.fuelType}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="Petrol">⛽ Petrol</option>
                                            <option value="Diesel">⛽ Diesel</option>
                                            <option value="Electric">⚡ Electric</option>
                                            <option value="Hybrid">🔋 Hybrid</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Transmission
                                        </label>
                                        <select
                                            name="transmission"
                                            value={formData.transmission}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="Automatic">Automatic</option>
                                            <option value="Manual">Manual</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Year
                                        </label>
                                        <input
                                            type="number"
                                            name="year"
                                            value={formData.year}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., 2023"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <FaSpinner className="animate-spin" />
                                            Adding Car...
                                        </>
                                    ) : (
                                        <>
                                            <FaUpload />
                                            Add Car Listing
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Tips Section */}
                    <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2">💡 Tips for listing your car:</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Use high-quality images of your car from different angles</li>
                            <li>• Provide accurate information about the car's condition</li>
                            <li>• Set competitive pricing based on your car's model and condition</li>
                            <li>• Include important features like GPS, Bluetooth, or backup camera</li>
                            <li>• Respond quickly to booking requests for better ratings</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}