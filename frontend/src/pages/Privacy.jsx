import React from 'react'

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-12">
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>Privacy Policy</h1>
          <p className='text-gray-600 text-base leading-relaxed'>
            Last updated: <span className='font-medium'>April 1, 2026</span>
          </p>
        </div>

        {/* INTRODUCTION */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8 border border-gray-100">
          <p className='text-gray-700 text-base leading-relaxed'>
            At <span className='font-semibold text-indigo-600'>Prescripto</span>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, store, and safeguard your data when you use our services. Please read this policy carefully to understand our practices regarding your personal information.
          </p>
        </div>

        {/* SECTION 1: INFORMATION WE COLLECT */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xl">📋</span>
            </div>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>Information We Collect</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 border-l-4 border-blue-500">
              <h3 className='text-lg font-semibold text-gray-800 mb-2'>👤 Personal Information</h3>
              <p className='text-gray-600 text-sm mb-3'>We collect basic identification and contact details including:</p>
              <ul className='space-y-2 ml-4'>
                <li className='text-gray-600 text-sm flex items-start gap-2'>
                  <span className='text-blue-500 mt-1'>•</span>
                  <span>Full name and date of birth</span>
                </li>
                <li className='text-gray-600 text-sm flex items-start gap-2'>
                  <span className='text-blue-500 mt-1'>•</span>
                  <span>Email address and phone number</span>
                </li>
                <li className='text-gray-600 text-sm flex items-start gap-2'>
                  <span className='text-blue-500 mt-1'>•</span>
                  <span>Address and contact details</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border-l-4 border-green-500">
              <h3 className='text-lg font-semibold text-gray-800 mb-2'>🏥 Health Information</h3>
              <p className='text-gray-600 text-sm mb-3'>To provide quality healthcare services, we securely collect:</p>
              <ul className='space-y-2 ml-4'>
                <li className='text-gray-600 text-sm flex items-start gap-2'>
                  <span className='text-green-500 mt-1'>•</span>
                  <span>Medical history and health conditions</span>
                </li>
                <li className='text-gray-600 text-sm flex items-start gap-2'>
                  <span className='text-green-500 mt-1'>•</span>
                  <span>Current medications and allergies</span>
                </li>
                <li className='text-gray-600 text-sm flex items-start gap-2'>
                  <span className='text-green-500 mt-1'>•</span>
                  <span>Appointment records and prescriptions</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border-l-4 border-purple-500">
              <h3 className='text-lg font-semibold text-gray-800 mb-2'>📊 Usage Data</h3>
              <p className='text-gray-600 text-sm mb-3'>We automatically collect technical information about your interactions:</p>
              <ul className='space-y-2 ml-4'>
                <li className='text-gray-600 text-sm flex items-start gap-2'>
                  <span className='text-purple-500 mt-1'>•</span>
                  <span>IP address and browser type</span>
                </li>
                <li className='text-gray-600 text-sm flex items-start gap-2'>
                  <span className='text-purple-500 mt-1'>•</span>
                  <span>Device information and operating system</span>
                </li>
                <li className='text-gray-600 text-sm flex items-start gap-2'>
                  <span className='text-purple-500 mt-1'>•</span>
                  <span>Pages accessed and time spent on our platform</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: HOW WE USE YOUR INFORMATION */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-xl">✨</span>
            </div>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>How We Use Your Information</h2>
          </div>

          <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-200">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <span className="text-2xl">🏥</span>
                <div>
                  <h4 className='font-semibold text-gray-900 mb-1'>Healthcare Services</h4>
                  <p className='text-gray-600 text-sm'>To provide quality medical care and maintain your health records</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">💬</span>
                <div>
                  <h4 className='font-semibold text-gray-900 mb-1'>Communication</h4>
                  <p className='text-gray-600 text-sm'>To notify you about appointments, updates, and important notices</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">🔍</span>
                <div>
                  <h4 className='font-semibold text-gray-900 mb-1'>Service Improvement</h4>
                  <p className='text-gray-600 text-sm'>To analyze usage patterns and develop better features</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">⚖️</span>
                <div>
                  <h4 className='font-semibold text-gray-900 mb-1'>Legal Compliance</h4>
                  <p className='text-gray-600 text-sm'>To comply with healthcare regulations and laws</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: DATA SECURITY */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-xl">🔒</span>
            </div>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>Data Security</h2>
          </div>

          <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-200 space-y-4">
            <p className='text-gray-700'>We implement comprehensive security measures to protect your information:</p>
            <ul className='space-y-3'>
              <li className='flex items-start gap-3'>
                <span className='text-red-500 font-bold'>✓</span>
                <span className='text-gray-600'><span className='font-semibold'>End-to-End Encryption:</span> All sensitive data is encrypted during transmission and storage</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-red-500 font-bold'>✓</span>
                <span className='text-gray-600'><span className='font-semibold'>Secure Servers:</span> Data is stored on secure, password-protected servers</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-red-500 font-bold'>✓</span>
                <span className='text-gray-600'><span className='font-semibold'>Access Controls:</span> Only authorized personnel have access to personal information</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-red-500 font-bold'>✓</span>
                <span className='text-gray-600'><span className='font-semibold'>Regular Audits:</span> We conduct regular security audits and updates</span>
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 4: YOUR RIGHTS */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-xl">⚡</span>
            </div>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>Your Privacy Rights</h2>
          </div>

          <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-200 space-y-4">
            <p className='text-gray-700'>You have the following rights regarding your personal data:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 rounded-lg p-4">
                <h4 className='font-semibold text-gray-900 mb-2'>📖 Access</h4>
                <p className='text-gray-600 text-sm'>Request access to your personal data</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4">
                <h4 className='font-semibold text-gray-900 mb-2'>✏️ Correct</h4>
                <p className='text-gray-600 text-sm'>Update or correct your information</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4">
                <h4 className='font-semibold text-gray-900 mb-2'>🗑️ Delete</h4>
                <p className='text-gray-600 text-sm'>Request deletion of your data</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4">
                <h4 className='font-semibold text-gray-900 mb-2'>↗️ Export</h4>
                <p className='text-gray-600 text-sm'>Export your data in portable format</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: COOKIES & TRACKING */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <span className="text-xl">🍪</span>
            </div>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>Cookies & Tracking</h2>
          </div>

          <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-200">
            <p className='text-gray-700 mb-4'>
              We use cookies to enhance your experience, maintain your session, and remember preferences. You can control cookie settings through your browser. Some cookies are essential for the platform to function properly.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <p className='text-gray-700 text-sm'>
                <span className='font-semibold'>Note:</span> Disabling cookies may affect your ability to use certain features of Prescripto.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6: CONTACT & CHANGES */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-xl">📧</span>
                </div>
                <h2 className='text-2xl font-bold text-gray-900'>Contact Us</h2>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-4">
                <div>
                  <p className='text-gray-600 text-sm font-medium mb-1'>Privacy Concerns:</p>
                  <p className='text-indigo-600 font-semibold'>privacy@prescripto.com</p>
                </div>
                <div>
                  <p className='text-gray-600 text-sm font-medium mb-1'>General Support:</p>
                  <p className='text-indigo-600 font-semibold'>support@prescripto.com</p>
                </div>
                <div>
                  <p className='text-gray-600 text-sm font-medium mb-1'>Data Requests:</p>
                  <p className='text-indigo-600 font-semibold'>dpo@prescripto.com</p>
                </div>
              </div>
            </div>

            {/* Policy Changes */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <span className="text-xl">📝</span>
                </div>
                <h2 className='text-2xl font-bold text-gray-900'>Policy Changes</h2>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <p className='text-gray-700 mb-4'>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. Any changes will be posted on this page with an updated "Last updated" date.
                </p>
                <p className='text-gray-600 text-sm'>
                  Continued use of Prescripto after changes constitutes your acceptance of the updated Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-8 text-center text-white">
          <h3 className='text-2xl font-bold mb-2'>Your Privacy Matters to Us</h3>
          <p className='mb-6 opacity-90'>
            We're committed to maintaining the highest standards of data protection and transparency.
          </p>
          <p className='text-sm opacity-75'>
            If you have any questions about this Privacy Policy, please don't hesitate to reach out.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Privacy