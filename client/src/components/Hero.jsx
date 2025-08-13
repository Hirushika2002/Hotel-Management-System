import React from 'react'
import { assets, cities } from '../assets/assets'

const Hero = () => {
  return (
    <div className={`relative flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-no-repeat bg-cover bg-center h-screen`} style={{backgroundImage: `url(${assets.heroImage})`}}>
      {/* Content with proper positioning */}
      <div className="relative z-10">
        <p className="text-blue-900 text-3xl md:text-5xl lg:text-6xl font-bold mb-4">Welcome to S & H SmartStays</p>
        <h1 className="text-sky-400 text-xl md:text-3xl lg:text-4xl mb-4">Find Stays That Feel Like Home</h1>
        <p className="text-black text-lg md:text-xl lg:text-2xl rounded-full mt-20">Luxury without limits - your exclusive getaway starts here.</p>
      
      <form className='bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>

            <div>
                <div className='flex items-center gap-2'>
                   <img src={assets.calenderIcon} alt="" className='h-4'/>                    <label htmlFor="destinationInput">Destination</label>
                </div>
                <input list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
                <datalist id='destinations'>
                    {cities.map((city,index)=>(
                        <option value={city} key={index}/>
                    ))}
                </datalist>
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="" className='h-4' />
                    <label htmlFor="checkIn">Check in</label>
                </div>
                <input id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                     <img src={assets.calenderIcon} alt="" className='h-4' />
                    <label htmlFor="checkOut">Check out</label>
                </div>
                <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="guests">Guests</label>
                <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
            </div>

            <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                 <img src={assets.searchIcon} alt="searchIcon" className='h-7' />
                <span>Search</span>
            </button>
        </form>
      </div>
    </div>
  )
}

export default Hero