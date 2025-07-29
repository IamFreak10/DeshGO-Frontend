import React from 'react';
import { Fade } from 'react-awesome-reveal';
import UseAuth from '../../Hooks/UseAuth';
import ManageProfile from '../../Shared/ManageProfile.jsx/ManageProfile';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const TouristProfile = () => {
 const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const { data: userInfo = [], ispending } = useQuery({
    queryKey: ['randomPackages'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });
  console.log(userInfo);
  return (
    <>
    <Fade duration={1000} cascade direction="left">
      <h1 className="text-3xl font-bold text-black dark:text-white">
        Welcome <span className="text-green-500">{user.displayName}</span>
      </h1>
    </Fade>
    <Fade duration={1000} triggerOnce direction='up'>
      <ManageProfile />
    </Fade>
    {/* For Tourist */}
    {
      userInfo.role === 'user' && <h1 className="text-3xl font-bold text-black dark:text-white">Tourist Profile</h1>
    }
    </>
  );
};

export default TouristProfile;
