// components/sections/WhyChooseUs.jsx
"use client";

import {
    FaShieldAlt,
    FaHeadset,
    FaMoneyBillWave,
    FaCar,
} from "react-icons/fa";

const features = [
    {
        icon: <FaShieldAlt className="text-4xl text-blue-600" />,
        title: "Insurance Included",
        description:
            "Every rental comes with comprehensive insurance coverage for your peace of mind.",
    },
    {
        icon: <FaHeadset className="text-4xl text-blue-600" />,
        title: "24/7 Customer Support",
        description:
            "Our dedicated team is always ready to assist you anytime, anywhere.",
    },
    {
        icon: <FaMoneyBillWave className="text-4xl text-blue-600" />,
        title: "Best Price Guarantee",
        description:
            "We offer competitive prices with no hidden fees or surprises.",
    },
    {
        icon: <FaCar className="text-4xl text-blue-600" />,
        title: "Wide Vehicle Selection",
        description:
            "Choose from economy to luxury vehicles for every occasion.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Why Choose Us?
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        We provide the best car rental experience with unmatched service
                        and value
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}