import { NavLink } from 'react-router';
import DeshGo from '../DeshGo/DeshGo';
import DarkMode from '../DarkMode/DarkMode';
import UseAuth from '../../Hooks/UseAuth';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
      }
    })
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-xl ${
              isActive
                ? 'text-green-500 font-semibold border-b-4 border-green-500'
                : 'text-gray-700 dark:text-gray-300 hover:text-green-500'
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/community"
          className={({ isActive }) =>
            `text-xl ${
              isActive
                ? 'text-green-500 font-semibold border-b-4 border-green-500'
                : 'text-gray-700 dark:text-gray-300 hover:text-green-500'
            }`
          }
        >
          Community
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-xl ${
              isActive
                ? 'text-green-500 font-semibold border-b-4 border-green-500'
                : 'text-gray-700 dark:text-gray-300 hover:text-green-500'
            }`
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/trips"
          className={({ isActive }) =>
            `text-xl ${
              isActive
                ? 'text-green-500 font-semibold border-b-4 border-green-500'
                : 'text-gray-700 dark:text-gray-300 hover:text-green-500'
            }`
          }
        >
          Trips
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-[#FAEED1] dark:bg-gray-900 shadow-md px-4 transition-colors duration-300">
      {/* Left - Logo */}
      <div className="navbar-start">
        <DeshGo />
      </div>

      {/* Center - Links (Desktop Only) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6">{links}</ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end gap-2">
        {/* Mobile Menu Icon */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#AF3E3E] dark:text-gray-300"
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
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white dark:bg-gray-800 rounded-box w-52"
          >
            {links}
            {!user && (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="text-lg dark:text-gray-200 hover:text-green-500"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="text-lg dark:text-gray-200 hover:text-green-500"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* DarkMode Toggle (Always visible) */}
        <DarkMode />

        {/* Profile Dropdown */}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-green-400 ring-offset-2 ring-offset-base-100">
                <img
                  src={user?.photoURL || 'https://i.pravatar.cc/150?img=1'}
                  alt="User Avatar"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-box w-56"
            >
              <li className="text-sm font-medium text-black dark:text-gray-200">
                {user?.displayName || 'Unnamed User'}
              </li>
              <li className="text-xs mb-2 text-black dark:text-gray-400">
                {user?.email || 'No Email'}
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `text-black ${
                      isActive
                        ? 'dark:text-green-400 font-semibold'
                        : 'dark:text-gray-200 hover:text-green-500'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/offers"
                  className={({ isActive }) =>
                    `text-black ${
                      isActive
                        ? 'dark:text-green-400 font-semibold'
                        : 'dark:text-gray-200 hover:text-green-500'
                    }`
                  }
                >
                  Offer Announcements
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="text-red-500">Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="hidden lg:flex gap-2">
            <NavLink
              to="/login"
              className="btn btn-outline btn-sm dark:border-gray-300 dark:text-gray-300"
            >
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-primary btn-sm">
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
