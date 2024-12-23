import styles from "../../styles/Home.module.css";
import Link from "next/link";

export default function BrandOfTheWeek() {
  return (
    <>
      <div className={styles.botwSection}>
        <p className={styles.botwP}>
          Sponsored Brands
        </p>

        <div className={styles.botwCont}>
          <div className={styles.boftwColumn}>
            <div className={styles.boftwContainer}>
              <img src="https://images.unsplash.com/photo-1532332248682-206cc786359f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1289&q=80" alt="" />
              <p>
                Baggieboy
              </p>
              <a>
                Shop Baggieboy
              </a>
            </div>
          </div>
          
          <div className={styles.boftwColumn}>
            <div className={styles.boftwContainer}>
              <img src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80g" alt="" />
              <p>lululemon</p>
              <a>
                Shop Lululemon
              </a>
            </div>
          </div>

          <div className={styles.boftwColumn}>
            <div className={styles.boftwContainer}>
              <img src="https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" alt="" />
              <p>pandora</p>
              <a>
                Shop Pandora
              </a>
            </div>
          </div>
        </div>
        
        {/* <h1 className="text-3xl text-center mb-16">BRANDS OF THE WEEK</h1>
        <div className="grid sm:grid-cols-2 gap-8 max-w-[90%] mx-auto">
          <div className={styles.container}>
            <img src="img/jeans.jpg" className="aspect-1 object-cover" />
            <button className={styles.button}>NIKE</button>
          </div>

          <div className={styles.container}>
            <img src="img/jeans.jpg" className="aspect-1 object-cover" />
            <button className={styles.button}>MISKAY</button>
          </div>
        </div>
      </div>

      <div className={styles.centerButton}>
        <button>
          <Link href="/brands">view all brands</Link>
        </button> */}
      </div>
    </>
  );
}
