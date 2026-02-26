import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'
// import { doctors } from '../assets/assets_frontend/assets.js'

const TopDoctors = () => {
    const {doctors} = useContext(AppContext)
    const visibleDoctors = doctors.slice(0, 10)


    return (
        <div className='py-16'>
            <h2 className='text-2xl md:text-3xl font-bold text-center text-gray-900'>Top Doctors to Book</h2>
            <p className='text-center text-gray-600 text-sm mt-2'>Simply browse through our extensive list of trusted doctors.</p>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8'>
                {visibleDoctors.map((doc) => (
                    <Link
                        to={`/appointments/${doc._id}`}
                        key={doc._id}
                        className='block bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition'
                    >
                        <div className='bg-indigo-50 p-6 flex items-center justify-center'>
                            <img src={doc.image} alt={doc.name} className='h-36 object-contain' />
                        </div>

                        <div className='p-4'>
                            <div className='flex items-center justify-between'>
                                <span className='text-xs text-green-500 flex items-center gap-2'>
                                    <span className='w-2 h-2 rounded-full bg-green-500 inline-block' />
                                    Available
                                </span>
                            </div>

                            <h3 className='mt-2 text-sm font-semibold text-gray-800'>{doc.name}</h3>
                            <p className='text-xs text-gray-500'>{doc.speciality}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className='flex justify-center mt-8'>
                <Link to='/doctors' className='px-6 py-2 bg-indigo-50 text-sm text-gray-700 rounded-full'>more</Link>
            </div>
        </div>
    )
}

export default TopDoctors