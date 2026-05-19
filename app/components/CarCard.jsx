import Link from 'next/link';
import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import { GiGearStickPattern } from 'react-icons/gi';
import { MdElectricCar, MdLocalGasStation } from 'react-icons/md';

const CarCard = ({ car }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
            <img
                src={car.imageUrl || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop"}
                alt={car.carName}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop";
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
                href={`/cars/${car._id}`}
                className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
                View Details
            </Link>
        </div>
    </div>
);

export default CarCard;