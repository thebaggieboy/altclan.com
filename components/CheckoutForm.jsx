import React, {useState} from 'react'
import Checkout from './Checkout';
import Shipping from './Shipping'
import Payment from './Payment'
import PaymentSuccess from './PaymentSuccess'
export default function CheckoutForm() {

  
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
        <Checkout nextStep={nextStep}/>
        ) 
    case 2:
      return (
        <Shipping nextStep={nextStep}/>
        ) 
    case 3:
      <PaymentSuccess nextStep={nextStep}/>
 


      

  }

}

