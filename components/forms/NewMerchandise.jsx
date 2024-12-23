import React, {use, useState} from 'react';
import styles from '../../styles/new_brand.module.css';
import BrandProfileInfoForm from './BrandProfileInfoForm';
import Link from 'next/link';
const BrandBioForm = (props) => {
    const [merchandiseName, setMerchandiseName] = useState('');
    const [merhandiseSize, setMerchandiseSize] = useState('');
    const [labels, setLabels] = useState('');
    const [deliveryCost, setdeliveryCost] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [displayImage, setdisplayImage] = useState('');
    
    const [step, setStep] = useState(1);

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
        <div className={styles.columnImage}>
            <img src="/alteclan_logo.jpg" alt="" className={styles.img}/>
        </div>

        <div className={styles.columnText}>
            <form className={styles.form}>
            
                <h1 className={styles.greeting}>About Your Brand</h1>
                <p className={styles.login}>Fill in some of your brand details</p>

                <div>
                <label for="email" className="block mb-2 ml-12 text-sm font-medium text-black">Merchandise Name</label> 
                    <input type="text" onChange={e => setMerchandiseName(e.target.value)} name="brand-name" id="brand-name" className={styles.input} placeholder="" required/>
                    
                </div>
                <div>
                <label for="brand_bio" className="block mb-2 ml-12 text-sm font-medium text-black">Merchandise Size</label> 
                    <textarea type="text" onChange={e => setMerchandiseSize(e.target.value)} name="bio" id="bio" placeholder="" className={styles.input} required></textarea>
                </div>
                <div>
                <label for="brand_bio" className="block mb-2 ml-12 text-sm font-medium text-black">Label</label> 
                    <textarea type="text" onChange={e => setLabels(e.target.value)} name="bio" id="bio" placeholder="" className={styles.input} required></textarea>
                </div>
                <div>
                <label for="brand_bio" className="block mb-2 ml-12 text-sm font-medium text-black">Delivery Cost</label> 
                    <textarea type="text" onChange={e => setdeliveryCost(e.target.value)} name="bio" id="bio" placeholder="" className={styles.input} required></textarea>
                </div>
                <div>
                <label for="brand_bio" className="block mb-2 ml-12 text-sm font-medium text-black">Category</label> 
                    <textarea type="text" onChange={e => setCategory(e.target.value)} name="bio" id="bio" placeholder="" className={styles.input} required></textarea>
                </div>
                <div>
                <label for="brand_bio" className="block mb-2 ml-12 text-sm font-medium text-black">Price</label> 
                    <textarea type="text" onChange={e => setPrice(e.target.value)} name="bio" id="bio" placeholder="" className={styles.input} required></textarea>
                </div>

                <div>
                <label for="email" className="block mb-2 ml-12 text-sm font-medium text-black">Display Image</label> 
                    <input type="file" onChange={e => setdisplayImage(e.target.value)} name="logo" id="logo" placeholder="" className={styles.input} required/>
                </div>
    
             

                <button type='submit'  className={styles.submit}>
                    Add new merch
                </button>
   
              </form>
        </div>
        </div>
    </div>
        </div>
    );
}

export default BrandBioForm;
