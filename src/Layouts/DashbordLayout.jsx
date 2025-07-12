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
} from 'react-icons/fa';
import DeshGo from '../Shared/DeshGo/DeshGo';
import DarkMode from '../Shared/DarkMode/DarkMode';

const DashbordLayout = () => {
  const role = 'admin';
  const roleLoading = false;

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar for small screens */}
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

        {/* Main content */}
        <div className="p-4 bg-white dark:bg-gray-800 dark:text-white min-h-screen">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 dark:bg-gray-900 dark:text-gray-200 space-y-2">
          {/* Logo */}
          <DeshGo />
          <DarkMode />

          {/* Common Links */}
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 ${
                  isActive
                    ? 'bg-yellow-400 text-gray-900 dark:bg-yellow-600 dark:text-white'
                    : 'hover:bg-yellow-200 dark:hover:bg-yellow-700'
                }`
              }
            >
              <FaHome />
              <span>Dashboard Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manage-profile"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 ${
                  isActive
                    ? 'bg-yellow-400 text-gray-900 dark:bg-yellow-600 dark:text-white'
                    : 'hover:bg-yellow-200 dark:hover:bg-yellow-700'
                }`
              }
            >
              <FaUserCog />
              <span>Manage Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manage-profile"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 ${
                  isActive
                    ? 'bg-yellow-400 text-gray-900 dark:bg-yellow-600 dark:text-white'
                    : 'hover:bg-yellow-200 dark:hover:bg-yellow-700'
                }`
              }
            >
              <FaRegCalendarCheck />
              <span>My Bookings</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/add-stories"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 ${
                  isActive
                    ? 'bg-yellow-400 text-gray-900 dark:bg-yellow-600 dark:text-white'
                    : 'hover:bg-yellow-200 dark:hover:bg-yellow-700'
                }`
              }
            >
              <FaPlusCircle />
              <span>Add Stories</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manage-stories"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 ${
                  isActive
                    ? 'bg-yellow-400 text-gray-900 dark:bg-yellow-600 dark:text-white'
                    : 'hover:bg-yellow-200 dark:hover:bg-yellow-700'
                }`
              }
            >
              <FaBookOpen />
              <span>Manage Stories</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/join-as-tour-guide"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 ${
                  isActive
                    ? 'bg-yellow-400 text-gray-900 dark:bg-yellow-600 dark:text-white'
                    : 'hover:bg-yellow-200 dark:hover:bg-yellow-700'
                }`
              }
            >
              <FaUserPlus />
              <span>Join as tour guide</span>
            </NavLink>
          </li>

          {/* Rider Specific Links */}
          {!roleLoading && role === 'rider' && (
            <>
              <div className="divider border-gray-400 dark:border-gray-600">
                Rider Panel
              </div>
              <li>
                <NavLink
                  to="/dashboard/pending-deliveries"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md px-3 py-2 ${
                      isActive
                        ? 'bg-yellow-400 text-gray-900 dark:bg-yellow-600 dark:text-white'
                        : 'hover:bg-yellow-200 dark:hover:bg-yellow-700'
                    }`
                  }
                >
                  <FaBoxOpen />
                  <span>Pending Deliveries</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/completed-deliveries"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md px-3 py-2 ${
                      isActive
                        ? 'bg-yellow-400 text-gray-900 dark:bg-yellow-600 dark:text-white'
                        : 'hover:bg-yellow-200 dark:hover:bg-yellow-700'
                    }`
                  }
                >
                  <FaHistory />
                  <span>Completed Deliveries</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-earnings"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md px-3 py-2 ${
                      isActive
                        ? 'bg-yellow-400 text-gray-900 dark:bg-yellow-600 dark:text-white'
                        : 'hover:bg-yellow-200 dark:hover:bg-yellow-700'
                    }`
                  }
                >
                  <FaMoneyBillWave />
                  <span>My Earnings</span>
                </NavLink>
              </li>
            </>
          )}

          {/* Admin Specific Links */}
          {!roleLoading && role === 'admin' && (
            <>
              <div className="divider border-gray-400 dark:border-gray-600">
                Admin Panel
              </div>
              <li>
                <NavLink
                  to="/dashboard/assign-rider"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md px-3 py-2 ${
                      isActive
                        ? 'bg-yellow-400 text-gray-900 dark:bg-yellow-600 dark:text-white'
                        : 'hover:bg-yellow-200 dark:hover:bg-yellow-700'
                    }`
                  }
                >
                  <FaMotorcycle />
                  <span>Assign Rider</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/active-riders"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md px-3 py-2 ${
                      isActive
                        ? 'bg-yellow-400 text-gray-900 dark:bg-yellow-600 dark:text-white'
                        : 'hover:bg-yellow-200 dark:hover:bg-yellow-700'
                    }`
                  }
                >
                  <FaUserCheck />
                  <span>Active Riders</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/pending-riders"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md px-3 py-2 ${
                      isActive
                        ? 'bg-yellow-400 text-gray-900 dark:bg-yellow-600 dark:text-white'
                        : 'hover:bg-yellow-200 dark:hover:bg-yellow-700'
                    }`
                  }
                >
                  <FaUserClock />
                  <span>Pending Riders</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/make-admin"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md px-3 py-2 ${
                      isActive
                        ? 'bg-yellow-400 text-gray-900 dark:bg-yellow-600 dark:text-white'
                        : 'hover:bg-yellow-200 dark:hover:bg-yellow-700'
                    }`
                  }
                >
                  <FaUserShield />
                  <span>Make Admin</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashbordLayout;
