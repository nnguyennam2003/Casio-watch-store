import React from 'react'
import MyOrderPage from './MyOrderPage'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const navigateDashboard = () => {
    navigate('/admin')
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='grow container mx-auto max-w-[1400px] p-4 md:p-6'>
        <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0'>
          {/* Left Section */}
          <div className='w-full md:w-1/3 lg:w-1/4 h-full shadow-md rounded-lg p-6'>
            <h1 className='text-2xl md:text-3xl font-bold mb-4'>{user.name}</h1>
            <p className='text-lg text-gray-600 mb-4'>{user.email}</p>
            {
              user.role === 'admin' && (
                <button onClick={navigateDashboard} className='w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mb-3 cursor-pointer'>
                  Dashboard
                </button>
            )}
            <button onClick={handleLogout} className='w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 cursor-pointer'>
              Đăng xuất
            </button>
          </div>

          {/* Right Section */}
          <div className='w-full md:w-2/3 lg:w-3/4'>
            <MyOrderPage />
          </div>
        </div>
      </div>
    </div>
  )
}
