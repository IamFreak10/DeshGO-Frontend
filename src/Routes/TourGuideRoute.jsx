import React from 'react';

import { Navigate} from 'react-router';

import UseAuth from '../Hooks/UseAuth';
import { HashLoader } from 'react-spinners';
import useUserRole from '../Hooks/useUserRole';
import Unauthorized from '../Shared/UnAuthorizedPAges/Unauthorized';

const TourGuideRoute = ({ children }) => {
  const { loading } = UseAuth();
  
   const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return (
      <div className=" dark:bg-gray-800 flex justify-center items-center h-screen">
        <HashLoader></HashLoader>
      </div>
    );
  }
  if (role !== 'tourguide') {
    return (
     <Unauthorized></Unauthorized>
    );
  }
  return children;
};

export default TourGuideRoute; 
