import React from 'react'
import { Link } from 'react-router-dom'

function AdNav() {
  return (
    <nav className="navbar navbar-expand-lg pt-4 pb-4">
      <div className="container-fluid">
        <span
          className="d-flex justify-content-end position-absolute navbar-brand d-none d-lg-inline"
          style={{ top: "30px", right: "55px" }} 
        >
          <a className=" btn btn-danger text-white ps-3 pe-3" href="http://localhost:8082/logout"
          >Logout</a><br />
        </span>
        <span
          className="d-flex justify-content-end position-absolute navbar-brand d-none d-lg-inline"
          style={{ top: "70px", right: "15px" }} 
        >
         <a href="" className="btn text-primary">Change password?</a>

           </span>
        <span
          className="position-absolute navbar-brand d-block d-lg-none"
          style={{ top: "37px", right: "105px" }} 
        >
          <a className=" btn btn-danger text-white ps-3 pe-3"
          href="http://localhost:8082/logout"
          >Logout</a><br />
        </span>
        <span
          className="position-absolute navbar-brand d-block d-lg-none"
          style={{ top: "75px", right: "75px" }} 
        >
       <a href="" className="btn text-primary">Change password?</a>
        </span>
        <a href="#" className="navbar-brand ms-4">
          <img src="../public/Infologo.jpeg" height={60} width={60}/>
        </a>
        <button
          className="navbar-toggler me-4"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse`} id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto pe-5 me-lg-9">
            <li className="nav-item text-center ms-lg-5 pe-lg-6 ms-auto">
              <Link to="/ad" className="nav-link fw-semibold">
                Home&nbsp;&nbsp;&nbsp;
              </Link>
            </li>
            <li className="nav-item text-center pe-lg-6 ms-auto">
              <Link to="/ad/result" className="nav-link fw-semibold">
                Result
              </Link>
            </li>
            <li className="nav-item text-center pe-lg-6 ms-auto">
              <Link to="/ad/evaluate" className="nav-link fw-semibold">
                Evaluate&nbsp;
              </Link>
            </li>
            <li className="nav-item text-center pe-lg-6 ms-auto">
              <Link to="/ad/department" className="nav-link fw-semibold">
                Department&nbsp;
              </Link>
            </li>
            <li className="nav-item text-center pe-lg-5 ms-auto">
              <a href="#contact" className="nav-link fw-semibold">
                Notification&nbsp;
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default AdNav