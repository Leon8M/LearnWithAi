"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import { ScanSearch, SearchCheck, SearchCode, SearchX } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard';
import { Skeleton } from '@/components/ui/skeleton';

function Explore() {
    const [courseList, setCourseList] = useState([])
    const {user} = useUser();

    useEffect(() => {
        user && GetCourseList();
    }, [user]);

    const GetCourseList = async () => {
        const response = await axios.get('/api/courses?courseId=all');
        console.log("Course List:", response.data);
        setCourseList(response.data);
    }
  return (
    <div>
        <h2 className='text-2xl font-bold mb-4'>Explore Other Courses</h2>
        <div className='flex items-center gap-2 mb-4 max-w-md'>
            <Input placeholder='Search for courses...' />
            <Button> <SearchCode /> Search</Button>
        </div>
       
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
                    {courseList.length > 0 ?courseList.map((course, index) => (
                        <CourseCard key={index} course={course} />
                    )):
                    [1, 2, 3, 4, 5].map((_, index) => (
                        <Skeleton className='w-full h-40' key={index} />
                    ))}
                </div>

    </div>
  )
}

export default Explore