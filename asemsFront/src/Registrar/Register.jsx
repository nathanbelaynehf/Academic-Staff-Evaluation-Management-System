import React from 'react'
import RNav from './RNav'
import RegStudent from './RegStudent'
import RegTeacher from './RegTeacher'

function Register() {
  return (
    <>
   <RNav/>
   <div className="row">
    <div className="col-lg-6 col-12">
   <RegStudent/>
   </div>
   <div className="col-lg-6 col-12">
   <RegTeacher/>
   </div>
   </div>
   </>
  )
}

export default Register