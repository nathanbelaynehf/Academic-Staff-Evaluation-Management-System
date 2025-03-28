import React from 'react';
import Studentgraph from './Studentgraph';
import RegData from './RegData';

function RMain() {
  return (
    <div className="container-fluid">
      <div className="row ms-lg-6 ms-3 g-3 "> {/* Added g-3 for consistent gutters */}
        {/* Left Column - Student Info */}
        <div className="col-lg-6">
        

            <RegData/>

          {/* Enhanced Department Cards */}
          <div className="row mt-4">
            

          <div className="col-11 mb-3">
              <div className="card shadow-sm border-0" style={{
                background: "linear-gradient(to right, #f8f9fa, #ffffff)",
                borderRadius: "12px"
              }}>
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0 fw-bold text-secondary">Mechanical Engineering</h6>
                      <small className="text-muted">Number of Students</small>
                    </div>
                    <span className="fs-2 fw-bold text-primary">100</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-11 mb-3">
              <div className="card shadow-sm border-0" style={{
                background: "linear-gradient(to right, #f8f9fa, #ffffff)",
                borderRadius: "12px"
              }}>
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0 fw-bold text-secondary">Mechanical Engineering</h6>
                      <small className="text-muted">Number of Students</small>
                    </div>
                    <span className="fs-2 fw-bold text-primary">100</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-11 mb-3">
              <div className="card shadow-sm border-0" style={{
                background: "linear-gradient(to right, #f8f9fa, #ffffff)",
                borderRadius: "12px"
              }}>
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0 fw-bold text-secondary">Mechanical Engineering</h6>
                      <small className="text-muted">Number of Students</small>
                    </div>
                    <span className="fs-2 fw-bold text-primary">100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Student Graph */}
        <div className="col-lg-6 mt-5 mb-3">
      
              <Studentgraph />
            
        </div>
      </div>
    </div>
  );
}

export default RMain;