import React from 'react';

const AuthLayout = ({ children } : any) => {
  
  return (
    <div className="  flex items-center justify-center w-full   ">

        <div className="w-full p-2  flex-1 flex flex-col items-center mt-2 md:mt-0  ">
          <h1 className='px-6 text-4xl'>
            Welcome Back to <span className="text-blue-500 font-mono">AI</span> <span className="text-blue-500">Art</span>
          </h1>
       <div className="max-w-sm p-6 rounded-xl h-full w-full relative ">
       {children}
       <p className='mt-3'>
        credits :  <span className='text-sky-500 underline'>
        Saad Bukhari
        </span>
       </p>
       </div>
        </div>
        <div className=" hidden bg-cover  md:flex justify-center items-center  bg-center flex-1 overflow-hidden  brightness-70 h-screen   -z-10   " style={{ backgroundImage: "url('https://img.freepik.com/free-photo/owl-bird-colorful-flowers-generative-ai_206725-745.jpg?ga=GA1.1.1066312992.1724054936&semt=ais_hybrid')" }}>
       
        </div>     
    </div>
  );
};

export default AuthLayout;
