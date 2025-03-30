import React from 'react'
import UptimeChart from './UptimeChart';
import SystemMonitor from './SystemMonitor';
import AdminData from './AdminData';

function AdmMain() {
  return (
    <div className="row ms-lg-6 ms-3">
        <div className="col-lg-6">
          <AdminData/>
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