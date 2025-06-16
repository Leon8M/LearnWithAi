"use client";
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Courseinfo from '../_components/Courseinfo';

function EditCourse() {
    const {courseId} = useParams();
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState(null);

    console.log("Editing course with ID:", courseId);

    useEffect(() => {
        GetCourse();
    }, [])

    const GetCourse = async () => {
        setLoading(true);
        const response = await axios.get('/api/courses?courseId=' + courseId);
        console.log("Course details:", response.data);
        setLoading(false);
        setCourse(response.data);
    }
  return (
    <div>
        <Courseinfo />
    </div>
  )
}

export default EditCourse