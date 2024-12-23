import React, {useState} from 'react'
import BrandBioForm from './BrandBioForm'
import BrandProfileInfoForm from './BrandProfileInfoForm'

export default function BrandSignupForm() {

  const [step, setStep] = useState(1);

  const nextStep = ()=>{
    setStep(step + 1)
  }

  const prevStep = ()=>{
    setStep(step - 1)
  }

  const handleChange = ()=>{

  }

  switch (step) {
    case 1:
      return (
        <BrandBioForm nextStep={nextStep}/>
        ) 
    case 2:
      return (
        <BrandProfileInfoForm nextStep={nextStep}/>
        ) 
       
   
     
  }

}

