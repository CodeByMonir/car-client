// app/cars/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    FaCar,
    FaUsers,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaCalendarAlt,
    FaCheckCircle,
    FaTimesCircle,
    FaSearch,
    FaFilter,
} from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { MdElectricCar, MdLocalGasStation } from "react-icons/md";

export default function CarsPage() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [filterAvailability, setFilterAvailability] = useState("all");
    const [showFilters, setShowFilters] = useState(false);

    // Fetch cars from API
    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            try {
                // Demo API endpoint - Replace with your actual MongoDB API
                const response = await fetch(
                    "http://localhost:4000/cars"
                );
                // If using your own API: const response = await fetch('/api/cars');

                const data = await response.json();
                setCars(data);
            } catch (error) {
                console.error("Error fetching cars:", error);
                // Fallback demo data if API fails
                setCars(demoCars);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    // Demo data structure (for fallback or testing)
    const demoCars = [
        {
            id: "1",
            carName: "Toyota Camry",
            dailyRentPrice: 65,
            carType: "Sedan",
            imageUrl: "https://i.ibb.co/4T3Y8Xx/toyota-camry.jpg",
            seatCapacity: 5,
            pickupLocation: "New York, NY",
            description: "Comfortable and reliable sedan perfect for business trips and family travels. Features include leather seats, GPS navigation, and excellent fuel economy.",
            availabilityStatus: "Available",
            transmission: "Automatic",
            fuelType: "Hybrid",
            year: 2023,
        },
        {
            id: "2",
            carName: "Honda CR-V",
            dailyRentPrice: 75,
            carType: "SUV",
            imageUrl: "https://i.ibb.co/4R3Y8Xx/honda-crv.jpg",
            seatCapacity: 5,
            pickupLocation: "Los Angeles, CA",
            description: "Spacious SUV with plenty of cargo space. Great for road trips and outdoor adventures. Equipped with all-wheel drive and modern safety features.",
            availabilityStatus: "Available",
            transmission: "Automatic",
            fuelType: "Petrol",
            year: 2023,
        },
        {
            id: "3",
            carName: "Tesla Model 3",
            dailyRentPrice: 89,
            carType: "Luxury",
            imageUrl: "https://i.ibb.co/7X4Y8Xx/tesla-model3.jpg",
            seatCapacity: 5,
            pickupLocation: "San Francisco, CA",
            description: "Electric luxury sedan with autopilot capabilities. Zero emissions, instant torque, and the latest technology features.",
            availabilityStatus: "Available",
            transmission: "Automatic",
            fuelType: "Electric",
            year: 2023,
        },
        {
            id: "4",
            carName: "Ford Mustang",
            dailyRentPrice: 95,
            carType: "Sports",
            imageUrl: "https://i.ibb.co/8M4Y8Xx/ford-mustang.jpg",
            seatCapacity: 4,
            pickupLocation: "Miami, FL",
            description: "Iconic American muscle car with powerful engine and stunning design. Perfect for a thrilling driving experience.",
            availabilityStatus: "Unavailable",
            transmission: "Manual",
            fuelType: "Petrol",
            year: 2022,
        },
        {
            id: "5",
            carName: "BMW X5",
            dailyRentPrice: 120,
            carType: "Luxury SUV",
            imageUrl: "https://i.ibb.co/3R4Y8Xx/bmw-x5.jpg",
            seatCapacity: 7,
            pickupLocation: "Chicago, IL",
            description: "Premium luxury SUV with exceptional comfort and performance. Features panoramic roof, premium sound system, and advanced safety tech.",
            availabilityStatus: "Available",
            transmission: "Automatic",
            fuelType: "Diesel",
            year: 2023,
        },
        {
            id: "6",
            carName: "Hyundai i20",
            dailyRentPrice: 45,
            carType: "Hatchback",
            imageUrl: "https://i.ibb.co/4T3Y8Xx/hyundai-i20.jpg",
            seatCapacity: 5,
            pickupLocation: "Dallas, TX",
            description: "Compact and fuel-efficient hatchback ideal for city driving. Easy to park and perfect for daily commutes.",
            availabilityStatus: "Available",
            transmission: "Manual",
            fuelType: "Petrol",
            year: 2023,
        },
        {
            id: "7",
            carName: "Mercedes-Benz S-Class",
            dailyRentPrice: 250,
            carType: "Luxury",
            imageUrl: "https://i.ibb.co/7X4Y8Xx/mercedes-sclass.jpg",
            seatCapacity: 5,
            pickupLocation: "Las Vegas, NV",
            description: "Ultimate luxury sedan with massage seats, ambient lighting, and cutting-edge technology. The pinnacle of automotive excellence.",
            availabilityStatus: "Unavailable",
            transmission: "Automatic",
            fuelType: "Petrol",
            year: 2023,
        },
        {
            id: "8",
            carName: "Kia Sportage",
            dailyRentPrice: 70,
            carType: "SUV",
            imageUrl: "https://i.ibb.co/8M4Y8Xx/kia-sportage.jpg",
            seatCapacity: 5,
            pickupLocation: "Seattle, WA",
            description: "Stylish and practical SUV with modern features. Great value for money with comprehensive warranty.",
            availabilityStatus: "Available",
            transmission: "Automatic",
            fuelType: "Hybrid",
            year: 2023,
        },
    ];

    // Filter cars based on search, type, and availability
    const filteredCars = cars.filter((car) => {
        const matchesSearch = car.carName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.carType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.pickupLocation?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = filterType === "all" || car.carType === filterType;
        const matchesAvailability = filterAvailability === "all" ||
            (filterAvailability === "available" && car.availabilityStatus === "Available") ||
            (filterAvailability === "unavailable" && car.availabilityStatus === "Unavailable");

        return matchesSearch && matchesType && matchesAvailability;
    });

    // Get unique car types for filter
    const carTypes = ["all", ...new Set(cars.map(car => car.carType))];

    // Skeleton Loader Component
    const CarSkeleton = () => (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
                <div className="h-6 bg-gray-300 rounded mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded mb-4 w-full"></div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                </div>
                <div className="h-10 bg-gray-300 rounded-lg"></div>
            </div>
        </div>
    );

    // Car Card Component
    const CarCard = ({ car }) => (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={car.imageUrl || "https://via.placeholder.com/400x300?text=Car+Image"}
                    alt={car.carName}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300?text=Car+Image";
                    }}
                />
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold ${car.availabilityStatus === "Available"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}>
                    {car.availabilityStatus}
                </div>
                <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 px-2 py-1 rounded text-white text-xs">
                    {car.carType}
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {car.carName}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-600 text-sm">
                            <FaMapMarkerAlt className="text-blue-500 text-xs" />
                            <span>{car.pickupLocation}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                            ${car.dailyRentPrice}
                        </p>
                        <p className="text-gray-500 text-sm">per day</p>
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {car.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                        <FaUsers className="text-blue-500" />
                        <span className="text-sm">{car.seatCapacity} Seats</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <GiGearStickPattern className="text-blue-500" />
                        <span className="text-sm">{car.transmission || "Automatic"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        {car.fuelType === "Electric" ? (
                            <MdElectricCar className="text-blue-500" />
                        ) : (
                            <MdLocalGasStation className="text-blue-500" />
                        )}
                        <span className="text-sm">{car.fuelType || "Petrol"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <FaCalendarAlt className="text-blue-500" />
                        <span className="text-sm">{car.year || 2023}</span>
                    </div>
                </div>

                <Link
                    href={`/cars/${car.id}`}
                    className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                >
                    View Details
                </Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Explore Our Fleet
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl">
                        Discover the perfect car for your journey. Choose from our wide
                        selection of vehicles.
                    </p>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="sticky top-16 bg-white shadow-md z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by car name, type, or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Filter Toggle Button for Mobile */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg"
                        >
                            <FaFilter />
                            Filters
                        </button>

                        {/* Filters */}
                        <div className={`${showFilters ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-4`}>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Types</option>
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="Hatchback">Hatchback</option>
                                <option value="Luxury">Luxury</option>
                                <option value="Sports">Sports</option>
                            </select>

                            <select
                                value={filterAvailability}
                                onChange={(e) => setFilterAvailability(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Cars</option>
                                <option value="available">Available Only</option>
                                <option value="unavailable">Unavailable Only</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Summary */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <p className="text-gray-600">
                    Found <span className="font-semibold text-blue-600">{filteredCars.length}</span> cars
                    {searchTerm && ` matching "${searchTerm}"`}
                </p>
            </div>

            {/* Cars Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, index) => (
                            <CarSkeleton key={index} />
                        ))}
                    </div>
                ) : filteredCars.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCars.map((car) => (
                            <CarCard key={car.id} car={car} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🚗</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            No Cars Found
                        </h3>
                        <p className="text-gray-600">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}