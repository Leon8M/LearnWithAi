"use client";
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EnrolledCard from './EnrolledCard';

function EnrolledCourseList() {

    const [enrolledCourses, setEnrolledCourses] = useState([]);
    // Fetch enrolled courses when the component mounts
    useEffect(() => {
        GetEnrolledCourse();
    }, []);

    // Function to fetch enrolled courses
    const GetEnrolledCourse = async () => {
        const result = await axios.get('/api/enroll');
        console.log(result.data);
        setEnrolledCourses(result.data);
    }
  return enrolledCourses?.length > 0 && (
    <div>
        <h2 className='text-xl font-semibold mt-4'>Enrolled Courses</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
            {enrolledCourses.length > 0 ? enrolledCourses.map((course, index) => (
                <EnrolledCard course={course?.courses} key={index} enrollCourse={course?.enrollments} />
            )) : (
                [1, 2, 3, 4, 5].map((_, index) => (
                    <Skeleton className='w-full h-40' key={index} />
                ))
            )}
        </div>
    </div>
  )
}

export default EnrolledCourseList