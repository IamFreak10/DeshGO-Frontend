import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router'; // react-router-dom, not react-router
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useImageUpload from '../../Hooks/useImageUpload';
import Swal from 'sweetalert2';

const EditStory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { uploadImage } = useImageUpload();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm();
  const [newFiles, setNewFiles] = useState([]);

  // ---- Fetch the story ----
  const { data: story, isLoading } = useQuery({
    queryKey: ['story', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/stories/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      reset({
        title: data?.title || '',
        content: data?.content || '',
      });
    },
  });

  // ---- Update title/content ----
  const updateStoryMutation = useMutation({
    mutationFn: (payload) => axiosSecure.patch(`/stories/${id}`, payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries(['story', id]);
      queryClient.invalidateQueries(['stories']); // list page refresh
    },
  });

  // ---- $pull: remove one image ----
  const removeImageMutation = useMutation({
    mutationFn: (imageUrl) =>
      axiosSecure.patch(`/stories/${id}/images/remove`, { imageUrl }),
    onSuccess: () => {
      queryClient.invalidateQueries(['story', id]);
      Swal.fire('Removed', 'Image removed successfully', 'success');
    },
  });

  // ---- $push: add many images ----
  const addImagesMutation = useMutation({
    mutationFn: (images) =>
      axiosSecure.patch(`/stories/${id}/images/add`, { images }),
    onSuccess: () => {
      queryClient.invalidateQueries(['story', id]);
      setNewFiles([]);
      Swal.fire('Success', 'New images added', 'success');
    },
  });

  const handleRemoveExisting = (imageUrl) => {
    removeImageMutation.mutate(imageUrl);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewFiles(files);
  };

  const onSubmit = async (data) => {
    try {
      // 1) Update title & content
      await updateStoryMutation.mutateAsync({
        title: data.title,
        content: data.content,
      });

      // 2) Upload & push new images (if any)
      if (newFiles.length > 0) {
        const uploadedUrls = [];
        for (const file of newFiles) {
          const url = await uploadImage(file);
          uploadedUrls.push(url);
        }
        await addImagesMutation.mutateAsync(uploadedUrls);
      }

      Swal.fire('Success', 'Story updated successfully!', 'success');
      navigate('/dashboard/manage-stories');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to update story', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-700 dark:text-gray-200">
        Loading story...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Edit Story
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          defaultValue={story?.title}
          {...register('title', { required: true })}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />

        {/* Content */}
        <textarea
          rows="4"
          defaultValue={story?.content}
          {...register('content', { required: true })}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        ></textarea>

        {/* Existing images */}
        {story?.images?.length > 0 && (
          <div className="mt-4">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Existing Images
            </p>
            <div className="grid grid-cols-3 gap-3">
              {story.images.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={img}
                    alt=""
                    className="h-24 w-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExisting(img)}
                    className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 rounded-bl-md"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add new images */}
        <div className="mt-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Add new images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md
                       bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />
        </div>

        {newFiles.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-3">
          {newFiles.map((file, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(file)}
              alt="preview"
              className="h-24 w-full object-cover rounded-md"
            />
          ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-md
                     hover:bg-blue-700 dark:hover:bg-blue-800 transition"
        >
          Update Story
        </button>
      </form>
    </div>
  );
};

export default EditStory;

