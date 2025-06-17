import React from 'react'
import Welcome from './_components/Welcome'
import CourseList from './_components/CourseList'
import EnrolledCourseList from './_components/EnrolledCourseList'

function Workspace() {
  return (
    <div>
        <Welcome />
        <EnrolledCourseList />
        <CourseList />
    </div>
  )
}

export default Workspace