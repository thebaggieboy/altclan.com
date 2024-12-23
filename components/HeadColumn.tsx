import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function HeadColumn() {
  return (
      <div>
        <div className={styles.headSection}>
            <div className={styles.columnOne}>
                <div className={styles.headContainer}>
                    <div className={styles.headText}>
                        <h1>
                            Welcome to our alternative fashion startup!
                        </h1>

                        <p className="lead" style={{fontSize:14}} >
                            Celebrate non-conformity,
                            creativity, and self-expression through our curated collection of
                            sustainable and ethical fashion. From vintage to goth, punk to
                            bohemian, embrace your unique style with us.
                        </p>
                        
                     
                            <button className={styles.headButton}>
                            <Link href="/brands/signup"> Signup as a brand  </Link>
                            </button>
                 
                        
                    </div>
                </div>
            </div>

            <div className={styles.columnOne}>
                <h1>
                    <img alt="" src="img/mukuko-studio-mU88MlEFcoU-unsplash.jpg " className={styles.headerimage}/>
                </h1>
            </div>
        </div>
    </div>
  );
}