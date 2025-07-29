import React from 'react';
import { useQuery } from '@tanstack/react-query';


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
  console.log(stories);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl text-black dark:text-white font-bold text-center mb-6">
        Community Spotlight ✨
      </h1>

      {isLoading ? (
        <div className="flex justify-center my-10">
          <ScaleLoader color="#2563eb" height={30} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate('/community')}
          className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700"
        >
          All Stories
        </button>
      </div>
    </div>
  );
};

export default Random$Story;
