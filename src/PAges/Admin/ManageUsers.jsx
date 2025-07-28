import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';

const ManageUsers = () => {
  const { register } = useForm();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', search, selectedRole],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`, {
        params: {
          search,
          role: selectedRole,
        },
      });
      return res.data;
    },
  });

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl text-black dark:text-white font-bold text-center ">Manage Users</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:max-w-sm bg-base-100 text-base-content"
        />
        <select
          {...register('role')}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="select select-bordered w-full md:max-w-xs bg-base-100 text-base-content"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="tourguide">Tour Guide</option>
          <option value="user">Tourist</option>
        </select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="text-center text-base-content font-medium">Loading...</div>
      ) : users.length === 0 ? (
        <div className="text-center text-base-content font-medium">No users found.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow border border-base-300">
          <table className="table   w-full text-base-content">
            <thead className="bg-base-200 text-base text-base-content">
              <tr>
                <th>#</th>
                <th className="min-w-[120px]">Name</th>
                <th className="min-w-[180px]">Email</th>
                <th>Photo</th>
                <th className="min-w-[100px]">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr className='bg-gray-500 hover:bg-base-200' key={user._id}>
                  <td>{idx + 1}</td>
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td>
                    <img
                      src={user.image}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full object-cover border border-base-300"
                    />
                  </td>
                  <td className="capitalize">{user.role || 'tourist'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
