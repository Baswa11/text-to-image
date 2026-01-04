import React from 'react'
import { testimonialsData } from '../assets/assets'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'


const Testimonials = () => {
    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className='flex flex-col items-center justify-center my-20 p-6 md:px-28'>
            <h1 className='text-2xl font-medium max-w-lg mb-4'>Customer testimonials</h1>
            <p className='text-gray-600 mb-4'>What Our Users Are Saying</p>
            <div className='flex flex-wrap gap-6'>
                {testimonialsData.map((item, index) => (
                    <div key={index} className='bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all duration-300'>
                        <div className='flex flex-col items-center'>
                            <img className='rounded-full w-14' src={item.image} alt="" />
                            <h2 className='text-xl font-semibold mt-3'>{item.name}</h2>
                            <p>{item.role}</p>
                            <div className='flex mb-4'>
                                {Array(item.stars).fill().map((item, index) => (
                                    <img key={index} src={assets.rating_star} alt="" />
                                ))}
                            </div>
                            <p className='text-center text-sm text-gray-600'>{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export default Testimonials