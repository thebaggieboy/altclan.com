/* eslint-disable @next/next/no-img-element */
import styles from "../../styles/component2.module.css";
import Link from 'next/link'
import Head from 'next/head'

export default function mainColumn() {
    return (
        <>     
            <Head>
            <title>Altclan -  Welcome to our alternative fashion startup!.</title>
            <meta charset="UTF-8" />
            <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"/>
            <meta
              name="description"
              content="Explore limited edition items, exclusive alternative style & clothing brands "
            />
              <meta name="keywords"
                    content="alternative clothing, alternative fashion,Goth & Alternative Clothing,   fashion community, aesthetics, altclan fashion, altclan community, community of aesthetics, alternative fashion , alte " />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/alteclan_logo.jpg" />
            <meta name="author" content="Altclan"></meta>
          </Head>
           <div  className={styles.cover}>
            <div className={styles.row}>
                <div className={styles.welcomeColumn}>                 
                    <div className={styles.headContainer}>
                        <div className={styles.headingText}>
                            <span className={styles.welcomeHeader}>
                                Welcome to our alternative fashion startup!
                            </span>

                            <p className={styles.welcomeText}>
                                Celebrate alternative style, non-conformity, creativity, and self-expression through our curated collection of sustainable aesthetics, ethical & unethical fashion. 
                                From vintage to goth, punk to bohemian, embrace your unique style with us.
                            </p>
                            <br />
                            <div className={styles.signUpBrandCont}>
                         {/* {    <button className={styles.brandButton}>
                                   <Link href="/signup">Join the community</Link> 
                                </button>} */}
                            </div> <br /> <br />
                         
                        </div>
                    </div>
                </div>

                <div className={styles.welcomeColumn}>
                    <img src="/img/headersweat-compressed.jpg" alt="" className={styles.headImage}/>
                </div>
            </div>
        </div>
        </>
    );
};