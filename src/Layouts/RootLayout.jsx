import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';

const RootLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className='w-full md:max-w-[90%]  mx-auto p-5 min-h-[80vh]'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};

export default RootLayout;
