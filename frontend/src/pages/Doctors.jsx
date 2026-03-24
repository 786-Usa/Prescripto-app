import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const { speciality } = useParams()
  const [filter, setFilter] = useState([])
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      const filteredDoctors = doctors.filter(doc => doc.speciality === speciality)
      setFilter(filteredDoctors)
    } else {
      setFilter(doctors)
    }
  } 

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  const specialties = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
  ]

  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Browse through the doctors specialist</h2>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* sidebar */}
        <aside className="md:w-1/4 bg-white rounded-lg shadow p-4">
          <ul className="space-y-2">
            {specialties.map(spec => (
              <li key={spec}>
                <Link
                  to={`/doctors/${encodeURIComponent(spec)}`}
                  className={`block px-3 py-2 rounded text-sm font-medium hover:bg-indigo-50 transition ${spec === speciality ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700'
                    }`}
                >
                  {spec}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/doctors"
                className="block px-3 py-2 rounded text-sm font-medium hover:bg-indigo-50 transition text-gray-700"
              >
                All
              </Link>
            </li>
          </ul>
        </aside>

        {/* cards grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filter.map(doc => (
            <Link
              to={`/appointments/${doc._id}`}
              key={doc._id}
              className="block bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition"
            >
              <div className="bg-indigo-50 p-6 flex items-center justify-center">
                <img src={doc.image} alt={doc.name} className="h-36 object-contain" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-500 flex items-center gap-2">
                    {/* //how to take data of available from doctor model and show here? */}
                    {doc.available && (
                      <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                    )}
                    Available
                  </span>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-gray-800">{doc.name}</h3>
                <p className="text-xs text-gray-500">{doc.speciality}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors