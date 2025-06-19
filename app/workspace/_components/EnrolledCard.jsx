import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import axios from 'axios';
import { Book, PlayIcon, ToyBrick } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'sonner';

function EnrolledCard({ course, enrollCourse }) {
    const courseJson = course?.courseJson?.course;
    const calcProgress = () => {
        return (((enrollCourse?.completedChapters?.length ?? 0) / course.courseContent?.length) * 100).toFixed(1);
    }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col gap-3">
      <Image
        src={course?.bannerImageUrl}
        alt={course?.name} width={300} height={200} className='rounded-t-lg shadow-md w-full h-48 min-w-[250px] object-cover' />
      <div className='flex flex-col gap-2 p-2'>
        <h2 className='text-xl font-semibold'>{courseJson?.name}</h2>
        <p className='text-gray-600 line-clamp-3'>{courseJson?.description}</p>
        <div className=''>
            <h2 className='flex justify-between text-gray-600 text-sm'>Progress: <span>{calcProgress()}%</span></h2>
            <Progress value={calcProgress()}/>
            <Link href={"/workspace/view-course/" + course?.cid}>
            <Button className="mt-2">Continue ...</Button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default EnrolledCard;
