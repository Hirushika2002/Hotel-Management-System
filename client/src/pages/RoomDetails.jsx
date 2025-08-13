import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { roomsDummyData, assets, facilityIcons, roomCommonData } from '../assets/assets'
import StarRating from '../components/StarRating'

const RoomDetails = () => {
    const {id} = useParams()
    const [room, setRoom] = useState(null)
    const [mainImage, setMainImage] = useState(null)

    useEffect(()=>{
        const room = roomsDummyData.find(room => room._id === id)
        if (room) {
            setRoom(room)
            setMainImage(room.images[0])
        }
    },[id])
    
    if (!room) {
        return (
            <div className='py-28 px-4 text-center'>
                <h1 className='text-2xl'>Loading...</h1>
            </div>
        )
    }
    
  return (
    <div className='py-28 md:py-32 px-4 md:px-16 lg:px-24 xl:px-32'>
        {/* Room Details */}
        <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
            <h1 className='text-3xl md:text-4xl font-playfair'>
                {room.hotel.name} <span className='font-inter text-sm'>({room.roomType})</span></h1>
            <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
        </div>

        {/*Room rating*/}
        <div className='flex items-center gap-1 mt-2'>
            <StarRating rating={room.rating}/>
            <p className='ml-2'>250+ reviews</p>
        </div>
        {/*Room Address*/}
        <div className='flex items-center gap-1 text-gray-500 mt-2'>
            <img src={assets.locationIcon} alt="location-icon" />
            <span>{room.hotel.address}</span>
        </div>

        {/* Room Images */}
        <div className='flex flex-col lg:flex-row mt-6 gap-6'>
        <div className='lg:w-1/2 w-full'>
        <img src={mainImage} alt="Room Image" className='w-full rounded-xl shadow-lg object-cover' />
        </div>
        <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
            {room?.images.length > 1 && room.images.map((image, index)=>(
                <img onClick={()=> setMainImage(image)}
                key={index} src={image} alt="Room Image"
                className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image && 'outline outline-4 outline-orange-500'}`} />
        ))}
        </div>
        </div>

        {/*Room highlights*/}
        <div className='flex flex-col md:flex-row md:justify-between mt-10'>
            <div className='flex flex-col'>
                <h1 className='text-3xl md:text-4xl font-playfair'>Elevate Every Moment with Distinctive Comfort</h1>
                <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'> 
                    {room.amenities.map((item, index)=> (
                         <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                             <img src={facilityIcons[item]} alt={item} className='w-5 h-5'/>
                            <p className='text-xs'>{item}</p>
                        </div>
                ))}
                </div>
            </div>
            {/*Room Price*/}
            <p className='text-2xl font-medium'>${room.pricePerNight}/night</p>
        </div>

            {/*CheckIn CheckOut Form*/}
            <form className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
                <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
                    
                    <div className='flex flex-col'>
                        <label htmlFor="checkInDate" className='font-medium'>Check-In</label>
                        <input type="date" id="checkInDate" placeholder='Check-In' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required/>
                    </div>

                        

                        <div className='w-px h-16 bg-gray-300/70 md:hidden'></div>

                    <div className='flex flex-col'>
                        <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
                        <input type="date" id="checkOutDate" placeholder='Check-Out' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required/>
                    </div>
                    <div className='w-px h-16 bg-gray-300/70 md:hidden'></div>

                     <div className='flex flex-col'>
                        <label htmlFor="guests" className='font-medium'>Guests</label>
                        <input type="number" id="guests" placeholder='0' className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required/>
                    </div>
                   
                </div>

            <button type='submit' className='bg-black hover:bg-gray-800 active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-8 py-3 md:py-4 text-base cursor-pointer'>
                Check Availability
            </button>    
        </form>
        {/*Common Specifications*/}
        <div className='mt-20 space-y-4'>
            {roomCommonData.map((spec, index)=> (
                <div key={index} className='flex items-start gap-2'>
                    <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6'/>
                    <div>
                        <p className='text-base'>{spec.title}</p>
                        <p className='text-gray-500'>{spec.description}</p>
                    </div>

                </div>
            ))}
        </div>
            <div className='max-w-3xl border-y border-gray-300 my-16 py-10 text-gray-500'>
                <p>Guests will be placed on the ground floor if it's available. The apartment has two bedrooms and gives you a real city vibe. The price shown is for two guests. If you're booking for more people, please select the correct number of guests to see the exact price.</p>
            </div>
            
            {/*Hosted By*/}
            <div className='flex flex-col items-start gap-4'>
                <div className='flex gap-4'>
                <img src={assets.regImage} alt="Host" className='h-14 w-14 md:h-16 md:w-16 rounded-full'/>
                <div>
                    <p className='text-lg md:text-xl'>Hosted by SmartStays Hotel Manager</p>
                    <div className='flex items-center mt-1'> 
                        <StarRating/>
                    <p className='ml-2'>600+ reviews</p>
                    </div>
                </div>
                </div>
                <button className='px-6 py-2.5 mt-4 rounded text-white bg-black hover:bg-gray-800 transition-all cursor-pointer'>Contact Now</button>
            </div>
    </div>
  )
}

export default RoomDetails