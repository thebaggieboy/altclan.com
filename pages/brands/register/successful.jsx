import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { selectBrandUser, setBrandUser } from "../../../features/brands/brandUserSlice"
import styles from "../../../styles/brand-bio.module.css";
import useUpdateProfileData from '../../../hooks/useUpdateProfileData';
import Loader from "../../../components/Loader"
import { create } from 'domain';
import { selectUser } from '../../../features/user/userSlice';
export default function BrandLogo() {

  //const data = [];
  const loading = false;
  //const error = null;
  const brand_user = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (brand_user === null) {
      router.push("/brands/register");
    }

  }, [brand_user]);


  const brandUserData = brand_user;

  const { isPending, error, mutateAsync: updateFn, data } = useUpdateProfileData("https://altclan-brands-api.onrender.com/api/brand_users/", brandUserData?.id, setBrandUser)

  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [formPersonalData, setFormPersonalData] = useState(null)

  const uploadToClient = (event) => {

    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));

    }
  };

  const uploadToServer = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", 'altclan')
    console.log("Image: ", image)
    console.log("Image URL: ", createObjectURL)

    const data = await fetch('https://api.cloudinary.com/v1_1/baggieboy/image/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json());


    console.log(data)

    await updateFn({ brand_logo: data.url })
    
    router.push('/brands/profile')
  };


  if (isPending) {
    console.log("updating brand logo")
  }


  if (error) {
    console.log(error)
  }

  return (
    <>
     Creating account
    </>
  )
}
