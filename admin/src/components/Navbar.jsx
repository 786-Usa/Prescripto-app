import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const logout = () => {
    
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    navigate('/')


  }

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div
        className="
          w-full
          max-w-screen-2xl
          mx-auto
          flex items-center justify-between
          px-3 sm:px-5 md:px-8 lg:px-10
          py-2 sm:py-3
        "
      >
        {/* LEFT — Logo */}
        <div className="flex items-center min-w-0">
          <img
            src={assets.admin_logo}
            alt="Admin Logo"
            className="
              h-7
              sm:h-8
              md:h-9
              lg:h-10
              xl:h-11
              object-contain
            "
          />
        </div>

        {/* CENTER — Title */}
        <div className="flex-1 text-center px-2">
          <h1
            className="
              font-semibold text-gray-700
              text-xs
              sm:text-sm
              md:text-lg
              lg:text-xl
              xl:text-2xl
              truncate
            "
          >
            {aToken ? "Admin" : "Doctor"} Dashboard
          </h1>
        </div>

        {/* RIGHT — Logout */}
        <div className="flex justify-end">
          <button
            onClick={logout}
            className="
              whitespace-nowrap
              px-3 sm:px-4 md:px-5
              py-1.5 sm:py-2
              text-xs sm:text-sm md:text-base
              font-medium
              text-white
              bg-[#5F6FFF]
              rounded-lg
              shadow-sm
              hover:bg-[#4b59d9]
              active:scale-95
              transition-all duration-200
            "
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar