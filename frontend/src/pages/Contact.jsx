import React from 'react'
import { assets } from '../assets/assets_frontend/assets.js'

const Contact = () => {
  return (
    <div className="py-12 max-w-4xl mx-auto space-y-16">
      <h1 className="text-3xl font-bold text-center">CONTACT US</h1>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <img
            src={assets.contact_image}
            alt="Contact us"
            className="w-full rounded-lg shadow-lg border-4 border-blue-400"
          />
        </div>
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-xl font-semibold">OUR OFFICE</h2>
            <p className="text-gray-700">
              5470 Wilshire Stallion<br />
              Suite 650, Washington, USA
            </p>
            <p className="mt-2 text-gray-700">
              Tel: (845) 555-0132<br />
              Email: greatcode@example.com
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">CAREERS AT PRESCRIPTO</h2>
            <p className="text-gray-700 mb-2">
              Learn more about our teams and job openings.
            </p>
            <button className="px-4 py-2 border border-gray-800 rounded hover:bg-gray-100">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact