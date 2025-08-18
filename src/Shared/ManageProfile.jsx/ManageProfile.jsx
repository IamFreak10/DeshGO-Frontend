import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog } from '@headlessui/react';
import { FaEdit } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useImageUpload from '../../Hooks/useImageUpload';
import UseAuth from '../../Hooks/UseAuth';
import Swal from 'sweetalert2';

const ManageProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUser } = UseAuth();
  const { uploadImage } = useImageUpload();
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [formData, setFormData] = useState({});
  const queryClient = useQueryClient();

  const { data: userInfo = {} } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const patchMutation = useMutation({
    mutationFn: (updatedData) =>
      axiosSecure
        .patch(`/users/${userInfo._id}`, updatedData)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(['userInfo']);
      setIsOpen(false);
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Failed to update profile',
      });
    },
  });

  const handleEdit = () => {
    setFormData({
      name: userInfo.name || '',
      phone: userInfo.phone || '',
      address: userInfo.address || '',
    });
    setImageUrl(userInfo.image || '');
    setIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (file) => {
    const url = await uploadImage(file);
    if (url) setImageUrl(url);
  };

  const handleImageDelete = () => {
    setImageUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData, image: imageUrl };

    try {
      const userprofile = {
          displayName: formData.name,
          photoURL: imageUrl,
        };
      // First update Firebase Auth
      await updateUser(userprofile).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
        })
       
      })
      // Then update your database
      patchMutation.mutate(updatedData);
    } catch (err) {
      console.error('Firebase update failed:', err);
      Swal.fire({
        icon: 'error',
        title: 'Firebase update failed!',
        text: err.message,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-200 dark:bg-gray-900 p-6  rounded-xl shadow-2xl">
      <div className="flex flex-col items-center text-center space-y-4">
        <img
          src={userInfo.image || ''}
          alt="user"
          className="w-28 h-28 rounded-full object-cover border-4"
        />
        <h2 className="text-xl font-semibold">{userInfo.name || ''}</h2>
        <p className="text-sm text-gray-500">{userInfo.email || ''}</p>
        <p className="text-sm text-gray-500 capitalize">
          Role: {userInfo.role || ''}
        </p>
        <button onClick={handleEdit} className="btn btn-sm btn-primary">
          <FaEdit className="mr-1" /> Edit
        </button>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="w-full max-w-md p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Edit Profile
            </Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Name"
              />

              <input
                disabled
                value={userInfo.email || ''}
                className="input input-bordered w-full"
                placeholder="Email"
              />
              <input
                disabled
                value={userInfo.role || ''}
                className="input input-bordered w-full capitalize"
                placeholder="Role"
              />

            
              

              <div className="space-y-2">
                <input
                  type="file"
                  name="image"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  className="file-input file-input-bordered w-full"
                />
                {imageUrl && (
                  <div className="relative w-28 h-28">
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      className="rounded-full object-cover border w-28 h-28"
                    />
                    <button
                      type="button"
                      onClick={handleImageDelete}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Update
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageProfile;
