import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

const Home = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <div className='w-full p-6 md:p-8'>
      {/* Admin Dashboard */}
      {aToken && (
        <div className='space-y-6'>
          {/* Header */}
          <div className='border-b border-gray-200 pb-6'>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-900'>Admin Dashboard</h1>
            <p className='text-gray-600 mt-1'>Manage appointments, doctors, and medical facility operations</p>
          </div>

          {/* Quick Stats */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div className='bg-white rounded-lg shadow p-6 border-l-4 border-l-blue-500'>
              <div className='text-gray-500 text-sm font-medium'>Total Appointments</div>
              <div className='text-3xl font-bold text-gray-900 mt-1'>—</div>
              <div className='text-gray-500 text-xs mt-2'>View all appointments</div>
            </div>
            <div className='bg-white rounded-lg shadow p-6 border-l-4 border-l-emerald-500'>
              <div className='text-gray-500 text-sm font-medium'>Total Doctors</div>
              <div className='text-3xl font-bold text-gray-900 mt-1'>—</div>
              <div className='text-gray-500 text-xs mt-2'>Manage your team</div>
            </div>
            <div className='bg-white rounded-lg shadow p-6 border-l-4 border-l-amber-500'>
              <div className='text-gray-500 text-sm font-medium'>Today's Appointments</div>
              <div className='text-3xl font-bold text-gray-900 mt-1'>—</div>
              <div className='text-gray-500 text-xs mt-2'>Check schedule</div>
            </div>
            <div className='bg-white rounded-lg shadow p-6 border-l-4 border-l-red-500'>
              <div className='text-gray-500 text-sm font-medium'>Pending Confirmations</div>
              <div className='text-3xl font-bold text-gray-900 mt-1'>—</div>
              <div className='text-gray-500 text-xs mt-2'>Immediate action</div>
            </div>
          </div>

          {/* Main Content */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Quick Actions */}
            <div className='lg:col-span-2'>
              <div className='bg-white rounded-lg shadow p-6'>
                <h2 className='text-lg font-semibold text-gray-900 mb-4'>Quick Actions</h2>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer'>
                    <div>
                      <p className='font-medium text-gray-900'>View All Appointments</p>
                      <p className='text-sm text-gray-600'>Check booking and patient details</p>
                    </div>
                    <span className='text-blue-500'>→</span>
                  </div>
                  <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer'>
                    <div>
                      <p className='font-medium text-gray-900'>Add New Doctor</p>
                      <p className='text-sm text-gray-600'>Recruit and onboard a new doctor</p>
                    </div>
                    <span className='text-blue-500'>→</span>
                  </div>
                  <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer'>
                    <div>
                      <p className='font-medium text-gray-900'>Manage Doctors List</p>
                      <p className='text-sm text-gray-600'>Edit and update doctor information</p>
                    </div>
                    <span className='text-blue-500'>→</span>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className='bg-white rounded-lg shadow p-6'>
              <h2 className='text-lg font-semibold text-gray-900 mb-4'>System Status</h2>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-600'>Database</span>
                  <span className='px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded'>Connected</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-600'>API Server</span>
                  <span className='px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded'>Running</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-600'>Storage</span>
                  <span className='px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded'>Healthy</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-600'>Backup</span>
                  <span className='px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded'>Latest: Today</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className='bg-white rounded-lg shadow p-6'>
            <h2 className='text-lg font-semibold text-gray-900 mb-4'>Recent Activity</h2>
            <div className='space-y-3'>
              <div className='flex gap-4 pb-3 border-b border-gray-200'>
                <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0'></div>
                <div>
                  <p className='text-sm text-gray-900'>New appointment booked</p>
                  <p className='text-xs text-gray-500'>A few moments ago</p>
                </div>
              </div>
              <div className='flex gap-4 pb-3 border-b border-gray-200'>
                <div className='w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0'></div>
                <div>
                  <p className='text-sm text-gray-900'>Doctor profile updated</p>
                  <p className='text-xs text-gray-500'>2 hours ago</p>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0'></div>
                <div>
                  <p className='text-sm text-gray-900'>Appointment cancelled</p>
                  <p className='text-xs text-gray-500'>Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Dashboard */}
      {dToken && (
        <div className='space-y-6'>
          {/* Header */}
          <div className='border-b border-gray-200 pb-6'>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-900'>Your Dashboard</h1>
            <p className='text-gray-600 mt-1'>Manage appointments, schedule, and patient care</p>
          </div>

          {/* Quick Stats */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='bg-white rounded-lg shadow p-6 border-l-4 border-l-emerald-500'>
              <div className='text-gray-500 text-sm font-medium'>This Week</div>
              <div className='text-3xl font-bold text-gray-900 mt-1'>— Appointments</div>
              <div className='text-gray-500 text-xs mt-2'>Your upcoming schedule</div>
            </div>
            <div className='bg-white rounded-lg shadow p-6 border-l-4 border-l-cyan-500'>
              <div className='text-gray-500 text-sm font-medium'>Total Completed</div>
              <div className='text-3xl font-bold text-gray-900 mt-1'>—</div>
              <div className='text-gray-500 text-xs mt-2'>Consultations provided</div>
            </div>
            <div className='bg-white rounded-lg shadow p-6 border-l-4 border-l-blue-500'>
              <div className='text-gray-500 text-sm font-medium'>Pending Review</div>
              <div className='text-3xl font-bold text-gray-900 mt-1'>—</div>
              <div className='text-gray-500 text-xs mt-2'>Appointment requests</div>
            </div>
          </div>

          {/* Main Content */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Quick Actions */}
            <div className='lg:col-span-2'>
              <div className='bg-white rounded-lg shadow p-6'>
                <h2 className='text-lg font-semibold text-gray-900 mb-4'>Quick Access</h2>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer'>
                    <div>
                      <p className='font-medium text-gray-900'>View My Appointments</p>
                      <p className='text-sm text-gray-600'>Check scheduled and upcoming appointments</p>
                    </div>
                    <span className='text-emerald-500'>→</span>
                  </div>
                  <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer'>
                    <div>
                      <p className='font-medium text-gray-900'>Update Profile</p>
                      <p className='text-sm text-gray-600'>Edit qualifications and availability</p>
                    </div>
                    <span className='text-emerald-500'>→</span>
                  </div>
                  <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer'>
                    <div>
                      <p className='font-medium text-gray-900'>Manage Schedule</p>
                      <p className='text-sm text-gray-600'>Set your working hours and availability</p>
                    </div>
                    <span className='text-emerald-500'>→</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation Info */}
            <div className='bg-white rounded-lg shadow p-6'>
              <h2 className='text-lg font-semibold text-gray-900 mb-4'>Today's Overview</h2>
              <div className='space-y-4'>
                <div>
                  <p className='text-sm text-gray-600'>Appointment Status</p>
                  <div className='mt-2 space-y-1'>
                    <div className='flex justify-between text-xs'>
                      <span className='text-gray-700'>Completed</span>
                      <span className='text-gray-700'>—</span>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <span className='text-gray-700'>Pending</span>
                      <span className='text-gray-700'>—</span>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <span className='text-gray-700'>Cancelled</span>
                      <span className='text-gray-700'>—</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Overview */}
          <div className='bg-white rounded-lg shadow p-6'>
            <h2 className='text-lg font-semibold text-gray-900 mb-4'>Weekly Schedule</h2>
            <div className='grid grid-cols-7 gap-2 text-center text-sm'>
              <div>
                <p className='text-gray-500 text-xs mb-2'>Mon</p>
                <p className='text-gray-900 font-medium'>—</p>
              </div>
              <div>
                <p className='text-gray-500 text-xs mb-2'>Tue</p>
                <p className='text-gray-900 font-medium'>—</p>
              </div>
              <div>
                <p className='text-gray-500 text-xs mb-2'>Wed</p>
                <p className='text-gray-900 font-medium'>—</p>
              </div>
              <div>
                <p className='text-gray-500 text-xs mb-2'>Thu</p>
                <p className='text-gray-900 font-medium'>—</p>
              </div>
              <div>
                <p className='text-gray-500 text-xs mb-2'>Fri</p>
                <p className='text-gray-900 font-medium'>—</p>
              </div>
              <div>
                <p className='text-gray-500 text-xs mb-2'>Sat</p>
                <p className='text-gray-900 font-medium'>—</p>
              </div>
              <div>
                <p className='text-gray-500 text-xs mb-2'>Sun</p>
                <p className='text-gray-900 font-medium'>—</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
