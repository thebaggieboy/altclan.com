import styles from ".//Saved.module.css";

const pieces = [
    {
      id: 1,
      href: "#",
      name: "Skims",
      price: "₦13,500",
      details: "Long Sleeve Stretch Shirt",
      imageSrc: "https://cdn.shopify.com/s/files/1/0259/5448/4284/products/SKIMS-LOUNGEWEAR-AP-TSH-0647-BON-FL.jpg?v=1692323626&width=600&height=600",
    },
  
    {
      id: 2,
      href: "#",
      name: "Good American",
      price: "₦19,000",
      details: "Dark Blue Straight Leg Jeans.",
      imageSrc: "https://cdn.shopify.com/s/files/1/1381/0415/products/GL941T-B655-A-1.jpg?v=1604111784&width=1200&height=1800&crop=center",
    }
];

  
const Saved = () => {
    return(
        <>
            <div className={styles.savedCont}>
                {pieces.map((items) => (
                    <a key={items.id} href={items.href}>
                        <div className={styles.savedCard}>
                            <div className={styles.row}>
                                <div className={styles.columnleft}>
                                    <img src={items.imageSrc} />
                                </div>

                                <div className={styles.columnright}>

                                    <div className={styles.items}>
                                        <h1 className={styles.itemsName}>
                                            {items.name}
                                        </h1>

                                        <p className={styles.itemsDetails}>
                                            {items.details}
                                        </p>

                                        <p className={styles.itemsPrice}>
                                            {items.price}
                                        </p>

                                        <div className={styles.buttonsSpace}>
                                            <div className={styles.bottomButtons}>
                                                <a>
                                                    Remove
                                                </a>
                                                <div className={styles.bottomButtonsRight}>
                                                    <a className={styles.buy}>
                                                        Buy now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>               
                ))}
            </div>
        </>
    );
};

export default Saved;