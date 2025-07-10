import { Outlet } from 'react-router';
import registerlottie from '../assets/Lotties/Register.json';
import DeshGo from '../Shared/DeshGo/DeshGo';
import Lottie from 'lottie-react';
import DarkMode from '../Shared/DarkMode/DarkMode';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 p-6 flex flex-col items-center justify-center">
      {/* Logo */}

      <div className="mt-20 mr-30  md:mr-60">
        <DeshGo />
      </div>
     
      {/* Auth Content */}
      <div className="flex flex-col lg:flex-row-reverse items-center gap-10 max-w-6xl w-full">
        {/* Lotties*/}

        {/* Outlet for nested auth routes */}
        <div className=" flex-1 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
