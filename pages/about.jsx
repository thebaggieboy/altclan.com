import React from 'react'
import styles from "../styles/Home.module.css";
import CountUp from "../src/aboutcounter/brand.jsx" 
import Head from "next/head"
import { OurGrowth } from '../components/OurGrowth.jsx';
import Altcoin from '../components/Altcoin.jsx';
import Token from '../components/Token.jsx';

export default function about() {
  return (
    <>
      <Head>
       <title>Altclan - About us</title>
            <meta charset="UTF-8" />
            <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"/>
            <meta
              name="description"
              content="About us | Learn more"
            />
              <meta name="keywords"
                    content="altclan, about us altclan, altclan about, about altclan, altclan about us" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/alteclan_logo.jpg" />
       </Head> 
    <div>
  
      <div className={styles.padding}>
        <h1>
          About us
        </h1>

        <p style={{fontSize:12}}>
        At AltClan, we're all about celebrating uniqueness and self-expression. Join our vibrant community of like-minded individuals who dare to be different. Explore curated collections, personalize your look, and connect with fellow trendsetters who share your passion for alternative style. Welcome to AltClan, where individuality reigns supreme! 🖤✨
        </p> <br/>
      </div>

      <div className={styles.section}>
        <h1>
          Fast facts
        </h1>

        <br/>

        <div className={styles.row}>

          <div className={styles.col33}>
            <div className={styles.aboutCards}>
              <h3>
                <CountUp end={50} start={0}/>
              </h3>

              <p>
                brands nationwide
              </p>
              <p className={styles.bottom}>
                as of March 20, 2023
              </p>
            </div>
          </div>

          <div className={styles.col33}>
            <div className={styles.aboutCards}>
              <h3>
                <CountUp end={2000} start={0}/>
              </h3>

              <p>
                users nationwide
              </p>
              <p className={styles.bottom}>
                as of March 20, 2023
              </p>
            </div>
          </div>

          <div className={styles.col33}>
            <div className={styles.aboutCards}>
              <h3>
                <CountUp end={25} start={0}/>
              </h3>
              <p>
                states across the country
              </p>
              <p className={styles.bottom}>
                as of March 20, 2023
              </p>
            </div>
          </div>
        </div>
      </div>
      <OurGrowth/>


      <div className={styles.padding}>
        <h1>
          Why use?
        </h1>

    

        <div className={styles.contentContainer}>
          <div className={styles.colContainer}>
            <div className={styles.columnTwo}>
                <img src="/img/pexels-leticia-ribeiro-2112651.jpg"/>
            </div>
            <div className={styles.columnOne}>
              <p className={styles.xlFont}>
                First
              </p>
              <p style={{fontSize:12}}>
              AltClan offers users the opportunity to discover unique styles and trends that aren't typically found in mainstream fashion.
              
              </p>
            </div>
          </div>
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.colContainer}>
            <div className={styles.columnOne}>
              <p  className={styles.xlFont}>
                Second
              </p>
              <p style={{fontSize:12}}>
              For users seeking a sense of community and belonging, AltClan fosters connections with fellow enthusiasts of alternative style. 
              </p>
            </div>
            <div className={styles.columnTwo}>
                <img src="/img/vivek-sharma.jpg"/>
            </div>
          </div>
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.colContainer}>
            <div className={styles.columnTwo}>
                <img src="/img/natalie-hua.jpg"/>
            </div>
            <div className={styles.columnOne}>
              <p  className={styles.xlFont}>
                Third
              </p>
              <p style={{fontSize:12}}>
              Our focus on building a vibrant community sets us apart from competitors, fostering brand loyalty and advocacy among our customer base.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.colContainer}>
            <div className={styles.columnOne}>
              <p className={styles.xlFont}>
                Fourth
              </p>
              <p style={{fontSize:12}}> 
              Unlike traditional fashion retailers, we offer a curated selection of alternative styles that are hard to find elsewhere, giving us a competitive edge in the market.
              </p>
            </div>
            <div className={styles.columnTwo}>
                <img src="/img/dami-adebayo-brands.jpg"/>
            </div>
          </div>
        </div>
        
        <div className={styles.contentContainer}>
          <div className={styles.colContainer}>
            <div className={styles.columnTwo}>
                <img src="/img/natalie-hua.jpg"/>
            </div>
            <div className={styles.columnOne}>
              <p  className={styles.xlFont}>
                Fifth
              </p>
              <p style={{fontSize:12}}>
              With AltClan, users gain access to exclusive collections, limited editions, and collaborations with emerging designers and underground labels.  
              </p>
            </div>
          </div>
        </div>
        
      
        {/* <p style={{fontSize:14}}>
        Altclan is poised to disrupt the alternative fashion industry by offering a fresh, community-driven approach to style and self-expression. With our unique vision, curated collections, and commitment to sustainability, we're ready to lead the charge towards a more inclusive and diverse fashion landscape. Join us on this journey and embrace your individuality with Altclan.
        </p> */}

      </div> 
      <Token/>
      <Altcoin/> 
      <div className={styles.section}>
        <p className={styles.p}>
          More To Explore
        </p>

        <br/>

        <div className={styles.row}>

          <div className={styles.col33}>
            <div className={styles.team}>
              <img src="/img/baggy.webp"/>
              <p>
                BRANDS
              </p>
              
            </div>
          </div>

          <div className={styles.col33}>
            <div className={styles.team}>
              <img src="/img/no-revisions.jpg"/>
              <p>
                SHOP
              </p>

            </div>
          </div>

          <div className={styles.col33}>
            <div className={styles.team}>
              <img src="/img/pexels-cottonbro-studio-4937224.jpg"/>
              <p>
                COLLECTIONS
              </p>
              
            </div>
          </div>
        </div>
      </div>
      
    </div>
    </>
  )
}
