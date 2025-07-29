import React from 'react';
import { Fade } from 'react-awesome-reveal';
import UseAuth from '../../Hooks/UseAuth';
import ManageProfile from '../../Shared/ManageProfile.jsx/ManageProfile';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const TouristProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();

  const { data: userInfo = {} } = useQuery({
    queryKey: ['userInfo', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // Fetch admin stats
  const { data: totalPayment = 0 } = useQuery({
    queryKey: ['totalPayment'],
    enabled: userInfo.role === 'admin',
    queryFn: async () => {
      const res = await axiosSecure.get('/total-payment');
      return res.data[0]?.total || 0;
    },
  });

  const { data: totalGuides = 0 } = useQuery({
    queryKey: ['totalGuides'],
    enabled: userInfo.role === 'admin',
    queryFn: async () => {
      const res = await axiosSecure.get('/total-guides');
      return res.data[0]?.total || 0;
    },
  });

  const { data: totalPackages = 0 } = useQuery({
    queryKey: ['totalPackages'],
    enabled: userInfo.role === 'admin',
    queryFn: async () => {
      const res = await axiosSecure.get('/total-package');
      return res.data[0]?.total || 0;
    },
  });

const { data: totalClients = { totalUsers: 0 } } = useQuery({
  queryKey: ['users-count'],
  queryFn: async () => {
    const res = await axiosSecure.get('/total-user');
    return res.data;  // এটা { totalUsers: 10 } রিটার্ন করবে
  }
});




  const { data: totalStories = 0 } = useQuery({
    queryKey: ['totalStories'],
    enabled: userInfo.role === 'admin',
    queryFn: async () => {
      const res = await axiosSecure.get('/total-stories');
      return res.data[0]?.total || 0;
    },
  });

  return (
    <>
      {/* For Admin */}
      {userInfo.role === 'admin' && (
        <div className="grid md:grid-cols-3 gap-4 p-4">
          <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-bold text-blue-700">Total Payment</h2>
            <p className="text-2xl font-semibold text-black">${totalPayment}</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-bold text-green-700">Total Tour Guides</h2>
            <p className="text-2xl font-semibold text-black">{totalGuides}</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-bold text-yellow-700">Total Packages</h2>
            <p className="text-2xl font-semibold text-black">{totalPackages}</p>
          </div>
          <div className="bg-purple-100 p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-bold text-purple-700">Total Clients</h2>
            <p className="text-2xl font-semibold text-black">{totalClients.totalUsers}</p>
          </div>
          <div className="bg-pink-100 p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-bold text-pink-700">Total Stories</h2>
            <p className="text-2xl font-semibold text-black">{totalStories}</p>
          </div>
        </div>
      )}

      <Fade duration={1000} cascade direction="left">
        <h1 className="text-center text-3xl font-bold text-black dark:text-white">
          Welcome <span className="text-green-500">{user?.displayName}</span>
        </h1>
      </Fade>

      <Fade duration={1000} triggerOnce direction="up">
        <ManageProfile />
      </Fade>

      {/* For Tourist */}
      {userInfo.role === 'user' && (
        <div className="flex justify-center">
          <Link to="/dashboard/join-as-tour-guide">
            <button className="btn btn-primary mt-4">Join as Tour Guide</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default TouristProfile;
