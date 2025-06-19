import React, { useContext } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';

function ChapterSidebar({ courseInfo }) {
    const course = courseInfo?.courses;
    const enrollCourse = courseInfo?.enrollments;
    const courseContent = courseInfo?.courses?.courseContent
    const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);
    let completedChapters = enrollCourse?.completedChapters ?? [];

  return (
    <div className='w-64 bg-gray-100 p-4 rounded-lg shadow-md h-screen'>
      <Accordion type="single" collapsible>
        {courseContent?.map((chapter, index) => (
          <AccordionItem key={index} value={chapter.courseData?.chapterName}
          onClick={() => setSelectedChapterIndex(index)}>
            <AccordionTrigger className='font-medium text-lg'>
                <span>{completedChapters.includes(index) ? '✓' : '🔲'}</span>
                {chapter.courseData?.chapterName}</AccordionTrigger>
            <AccordionContent>
                <div className='flex flex-col gap-2 p-1 rounded-lg shadow-sm'>
                 {chapter?.courseData?.topics.map((topic, idx) => (
                      <h2 key={idx} className={`text-sm p-1 my-1 rounded 
                        ${completedChapters.includes(index) ? 'bg-zinc-200 text-gray-900' : 'bg-white'}`}>{topic?.topic}</h2>
                 ))}
                </div>
    </AccordionContent>
          </AccordionItem>
        ))}

      </Accordion>
    </div>
  )
}

export default ChapterSidebar;