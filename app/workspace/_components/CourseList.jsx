"use client";
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import AddCourseDialog from './AddCourseDialog';

function CourseList() {
    const [courseList, setCourseList] = useState([])
  return (
    <div className='p-5 bg-white rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-4'>Your Courses</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {courseList.length > 0 ? (
            courseList.map((course) => (
                <div key={course.id} className='p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow'>
                <h3 className='text-xl font-semibold'>{course.title}</h3>
                <p className='mt-2 text-gray-600'>{course.description}</p>
                </div>
            ))
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