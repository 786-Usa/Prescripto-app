import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {

const {aToken} = useContext(AdminContext)
const {dToken} = useContext(DoctorContext)
const [expanded, setExpanded] = useState(true)

  return (
    <div className={`min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 transition-all duration-300 ${expanded ? 'w-60' : 'w-20'} sticky top-0`}>
        
        {/* Logo Section */}
        <div className='p-4 border-b border-slate-700 flex justify-between items-center'>
            {expanded && <h1 className='text-white font-bold text-lg truncate'>Prescripto</h1>}
            <button 
                onClick={() => setExpanded(!expanded)}
                className='p-1.5 hover:bg-slate-700 rounded-lg transition-colors'
            >
                <span className='text-white text-lg'>≡</span>
            </button>
        </div>

        {/* Admin Section */}
        {
            aToken && (
                <div className='py-6'>
                    {expanded && <p className='text-slate-400 text-xs font-semibold uppercase px-4 mb-3 tracking-wider'>Admin Panel</p>}
                    <ul className='space-y-2 px-3'>
                        <NavLink to={'/admin-dashboard'} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                            <img src={assets.home_icon} alt="Dashboard" className='w-5 h-5' />
                            {expanded && <p className='font-medium'>Dashboard</p>}
                        </NavLink>

                        <NavLink to={'/all-appointments'} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                            <img src={assets.appointments_icon} alt="Appointments" className='w-5 h-5' />
                            {expanded && <p className='font-medium'>Appointments</p>}
                        </NavLink>

                        <NavLink to={'/add-doctor'} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                            <img src={assets.add_icon} alt="Add Doctor" className='w-5 h-5' />
                            {expanded && <p className='font-medium'>Add Doctor</p>}
                        </NavLink>

                        <NavLink to={'/doctor-list'} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                            <img src={assets.people_icon} alt="Doctors List" className='w-5 h-5' />
                            {expanded && <p className='font-medium'>Doctors List</p>}
                        </NavLink>
                    </ul>
                </div>
            )
        }

        {/* Doctor Section */}
        {
            dToken && (
                <div className='py-6 border-t border-slate-700'>
                    {expanded && <p className='text-slate-400 text-xs font-semibold uppercase px-4 mb-3 tracking-wider'>Doctor Panel</p>}
                    <ul className='space-y-2 px-3'>
                        <NavLink to={'/doctor-dashboard'} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                            <img src={assets.home_icon} alt="Dashboard" className='w-5 h-5' />
                            {expanded && <p className='font-medium'>Dashboard</p>}
                        </NavLink>

                        <NavLink to={'/doctor-appointments'} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                            <img src={assets.appointments_icon} alt="Appointments" className='w-5 h-5' />
                            {expanded && <p className='font-medium'>Appointments</p>}
                        </NavLink>

                        <NavLink to={'/doctor-profile'} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                            <img src={assets.add_icon} alt="Profile" className='w-5 h-5' />
                            {expanded && <p className='font-medium'>Profile</p>}
                        </NavLink>
                    </ul>
                </div>
            )
        }
    </div>
  )
}

export default Sidebar