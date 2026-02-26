import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Appointment = () => {
  const { docId } = useParams()
  const { doctors } = useContext(AppContext)
  const [docInfo, setDocInfo] = useState(null)

  const days = ['Mon 10', 'Tue 11', 'Wed 12', 'Thu 13', 'Fri 14', 'Sat 15', 'Sun 16']
  const times = ['8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am']
  const [selectedDay, setSelectedDay] = useState(days[0])
  const [selectedTime, setSelectedTime] = useState(times[2])

  useEffect(() => {
    const doc = doctors.find(d => d._id === docId)
    setDocInfo(doc || null)
  }, [docId, doctors])

  if (!docInfo) {
    return <div className="py-12 text-center">Doctor not found.</div>
  }

  const relatedDocs = doctors
    .filter(d => d.speciality === docInfo.speciality && d._id !== docInfo._id)
    .slice(0, 5)

  return (
    <div className="py-12 max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row items-center gap-6">
        
        <img
          src={docInfo.image}
          alt={docInfo.name}
          className="h-48 w-48 object-cover rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">
            {docInfo.name}{' '}
            <span className="text-sm font-normal">({docInfo.degree})</span>
          </h1>
          <p className="text-gray-600">{docInfo.speciality}</p>
          <p className="text-gray-500 mt-2">{docInfo.experience} experience</p>
          <p className="text-gray-700 mt-4">{docInfo.about}</p>
          <p className="mt-4">
            <strong>Fees:</strong> ${docInfo.fees}
          </p>
          <p className="mt-2">
            <strong>Address:</strong> {docInfo.address.line1}, {docInfo.address.line2}
          </p>
        </div>
      </div>

      {/* booking slots */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">Booking slots</h2>
        <div className="flex gap-2 overflow-x-auto py-2">
          {days.map(day => (
            <button
              key={day}
              className={`px-4 py-2 rounded-full border ${day === selectedDay
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-700'
                }`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {times.map(time => (
            <button
              key={time}
              className={`px-4 py-2 rounded-full border ${time === selectedTime
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-700'
                }`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
        <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg">
          Book an appointment
        </button>
      </div>

      {/* related doctors */}
      {relatedDocs.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center">Related Doctors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedDocs.map(doc => (
              <Link
                to={`/appointments/${doc._id}`}
                key={doc._id}
                className="block bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition"
              >
                <div className="bg-indigo-50 p-6 flex items-center justify-center">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="h-36 object-contain"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-500 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                      Available
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-gray-800">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-gray-500">{doc.speciality}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Appointment