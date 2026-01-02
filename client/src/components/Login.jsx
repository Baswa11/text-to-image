import React, { useEffect, useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Login = () => {
  const [state, setState] = useState('Login')
  const { setShowLogin } = useContext(AppContext)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleClose = () => {
    setShowLogin(false)
  }

  const toggleState = () => {
    setState(state === 'Login' ? 'sign up' : 'Login')
  }

  const isLogin = state === 'Login'

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form className='relative bg-white p-10 rounded-xl text-slate-500'>
        {/* Close Button */}
        <img
          onClick={handleClose}
          src={assets.cross_icon}
          alt=""
          className='absolute top-5 right-5 cursor-pointer'
        />

        {/* Header */}
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>
          {state}
        </h1>
        <p className='text-sm'>Welcome back! Please sign in to continue</p>

        {/* Full Name Field (Only for Sign Up) */}
        {!isLogin && (
          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
            <img src={assets.profile_icon} alt="" className='h-5'  />
            <input
              type="text"
              className='outline-none text-sm flex-1'
              placeholder='Full Name'
              required
            />
          </div>
        )}

        {/* Email Field */}
        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.email_icon} alt="" />
          <input
            type="email"
            className='outline-none text-sm flex-1'
            placeholder='Email ID'
            required
          />
        </div>

        {/* Password Field */}
        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.lock_icon} alt=""  />
          <input
            type="password"
            className='outline-none text-sm flex-1'
            placeholder='Password'
            required
          />
        </div>

        {/* Forgot Password */}
        <p className='text-sm text-blue-600 my-4 cursor-pointer'>
          Forgot Password
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          className='bg-blue-600 w-full text-white py-2 rounded-full hover:bg-blue-700 transition-colors'
        >
          {isLogin ? 'Login' : 'Create Account'}
        </button>

        {/* Toggle Login/Sign Up */}
        {isLogin ? (
          <p className='mt-5 text-center'>
            Don't have an account?{' '}
            <span
              className='text-blue-600 cursor-pointer hover:underline'
              onClick={toggleState}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className='mt-5 text-center'>
            Already have an account?{' '}
            <span
              className='text-blue-600 cursor-pointer hover:underline'
              onClick={toggleState}
            >
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  )
}

export default Login