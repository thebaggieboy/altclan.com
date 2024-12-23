import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import {selectBrandUser} from "../../../features/brands/brandUserSlice"
import { useQuery } from "@tanstack/react-query";
import fetchProfileData from "../../../lib/fetchProfileData";
import { USER_TYPES, selectUser, selectUserType, setUser } from "../../../features/user/userSlice";
import styles from "../../../styles/brand-bio.module.css";
import BrandBioForm from '../../../components/brands/BrandSignupForm';
import BrandMerchForm from '../../../components/brands/BrandMerchForm';
import AuctionForm from '../../../components/brands/AuctionForm';


export default function New() {
  

  return (
   <AuctionForm/>
  )
}
