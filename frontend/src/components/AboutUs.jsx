// src/components/AboutUs.jsx
import React from "react";

export default function AboutUs() {
    return (
        <div className="w-full h-full p-4 md:p-8 lg:p-12 bg-white flex flex-col items-center justify-center">
            <h1 className="text-black text-4xl md:text-5xl lg:text-6xl font-bold font-['Lato'] mb-4 md:mb-6 lg:mb-8">
                About us
            </h1>
            <p className="w-full max-w-4xl text-center text-[#101010] text-lg md:text-xl lg:text-2xl font-medium font-['Lato'] leading-7 md:leading-8 lg:leading-10 mb-6 md:mb-8 lg:mb-12">
                We believe in fostering a collaborative and inclusive workplace where
                every employee is valued and has the opportunity to grow. At Ebiz, our
                mission is to create innovative solutions while nurturing talent and
                encouraging professional development.
            </p>
            <img
                className="w-full max-w-5xl h-auto rounded-[33px]"
                src="https://via.placeholder.com/1236x291"
                alt="Company Overview"
            />
        </div>
    );
}
