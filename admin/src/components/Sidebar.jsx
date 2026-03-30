import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {

const {aToken} = useContext(AdminContext)
const {dToken} = useContext(DoctorContext)


  return (
    <div className='min-h-screen bg-white border-r'>
        {
            aToken && <ul className='text-[#515151] mt-5'>
                {/* //here to start */}
                <NavLink to={'/admin-dashboard'} className={({ isActive }) => `flex items-center gap-3 px-3 py-3.5 cursor-pointer rounded-lg transition-all ${isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>
                    <img src={assets.home_icon} alt="" className='w-5 h-5' />
                    <p>Dashboard</p>
                </NavLink>

                 <NavLink to={'/all-appointments'} className={({ isActive }) => `flex items-center gap-3 px-3 py-3.5 cursor-pointer rounded-lg transition-all ${isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>
                    <img src={assets.appointments_icon} alt="" className='w-5 h-5' />
                    <p>Appointments</p>
                </NavLink>

                 <NavLink to={'/add-doctor'} className={({ isActive }) => `flex items-center gap-3 px-3 py-3.5 cursor-pointer rounded-lg transition-all ${isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>
                    <img src={assets.add_icon} alt="" className='w-5 h-5' />
                    <p>Add Doctor</p>
                </NavLink>

                 <NavLink to={'/doctor-list'} className={({ isActive }) => `flex items-center gap-3 px-3 py-3.5 cursor-pointer rounded-lg transition-all ${isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>
                    <img src={assets.people_icon} alt="" className='w-5 h-5' />
                    <p>Doctors List</p>
                </NavLink>
            </ul>
        }
         {
            dToken && <ul className='text-[#515151] mt-5'>
                {/* //here to start */}
                <NavLink to={'/doctor-dashboard'} className={({ isActive }) => `flex items-center gap-3 px-3 py-3.5 cursor-pointer rounded-lg transition-all ${isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>
                    <img src={assets.home_icon} alt="" className='w-5 h-5' />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>

                 <NavLink to={'/doctor-appointments'} className={({ isActive }) => `flex items-center gap-3 px-3 py-3.5 cursor-pointer rounded-lg transition-all ${isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>
                    <img src={assets.appointments_icon} alt="" className='w-5 h-5' />
                    <p className='hidden md:block'>Appointments</p>
                </NavLink>

                 <NavLink to={'/doctor-profile'} className={({ isActive }) => `flex items-center gap-3 px-3 py-3.5 cursor-pointer rounded-lg transition-all ${isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>
                    <img src={assets.add_icon} alt="" className='w-5 h-5' />
                    <p className='hidden md:block'>Add Doctor</p>
                </NavLink>
            </ul>
        }



    </div>
  )
}

export default Sidebar