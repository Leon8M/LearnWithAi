import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, PlayIcon, ToyBrick } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'sonner';

function CourseCard({ course }) {
    const courseJson = course?.courseJson?.course;
    const [loading, setLoading] = useState(false);

    const onEnroll = async () => {
      setLoading(true);
      try{
          const result = await axios.post('/api/enroll', {
              courseId: course?.cid
          });
          console.log(result.data);
          if (result.data?.alreadyEnrolled) {
            toast.warning("You are already enrolled in this course.");
            setLoading(false);
            return;
          }
          toast.success("Successfully enrolled in the course!");
      } catch (error) {
          toast.error("Failed to enroll in the course. Please try again.(Server is dumb)");
          console.error(error);
      } finally {
          setLoading(false);
      }
    }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col gap-3">
      <Image
        src={course?.bannerImageUrl}
        alt={course.name} width={300} height={200} className='rounded-t-lg shadow-md w-full h-48 min-w-[250px] object-cover' />
      <div className='flex flex-col gap-2 p-2'>
        <h2 className='text-xl font-semibold'>{courseJson?.name}</h2>
        <p className='text-gray-600 line-clamp-3'>{courseJson?.description}</p>
        <div className='flex items-center justify-between mt-3'>
            <h2 className='text-sm text-gray-500 flex items-center gap-1'><Book />{courseJson?.NoOfChapters} Chapters</h2>
            {course?.courseContent?.length ? <Button size="sm"
            onClick={onEnroll}
            disabled={loading}
            ><PlayIcon /> {loading ? "Loading..." : "Start Learning"}</Button> : <Link href={"/workspace/edit-course/" + course?.cid}><Button size="sm" variant="outline"><ToyBrick /> Generate It !</Button></Link>}
        </div>
      </div>
    </div>
  )
}

export default CourseCard