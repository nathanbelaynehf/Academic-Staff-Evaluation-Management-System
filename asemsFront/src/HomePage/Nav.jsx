import React from 'react'

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg pt-4 pb-4">
      <div className="container-fluid">
        <span
          className="position-absolute navbar-brand d-none d-lg-inline"
          style={{ top: "30px", right: "55px" }} 
        >
          <button className=" btn btn-primary text-white ps-3 pe-3" data-bs-toggle="modal"
          data-bs-target="#login"
          >Login</button>
        </span>
        <span
          className="position-absolute navbar-brand d-block d-lg-none"
          style={{ top: "37px", right: "105px" }} 
        >
          <button className=" btn btn-primary text-white ps-3 pe-3"
          data-bs-toggle="modal"
          data-bs-target="#login"
          >Login</button>
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
              <a href="#home" className="nav-link fw-semibold">
                Home&nbsp;&nbsp;
              </a>
            </li>
            <li className="nav-item text-center pe-lg-6 ms-auto">
              <a href="#about" className="nav-link fw-semibold">
                About&nbsp;&nbsp;
              </a>
            </li>
            <li className="nav-item text-center pe-lg-6 ms-auto">
              <a href="#service" className="nav-link fw-semibold">
                Services
              </a>
            </li>
            <li className="nav-item text-center pe-lg-5 ms-auto">
              <a href="#contact" className="nav-link fw-semibold">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav