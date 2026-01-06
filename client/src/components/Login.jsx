import React, { useEffect, useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Login')
  const { setShowLogin, setToken, backendUrl, setUser } = useContext(AppContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

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
      <motion.form onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className='relative bg-white p-10 rounded-xl text-slate-500'>
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
            <img src={assets.profile_icon} alt="" className='h-5' />
            <input onChange={(e) => setName(e.target.value)}
              value={name}
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
          <input onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className='outline-none text-sm flex-1'
            placeholder='Email ID'
            required
          />
        </div>

        {/* Password Field */}
        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.lock_icon} alt="" />
          <input onChange={(e) => setPassword(e.target.value)}
            value={password}
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
      </motion.form>
    </div>
  )
}

export default Login