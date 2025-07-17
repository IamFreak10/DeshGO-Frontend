import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import LoginLottie from '../../../assets/Lotties/Login.json';
import Lottie from 'lottie-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Fade } from 'react-awesome-reveal';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import SocialLogin from '../../../Shared/SocialLogin/SocialLogin';
import DarkMode from '../../../Shared/DarkMode/DarkMode';
import UseAuth from '../../../Hooks/UseAuth';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';
  const { signIn, resetPassword } = UseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    const { email, password } = data;

    signIn(email, password)
      .then(() => {
        Swal.fire('Success', 'Login Successfully', 'success');
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error.message);
        Swal.fire('Error', error.message, 'error');
      });
  };

  const handleForgotPassword = async () => {
    const email = getValues('email');
    if (!email) {
      Swal.fire('Warning', 'Please enter your email to reset password.', 'warning');
      return;
    }

    try {
      await resetPassword(email);
      Swal.fire({
        icon: 'success',
        title: 'Email Sent',
        text: 'Redirecting to your inbox...',
        timer: 2500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        // Redirect based on email domain
        if (email.includes('@gmail.com')) {
          window.open('https://mail.google.com', '_blank');
        } else if (email.includes('@yahoo.com')) {
          window.open('https://mail.yahoo.com', '_blank');
        } else if (
          email.includes('@outlook.com') ||
          email.includes('@hotmail.com') ||
          email.includes('@live.com')
        ) {
          window.open('https://outlook.live.com', '_blank');
        } else {
          window.open('https://www.google.com/search?q=check+email+inbox', '_blank');
        }
      }, 2500);
    } catch (error) {
      console.error(error.message);
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <Fade triggerOnce direction="up" duration={1000}>
      <DarkMode />
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-10 max-w-6xl w-full">
          {/* Lottie Animation */}
          <div className="w-full lg:w-1/2">
            <Lottie
              animationData={LoginLottie}
              loop
              className="w-full max-w-md mx-auto"
            />
          </div>

          {/* Form Card */}
          <div className="w-full lg:w-1/2 bg-white dark:bg-[#1e293b] shadow-xl rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-center text-black dark:text-green-400 mb-6">
              Login Now!
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="Enter your email"
                className="input input-bordered w-full mb-1 bg-gray-100 dark:bg-gray-200 text-gray-900"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mb-3">
                  {errors.email.message}
                </p>
              )}

              {/* Password */}
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative mb-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: 'Password is required' })}
                  placeholder="Enter your password"
                  className="input input-bordered w-full bg-gray-100 dark:bg-gray-200 text-gray-900"
                />
                <span
                  onClick={handleShowPassword}
                  className="absolute right-3 top-3 cursor-pointer text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mb-1">
                  {errors.password.message}
                </p>
              )}

              {/* Forgot Password */}
              <p className="flex text-right text-sm mb-4 text-gray-600 dark:text-gray-400">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-primary dark:text-green-400 font-semibold hover:underline"
                >
                  Forgot Password?
                </button>
              </p>

              {/* Register Link */}
              <div className="text-sm mb-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="text-primary dark:text-green-400 font-semibold hover:underline"
                  >
                    Register Now
                  </Link>
                </p>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn w-full dark:btn-accent">
                Log In
              </button>
            </form>

            {/* Social Logins */}
            <div className="mt-6">
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default Login;
