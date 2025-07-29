import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { HashLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import useAxios from '../../../Hooks/UseAxios';
import { FaFileDownload } from 'react-icons/fa';

const TourGuideDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();

  const { data: guide, isLoading, isError, error } = useQuery({
    queryKey: ['tourGuideDetails', id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/tourguide/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader size={60} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-20 text-red-600 text-xl font-semibold">
        ❌ Failed to load tour guide details: {error.message}
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-5xl mx-auto px-6 py-10 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl mt-10"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="flex flex-col md:flex-row items-center gap-10">
        <img
          src={guide.photo}
          alt={guide.name}
          className="w-48 h-48 rounded-full object-cover border-4 border-primary shadow-lg hover:scale-105 transition-transform duration-300"
        />

        <div className="space-y-3 text-gray-800 dark:text-gray-100">
          <h2 className="text-4xl font-extrabold">{guide.name}</h2>
          <p className="text-lg">
            📧 <span className="font-semibold">Email:</span> {guide.email}
          </p>
          <p>
            🧭 <span className="font-semibold">Title:</span>{' '}
            <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded">
              {guide.title}
            </span>
          </p>
          <p>
            🎯 <span className="font-semibold">Reason:</span> {guide.reason}
          </p>
          <p>
            🚦 <span className="font-semibold">Status:</span>{' '}
            <span
              className={`inline-block px-2 py-1 rounded ${
                guide.status === 'accepted'
                  ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                  : guide.status === 'rejected'
                  ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
              }`}
            >
              {guide.status}
            </span>
          </p>

          <a
            href={guide.cvLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2 mt-4 bg-primary text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            <FaFileDownload />
            View CV
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default TourGuideDetails;
