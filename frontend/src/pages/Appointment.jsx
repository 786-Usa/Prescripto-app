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

      days.push({ label, value: formatted })
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-10 px-4">

      {/* Doctor Card */}
      <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-6">
        <img src={docInfo.image} className="w-40 h-40 rounded-xl object-cover" />

        <div>
          <h1 className="text-2xl font-bold text-gray-800">{docInfo.name}</h1>
          <p className="text-indigo-600 font-medium">{docInfo.speciality}</p>

          <div className="mt-2 text-sm text-gray-500">
            {docInfo.degree} • {docInfo.experience}
          </div>

          <p className="mt-3 text-gray-600 text-sm">{docInfo.about}</p>

          <div className="mt-4 flex gap-6 text-sm">
            <span>💰 ${docInfo.fees}</span>
            <span>📍 {docInfo.address.line1}</span>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-xl font-semibold mb-4">Select Date</h2>

        {/* Dates */}
        <div className="flex gap-3 overflow-x-auto pb-3">
          {days.map(day => (
            <button
              key={day.value}
              onClick={() => {
                setSelectedDate(day.value)
                setSelectedTime('')
              }}
              className={`min-w-[80px] py-3 rounded-xl border transition ${
                selectedDate === day.value
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 hover:bg-indigo-100'
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>

        {/* Time Slots */}
        <h2 className="text-xl font-semibold mt-6 mb-4">Select Time</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {times.map(time => {
            const booked = isSlotBooked(selectedDate, time)

            return (
              <button
                key={time}
                disabled={booked}
                onClick={() => setSelectedTime(time)}
                className={`py-2 rounded-lg border text-sm transition ${
                  booked
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : selectedTime === time
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-gray-100 hover:bg-indigo-100'
                }`}
              >
                {time}
              </button>
            )
          })}
        </div>

        {/* Button */}
        <button
          onClick={bookAppointment}
          className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-lg font-medium transition"
        >
          Book Appointment 🚀
        </button>
      </div>
    </div>
  )
}

export default Appointment