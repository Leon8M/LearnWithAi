import { Button } from '@/components/ui/button';
import { Book, Clock, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

function Courseinfo({ course }) {
    const courseLayout = course?.courseJson?.course;
  return (
    <div className=' flex-row-reverse md:flex gap-4 p-6 bg-gray-50 rounded-lg shadow-lg justify-between'>
        <div className='flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md'>
            <h2 className='font-bold text-2xl'>{courseLayout?.name}</h2>
            <p className='text-gray-500 line-clamp-3'>{courseLayout?.description}</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
                <div className='flex items-center gap-4 p-2 bg-gray-100 rounded-lg'>
                    <Clock className='text-gray-500' />
                    <section>
                        <h3 className='font-bold'>Duration</h3>
                        <p>2 Hours</p>
                    </section>
                </div>
                <div className='flex items-center gap-4 p-2 bg-gray-100 rounded-lg'>
                    <Book className='text-gray-500' />
                    <section>
                        <h3 className='font-bold'>Chapters</h3>
                        <p>2 Chapters</p>
                    </section>
                </div>
                <div className='flex items-center gap-4 p-2 bg-gray-100 rounded-lg'>
                    <TrendingUp className='text-gray-500' />
                    <section>
                        <h3 className='font-bold'>Difficulty</h3>
                        <p>{courseLayout?.difficulty}</p>
                    </section>
                </div>
            </div>
            <Button>Generate Content</Button>
        </div>
        {course?.bannerImageUrl && (
        <Image
            src={course?.bannerImageUrl}
            alt={course?.name || "Course banner"}
            width={800}
            height={240}
            className='rounded-lg w-full h-[240px] object-cover'
        />
)}
    </div>
  )
}

export default Courseinfo