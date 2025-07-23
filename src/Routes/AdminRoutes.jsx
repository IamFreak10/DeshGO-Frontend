import React from 'react';

import { Navigate, useLocation } from 'react-router';

import UseAuth from '../Hooks/UseAuth';
import { HashLoader } from 'react-spinners';
import useUserRole from '../Hooks/useUserRole';
import Unauthorized from '../Shared/UnAuthorizedPAges/Unauthorized';

const AdminRoutes = ({ children }) => {
  const { loading } = UseAuth();
  
   const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return (
      <div className=" dark:bg-gray-800 flex justify-center items-center h-screen">
        <HashLoader></HashLoader>
      </div>
    );
  }
  if (role !== 'admin') {
    return (
     <Unauthorized></Unauthorized>
    );
  }
  return children;
};

export default AdminRoutes; 
