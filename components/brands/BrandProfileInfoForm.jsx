import React, {use, useState} from 'react';
import styles from '../../styles/brand-profile.module.css';
import BrandProfileInfoForm from './BrandProfileInfoForm';
import Link from 'next/link';
const BrandProfileInfo = (props) => {
    const [mobileNumber, setmobileNumber] = useState('');
    const [city, setCity] = useState('');
    const [brandState, setBrandState] = useState('');
    const [billingAddress, setbillingAddress] = useState('');
    const [zip, setZip] = useState('');
    
    const [step, setStep] = useState(2);

    const nextStep = ()=>{
      setStep(step + 1)
    }
  
    const prevStep = ()=>{
      setStep(step - 1)
    }
  
    const handleChange = ()=>{
  
    }

    const submit =()=>{
        console.log("Brand Bio Form Submit clicked")
    }



    return (
        <div>
             <div className="">
        <div className={styles.loginContainer}>
     
        <div className={styles.columnText}>
            <form className={styles.form}>
            
                <h1 className={styles.greeting}>Brand Contact Information</h1>
                <p className={styles.login}>Fill in some of tyour brand details</p>

                <div>
                <label for="email" className={styles.label}>Mobile Number</label> 
                    <input type="text" onChange={e => setmobileNumber(e.target.value)} name="mobile_no" id="mobile_no" className={styles.input} placeholder="" required/>
                    
                </div>
                <div>
                <label for="email" className={styles.label}>Address</label> 
                    <input type="text" onChange={e => setbillingAddress(e.target.value)} name="billing_address" id="billing_address" placeholder="" className={styles.input} required/>
                </div>
                <div>
                <label for="email" className={styles.label}>City</label> 
                    <input type="email" onChange={e => setCity(e.target.value)} name="city" id="city" placeholder="" className={styles.input} required/>
                </div>
                <div>
                <label for="email" className={styles.label}>State</label> 
                    <input type="email" onChange={e => setBrandState(e.target.value)} name="state" id="state" placeholder="" className={styles.input} required/>
                </div>
                <div>
                <label for="email" className={styles.label}>Zip</label> 
                    <input type="email" onChange={e => setZip(e.target.value)} name="zip" id="zip" placeholder="" className={styles.input} required/>
                </div>
                <div>

                </div>

                <button type='submit'  className={styles.submit}>
                    <button onClick={props.nextStep}>Continue</button>
                </button>
   
              </form>
        </div>
        </div>
    </div>
        </div>
    );
}

export default BrandProfileInfo;
