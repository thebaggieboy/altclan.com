import styles from ".//Followed.module.css";

const products = [
    {
      id: 1,
      name: "HouseOfCB",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs5mi7U1gOfQoslhYcUmKkKDea1oxnooXsTGcmkIqKf74vRSwbfTjC1kyeAj5jTS4pBwI&usqp=CAU",
      count:
        "12K",
    },
  
    {
      id: 2,
      name: "Ashluxe",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMxIytx2wNGzpnI7xuYXy2_OdhPXXIUnhM_3RwjnPy-w&s",
      count:
        "9.5K",
    },
];

const Followed = () => {
    return(
        <>
            <div className={styles.followedCont}>

                <div className={styles.row}>
                    {products.map((follower) => (
                        <div className={styles.column} key={follower.id}>
                            <div className={styles.followedCard}>
                                <img src={follower.imageSrc} alt="" />
                            
                                <div className={styles.brandName}>
                                    <h1>
                                        {follower.name}
                                    </h1>

                                    <p>
                                        {follower.count} followers
                                    </p>
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C2.23858 0 0 2.23858 0 5V25C0 27.7615 2.23858 30 5 30H25C27.7615 30 30 27.7615 30 25V5C30 2.23858 27.7615 0 25 0H5ZM24.6667 9.33333C25.219 8.59695 25.0697 7.55228 24.3333 7C23.597 6.44772 22.5523 6.59695 22 7.33333L13.153 19.1293L9.51185 15.4882C8.86097 14.8373 7.8057 14.8373 7.15482 15.4882C6.50395 16.139 6.50395 17.1943 7.15482 17.8452L12.1548 22.8452C12.4965 23.1868 12.9695 23.3633 13.4515 23.3292C13.9335 23.2948 14.3768 23.0532 14.6667 22.6667L24.6667 9.33333Z" fill="black"/>
                                </svg>
                        
                            </div>
                        </div>
                    ))}

                </div>
                
            </div>
        </>
    );
};

export default Followed;