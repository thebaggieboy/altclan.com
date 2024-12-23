import React from 'react'
import styles from "./../styles/contact.module.css";

export default function contact() { 

  return (
    <div className={styles.contactSection}>
    <div>
        <div className={styles.column}>
            <img src="img/3d-business-girl-talking-online.png" alt="" className={styles.center}/>
        </div>

        <div className={styles.column}>

            <h1 className={styles.mainhead}>
                Have questions? Shoot us an email.
            </h1>

            <p className={styles.text}>
                Feel free to reach out to us with any inquiries, suggestions, or collaboration proposals. Our team is here to assist you and cultivate a vibrant community of alternative fashion enthusiasts. We look forward to hearing from you!
            </p>
        </div>
    </div>

    <div className=''>
        <div className={styles.column}>
            <h1 className={styles.head}>
                How can we help?
            </h1>

            Need assistance navigating our platform, have feedback to share, or seeking style advice? Our dedicated support team is ready to assist you every step of the way. Don't hesitate to reach out—we're here to ensure your AltClan experience is seamless and enjoyable.
        </div>
        
        <div className={styles.column}>
            <div className={styles.form}>
                <form>
                    <fieldset>  
                        <select id="field" name="field" className={styles.select}>
                            <option value="name">Purpose of contact</option>
                            <option value="creative">
                                I'm a creative
                            </option>
                            <option value="customer">
                                I'm a customer
                            </option>

                            <option value="seller">
                                I want to sell on Altclan
                            </option>

                            <option value="invest">
                                I want to invest
                            </option>

                            <option value="error">
                                Shipping error
                            </option>

                            <option value="else">
                                Something else
                            </option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="name">Your Name</label>
                        <br/>
                        <input type="text" id="name" className={styles.input}/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="mail">Your Email</label>
                        <input type="text" id="mail" className={styles.input}/>
                    </fieldset>

                    <fieldset>
                        <label htmlFor="message">Your Message</label>
                        <br/>
                        <input type="text" id="name" className={styles.textarea}/>
                    </fieldset>

                    <button className={styles.submit}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
    </div> 
  )
}