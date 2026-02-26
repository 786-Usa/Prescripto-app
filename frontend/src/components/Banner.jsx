import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets.js'

const Banner = () => {
    return (
        <section className="bg-indigo-600 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 flex items-center gap-6">
            <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24">
                {/* text content */}
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-white font-semibold">
                    <h1 className="">Book Appointment</h1>
                    <p className="mt-4 text-2xl md:text-3xl">With 100+ Trusted Doctors</p>
                </div>
                <Link
                    to="/signup"
                    className="inline-block mt-6 px-6 py-2 bg-white text-indigo-600 font-medium rounded-full shadow hover:bg-gray-100 transition"
                >
                    Create account
                </Link>
            </div>

            {/* image */}
            <div className="hidden md:block flex-1 relative">
                <img
                    src={assets.appointment_img}
                    alt="Doctor pointing"
                    className="w-full h-auto"
                />
            </div>
        </section>
    )
}

export default Banner