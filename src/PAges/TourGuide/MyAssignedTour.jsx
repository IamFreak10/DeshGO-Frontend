import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import UseAuth from '../../Hooks/UseAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyAssignedTour = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: assignedTours = [], isLoading } = useQuery({
    queryKey: ['assignedTours'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myAssignedBookings?email=${user?.email}`);
      return res.data;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/assigned-tours/${id}`, { bookingStatus: status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['assignedTours']);
    }
  });

  const handleAccept = (id) => {
    updateStatusMutation.mutate({ id, status: 'accepted' });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are rejecting this tour!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reject it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ id, status: 'rejected' });
      }
    });
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">My Assigned Tours</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border rounded-xl overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-2 text-left">Package Name</th>
              <th className="px-4 py-2 text-left">Tourist Name</th>
              <th className="px-4 py-2 text-left">Tour Date</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Booking Status</th>
              <th className="px-4 py-2 text-left">Paid Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignedTours.map((tour) => (
              <tr key={tour._id} className="border-t dark:border-gray-600">
                <td className="px-4 py-2">{tour.packageTitle}</td>
                <td className="px-4 py-2">{tour.touristName}</td>
                <td className="px-4 py-2">{new Date(tour.tourDate).toLocaleDateString()}</td>
                <td className="px-4 py-2">৳{tour.price}</td>
                <td className="px-4 py-2 capitalize">{tour.bookingStatus}</td>
                <td className="px-4 py-2 capitalize">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      tour.paymentStatus === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {tour.paymentStatus || 'unpaid'}
                  </span>
                </td>
                <td className="px-4 py-2 flex items-center justify-center gap-2">
                  <button
                    disabled={tour.bookingStatus !== 'in-review'}
                    onClick={() => handleAccept(tour._id)}
                    className={`px-4 py-1 rounded-xl text-white text-sm font-medium ${
                      tour.bookingStatus === 'in-review'
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(tour._id)}
                    disabled={tour.bookingStatus !== 'in-review'}
                    className={`px-4 py-1 rounded-xl text-white text-sm font-medium ${
                      tour.bookingStatus === 'in-review'
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {assignedTours.length === 0 && (
          <p className="text-center py-6 text-gray-500">No assigned tours found.</p>
        )}
      </div>
    </div>
  );
};

export default MyAssignedTour;
