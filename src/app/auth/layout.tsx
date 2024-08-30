import React from 'react';

const AuthLayout = ({ children } : any) => {
  
  return (
    <div className="  flex items-center justify-center flex-row-reverse w-full   ">

        <div className="w-full p-2  flex-1 flex flex-col items-center mt-2 md:mt-0  ">
          <h1 className='px-6 text-4xl'>
            Welcome Back to <span className="text-blue-500 font-mono">AI</span> <span className="text-blue-500">Art</span>
          </h1>
       <div className="max-w-sm p-6  rounded-xl h-full w-full relative ">
       {children}
       <p className='mt-3'>
        credits :  <span className='text-sky-500 underline'>
        Saad Bukhari
        </span>
       </p>
       </div>
        </div>
        <div className=" hidden bg-cover  md:flex justify-center items-center  bg-center flex-1 overflow-hidden  brightness-70 h-screen   -z-10   " style={{ backgroundImage: "url('https://img.freepik.com/free-photo/anime-style-character-space_23-2151134211.jpg?t=st=1725024322~exp=1725027922~hmac=ae1c7042db8b18f87a0a8297cb4ebdaa6a5f9cae7c26dcc0df7a004548af6f34&w=740')" }}>
       
        </div>     
    </div>
  );
};

export default AuthLayout;
