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
import CarCard from "../components/CarCard";

export default function CarsPage() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [filterAvailability, setFilterAvailability] = useState("all");
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/cars`);

                const data = await response.json();
                setCars(data);
            } catch (error) {
                // setCars(demoCars);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    



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


    const carTypes = ["all", ...new Set(cars.map(car => car.carType))];

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
    

    return (
        <div className="min-h-screen bg-gray-50">
            
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

            <div className="sticky top-0 bg-white shadow-md z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        
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

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg"
                        >
                            <FaFilter />
                            Filters
                        </button>

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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <p className="text-gray-600">
                    Found <span className="font-semibold text-blue-600">{filteredCars.length}</span> cars
                    {searchTerm && ` matching "${searchTerm}"`}
                </p>
            </div>

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
                            <CarCard key={car._id} car={car} />
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