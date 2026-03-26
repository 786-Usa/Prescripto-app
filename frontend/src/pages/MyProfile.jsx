import React, { useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { useContext } from 'react'
import {assets} from '../assets/assets_frontend/assets.js'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {
  const {userData , setUserData, token, backendUrl, getUserProfileData} = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image , setImage] = useState(false)

  const updateProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('email', userData.email)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      if (image) {
        formData.append('image', image)
      }
      const {data} = await axios.post(`${backendUrl}/api/user/profile/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if(data.success){
        toast.success(data.message)
        getUserProfileData()
        setIsEdit(false)
        setImage(false)
      }
      else{
        toast.error(data.message)
      }

    } catch (error) {
      console.error("Error updating profile data:", error); 
      toast.error("Error updating profile data");
      
    }
  }

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
    updateProfileData()

    setIsEdit(false)
  }

 return userData && (
  <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
    <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10">

      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b pb-6 mb-6">

        <div className="relative group">
          <img
            src={image ? URL.createObjectURL(image) : userData.image}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow"
          />

          {isEdit && (
            <label htmlFor="image">
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition">
                <img src={assets.upload_icon} className="w-8" />
              </div>
              <input
                type="file"
                id="image"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          )}
        </div>

        <div className="flex-1 text-center sm:text-left">
          {isEdit ? (
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="text-2xl font-semibold w-full border-b focus:outline-none focus:border-indigo-500"
            />
          ) : (
            <h1 className="text-2xl font-semibold">{userData.name}</h1>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-sm text-gray-500 mb-1">Email</p>
          {isEdit ? (
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            />
          ) : (
            <p className="font-medium text-indigo-600">{userData.email}</p>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Phone</p>
          {isEdit ? (
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            />
          ) : (
            <p className="font-medium">{userData.phone}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">Address</p>
        {isEdit ? (
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="address.line1"
              value={userData.address.line1}
              onChange={handleInputChange}
              className="border rounded-lg px-3 py-2"
              placeholder="Line 1"
            />
            <input
              type="text"
              name="address.line2"
              value={userData.address.line2}
              onChange={handleInputChange}
              className="border rounded-lg px-3 py-2"
              placeholder="Line 2"
            />
          </div>
        ) : (
          <p className="font-medium">
            {userData.address.line1}, {userData.address.line2}
          </p>
        )}
      </div>

      {/* Basic Info */}
      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        <div>
          <p className="text-sm text-gray-500 mb-1">Gender</p>
          {isEdit ? (
            <select
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          ) : (
            <p className="font-medium">{userData.gender}</p>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
          {isEdit ? (
            <input
              type="text"
              name="dob"
              value={userData.dob}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          ) : (
            <p className="font-medium">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        {isEdit ? (
          <>
            <button
              onClick={() => setIsEdit(false)}
              className="px-5 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  </div>
)
}

export default MyProfile