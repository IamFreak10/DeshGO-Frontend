import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router'; // ✅ Correct import
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import UseAuth from '../../Hooks/UseAuth';

export default function MyBooking() {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ useQuery with object form
  const {
    data: bookings = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // don't fetch until user is ready
  });
console.log(bookings);
  // ✅ useMutation with object form
  const cancelMutation = useMutation({
    mutationFn: (bookingId) => axiosSecure.delete(`/bookings/${bookingId}`),
    onSuccess: () => {
      Swal.fire('Booking cancelled', '', 'success');
      queryClient.invalidateQueries({ queryKey: ['bookings', user.email] });
    },
    onError: () => {
      Swal.fire('Error cancelling booking', '', 'error');
    },
  });

  const handleCancel = (bookingId) => {
    Swal.fire({
      title: 'Cancel Booking?',
      text: 'Are you sure you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(bookingId);
      }
    });
  };

  if (isLoading)
    return <p className="text-center py-10">Loading your bookings...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-600">Failed to load bookings.</p>
    );

  return (
    <div className="max-w-90% mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-200 text-center">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No bookings found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#bdc3c7] dark:bg-gray-800 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                <th className="py-3 px-4 text-left">Package</th>
                <th className="py-3 px-4 text-left">Tour Guide</th>
                <th className="py-3 px-4 text-left">Tour Date</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="py-3 px-4">{booking.packageTitle.slice(0,55 )+'...'}</td>
                  <td className="py-3 px-4">{booking.guideName}</td>
                  <td className="py-3 px-4">
                    {new Date(booking.tourDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">${booking.price}</td>
                  <td className="py-3 px-4 capitalize">
                    {booking.bookingStatus}
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    {booking.bookingStatus === 'pending' && (
                      <>
                        <Link
                          to={`/payment/${booking._id}`}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md"
                        >
                          Pay
                        </Link>
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
