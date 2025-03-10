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