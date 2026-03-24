import React, { useState } from 'react'
// import { assets } from '../../assets/assets_admin/assets.js'

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: 'Richard James',
      patientImage: 'https://via.placeholder.com/40?text=RJ',
      department: 'Richard James',
      age: 28,
      dateTime: '26th July, 2024, 10:AM',
      doctor: 'Dr. Richard James',
      doctorImage: 'https://via.placeholder.com/40?text=Dr',
      fees: '$50'
    },
    {
      id: 2,
      patient: 'Richard James',
      patientImage: 'https://via.placeholder.com/40?text=RJ',
      department: 'Richard James',
      age: 28,
      dateTime: '26th July, 2024, 10:AM',
      doctor: 'Dr. Richard James',
      doctorImage: 'https://via.placeholder.com/40?text=Dr',
      fees: '$50'
    },
  ])

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id))
  }

  return (
    <div className='m-5'>
      <h1 className='text-2xl font-semibold mb-6'>All Appointments</h1>

      <div className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            {/* Table Header */}
            <thead className='border-b border-gray-200 bg-gray-50'>
              <tr>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>#</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Patient</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Department</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Age</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Date & Time</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Doctor</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Fees</th>
                <th className='px-4 py-3 text-center text-sm font-semibold text-gray-700'>Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment, index) => (
                  <tr key={appointment.id} className='border-b border-gray-200 hover:bg-gray-50 transition-all'>
                    {/* # */}
                    <td className='px-4 py-3 text-sm text-gray-700'>{index + 1}</td>

                    {/* Patient */}
                    <td className='px-4 py-3 text-sm'>
                      <div className='flex items-center gap-3'>
                        <img src={appointment.patientImage} alt={appointment.patient} className='w-8 h-8 rounded-full' />
                        <span className='text-gray-700'>{appointment.patient}</span>
                      </div>
                    </td>

                    {/* Department */}
                    <td className='px-4 py-3 text-sm text-gray-700'>{appointment.department}</td>

                    {/* Age */}
                    <td className='px-4 py-3 text-sm text-gray-700'>{appointment.age}</td>

                    {/* Date & Time */}
                    <td className='px-4 py-3 text-sm text-gray-700'>{appointment.dateTime}</td>

                    {/* Doctor */}
                    <td className='px-4 py-3 text-sm'>
                      <div className='flex items-center gap-3'>
                        <img src={appointment.doctorImage} alt={appointment.doctor} className='w-8 h-8 rounded-full' />
                        <span className='text-gray-700'>{appointment.doctor}</span>
                      </div>
                    </td>

                    {/* Fees */}
                    <td className='px-4 py-3 text-sm text-gray-700'>{appointment.fees}</td>

                    {/* Action */}
                    <td className='px-4 py-3 text-center'>
                      <button 
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className='text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-all'
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className='px-4 py-8 text-center text-gray-500'>
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AllAppointments