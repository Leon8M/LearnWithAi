"use client";
import MainHeader from '@/app/workspace/_components/MainHeader'
import React, { useEffect, useState } from 'react'
import ChapterSidebar from '../_components/ChapterSidebar'
import Content from '../_components/Content'
import { useParams } from 'next/navigation'
import axios from 'axios';

function Course() {
    const {courseId} = useParams();
    const [courseInfo, setCourseInfo] = useState({});
    useEffect(() => {
            GetEnrolledCourseById();
        }, []);
        const GetEnrolledCourseById = async () => {
            const result = await axios.get('/api/enroll?courseId=' + courseId);
            console.log(result.data);
            setCourseInfo(result.data);
        }
  return (
    <div>
        <MainHeader hideSide = {true}/>
        <div className='flex gap-4'>
            <ChapterSidebar courseInfo={courseInfo}/>
            <Content courseInfo={courseInfo} refreshData={() => GetEnrolledCourseById()}/>
        </div>
    </div>
  )
}

export default Course