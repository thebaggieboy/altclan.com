import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function BrandDiv() {
  return (
    <>
    <br />
      <div className="bg-#ddd">
        <p className="text-center  mx-auto  text-black p-10 sm:text-6xl">
          Welcome to our alternative fashion startup! Celebrate non-conformity,
          creativity, and self-expression through our curated collection of
          sustainable and ethical fashion. From vintage to goth, punk to
          bohemian, embrace your unique style with us.
        </p>

        <div className="grid place-items-center">
          <Link
            href="/brands/signup"
            className="flex items-center justify-center gap-x-2  p-5 text-base font-medium text-center bg-black rounded-lg text-white"
          >
            <span>Signup as a brand</span>  <br />
           
          </Link>
        </div>
      </div>
    </>
  );
}
