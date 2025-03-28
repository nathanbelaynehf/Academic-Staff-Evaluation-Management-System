import React from 'react'
import RNav from './RNav'
import RegStudent from './RegStudent'
import RegTeacher from './RegTeacher'

function Register() {
  return (
    <>
   <RNav/>
   <div className="row">
   <h3 class="text-center text-primary fw-bold mb-4 py-3 bg-light border rounded shadow-sm">
      Registration
</h3>
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