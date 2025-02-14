import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import {selectBrandUser} from "../../../features/brands/brandUserSlice"
import { useQuery } from "@tanstack/react-query";
import fetchProfileData from "../../../lib/fetchProfileData";
import { USER_TYPES, selectUser, selectUserType, setUser } from "../../../features/user/userSlice";
import styles from "../../../styles/brand-merchandise.module.css";
import BrandBioForm from '../../../components/brands/BrandSignupForm';
import BrandMerchForm from '../../../components/brands/BrandMerchForm';

export default function Bio() {
  
  const data = [];
	const loading = false;
	const error = null;
	const brand_user = useSelector(selectBrandUser);
	const router = useRouter();

 




  return (
   <BrandMerchForm/>
  )
}
