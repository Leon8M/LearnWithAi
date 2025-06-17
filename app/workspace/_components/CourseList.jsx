"use client";
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import AddCourseDialog from './AddCourseDialog';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import CourseCard from './CourseCard';

function CourseList() {
    const [courseList, setCourseList] = useState([])
    const {user} = useUser();

    useEffect(() => {
        user && GetCourseList();
    }, [user]);

    const GetCourseList = async () => {
        const response = await axios.get('/api/courses');
        console.log("Course List:", response.data);
        setCourseList(response.data);
    }

  return (
    <div className='p-5 bg-white rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-4'>Your Courses</h2>
        <div>
            {courseList.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
                    {courseList.map((course, index) => (
                        <CourseCard key={index} course={course} />
                    ))}
                </div>
            ) : (
                <div>
                    <p className='text-gray-500 my-2 text-lg'>No courses available.</p>
                    <AddCourseDialog><Button>Create your first Course</Button></AddCourseDialog>
                </div>
            )}
        </div>
    </div>
  )
}

export default CourseList