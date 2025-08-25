import React from 'react';
import { NavLink, Outlet } from 'react-router';
import {
  FaHome,
  FaBoxOpen,
  FaHistory,
  FaSearchLocation,
  FaUserEdit,
  FaMotorcycle,
  FaUserCheck,
  FaUserClock,
  FaUserShield,
  FaMoneyBillWave,
  FaUserCog,
  FaBookOpen,
  FaRegCalendarCheck,
  FaPlusCircle,
  FaUserPlus,
  FaUsers,
  FaUserTie,
  FaClipboardList,
  FaClipboardCheck,
  FaMapMarkedAlt,
} from 'react-icons/fa';
import DeshGo from '../Shared/DeshGo/DeshGo';
import DarkMode from '../Shared/DarkMode/DarkMode';
import useUserRole from '../Hooks/useUserRole';
import TouristProfile from '../PAges/Tourist/TouristProfile';

const DashbordLayout = () => {
  const { role} = useUserRole();
  

  if (role) {
    return (
      <div className="drawer lg:drawer-open">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content flex flex-col">
          <div className="navbar bg-base-300 dark:bg-gray-900 lg:hidden">
            <div className="flex-none">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-square btn-ghost dark:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 text-xl font-bold text-gray-900 dark:text-white">
              DeshGO Dashboard
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 dark:text-white min-h-screen">
          
            <Outlet />
          </div>
        </div>

        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 dark:bg-gray-900 dark:text-gray-200 space-y-2">
            <DeshGo />
            <DarkMode />

            {/* Common Links */}
            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) => navClass(isActive)}
              >
                <FaHome />
                <span>Dashboard Home</span>
              </NavLink>
            </li>
           

            {/*Show A reloader*/}
          
            {/* Tourist Links */}
            {role === 'user' && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/my-bookings"
                    className={({ isActive }) => navClass(isActive)}
                  >
                    <FaRegCalendarCheck />
                    <span>My Bookings</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/add-stories"
                    className={({ isActive }) => navClass(isActive)}
                  >
                    <FaPlusCircle />
                    <span>Add Stories</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-stories"
                    className={({ isActive }) => navClass(isActive)}
                  >
                    <FaBookOpen />
                    <span>Manage Stories</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/join-as-tour-guide"
                    className={({ isActive }) => navClass(isActive)}
                  >
                    <FaUserPlus />
                    <span>Join as Tour Guide</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Tour Guide Links */}
            {role === 'tourguide' && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/my-assigned-tours"
                    className={({ isActive }) => navClass(isActive)}
                  >
                    <FaClipboardCheck />
                    <span>My Assigned Tours</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/add-stories"
                    className={({ isActive }) => navClass(isActive)}
                  >
                    <FaPlusCircle />
                    <span>Add Stories</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-stories"
                    className={({ isActive }) => navClass(isActive)}
                  >
                    <FaBookOpen />
                    <span>Manage Stories</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Admin Links */}
            {role === 'admin' && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/add-package"
                    className={({ isActive }) => navClass(isActive)}
                  >
                    <FaMapMarkedAlt />
                    <span>Add Package</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-users"
                    className={({ isActive }) => navClass(isActive)}
                  >
                    <FaUsers />
                    <span>Manage Users</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-candidates"
                    className={({ isActive }) => navClass(isActive)}
                  >
                    <FaUserTie />
                    <span>Manage Candidates</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/add-stories"
                    className={({ isActive }) => navClass(isActive)}
                  >
                    <FaPlusCircle />
                    <span>Add Stories</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-stories"
                    className={({ isActive }) => navClass(isActive)}
                  >
                    <FaBookOpen />
                    <span>Manage Stories</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    );
  }
};

const navClass = (isActive) =>
  `flex items-center gap-2 rounded-md px-3 py-2 ${
    isActive
      ? 'bg-yellow-400 text-gray-900 dark:bg-yellow-600 dark:text-white'
      : 'hover:bg-yellow-200 hover:text-gray-900 dark:hover:bg-yellow-700'
  }`;

export default DashbordLayout;
