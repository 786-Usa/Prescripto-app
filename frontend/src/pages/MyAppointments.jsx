import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {
  const { doctors } = useContext(AppContext)
  const [appointments, setAppointments] = useState([
    {
      _id: 'apt1',
      docId: 'doc1',
      date: '20 Jan, 2024',
      time: '8:30 PM',
      isPaid: false
    },
    {
      _id: 'apt2',
      docId: 'doc1',
      date: '25 Jan, 2024',
      time: '8:30 PM',
      isPaid: true
    },
    {
      _id: 'apt3',
      docId: 'doc1',
      date: '26 Jan, 2024',
      time: '8:30 PM',
      isPaid: false
    }
  ])

  const handleCancelAppointment = (aptId) => {
    setAppointments(prev => prev.filter(apt => apt._id !== aptId))
  }

  const handlePayment = (aptId) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt._id === aptId ? { ...apt, isPaid: true } : apt
      )
    )
  }

  return (
    <div className="py-12 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">My Appointments</h1>

      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No appointments booked yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {appointments.map((apt) => {
            const doc = doctors.find(d => d._id === apt.docId)
            if (!doc) return null

            return (
              <div key={apt._id} className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
                {/* Doctor Image */}
                <div className="flex-shrink-0">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="h-32 w-32 rounded-lg object-cover bg-indigo-50 p-4"
                  />
                </div>

                {/* Appointment Details */}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{doc.name}</h2>
                  <p className="text-gray-600 mb-3">{doc.speciality}</p>

                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">Address:</span>
                      <br />
                      {doc.address.line1}
                      <br />
                      {doc.address.line2}
                    </p>
                    <p>
                      <span className="font-semibold">Date & Time:</span> {apt.date} | {apt.time}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 md:w-32">
                  {apt.isPaid ? (
                    <button
                      disabled
                      className="px-4 py-2 bg-indigo-600 text-white rounded font-medium"
                    >
                      Paid
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePayment(apt._id)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-medium transition"
                    >
                      Pay here
                    </button>
                  )}
                  <button
                    onClick={() => handleCancelAppointment(apt._id)}
                    className="px-4 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-50 font-medium transition"
                  >
                    Cancel appointment
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MyAppointments