import { Button } from '@/components/ui/button';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import axios from 'axios';
import { CheckLineIcon, Videotape, XIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext, useState } from 'react'
import YouTube from 'react-youtube';
import { toast } from 'sonner';

function Content({ courseInfo, refreshData }) {
    const {courseId} = useParams();
    console.log(courseInfo)
    const {course, enrollments} = courseInfo;
    const courseContent = courseInfo?.courses?.courseContent;
    const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);
    console.log(enrollments)
    let completedChapters = enrollments?.completedChapters ?? [];
    const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideos || [];
    const topics = courseContent?.[selectedChapterIndex]?.courseData?.topics || [];
    const [loading, setLoading] = useState(false);

    const markChapterAsCompleted = async () => {
        setLoading(true);
        completedChapters.push(selectedChapterIndex);
        const result = await axios.put('/api/enroll', {
            courseId: courseId,
                completedChapters: JSON.stringify(completedChapters)
            });
            console.log(result);
            refreshData();
            toast.success("Chapter marked as completed!");
            setLoading(false);
        
    }
    const markChapterAsInCompleted = async () => {
            setLoading(true);
            const completedChap = completedChapters.filter((chapterIndex) => chapterIndex !== selectedChapterIndex);
            const result = await axios.put('/api/enroll', {
                courseId: courseId,
                completedChapters: JSON.stringify(completedChap)
            });
            console.log(result);
            refreshData();
            toast.success("Chapter marked as incomplete!");
            setLoading(false);

    }

  return (
    <div className='p-4'>
        <div className='flex items-center justify-between mb-4'>
            <h2 className='text-2xl font-bold'>{
              courseContent?.[selectedChapterIndex]?.courseData?.chapterName || "Select a chapter"
            }</h2>
            {!completedChapters?.includes(selectedChapterIndex) ? (
              <Button onClick={() => markChapterAsCompleted()} disabled={loading} className='animate-pulse'>{loading ? "Marking..." : <><CheckLineIcon /> Mark as Completed</>}</Button>
            ) : <Button variant="outline" onClick={() => markChapterAsInCompleted()} disabled={loading}>{loading ? "Unmarking..." : <><XIcon /> Mark as Incomplete</>}</Button>}
        </div>
        <div>
            {topics?.map((topic, index) => (
                <div key={index} className='mb-4 p-4 border border-gray-200 rounded-lg shadow-sm mt-2'>
                    <h2 className='text-lg font-semibold text-primary'>{index + 1}. {topic?.topic}</h2>
                    {/*<p className='text-sm text-gray-600'>{topic?.content}</p>*/}
                    <div dangerouslySetInnerHTML={{ __html: topic?.content }} 
                    style={{
                        border: '1px solid #e5e7eb',
                        padding: '10px',
                        borderRadius: '8px',
                        backgroundColor: '#f9fafb',
                        marginBottom: '10px',
                        lineHeight: '1.6',
                    }}></div>
                </div>
            ))}
        </div>

        <h2 className='text-xl font-bold mb-2 flex items-center gap-2'>Related Videos <Videotape /></h2>
        <div className='grid grid-cols-1  md:grid-cols-2 gap-4'>
            {videoData.map((video, index) => (
                <div key={index} className='border-b border-gray-200 py-2'>
                    <YouTube videoId={video?.videoId} 
                    opts={{
                        height: '200',
                        width: '380',
                        border: 'white',
                        borderRadius: '8px',
                        playerVars: {
                            // https://developers.google.com/youtube/player_parameters
                            autoplay: 0,
                        },
                    }} />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Content