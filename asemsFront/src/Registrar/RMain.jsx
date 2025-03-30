import React from 'react';
import Studentgraph from './Studentgraph';
import RegData from './RegData';
import Departments from './Departments';

function RMain() {
  return (
    <div className="container-fluid">
      <div className="row ms-lg-6 ms-3 g-3 "> {/* Added g-3 for consistent gutters */}
        {/* Left Column - Student Info */}
        <div className="col-lg-6">
        

            <RegData/>
             <Departments/>
          

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