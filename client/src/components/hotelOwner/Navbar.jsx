import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300'>
        <Link to='/' className='flex items-center gap-2'>
        <img src={assets.logo} alt="logo" className='h-9 invert opacity-80'/>
        <span className='text-2xl font-bold text-gray-800'>SmartStays</span>
        </Link>
        <div className='flex items-center gap-4'>
          <div className='bg-blue-100 p-2 rounded-full border border-blue-300'>
            <img src={assets.userIcon} alt="Owner Profile" className='h-6 w-6 filter brightness-0 opacity-60'/>
          </div>
        </div>
    </div>
  )
}

export default Navbar