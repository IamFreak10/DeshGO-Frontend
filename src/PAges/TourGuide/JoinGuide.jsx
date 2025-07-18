import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import UseAuth from '../../Hooks/UseAuth';
// adjust path if needed

const JoinGuide = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Not Logged In',
        text: 'Please login before applying.',
      });
      return;
    }

    const applicationData = {
      name: user.displayName || user.name || 'Anonymous',
      photo: user.photoURL,
      email: user.email,
      title: data.title,
      reason: data.reason,
      cvLink: data.cvLink,
      status: 'Application_Pending',
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post('/tourguide', applicationData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Application Submitted',
          text: 'Thank you for applying to become a Tour Guide! Your application is pending approval.',
          confirmButtonColor: '#F59E0B',
        });
        reset();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        confirmButtonColor: '#F59E0B',
        
        title: 'Submission Failed',
        text: 'Please try again later.',
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-[#EAEFEF] dark:bg-gray-900 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-center text-black dark:text-white">
        Apply to Join as a Tour Guide
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Applicant Name */}
        <div>
          <label className="block mb-1 text-black dark:text-gray-200 font-medium">
            Applicant Name
          </label>
          <input
            type="text"
            value={user?.displayName || user?.name || 'Anonymous'}
            disabled
            className="input bg-gray-200 text-black dark:text-white dark:bg-gray-800 input-bordered w-full font-semibold cursor-not-allowed"
          />
        </div>

        {/* Applicant Email */}
        <div>
          <label className="block mb-1 text-black dark:text-gray-200 font-medium">
            Applicant Email
          </label>
          <input
            type="email"
            value={user?.email || 'No Email Found'}
            disabled
            className="input bg-gray-200 text-black dark:text-white dark:bg-gray-800 input-bordered w-full font-semibold cursor-not-allowed"
          />
        </div>

        {/* Application Title */}
        <div>
          <label className="block mb-1 text-black dark:text-gray-200 font-medium">
            Application Title
          </label>
          <input
            type="text"
            {...register('title', { required: true })}
            placeholder="Your Application Title"
            className="input bg-gray-300 text-black dark:text-white dark:bg-gray-800 input-bordered w-full font-semibold"
          />
        </div>

        {/* Reason to Join */}
        <div>
          <label className="block mb-1 text-black dark:text-gray-200 font-medium">
            Why do you want to be a Tour Guide?
          </label>
          <textarea
            {...register('reason', { required: true })}
            placeholder="Write your reasons here..."
            rows={4}
            className="textarea bg-gray-300 text-black dark:text-white dark:bg-gray-800 textarea-bordered w-full font-semibold"
          />
        </div>

        {/* CV Link */}
        <div>
          <label className="block mb-1 text-black dark:text-gray-200 font-medium">
            CV Link (URL)
          </label>
          <input
            type="url"
            {...register('cvLink', { required: true })}
            placeholder="https://your-cv-link.com"
            className="input bg-gray-300 text-black dark:text-white dark:bg-gray-800 input-bordered w-full font-semibold"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-yellow-400 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white w-full"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default JoinGuide;
