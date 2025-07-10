import { Outlet } from 'react-router-dom';
import authImage from '../assets/authImage.png';
import DeshGo from '../Shared/DeshGo/DeshGo';


const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-base-200 p-6 flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="mb-6">
        <DeshGo />
      </div>

      {/* Auth Content */}
      <div className="flex flex-col lg:flex-row-reverse items-center gap-10 max-w-6xl w-full">
        {/* Image */}
        <div className="flex-1">
          <img
            src={authImage}
            alt="Authentication Visual"
            className="w-full rounded-2xl shadow-2xl"
          />
        </div>

        {/* Outlet for nested auth routes */}
        <div className="flex-1 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
