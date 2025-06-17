import MainHeader from '@/app/workspace/_components/MainHeader'
import React from 'react'
import ChapterSidebar from '../_components/ChapterSidebar'
import Content from '../_components/Content'

function Course() {
  return (
    <div>
        <MainHeader hideSide = {true}/>
        <div className='flex gap-4'>
            <ChapterSidebar />
            <Content />
        </div>
    </div>
  )
}

export default Course