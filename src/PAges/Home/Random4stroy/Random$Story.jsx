import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { ScaleLoader } from 'react-spinners';

import StoryCard from '../../../Shared/StoryCard/StoryCard';
import useAxios from '../../../Hooks/UseAxios';

const Random$Story = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ['randomStories'],
    queryFn: async () => {
      const res = await axiosInstance.get('/4stories');
      return res.data;
    },
  });

  return (
    <div className="w-full md:w-[1688px]  mx-auto px-4 py-10">
 

      {isLoading ? (
        <div className="flex justify-center my-10">
          <ScaleLoader color="#2563eb" height={30} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story, index) =>
            index % 2 == 0 ? (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: false }}
              >
                <StoryCard key={index} story={story} />
              </motion.div>
            ) : (
              <motion.div
                key={index}
                initial={{ opacity: -1, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: false }}
              >
                <StoryCard key={index} story={story} />
              </motion.div>
            )
          )}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate('/community')}
          className="mt-3 bg-[#E84A5F] hover:bg-[#d1384f] text-white px-10 py-2 rounded shadow-2xl"
        >
          All Stories
        </button>
      </div>
    </div>
  );
};

export default Random$Story;
