import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'

const Login = () => {
  const navigate = useNavigate()
  const [state , setState] = useState('signup')
  const {token,setToken, backendUrl} = useContext(AppContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const switchMode = () => {
    setState(prev => prev === 'signup' ? 'login' : 'signup')
    setFormData({
      name: '',
      email: '',
      password: ''
    })
  }

   useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      navigate('/')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if(state === 'signup') {
      const { data } = await axios.post(`${backendUrl}/api/user/register`, formData);
      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        toast.success(data.message);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    }else{
      const { data } = await axios.post(`${backendUrl}/api/user/login`, formData);
      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        toast.success(data.message);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    }
  }
    
    catch (error) {
      console.error("Error during authentication:", error);
      toast.error("An error occurred during authentication");
      
    }
  }

return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100">

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          {state === 'signup' ? 'Create Account' : 'Welcome Back'}
        </h1>

        <p className="text-gray-500 text-center mb-6">
          {state === 'signup'
            ? 'Sign up to get started'
            : 'Login to continue'}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          {state === 'signup' && (
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
          >
            {state === 'signup' ? 'Sign Up' : 'Login'}
          </button>

        </form>

        {/* Toggle */}
        <p className="text-center text-gray-500 text-sm mt-6">
          {state === 'signup' ? (
            <>
              Already have an account?{' '}
              <span
                onClick={switchMode}
                className="text-indigo-600 font-semibold cursor-pointer"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{' '}
              <span
                onClick={switchMode}
                className="text-indigo-600 font-semibold cursor-pointer"
              >
                Sign up here
              </span>
            </>
          )}
        </p>

      </div>
    </div>
  )
}

export default Login