"use client"
import CaptchaClientProvider from '@/modules/auth/components/CaptchaProvider';
import React, { useState } from 'react';
import authImage from '@/assets/auth-image-3d-cartoon.jpg'
import Image from 'next/image';
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading , setLoading] = useState(true)
  const layoutComponent = (
    <div className="flex items-center justify-center  flex-row-reverse h-screen  w-full   ">
      <div className="w-full p-2  flex-1 flex relative flex-col   items-center mt-2 md:mt-0  ">
        <div className="h-96 w-12 font-serif absolute border-l z-40 border-l-violet-800 bg-gray-100 dark:bg-background top-0 -left-5 rounded-full hidden md:block  "></div>
        <h1 className=' text-white   md:text-black md:dark:text-white text-4xl leading-none  tracking-tighter'>
          Welcome Back to <span className="text-blue-500 ">X-UI</span>
        </h1>
        <p className='max-w-sm test-sm text-center text-white  md:text-black md:dark:text-white '>Everything should have a good start.</p>

        <div className="max-w-sm bg-white dark:bg-background/80 p-4  rounded-xl h-full w-full relative ">
          {children}
        </div>
      </div>
  <div className={`fixed left-0 top-0 brightness-[8%] md:brightness-90 md:relative bg-cover  md:flex justify-center items-center  bg-center w-full md:flex-1 overflow-hidden  brightness-70 border-r-violet-800 border-r  h-screen   -z-10  ${loading && "bg-gradient-to-r from-violet-400 to-violet-800 "} `}>
  <Image src={authImage} alt='moon-3d-image-cartoon' onLoad={()=> setLoading(false)} quality={75}  className={`w-full h-full object-cover ${loading && "blur"}`}/>
  </div>
    </div>
  )
  return (
    <CaptchaClientProvider >
      {layoutComponent}
    </CaptchaClientProvider>
  );
};

export default AuthLayout;
