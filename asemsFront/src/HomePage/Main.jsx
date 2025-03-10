import React from 'react'

function Main() {
  return (
    <div className="row mt-4 ms-lg-6 ms-3">
        <div className="col-lg-6 pt-5 text-center text-lg-start ps-lg-5">
         <h1 className='Maintext1 text-primary'>Academic Staff</h1>
         <h1 className='Maintext1 text-primary'> Evaluation</h1>
         <h1 className='Maintext1 text-secondary'> Management System</h1>
         <p className='Maintext2'>It is the responsibility of the instructor to uplift students. <br/>Lets collaborate to evaluate Academic Staff.</p>
         <button className="btn btn-primary text-white fs-5 ps-5 pe-5 me-5">About</button>
         <button className="btn btn-secondary text-white fs-5 ps-5 pe-5 ms-5">Contact</button>
        </div>
        <div className="col-lg-6 d-none d-lg-block">
            <img src="../public/assessmentPhoto.jpg" className="img-fluid w-100"/>
        </div>
    </div>
  )
}

export default Main