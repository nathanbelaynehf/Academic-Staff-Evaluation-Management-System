import React , { useState } from 'react'
import RNav from './RNav'
import List from './List'
import EnrollmentModal from './EnrollmentModal';

function Course() {
  const [selectedStudent, setSelectedStudent] = useState([]);  
  return (
    <>
    <RNav/>
    <List setSelectedStudent={setSelectedStudent}/>
    <EnrollmentModal student={selectedStudent}  onClose={() => setSelectedStudent(null)} />
    </>
  )
}

export default Course