import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useImageUpload from '../../Hooks/useImageUpload';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { User } from 'lucide-react';
import UseAuth from '../../Hooks/UseAuth';

const ShareStory = () => {
  const { register, handleSubmit, reset } = useForm();
  const { uploadImage } = useImageUpload();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
 

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    if (selectedFiles.length === 0) {
      Swal.fire('No images', 'Please upload at least one image.', 'warning');
      return;
    }

    try {
      const uploadedImageURLs = [];

      for (const file of selectedFiles) {
        const url = await uploadImage(file);
        uploadedImageURLs.push(url);
      }

      const storyData = {
        postedBy: user?.displayName,
        postedByEmail: user?.email,
        title: data.title,
        content: data.content,
        images: uploadedImageURLs,
        createdAt: new Date(),
      };

      const result = await axiosSecure.post('/story', storyData);

      if (result.data.insertedId) {
        Swal.fire('Success', 'Story shared successfully!', 'success');
        reset();
        setSelectedFiles([]);
        navigate('/dashboard/manage-stories');
      } else {
        Swal.fire('Error', 'Failed to share story.', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'An error occurred while uploading.', 'error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Share a Story
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="What's on your mind?"
          {...register('title', { required: true })}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />

        <textarea
          placeholder="Write your story..."
          rows="4"
          {...register('content', { required: true })}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        ></textarea>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white file:dark:text-white "
        />

        {selectedFiles.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="h-full w-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white px-2 rounded-bl-md text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 transition"
        >
          Post Story
        </button>
      </form>
    </div>
  );
};

export default ShareStory;
