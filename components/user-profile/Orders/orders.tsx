import styles from "../../../styles/Users/orders.module.css";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import React from "react";


const Orders = () => {
    const [value, setValue] = React.useState<number | null>(2);
    return(
        <>
            <div className={styles.card}>
                <div className={styles.row}>
                    <div className={styles.columnleft}>
                        <h1>
                            <span>
                                1.
                            </span>
                        </h1>
                        <img 
                            src="https://images.yaoota.com/Rx5qLXWe3gmZ_VeUqoChxFv_65I=/trim/yaootaweb-production-ng/media/crawledproductimages/b7b02b093fffdfa35e76089fc55efa7c0a642f8a.jpg" 
                        />
                    </div>
                    
                    <div className={styles.columnright}>
                        <div className={styles.topright}>
                            <Box
                                sx={{
                                    '& > legend': { mt: 2 },
                                }}
                                >
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event: any, newValue: React.SetStateAction<number | null>) => {
                                    setValue(newValue);
                                    }}
                                />
                            </Box>
                        </div>


                        <div className={styles.textCont}>
                            <h1>
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.33625 3.02917C8.83083 3.38542 9.16667 3.9375 9.16667 4.58333C9.16667 5.22917 8.83083 5.78167 8.33625 6.1375C8.43625 6.73833 8.28042 7.37 7.825 7.825C7.36875 8.28125 6.7375 8.43292 6.13917 8.33542C5.78458 8.83167 5.2275 9.16667 4.58333 9.16667C3.9375 9.16667 3.38417 8.83042 3.02875 8.335C2.42958 8.43292 1.79792 8.28167 1.34125 7.825C0.885 7.36875 0.733333 6.73708 0.834167 6.1375C0.34 5.78208 0 5.22958 0 4.58333C0 3.93708 0.34 3.38417 0.834167 3.02917C0.733333 2.42958 0.885 1.79792 1.34167 1.34167C1.79708 0.885833 2.42917 0.730417 3.03208 0.830417C3.38542 0.335 3.93875 0 4.58333 0C5.22708 0 5.78333 0.334583 6.13833 0.830417C6.73917 0.730417 7.37 0.886667 7.825 1.34167C8.28042 1.79667 8.43667 2.42833 8.33625 3.02917ZM6.49208 2.99417C6.53663 3.02595 6.57447 3.06621 6.60346 3.11262C6.63245 3.15904 6.652 3.21071 6.66102 3.26468C6.67003 3.31866 6.66833 3.37388 6.656 3.4272C6.64367 3.48051 6.62096 3.53088 6.58917 3.57542L4.50583 6.49208C4.47067 6.54134 4.42519 6.58234 4.37257 6.61224C4.31995 6.64214 4.26144 6.66022 4.20113 6.66522C4.14081 6.67021 4.08013 6.66201 4.02331 6.64118C3.96648 6.62034 3.91488 6.58738 3.87208 6.54458L2.62208 5.29458C2.54618 5.216 2.50419 5.11075 2.50514 5.0015C2.50609 4.89225 2.54991 4.78775 2.62716 4.71049C2.70441 4.63324 2.80892 4.58942 2.91817 4.58847C3.02742 4.58752 3.13267 4.62952 3.21125 4.70542L4.11333 5.6075L5.91083 3.09083C5.9751 3.00094 6.07244 2.94025 6.18144 2.92213C6.29044 2.904 6.40218 2.92991 6.49208 2.99417Z" fill="black"/>
                                </svg>
                                Baggieboy
                            </h1>

                            <p className={styles.details}>
                                Women pleated VNeck Lady Two Piece
                            </p>

                            <span className={styles.shipped}>
                                shipped
                            </span>

                            <p className={styles.other}>

                                10-07-2023
                            </p>

                            <p className={styles.other}>
                                ₦ 45,000.00
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Orders;