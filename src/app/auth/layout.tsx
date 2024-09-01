import React from 'react';

const AuthLayout = ({ children } : any) => {
  
  return (
    <div className="  flex items-center justify-center h-screen  w-full   ">

        <div className="w-full p-2  flex-1 flex flex-col  items-center mt-2 md:mt-0  ">
         
       <div className="max-w-sm shadow-md  dark:bg-neutral-900 p-4  rounded-xl h-full w-full relative ">
       <h1 className=' text-4xl leading-normal font-serif tracking-tighter'>
            Welcome Back to <span className="text-blue-500 font-mono">ArtAI</span> 
          </h1>
       {children}
       </div>
        </div>
        <div className=" hidden bg-cover  md:flex justify-center items-center  bg-center flex-1 overflow-hidden  brightness-70 h-screen   -z-10   " style={{ backgroundImage: "url('https://img.freepik.com/free-photo/anime-style-character-space_23-2151134211.jpg?t=st=1725070945~exp=1725074545~hmac=7edf862e42d9e3476c77be444ec7c99dba677126cf77c8c1cc8d428bf10bfd7f&w=740')" }}>
       
        </div>     
    </div>
  );
};

export default AuthLayout;
