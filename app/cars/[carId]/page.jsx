import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
    FaCar,
    FaUsers,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaCalendarAlt,
    FaGasPump,
    FaCog,
    FaCheckCircle,
    FaTimesCircle,
    FaStar,
    FaArrowLeft,
    FaClock,
    FaShieldAlt,
    FaHeadset,
    FaWifi,
    FaBluetooth,
    FaSnowflake,
    FaParking,
    FaRegHeart,
    FaShare,
    FaPhone,
    FaEnvelope,
} from "react-icons/fa";
import { GiGearStickPattern, GiCarDoor } from "react-icons/gi";
import { MdElectricCar, MdLocalGasStation } from "react-icons/md";

const getCar = async (carId) => {
    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API}/cars/${carId}`;
        console.log('Fetching from:', apiUrl);
        const res = await fetch(apiUrl);
        if (!res.ok) {
            console.error(`API error: ${res.status}`);
            return null;
        }
        const data = await res.json();
        console.log('Car data received:', data);
        return data || null;
    } catch (error) {
        console.error('Error fetching car:', error);
        return null;
    }
}

export default async function CarDetailsPage({ params }) {
    const { carId } = await params;
    const car = await getCar(carId);

    if (!car) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    href="/cars"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors duration-300"
                >
                    <FaArrowLeft />
                    Back to Cars
                </Link>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        <div className="relative">
                            <div className="relative h-96 lg:h-full min-h-125 overflow-hidden bg-gray-100">
                                <img
                                    src={car.imageUrl || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop"}
                                    alt={car.carName}
                                    className="w-full h-full object-cover"/>
                                    
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${car.availabilityStatus === "Available"
                                        ? "bg-green-500 text-white"
                                        : "bg-red-500 text-white"
                                    }`}>
                                    {car.availabilityStatus}
                                </div>
                                
                                <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 px-3 py-1 rounded text-white text-sm">
                                    {car.carType}
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-6 lg:p-8">
                            
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                        {car.carName}
                                    </h1>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <FaMapMarkerAlt className="text-blue-500 text-sm" />
                                        <span>{car.pickupLocation}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                                        <FaRegHeart className="text-gray-600" />
                                    </button>
                                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                                        <FaShare className="text-gray-600" />
                                    </button>
                                </div>
                            </div>


                            <div className="bg-blue-50 rounded-lg p-4 mb-6">
                                <div className="flex items-baseline justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Daily Rent Price</p>
                                        <p className="text-3xl font-bold text-blue-600">
                                            ${car.dailyRentPrice}
                                        </p>
                                        <p className="text-xs text-gray-500">per day</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className="text-yellow-400 text-sm" />
                                            ))}
                                            <span className="text-gray-600 text-sm ml-1">(24 reviews)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-6">
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
                                <div className="flex items-center gap-2 text-gray-600">
                                    <GiCarDoor className="text-blue-500" />
                                    <span className="text-sm">4 Doors</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FaCog className="text-blue-500" />
                                    <span className="text-sm">Power Steering</span>
                                </div>
                            </div>


                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {car.description}
                                </p>
                            </div>


                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-3">Features & Amenities</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <FaCheckCircle className="text-green-500 text-sm" />
                                        <span className="text-sm">GPS Navigation</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <FaCheckCircle className="text-green-500 text-sm" />
                                        <span className="text-sm">Bluetooth Connectivity</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <FaCheckCircle className="text-green-500 text-sm" />
                                        <span className="text-sm">Backup Camera</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <FaCheckCircle className="text-green-500 text-sm" />
                                        <span className="text-sm">Keyless Entry</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <FaCheckCircle className="text-green-500 text-sm" />
                                        <span className="text-sm">Air Conditioning</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <FaCheckCircle className="text-green-500 text-sm" />
                                        <span className="text-sm">Parking Sensors</span>
                                    </div>
                                </div>
                            </div>


                            <div className="flex gap-3">
                                {car.availabilityStatus === "Available" ? (
                                    <>
                                        <Link
                                            href={`/booking/${carId}`}
                                            className="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                                        >
                                            Book Now
                                        </Link>
                                        <button className="flex-1 bg-white border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300">
                                            Contact Owner
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        disabled
                                        className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
                                    >
                                        Not Available for Booking
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <FaShieldAlt className="text-green-500 text-2xl" />
                            <h3 className="font-semibold text-gray-900">Cancellation Policy</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            Free cancellation up to 24 hours before pickup. Full refund guaranteed.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <FaHeadset className="text-blue-500 text-2xl" />
                            <h3 className="font-semibold text-gray-900">24/7 Support</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            Our customer support team is available anytime to assist you.
                        </p>
                        <p className="text-sm font-semibold text-blue-600 mt-2">+880 1234 567890</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <FaCheckCircle className="text-blue-500 text-2xl" />
                            <h3 className="font-semibold text-gray-900">Insurance Included</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            Comprehensive insurance coverage included in the rental price.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}