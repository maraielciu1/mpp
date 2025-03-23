import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
    return (
        <div className='flex flex-col sm:flex-row border border-gray-400'>
            {/* left side */}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='text-[#414141]'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                        <p className='font-medium text-sm md: text-base'>Bestsellers</p>
                    </div>
                    <h1 className='prata-regular text-4xl md:text-6xl font-bold'>
                        Latest Arrivals
                    </h1>
                    <div className='flex items-center gap-2 mt-5'>
                        <p className='font-semibold'>Shop Now</p>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    </div>
                </div>
            </div>
            {/* right side */}
            <img src={assets.heroimg} alt="hero" className='w-full sm:w-1/2 object-cover' />
        </div>
    )
}

export default Hero
