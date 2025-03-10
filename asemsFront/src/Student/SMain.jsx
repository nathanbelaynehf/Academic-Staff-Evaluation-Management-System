import React from 'react'
import AverageEvaluation from './AverageEvaluation'

function SMain() {
  return (
    <div className="row ms-lg-6 ms-3">
        <div className="col-lg-6 pt-5 text-center text-lg-start">
        <div class="row">
                     <div class="studpic col-lg-4 col-4 col-sm-3">
                    <img src="../public/mami.jpg" class="pic2 marp mt-5 rounded-circle" width="90%" alt=""/>
                     </div>
                  <div class="studdata col-lg-6 col-sm-5 col-6 mt-4">
                    <div class="card-text mt-3 ms-3">
                        <div class="row bg-light p-3 rounded">
                            <p class="text-primary col-5">First Name:</p> <p class="col-7">Nathan</p>
                            <p class="text-primary col-5">Last Name:</p> <p class="col-7">Belayneh</p>
                            <p class="text-primary col-5">UserName:</p> <p class="col-7">HCHS1234</p>
                            <p class="text-primary col-5">Department:</p> <p class="col-7">Male</p>
                            <p class="text-primary col-5">Year:</p> <p class="col-7">3</p>
                        </div></div>
                </div>
               
            </div>
        </div>
        <div className="col-lg-6 pt-6">
        <AverageEvaluation score={20} />
        </div>
    </div>
  )
}
export default SMain