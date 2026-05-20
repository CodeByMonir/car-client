"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    FaGasPump,
    FaUsers,
    FaCog,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaArrowRight,
} from "react-icons/fa";
import { MdElectricCar } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";
import CarCard from "./CarCard";

export default function AvailableCars() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock data - Replace with your actual API call
    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            const response = await fetch('http://localhost:4000/cars')
            const mockCars = await response.json();
            // const mockCars = [
            //     {
            //         id: 1,
            //         title: "Tesla Model 3",
            //         brand: "Tesla",
            //         pricePerDay: 89,
            //         location: "New York, NY",
            //         seats: 5,
            //         transmission: "Automatic",
            //         fuelType: "Electric",
            //         imageUrl:
            //             "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
            //         year: 2023,
            //         rating: 4.9,
            //     },
            //     {
            //         id: 2,
            //         title: "BMW X5",
            //         brand: "BMW",
            //         pricePerDay: 120,
            //         location: "Los Angeles, CA",
            //         seats: 5,
            //         transmission: "Automatic",
            //         fuelType: "Petrol",
            //         imageUrl:
            //             "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
            //         year: 2023,
            //         rating: 4.8,
            //     },
            //     {
            //         id: 3,
            //         title: "Mercedes-Benz C-Class",
            //         brand: "Mercedes",
            //         pricePerDay: 110,
            //         location: "Miami, FL",
            //         seats: 5,
            //         transmission: "Automatic",
            //         fuelType: "Petrol",
            //         imageUrl:
            //             "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
            //         year: 2022,
            //         rating: 4.7,
            //     },
            //     {
            //         id: 4,
            //         title: "Audi Q7",
            //         brand: "Audi",
            //         pricePerDay: 135,
            //         location: "Chicago, IL",
            //         seats: 7,
            //         transmission: "Automatic",
            //         fuelType: "Diesel",
            //         imageUrl:
            //             "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
            //         year: 2023,
            //         rating: 4.9,
            //     },
            //     {
            //         id: 5,
            //         title: "Toyota Camry",
            //         brand: "Toyota",
            //         pricePerDay: 65,
            //         location: "Houston, TX",
            //         seats: 5,
            //         transmission: "Automatic",
            //         fuelType: "Hybrid",
            //         imageUrl:
            //             "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
            //         year: 2023,
            //         rating: 4.6,
            //     },
            //     {
            //         id: 6,
            //         title: "Ford Mustang",
            //         brand: "Ford",
            //         pricePerDay: 95,
            //         location: "Las Vegas, NV",
            //         seats: 4,
            //         transmission: "Manual",
            //         fuelType: "Petrol",
            //         imageUrl:
            //             "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=400&h=300&fit=crop",
            //         year: 2022,
            //         rating: 4.8,
            //     },
            //     {
            //         id: 7,
            //         title: "Honda CR-V",
            //         brand: "Honda",
            //         pricePerDay: 75,
            //         location: "Seattle, WA",
            //         seats: 5,
            //         transmission: "Automatic",
            //         fuelType: "Hybrid",
            //         imageUrl:
            //             "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop",
            //         year: 2023,
            //         rating: 4.7,
            //     },
            //     {
            //         id: 8,
            //         title: "Porsche 911",
            //         brand: "Porsche",
            //         pricePerDay: 250,
            //         location: "San Francisco, CA",
            //         seats: 4,
            //         transmission: "Automatic",
            //         fuelType: "Petrol",
            //         imageUrl:
            //             "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
            //         year: 2023,
            //         rating: 5.0,
            //     },
            // ];
            setTimeout(() => {
                setCars(mockCars);
                setLoading(false);
            }, 1000);
        };

        fetchCars();
    }, []);

    if (loading) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Available Cars
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Loading our premium collection...
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                                <div className="h-48 bg-gray-300"></div>
                                <div className="p-6">
                                    <div className="h-6 bg-gray-300 rounded mb-3"></div>
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Available Cars
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Choose from our wide range of premium vehicles at competitive prices
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars?.slice(0, 3).map((car) => (
                        <CarCard key={car?._id} car={car} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/cars"
                        className="inline-flex items-center gap-2 bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                    >
                        View All Cars
                        <FaArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
}