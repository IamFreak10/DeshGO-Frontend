import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useImageUpload from '../../Hooks/useImageUpload';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AddPackage = () => {
    const axiosSecure = useAxiosSecure();
  const { uploadImage } = useImageUpload();
  const [imageUrls, setImageUrls] = useState([]);
  const [coverImage, setCoverImage] = useState('');
  const [dayPlans, setDayPlans] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    const uploadedUrls = [];

    for (const file of files) {
      const url = await uploadImage(file);
      if (url) uploadedUrls.push(url);
    }

    setImageUrls((prev) => [...prev, ...uploadedUrls]);
    setUploading(false);
  };

  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) setCoverImage(url);
  };

  const handleRemoveCoverImage = () => {
    setCoverImage('');
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...imageUrls];
    updatedImages.splice(index, 1);
    setImageUrls(updatedImages);
  };

  const handleAddDay = () => {
    setDayPlans((prev) => [...prev, '']);
  };

  const handleRemoveDay = (index) => {
    const updatedPlans = [...dayPlans];
    updatedPlans.splice(index, 1);
    setDayPlans(updatedPlans);
  };

  const handleDayChange = (index, value) => {
    const updatedPlans = [...dayPlans];
    updatedPlans[index] = value;
    setDayPlans(updatedPlans);
  };

  const onSubmit = async(data) => {
    const packageData = {
      ...data,
      coverImage,
      images: imageUrls,
      days: dayPlans,
    };

    const res=await axiosSecure.post('/packages', packageData);
    if(res.data.insertedId){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Package added successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
    // reset();
    // setImageUrls([]);
    // setCoverImage('');
    // setDayPlans([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#EAEFEF] dark:bg-gray-900 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">
        Add New Tour Package
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-1 text-black dark:text-gray-200 font-medium">Package Type</label>
          <select
            {...register('type', { required: true })}
            className="select bg-gray-300 text-black dark:text-white dark:bg-gray-800 select-bordered w-full"
          >
            <option value="">Select a type</option>
            <option value="Adventure">Adventure</option>
            <option value="Cultural">Cultural</option>
            <option value="Historical">Historical</option>
            <option value="Nature">Nature</option>
            <option value="Luxury">Luxury</option>
            <option value="Budget">Budget</option>
            <option value="Family">Family</option>
            <option value="Honeymoon">Honeymoon</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black dark:text-gray-200">Package Name</label>
          <input
            type="text"
            {...register('title', { required: true })}
            className="input bg-gray-300 text-black dark:text-white dark:bg-gray-800 input-bordered w-full font-bold"
            placeholder="SundorBan Tour"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-black dark:text-gray-200">Package Title</label>
          <input
            type="text"
            {...register('title', { required: true })}
            className="input bg-gray-300 text-black dark:text-white dark:bg-gray-800 input-bordered w-full font-bold"
            placeholder="e.g. Sundarbans 3 day Adventure"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black dark:text-gray-200">About the Tour</label>
          <textarea
            {...register('about', { required: true })}
            className="textarea font-semibold bg-gray-300 text-black dark:text-white dark:bg-gray-800 textarea-bordered w-full"
            rows={4}
            placeholder="Write a short description..."
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black dark:text-gray-200">Cover Image</label>
          <label className="cursor-pointer flex items-center justify-center px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white w-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <input type="file" onChange={handleCoverImageUpload} className="hidden" />
            📷 <span className="text-black dark:text-white">Click to upload Cover Image</span>
          </label>
          {coverImage && (
            <div className="mt-4 relative">
              <img
                src={coverImage}
                alt="Cover Image"
                className="w-full max-w-xs object-cover rounded-md"
              />
              <button
                type="button"
                onClick={handleRemoveCoverImage}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-80 hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black dark:text-gray-200">Upload Images</label>
          <label className="cursor-pointer flex items-center justify-center px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white w-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <input type="file" onChange={handleImageUpload} className="hidden" multiple />
            📷 <span className="text-black dark:text-white">Click to upload images</span>
          </label>

          {uploading && <p className="text-blue-500 text-sm mt-2">Uploading images...</p>}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
            {imageUrls.map((url, i) => (
              <div key={i} className="relative group">
                <img
                  src={url}
                  alt={`Uploaded ${i + 1}`}
                  className="w-full h-32 object-cover rounded-md shadow-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-80 hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black dark:text-gray-200">Day Plans</label>
          {dayPlans.map((plan, i) => (
            <div key={i} className="relative mb-2">
              <input
                type="text"
                value={plan}
                onChange={(e) => handleDayChange(i, e.target.value)}
                placeholder={`Day ${i + 1} Plan`}
                className="input font-semibold bg-gray-300 text-black dark:text-white dark:bg-gray-800 input-bordered w-full"
              />
              <button
                type="button"
                onClick={() => handleRemoveDay(i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddDay}
            className="btn text-yellow-600 btn-outline btn-sm mt-1"
          >
            + Add Day
          </button>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black dark:text-gray-200">Price</label>
          <input
            type="number"
            {...register('price', { required: true })}
            className="input font-semibold bg-gray-300 text-black dark:text-white dark:bg-gray-800 input-bordered w-full"
            placeholder="Price in BDT"
          />
        </div>

        <button
          type="submit"
          className="btn bg-yellow-400 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white w-full"
        >
          Submit Package
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
