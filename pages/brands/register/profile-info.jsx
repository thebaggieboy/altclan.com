import { useRouter } from 'next/router';
import React, { useState , useEffect} from 'react'
import { useSelector } from "react-redux";
import {selectBrandUser} from "../../../features/brands/brandUserSlice"
import BrandProfileInfo from '../../../components/brands/BrandProfileInfoForm';
const ContactInfo = () => {
    const data = [];
	const loading = false;
	const error = null;
	const brand_user = useSelector(selectBrandUser);
	const router = useRouter();
    
	useEffect(() => {
		if (brand_user === null) {
			router.push("/brands/register");
		}
	}, [brand_user]);

    return (
        <div>
            <BrandProfileInfo/>
        </div>
    );
}

export default ContactInfo;
