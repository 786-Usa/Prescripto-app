import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets.js'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div className='flex flex-col items-center gap-4 py-16 text-center' id='speciality'>

            {/* Title */}
            <h1 className='text-3xl md:text-4xl font-bold text-gray-900'>
                Find by Speciality
            </h1>

            {/* Subtitle */}
            <p className='text-gray-600 text-sm md:text-base max-w-2xl'>
                Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
            </p>

            {/* Specialities Grid */}
            <div className='flex flex-wrap justify-center gap-8 pt-8 w-full'>
                {specialityData.map((item, index) => (
                    
                    <Link
                        key={index}
                        to={`/doctors/${item.speciality.toLowerCase()}`}
                        className='flex flex-col items-center gap-2 cursor-pointer hover:scale-110 transition-transform duration-300'
                    >
                        <img
                            src={item.image}
                            alt={item.speciality}
                            className='w-24 h-24 rounded-full object-cover'
                        />
                        <p className='text-gray-700 text-sm md:text-base font-medium'>
                            {item.speciality}
                        </p>
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default SpecialityMenu