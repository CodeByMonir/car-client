// components/sections/Testimonials.jsx
"use client";

import { useState } from "react";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
    {
        id: 1,
        name: "John Doe",
        role: "Business Traveler",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        rating: 5,
        text: "Amazing experience! The car was in perfect condition and the booking process was seamless. Highly recommend!",
    },
    {
        id: 2,
        name: "Sarah Johnson",
        role: "Vacationer",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        rating: 5,
        text: "Best car rental service I've ever used. Great prices and excellent customer support. Will definitely use again!",
    },
    {
        id: 3,
        name: "Michael Brown",
        role: "Corporate Client",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        rating: 4,
        text: "Professional service from start to finish. The car was clean and ready on time. Very impressed!",
    },
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
    };

    const testimonial = testimonials[currentIndex];

    return (
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Join thousands of satisfied customers who trust us
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
                        <FaQuoteLeft className="text-6xl text-blue-200 absolute top-6 left-6" />

                        <div className="text-center relative z-10">
                            <div className="flex justify-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`text-2xl ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>

                            <p className="text-gray-700 text-lg md:text-xl italic mb-6">
                                "{testimonial.text}"
                            </p>

                            <div className="flex items-center justify-center gap-4 mb-6">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full object-cover border-4 border-blue-500"
                                />
                                <div className="text-left">
                                    <h4 className="font-bold text-gray-900 text-lg">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-gray-600">{testimonial.role}</p>
                                </div>
                            </div>

                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={prevTestimonial}
                                    className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300"
                                >
                                    <FaChevronLeft />
                                </button>
                                <button
                                    onClick={nextTestimonial}
                                    className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300"
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}