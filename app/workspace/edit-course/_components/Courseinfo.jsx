import { Button } from '@/components/ui/button';
import {toast} from "sonner";
import axios from 'axios';
import { Book, Clock, PlayIcon, TrendingUp } from 'lucide-react';
import Image from 'next/image';import { useRouter } from 'next/navigation';
;
import React, { useState } from 'react'
import Link from 'next/link';

function Courseinfo({ course, viewCourse }) {
    const courseLayout = course?.courseJson?.course;
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Function to generate course content
    const GenerateContent = async() => {
        // Logic to generate content based on course structure
        setLoading(true);
        try {
            const result = await axios.post('/api/generate-course', {
                course: courseLayout,
                courseName: course?.name,
                courseId: course?.cid
            });
            console.log("Generated content:", result.data);
            setLoading(false);
            router.replace(`/workspace`);
            toast.success("Content generated successfully! You go Bud :)");
        } catch (error) {
            console.error("Error generating content:", error);
            setLoading(false);
            toast.error("Server is acting up Bud :( , Try again !")
        }
    }   

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
            {!viewCourse ? <Button onClick={GenerateContent} disabled={loading}>
                {loading ? "Generating..." : "Generate Content"}
            </Button> : <Link href={'/course/' + course?.cid}><Button><PlayIcon /> Continue ...</Button></Link>}
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