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
  const courseContent = course?.courseContent ?? [];
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);
  const completedChapters = enrollCourse?.completedChapters ?? [];

  return (
    <div className='bg-gray-100 p-3 rounded-lg shadow-md w-full max-w-xs lg:w-64 overflow-y-auto min-h-screen lg:min-h-full'>
      <Accordion type="single" collapsible>
        {courseContent.map((chapter, index) => (
          <AccordionItem
            key={index}
            value={chapter.courseData?.chapterName}
            onClick={() => setSelectedChapterIndex(index)}
          >
            <AccordionTrigger className='font-medium text-base md:text-lg'>
              <span className='mr-2'>
                {completedChapters.includes(index) ? '✓' : '🔲'}
              </span>
              {chapter.courseData?.chapterName}
            </AccordionTrigger>
            <AccordionContent>
              <div className='flex flex-col gap-1 p-1 rounded-lg'>
                {chapter?.courseData?.topics.map((topic, idx) => (
                  <h2
                    key={idx}
                    className={`text-sm p-1 rounded 
                      ${completedChapters.includes(index) ? 'bg-zinc-200 text-gray-900' : 'bg-white'}`}
                  >
                    {topic?.topic}
                  </h2>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default ChapterSidebar;
