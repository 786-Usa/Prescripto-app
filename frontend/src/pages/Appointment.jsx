import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, backendUrl, token, userData } = useContext(AppContext)
  const [docInfo, setDocInfo] = useState(null)
  const navigate = useNavigate()

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const times = ['8:00 am','8:30 am','9:00 am','9:30 am','10:00 am','10:30 am','11:00 am','11:30 am']

  // 🔥 dynamic next 7 days
  const getNext7Days = () => {
    let days = []
    for (let i = 0; i < 7; i++) {
      let date = new Date()
      date.setDate(date.getDate() + i)

      const formatted = date.toISOString().split('T')[0] // YYYY-MM-DD
      const label = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })
      const weekday = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
      const dayNum = date.getDate()

      days.push({ label, value: formatted, weekday, dayNum })
    }
    return days
  }

  const days = getNext7Days()

  // 🔥 check slot availability
  const isSlotBooked = (date, time) => {
    if (!docInfo?.slots_booked) return false
    return docInfo.slots_booked[date]?.includes(time)
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Please login first')
      return navigate('/login')
    }

    if (!selectedDate || !selectedTime) {
      return toast.error('Select date & time')
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        {
          userId: userData._id,
          docId,
          slotDate: selectedDate,
          slotTime: selectedTime
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      if (data.success) {
        toast.success(data.message)
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error('Booking failed')
    }
  }

  useEffect(() => {
    const doc = doctors.find(d => d._id === docId)
    setDocInfo(doc || null)
  }, [docId, doctors])

  if (!docInfo) return <div className="text-center py-20">Loading...</div>

  // Get related doctors (same speciality)
  const relatedDoctors = doctors.filter(d => d.speciality === docInfo.speciality && d._id !== docId).slice(0, 5)

  return (
    <div className="min-h-screen bg-white py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">

        {/* DOCTOR INFO SECTION */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <img src={docInfo.image} alt={docInfo.name} className="w-48 h-48 rounded-2xl object-cover bg-blue-100" />
          </div>

          {/* Doctor Details */}
          <div className="flex-1">
            <div className="flex items-start gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{docInfo.name}</h1>
              <span className="text-blue-500 text-2xl">✓</span>
            </div>

            <p className="text-gray-500 text-sm mb-4">
              {docInfo.degree} - {docInfo.speciality}  ({docInfo.experience} years)
            </p>

            {/* About Section */}
            <div className="mb-4">
              <h3 className="text-gray-700 font-semibold text-sm mb-2 flex items-center gap-2">
                About <span className="text-gray-400">ℹ️</span>
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {docInfo.about}
              </p>
            </div>

            {/* Appointment Fee */}
            <p className="text-gray-800 font-medium">
              Appointment fee: <span className="text-gray-600">${docInfo.fees}</span>
            </p>

            {/* 🔴 Availability Status */}
            {!docInfo.available && (
              <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                <p className="text-red-700 text-sm font-medium">⚠️ Doctor is not available</p>
              </div>
            )}
          </div>
        </div>

        {/* BOOKING SLOTS SECTION */}
        <div className="bg-white">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Booking slots</h2>

          {/* Date Selection */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-8">
            {days.map(day => (
              <button
                key={day.value}
                onClick={() => {
                  setSelectedDate(day.value)
                  setSelectedTime('')
                }}
                disabled={!docInfo.available}
                className={`flex flex-col items-center justify-center min-w-[70px] py-3 px-2 rounded-lg border-2 transition ${
                  !docInfo.available
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
                    : selectedDate === day.value
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                }`}
              >
                <span className="text-xs font-medium">{day.weekday}</span>
                <span className="text-lg font-bold">{day.dayNum}</span>
              </button>
            ))}
          </div>

          {/* Time Selection */}
          <h3 className="text-base font-medium text-gray-900 mb-4">Morning</h3>
          <div className="flex gap-3 overflow-x-auto pb-6 flex-wrap">
            {times.map(time => {
              const booked = isSlotBooked(selectedDate, time)

              return (
                <button
                  key={time}
                  disabled={booked || !docInfo.available}
                  onClick={() => setSelectedTime(time)}
                  className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition ${
                    !docInfo.available
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
                      : booked
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
                      : selectedTime === time
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {time}
                </button>
              )
            })}
          </div>

          {/* Book Button */}
          <button
            onClick={bookAppointment}
            disabled={!docInfo.available}
            className={`w-full md:w-auto px-12 py-3 rounded-full text-white font-semibold transition ${
              !docInfo.available
                ? 'bg-gray-400 cursor-not-allowed opacity-60'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Book an appointment
          </button>
        </div>

        {/* RELATED DOCTORS SECTION */}
        {relatedDoctors.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Related Doctors</h2>
            <p className="text-gray-600 text-sm mb-6">
              Simply browse through our extensive list of trusted doctors.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {relatedDoctors.map(doc => (
                <Link
                  to={`/appointments/${doc._id}`}
                  key={doc._id}
                  className="text-center group cursor-pointer"
                >
                  <div className="bg-indigo-50 rounded-lg overflow-hidden mb-3">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-32 object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <p className="text-xs text-green-600 font-medium">Available</p>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">{doc.name}</h3>
                  <p className="text-xs text-gray-600">{doc.speciality}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Appointment