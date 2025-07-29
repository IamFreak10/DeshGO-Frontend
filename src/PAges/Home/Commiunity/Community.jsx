import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/UseAxios';
import StoryCard from '../../../Shared/StoryCard/StoryCard';



const Community = () => {
const axiosInstance = useAxios();

  const { data: stories = [], isLoading, isError } = useQuery({
    queryKey: ['allStories'],
    queryFn: async () => {
      const res = await axiosInstance.get('/stories'); // No email param
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center mt-10">Loading stories...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load stories.</p>;

  return (
    <div className="max-w-6xl  mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600 dark:text-indigo-400">Community Stories</h1>

      {stories.length === 0 ? (
        <p className="text-center text-gray-500">No stories found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map(story => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;
