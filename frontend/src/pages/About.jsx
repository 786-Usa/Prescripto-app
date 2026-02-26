import React from 'react'
import { assets } from '../assets/assets_frontend/assets.js'

const About = () => {
  return (
    <div className="py-12 max-w-4xl mx-auto space-y-16">
      {/* top section */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">ABOUT US</h1>
          <p className="text-gray-700 mb-4">
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p className="text-gray-700 mb-4">
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you’re booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <h2 className="text-xl font-semibold mt-6">Our Vision</h2>
          <p className="text-gray-700">
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
        <div className="flex-1">
          <img
            src={assets.about_image}
            alt="About us"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* why choose us section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">WHY CHOOSE US</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">EFFICIENCY</h3>
            <p className="text-gray-600">Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">CONVENIENCE</h3>
            <p className="text-gray-600">Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">PERSONALIZATION</h3>
            <p className="text-gray-600">Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About