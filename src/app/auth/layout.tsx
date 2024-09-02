import React from 'react';

const AuthLayout = ({ children } : any) => {
  
  return (
    <div className="  flex items-center justify-center  flex-row-reverse h-screen  w-full   ">

        <div className="w-full p-2  flex-1 flex relative flex-col   items-center mt-2 md:mt-0  ">
<div className="h-96 w-12 absolute border-l z-40 border-l-emerald-500  bg-background top-0 -left-5 rounded-full  "></div>
       <h1 className=' text-4xl leading-none  tracking-tighter'>
            Welcome Back to <span className="text-blue-500 font-mono">App</span> 
          </h1>
          <p className='max-w-sm test-sm text-center'>Everything should have a good start.</p>
         
       <div className="max-w-sm  p-4  rounded-xl h-full w-full relative ">
       {children}
       </div>
        </div>
        <div className=" hidden bg-cover  md:flex justify-center items-center  bg-center flex-1 overflow-hidden  brightness-70 border-r-emerald-500 border-r  h-screen   -z-10   " style={{ backgroundImage: "url('https://img.freepik.com/free-photo/cyber-security-concept-digital-art_23-2151637765.jpg?t=st=1725304830~exp=1725308430~hmac=e380e0bcb920f53414b20fe20aeb6ab49e594eae5ff970c9c727daac9a704851&w=740')" }}>
       
        </div>     
    </div>
  );
};

export default AuthLayout;
