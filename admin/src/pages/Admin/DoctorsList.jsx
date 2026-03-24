import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
    const { doctors, fetchDoctors, loading , changeAvailability} = useContext(AdminContext)  // ← USE context

    // ← FETCH doctors on mount
    useEffect(() => {
        fetchDoctors()
        changeAvailability()
    }, [])

    if (loading) return <div className='m-5'>Loading doctors...</div>


    return (
        <div className='m-5'>
            <h1 className='text-2xl font-semibold mb-8'>All Doctors ({doctors.length})</h1>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {doctors && doctors.length > 0 ? (
                    doctors.map((doctor) => (
                        <div 
                            key={doctor._id} 
                            className='bg-blue-50 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all'
                        >
                            {/* Doctor Image */}
                            <div className='bg-blue-100 h-32 overflow-hidden'>
                                <img 
                                    src={doctor.image} 
                                    alt={doctor.name} 
                                    className='w-full h-full object-cover'
                                />
                            </div>

                            {/* Doctor Info */}
                            <div className='p-4 text-center'>
                                <h3 className='font-semibold text-gray-800 text-sm'>{doctor.name}</h3>
                                <p className='text-xs text-gray-600 mt-1'>{doctor.speciality}</p>
                                <p className={`text-xs mt-2 ${doctor.available ? 'text-green-600' : 'text-red-600'}`}>
                                    {doctor.available ? 'Available' : 'Unavailable'}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='col-span-full text-center text-gray-500'>No doctors found</p>
                )}
            </div>
        </div>
    )
}

export default DoctorsList