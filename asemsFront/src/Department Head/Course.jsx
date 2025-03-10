import React from 'react'
import DepNav from './DepNav'
import ManageCourse from './ManageCourse';
import AddCourse from './AddCourse';
import AssignInstructor from './AssignInstructor';

function Course() {
  return (
    <>
    <DepNav/>
    <ManageCourse/>
    <AddCourse/>
    <AssignInstructor/>
    </>
  )
}

export default Course;