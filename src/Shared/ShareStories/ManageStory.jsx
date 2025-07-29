import React from 'react';
import { Link } from 'react-router'; // fixed: should be from react-router-dom
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import UseAuth from '../../Hooks/UseAuth';
import Swal from 'sweetalert2';

const ManageStory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const queryClient = useQueryClient();

  const {
    data: stories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['stories', user?.email],
    enabled: !!user?.email, // ensures query doesn't run without email
    queryFn: async () => {
      const res = await axiosSecure.get(`/stories-by-email?email=${user.email}`);
      return res.data;
    },
  });
  const { mutate: deleteStoryMutation } = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/stories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['stories', user?.email]);
      Swal.fire('Deleted!', 'Story has been deleted.', 'success');
    },
  });
  const handleDeleteStory = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStoryMutation(id);
      }
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Manage Stories
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Loading...
        </p>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load stories.</p>
      ) : stories.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No stories found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 space-y-3"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {story.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {story.content}
              </p>

              {story.images?.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {story.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Story ${idx}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}

              <div className="flex justify-between pt-3">
                <Link
                  to={`/dashboard/edit/${story._id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteStory(story._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageStory;
