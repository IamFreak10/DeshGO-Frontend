import { Link, useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { use, useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

import { FaCalendarDay, FaMapMarkedAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Fade, Zoom } from 'react-awesome-reveal';
import UseAuth from '../../../Hooks/UseAuth';
import useAxios from '../../../Hooks/UseAxios';

export default function PackageDetails() {
  const { id } = useParams();
  const axiosInstance=useAxios();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [tourDate, setTourDate] = useState(null);
  const { user } = UseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    data: pkg = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['package', id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/package/${id}`);
      return res.data;
    },
  });

  const { data: guides = [] } = useQuery({
    queryKey: ['guides'],
    queryFn: async () => {
      const res = await axiosInstance.get('/tourguide');
      return res.data;
    },
  });
  

  const onSubmit = async (formData) => {
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Not Logged In',
        text: 'Please login to book a tour.',
      });
      navigate('/login');
    }

    const bookingInfo = {
      packageId: pkg._id,
      packageTitle: pkg.title,
      tourDate: tourDate.toISOString(),
      touristName: user?.displayName,
      touristEmail: user?.email,
      touristImage: user?.photoURL,
      price: Number(pkg.price),
      guideEmail: formData.guideEmail,
      bookingStatus: 'pending',
      paymentStatus: 'unpaid',
      bookedAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post('/bookings', bookingInfo);
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Booking Confirmed!',
          text: 'Your tour has been booked successfully.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Book',
          text: 'Please try again later.',
        });
      }
    } catch (err) {
      console.error('Booking Error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Something went wrong while booking.',
      });
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error)
    
    return (
      <p className="text-center py-10 text-red-500">Something went wrong.</p>
    );

  const images = pkg?.images || [];
  const columnCount = images.length <= 3 ? 2 : images.length <= 6 ? 3 : 4;
  const columns = Array.from({ length: columnCount }, () => []);
  images.forEach((img, idx) => {
    columns[idx % columnCount].push(img);
  });

  return (
    <Fade
      className="flex flex-col items-center"
      delay={200}
      duration={1000}
      triggerOnce
      direction="up"
    >
      {/* Package Title and Images */}
      <div className="max-w-7xl  p-4 text-center">
        <h1 className="text-sm md:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3 mb-6">
          <FaMapMarkedAlt className="text-blue-600 text-4xl drop-shadow" />
          {pkg.title}
        </h1>
        <div className="flex gap-4">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex-1 flex flex-col gap-4">
              {col.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Package image ${i + 1}`}
                  className="h-full w-full object-cover rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:opacity-90"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div>
        <Fade delay={1000} cascade damping={0.1}>
          <div className="max-w-7xl  p-4 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {pkg.about}
            </p>
          </div>
        </Fade>
      </div>

      {/* Tour Plan Section */}
      <div className=" rounded-3xl join join-vertical ">
        {pkg.days?.map((day, index) => (
          <div
            key={index}
            className="collapse collapse-arrow join-item rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold flex items-center gap-3 text-blue-800 text-base md:text-lg">
              <FaCalendarDay className="text-2xl" />
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm shadow-sm">
                Day {index + 1}
              </span>
              <span className="text-blue-600 hover:underline">Plan</span>
            </div>
            <div className="collapse-content text-gray-700 text-sm md:text-base leading-relaxed px-2 pb-4">
              <motion.span
                initial={{ scale: 1 }}
                animate={{
                  color: ['#006A67', '#33c1ff', '#8e44ad', '#ff5733'],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="font-bold"
              >
                {day}
              </motion.span>
            </div>
          </div>
        ))}
      </div>

      {/* Guides Section */}
      <div className="max-w-7xl  p-6 mt-12 text-left">
        <h2 className="text-3xl text-center font-extrabold mb-6 text-gray-900 dark:text-gray-300 tracking-tight">
          Tour Guides
        </h2>

        <Fade cascade damping={0.12} delay={250} duration={700} triggerOnce>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {guides.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 italic">
                No tour guides available.
              </p>
            ) : (
              guides.map((guide) => (
                <Zoom
                  key={guide._id}
                  triggerOnce
                  delay={180}
                  duration={500}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col items-center space-y-2 rounded-lg shadow-md bg-white dark:bg-gray-900 p-4 hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={guide.photo || '/default-profile.png'}
                      alt={guide.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500"
                    />
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center truncate w-full">
                      {guide.name}
                    </h3>
                    <Link
                      to={`/tourguide/${guide._id}`}
                      className="mt-1 text-xs px-3 py-1.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-200"
                    >
                      View Profile
                    </Link>
                  </div>
                </Zoom>
              ))
            )}
          </div>
        </Fade>
      </div>

      {/* Booking Form */}
      <div className="w-full max-w-7xl  bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mt-16 mb-10 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Book This Tour
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
          {/* Package Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Package Title
            </label>
            <input
              type="text"
              value={pkg?.title}
              readOnly
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          {/* Tourist Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Your Name
            </label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          {/* Tourist Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Your Email
            </label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          {/* Tourist Image URL */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Your Image URL
            </label>
            <input
              type="text"
              value={user?.photoURL}
              readOnly
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Price
            </label>
            <input
              type="text"
              value={`$${pkg?.price}`}
              readOnly
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          {/* Tour Date */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Tour Date
            </label>
            <DatePicker
              selected={tourDate}
              onChange={(date) => setTourDate(date)}
              placeholderText="Select tour date"
              minDate={new Date()}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              required
            />
          </div>

          {/* Tour Guide Select */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Tour Guide
            </label>
            <select
              {...register('guideEmail', { required: true })}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="">Select Tour Guide</option>
              {guides.map((guide) => (
                <option key={guide._id} value={guide.email}>
                  {guide.name}
                </option>
              ))}
            </select>
            {errors.guideName && (
              <p className="text-sm text-red-500 mt-1">
                Tour guide selection is required
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
            
              type="submit"
              className="w-full py-2 px-4 font-semibold rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </Fade>
  );
}
