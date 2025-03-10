import React, { useState } from 'react'
import AdNav from './AdNav'
import EvalTeachers from './EvalTeachers'
import NoCritEval from './NoCritEval'

function Teachers() {

   const [selectedTeacher, setSelectedTeacher] = useState("");
  return (
   <>
<AdNav/>
<EvalTeachers setSelectedTeacher={setSelectedTeacher}/>
<NoCritEval selectedTeacher={selectedTeacher}/>
   </>
  )
}

export default Teachers