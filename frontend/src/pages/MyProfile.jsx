import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets.js'

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [userData, setUserData] = useState({
    name: 'Edward Vincent',
    email: 'richard@simeswork@gmail.com',
    phone: '+1 123-456-7890',
    address: {
      line1: '57th Cross, Richmond',
      line2: 'Circle, Church Road, London'
    },
    gender: 'Male',
    dob: '20 July, 2024'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.includes('address')) {
      const key = name.split('.')[1]
      setUserData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value
        }
      }))
    } else {
      setUserData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSave = () => {
    console.log('Profile saved:', userData)
    setIsEdit(false)
  }

  return (
    <div className="py-12 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-8">
        {/* Profile Header */}
        <div className="flex items-start gap-6 mb-8 pb-8 border-b">
          <div className="relative">
            <img
              src={assets.profile_pic}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2 hover:bg-green-600">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 5a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"></path>
              </svg>
            </button>
          </div>
          <div className="flex-1">
            {isEdit ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="text-2xl font-bold mb-2 w-full px-2 py-1 border border-gray-300 rounded"
              />
            ) : (
              <h1 className="text-2xl font-bold mb-2">{userData.name}</h1>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 uppercase text-sm tracking-wide">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Email id:</span>
              {isEdit ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="px-2 py-1 border border-gray-300 rounded w-1/2"
                />
              ) : (
                <span className="text-indigo-600">{userData.email}</span>
              )}
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Phone:</span>
              {isEdit ? (
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  className="px-2 py-1 border border-gray-300 rounded w-1/2"
                />
              ) : (
                <span>{userData.phone}</span>
              )}
            </div>
            <div className="flex justify-between items-start pb-2 border-b">
              <span className="text-gray-600">Address:</span>
              {isEdit ? (
                <div className="w-1/2 space-y-2">
                  <input
                    type="text"
                    name="address.line1"
                    value={userData.address.line1}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <input
                    type="text"
                    name="address.line2"
                    value={userData.address.line2}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
              ) : (
                <div className="text-right">
                  <p>{userData.address.line1}</p>
                  <p>{userData.address.line2}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 uppercase text-sm tracking-wide">Basic Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Gender:</span>
              {isEdit ? (
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleInputChange}
                  className="px-2 py-1 border border-gray-300 rounded w-1/2"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                <span>{userData.gender}</span>
              )}
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Birthday:</span>
              {isEdit ? (
                <input
                  type="text"
                  name="dob"
                  value={userData.dob}
                  onChange={handleInputChange}
                  className="px-2 py-1 border border-gray-300 rounded w-1/2"
                  placeholder="DD Month, YYYY"
                />
              ) : (
                <span>{userData.dob}</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {isEdit ? (
            <>
              <button
                onClick={() => setIsEdit(false)}
                className="px-6 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-100 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-100 font-medium"
              >
                Save information
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEdit(true)}
                className="px-6 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-100 font-medium"
              >
                Edit
              </button>
              <button
                disabled
                className="px-6 py-2 border border-gray-400 text-gray-700 rounded bg-gray-50 font-medium opacity-50 cursor-not-allowed"
              >
                Save information
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyProfile