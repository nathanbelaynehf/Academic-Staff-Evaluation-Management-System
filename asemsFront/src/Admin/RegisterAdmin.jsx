import React from 'react'
import AdmNav from './AdmNav'
import RegDH from './RegDH'
import RegistrarRegistration from './RegistrarRegistration'
import RegAD from './RegAD'

function RegisterAdmin() {
  return (
   <>
   <AdmNav/>
   <div className="row">
   <h3 class="text-center text-primary fw-bold mb-4 py-3 bg-light border rounded shadow-sm">
      Account Creation
</h3>
    <div className="col-12 col-lg-6">
        <RegDH/>
    </div>
    <div className="col-12 col-lg-6">
        <RegistrarRegistration/>
    </div>
    <div className="col-12 col-lg-6">
        <RegAD/>
    </div>
   </div>
   </>
  )
}

export default RegisterAdmin