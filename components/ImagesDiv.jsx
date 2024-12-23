import Image from "next/image";
import styles from "../styles/imagesDiv.module.css";
import heart from '../public/assets/heart.svg'


export default function ImagesDiv() {
  return (
    <>
      <div className={styles.imagesSection}>

        <p className={styles.p}>
          New in: handpicked from the social media’s best brands and boutiques
        </p>

        <button>
          Shop Now
        </button>

         <div className={styles.imagesContent}>
          <div className={styles.col33}>
            <div className={styles.imagesCard}>
              <div className={styles.imagesContainer}>
                <img src="/img/197541_1659072871.webp" alt="" className={styles.img}/>
                <div className={styles.topRight}>
                  <i><Image alt="" src={ heart } /></i>
                </div>
              </div>
              <p className={styles.imagesTitle}>
                Wholesale Naija
              </p>
              <h1>
                Black 20 Blunt Cut Wig
              </h1>
              <p className={styles.imagesPrice}>$129.99</p>
            </div>
          </div>

          <div className={styles.col33}>
            <div className={styles.imagesCard}>
                <div className={styles.imagesContainer}>
                  <img src="/img/mukuko-studio-mU88MlEFcoU-unsplash.jpg" alt="" className={styles.img}/>
                  <div className={styles.topRight}>
                    <i><Image alt="" src={ heart } /></i>
                  </div>
                </div>
                <p className={styles.imagesTitle}>
                  Miskay
                </p>
                <h1>
                  Grey High Neck Sweater
                </h1>
                <p className={styles.imagesPrice}>$39.99</p>
            </div>
          </div>

          <div className={styles.col33}>
            <div className={styles.imagesCard}>
              <div className={styles.imagesContainer}>
                <img src="/img/faith-yarn-Wr0TpKqf26s-unsplash.jpg" alt="" className={styles.img}/>
                <div className={styles.topRight}>
                  <i><Image alt="" src={ heart } /></i>
                </div>
              </div>
              <p className={styles.imagesTitle}>
                ShopMaka
              </p>
              <h1>
                Basic Black Tee
              </h1>
              <p className={styles.imagesPrice}>$10.99</p>
            </div>
          </div>

          <div className={styles.col33}>
            <div className={styles.imagesCard}>
              <div className={styles.imagesContainer}>
                <img src="/img/pexels-luis-quintero-3731256.jpg" alt="" className={styles.img}/>
                <div className={styles.topRight}>
                  <i><Image alt="" src={ heart } /></i>
                </div>
              </div>
              <p className={styles.imagesTitle}>
                Miniso
              </p>
              <h1>
                Black Backpack
              </h1>
              <p className={styles.imagesPrice}>$119.99</p>
            </div>
          </div>
        </div> 
      </div>
    </>
  );
}
