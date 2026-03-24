import React, { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets_admin/assets'

const Dashboard = () => {
  const { aToken } = useContext(AdminContext)

  // Sample data for appointments
  const appointments = [
    { id: 1, doctorName: 'Dr. Richard James', date: '26th July, 2024' },
    { id: 2, doctorName: 'Dr. Richard James', date: '24th July, 2024' },
    { id: 3, doctorName: 'Dr. Richard James', date: '26th July, 2024' },
    { id: 4, doctorName: 'Dr. Richard James', date: '24th July, 2024' },
    { id: 5, doctorName: 'Dr. Richard James', date: '26th July, 2024' },
  ]

  return (
    <div className='m-5'>
      {aToken && (
        <>
          {/* Stats Section */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mb-8'>
            {/* Doctors Card */}
            <div className='flex items-center gap-4 bg-white p-6 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-all'>
              <img src={assets.doctor_icon} alt="doctors" className='w-12 h-12' />
              <div>
                <p className='text-2xl font-bold text-gray-800'>14</p>
                <p className='text-gray-600 text-sm'>Doctors</p>
              </div>
            </div>

            {/* Appointments Card */}
            <div className='flex items-center gap-4 bg-white p-6 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-all'>
              <img src={assets.appointments_icon} alt="appointments" className='w-12 h-12' />
              <div>
                <p className='text-2xl font-bold text-gray-800'>2</p>
                <p className='text-gray-600 text-sm'>Appointments</p>
              </div>
            </div>

            {/* Patients Card */}
            <div className='flex items-center gap-4 bg-white p-6 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-all'>
              <img src={assets.patients_icon} alt="patients" className='w-12 h-12' />
              <div>
                <p className='text-2xl font-bold text-gray-800'>5</p>
                <p className='text-gray-600 text-sm'>Patients</p>
              </div>
            </div>
          </div>

          {/* Latest Appointments Section */}
          <div className='bg-white rounded-lg border border-gray-200 p-6'>
            <div className='flex items-center gap-2 mb-6'>
              <img src={assets.appointment_icon} alt="appointment" className='w-5 h-5' />
              <p className='font-semibold text-gray-800'>Latest Appointment</p>
            </div>

            <div className='space-y-4'>
              {appointments.map((appointment) => (
                <div key={appointment.id} className='flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-all'>
                  <div className='flex items-center gap-3 flex-1'>
                    {/* Doctor Avatar */}
                    <div className='w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold'>
                      RJ
                    </div>
                    
                    <div className='flex-1'>
                      <p className='font-medium text-gray-800'>{appointment.doctorName}</p>
                      <p className='text-sm text-gray-600'>Booking on {appointment.date}</p>
                    </div>
                  </div>

                  {/* Cancel Button */}
                  <button className='text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all'>
                    <img src={assets.cancel_icon} alt="cancel" className='w-5 h-5' />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard