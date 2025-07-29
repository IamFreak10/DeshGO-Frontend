import React from 'react';

import { Navigate, useLocation } from 'react-router';

import UseAuth from '../Hooks/UseAuth';
import { HashLoader } from 'react-spinners';

const PrivateRoutes = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

 

  if (loading) {
    return (
      <div className=" dark:bg-gray-800 flex justify-center items-center h-screen">
        <HashLoader></HashLoader>
      </div>
    );
  }
  if (!user) {
    return (
      <Navigate state={{ from: location.pathname }} to="/login"></Navigate>
    );
  }
  return children;
};

export default PrivateRoutes;
