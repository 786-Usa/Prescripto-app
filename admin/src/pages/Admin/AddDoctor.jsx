import React, { useState } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

const AddDoctor = () => {
    const { aToken, backendUrl, addDoctorToList } = useContext(AdminContext)  // ← GET addDoctorToList
    
    const [doctorData, setDoctorData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',  // ← ADD phone field
        experience: 'Select experience',
        fees: '',
        about: '',
        speciality: 'General physician',
        degree: '',
        address1: '',
        address2: '',
        image: null
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setDoctorData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setDoctorData(prev => ({
                ...prev,
                image: file
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Check if admin is logged in
        if (!aToken) {
            return toast.error('Admin not logged in. Please login first!');
        }

        if (!doctorData.image) {
            return toast.error('Please upload a doctor picture');
        }

        if (!doctorData.phone) {
            return toast.error('Please enter phone number');
        }

        const formData = new FormData()
        formData.append('name', doctorData.name)
        formData.append('email', doctorData.email)
        formData.append('password', doctorData.password)
        formData.append('phone', doctorData.phone)
        formData.append('experience', doctorData.experience)
        formData.append('fees', doctorData.fees)
        formData.append('about', doctorData.about)
        formData.append('speciality', doctorData.speciality)
        formData.append('degree', doctorData.degree)
        formData.append('address', JSON.stringify({ line1: doctorData.address1, line2: doctorData.address2 }))
        formData.append('image', doctorData.image)

        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
                headers: {
                    Authorization: `Bearer ${aToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (data.success) {
                toast.success(data.message)
                
                if (data.doctor) {
                    addDoctorToList(data.doctor)
                }
                
                setDoctorData({
                    name: '',
                    email: '',
                    password: '',
                    phone: '',
                    experience: 'Select experience',
                    fees: '',
                    about: '',
                    speciality: 'General physician',
                    degree: '',
                    address1: '',
                    address2: '',
                    image: null
                })
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || error.message)
        }
    }

    // ← ADD phone input field in JSX
   return (
  <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center">
    <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6 md:p-10">

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
        Add Doctor
      </h1>

      <form onSubmit={handleSubmit}>

        {/* Upload Section */}
        <div className="flex items-center gap-6 mb-10">
          <label className="cursor-pointer">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-blue-500 transition">
              {doctorData.image ? (
                <img
                  src={URL.createObjectURL(doctorData.image)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img src={assets.upload_area} className="w-10 opacity-60" />
              )}
            </div>
            <input type="file" hidden onChange={handleImageChange} />
          </label>

          <p className="text-sm text-gray-500">
            Upload doctor picture
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Input Style */}
          {[
            { label: "Doctor Name", name: "name", type: "text", placeholder: "Name" },
            { label: "Email", name: "email", type: "email", placeholder: "Email" },
            { label: "Phone", name: "phone", type: "text", placeholder: "Phone number" },
            { label: "Education", name: "degree", type: "text", placeholder: "Degree" },
            { label: "Password", name: "password", type: "password", placeholder: "Password" },
            { label: "Fees", name: "fees", type: "number", placeholder: "Fees" }
          ].map((field, i) => (
            <div key={i}>
              <label className="text-sm font-medium text-gray-600">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={doctorData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>
          ))}

          {/* Speciality */}
          <div>
            <label className="text-sm font-medium text-gray-600">Speciality</label>
            <select
              name="speciality"
              value={doctorData.speciality}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              <option>General physician</option>
              <option>Gynecologist</option>
              <option>Dermatologist</option>
              <option>Pediatrician</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="text-sm font-medium text-gray-600">Experience</label>
            <select
              name="experience"
              value={doctorData.experience}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              <option>Select experience</option>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3">3 Years</option>
              <option value="4">4 Years</option>
              <option value="5">5 Years</option>
              <option value="10">10+ Years</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-gray-600">Address</label>
            <input
              type="text"
              name="address1"
              value={doctorData.address1}
              onChange={handleChange}
              placeholder="Address line 1"
              className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-300"
            />
          </div>

          <div>
            <label className="text-sm opacity-0">hidden</label>
            <input
              type="text"
              name="address2"
              value={doctorData.address2}
              onChange={handleChange}
              placeholder="Address line 2"
              className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-300"
            />
          </div>
        </div>

        {/* Available Toggle */}
        <div className="flex items-center justify-between mt-8 bg-gray-50 p-4 rounded-lg">
          <span className="text-gray-700 font-medium">Available</span>

          <input
            type="checkbox"
            name="available"
            checked={doctorData.available || false}
            onChange={(e) =>
              setDoctorData(prev => ({
                ...prev,
                available: e.target.checked
              }))
            }
            className="w-5 h-5 accent-blue-600"
          />
        </div>

        {/* About */}
        <div className="mt-8">
          <label className="text-sm font-medium text-gray-600">
            About Doctor
          </label>
          <textarea
            name="about"
            value={doctorData.about}
            onChange={handleChange}
            rows="4"
            placeholder="Write about doctor..."
            className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Button */}
        <div className="mt-10">
          <button
            type="submit"
            className="w-full md:w-auto px-10 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition shadow-md"
          >
            Add Doctor
          </button>
        </div>

      </form>
    </div>
  </div>
)
}

export default AddDoctor;