import React from 'react'
import UptimeChart from './UptimeChart';
import SystemMonitor from './SystemMonitor';

function AdmMain() {
  return (
    <div className="row ms-lg-6 ms-3">
        <div className="col-lg-6">
        <div className="row text-center text-lg-start align-items-center">
            {/* Student Picture */}
            <div className="ms-4 col-lg-2 me-5 col-md-4 col-sm-4 col-6">
              <img
                src="../public/images.jpeg"
                className="img-fluid rounded-circle shadow"
                alt="Student"
                style={{ 
                  maxWidth: "140px", 
                  border: "3px solid #e9ecef",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
              />
            </div>

            {/* Student Data */}
            <div className="col-lg-6 col-md-8 col-sm-8 col-12 mt-4 mb-4">
              <div className="card bg-light p-3 rounded shadow-sm" style={{
                background: "linear-gradient(to right, #f8f9fa, #ffffff)"
              }}>
                <div className="row">
                  <div className="col-6 col-sm-6">
                    <p className="text-primary mb-2">
                      <i className="bi bi-person-fill me-2"></i>
                      First Name:
                    </p>
                    <p className="text-primary mb-2">
                      <i className="bi bi-person-badge-fill me-2"></i>
                      Last Name:
                    </p>
                    <p className="text-primary mb-2">
                      <i className="bi bi-person-circle me-2"></i>
                      Username:
                    </p>
                    <p className="text-primary mb-2">
                      <i className="bi bi-gender-ambiguous me-2"></i>
                      Gender:
                    </p>
                  </div>
                  <div className="col-6 col-sm-4">
                    <p className="mb-2 fw-medium text-secondary">Kebebush</p>
                    <p className="mb-2 fw-medium text-secondary">G/Michael</p>
                    <p className="mb-2 fw-medium text-secondary">HCHS1234</p>
                    <p className="mb-2 fw-medium text-secondary">Female</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
          <SystemMonitor  />
          </div>
        </div>
        <div className="col-lg-6 pt-3">
        <UptimeChart/>
        </div>
    </div>
  )
}
export default AdmMain;