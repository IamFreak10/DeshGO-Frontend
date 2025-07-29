import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Fade } from 'react-awesome-reveal';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import registerLottie from '../../../assets/Lotties/RegisterAn.json';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SocialLogin from '../../../Shared/SocialLogin/SocialLogin';
import DarkMode from '../../../Shared/DarkMode/DarkMode';
import UseAuth from '../../../Hooks/UseAuth';
import { useNavigate } from 'react-router';
import useImageUpload from '../../../Hooks/useImageUpload';
import useAxios from '../../../Hooks/UseAxios';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const { createUser, logOut, updateUser } = UseAuth();
  const { uploadImage } = useImageUpload();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=]).{6,}$/;

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

 
    const url=await uploadImage(file);
    if(url){
      setImageUrl(url);
    }
  };

  const onSubmit = (data) => {
    if (!imageUrl) {
      return Swal.fire(
        'Error',
        'Profile image is required.It Might take some time.WAIT',
        'error'
      );
    }

    if (!passwordRegex.test(data.password)) {
      setPasswordValid(false);
      return Swal.fire(
        'Error',
        'Password must have at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 6 characters long.',
        'error'
      );
    }

    createUser(data.email, data.password)
      .then(async () => {
        // Save user info to the database,default user role is user
        const userInfo = {
          email: data.email,
          displayName: data.name,
          role: 'user',
          created_at: new Date().toISOString(),
          image: imageUrl,
        };
        const userReg = await axiosInstance.post('/users', userInfo);
        console.log(userReg);

        //Update user for display Profile Pic
        const userprofile = {
          displayName: data.name,
          photoURL: imageUrl,
        };
        updateUser(userprofile).then(() => {
          if (userReg.data.insertedId) {
            logOut();
            reset();
            navigate('/login');
            Swal.fire(
              'Success',
              'Registration successful. Please log in.',
              'success'
            );
          }
        });
      })
      .catch((error) => {
        Swal.fire('Registration Failed', error.message, 'error');
      });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPasswordValid(passwordRegex.test(value));
  };

  return (
    <Fade triggerOnce direction="up" duration={1000}>
      <div className="hero min-h-screen px-4">
        <div className="hero-content flex-col-reverse md:flex-row-reverse gap-8 w-full max-w-6xl">
          {/* Lottie Animation */}
          <div className="w-full md:w-1/2">
            <DarkMode />
            <Lottie
              animationData={registerLottie}
              loop
              className="w-full h-full max-h-[400px] md:max-h-[500px] mx-auto"
            />
          </div>

          {/* Register Form */}
          <div className="card w-full md:w-1/2 dark:bg-[#213047] shadow-2xl bg-white">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h1 className="text-4xl font-bold text-black dark:text-accent text-center">
                Register Now!
              </h1>

              {/* Name */}
              <label className="label text-black dark:text-accent">Name</label>
              <input
                type="text"
                {...register('name', { required: true })}
                className="input bg-gray-100 dark:bg-gray-600 w-full text-black dark:text-gray-200"
                placeholder="Your Name"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">Name is required.</span>
              )}

              {/* Email */}
              <label className="label text-black dark:text-accent">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="input bg-gray-100 dark:bg-gray-600 w-full text-black dark:text-gray-200"
                placeholder="Your Email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Email is required.</span>
              )}

              {/* Password */}
              <label className="label text-black dark:text-accent">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: true })}
                  onChange={handlePasswordChange}
                  className="input bg-gray-100 dark:bg-gray-600 w-full text-black dark:text-gray-200"
                  placeholder="Password"
                />
                <span
                  onClick={handleShowPassword}
                  className="absolute top-3 right-4 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {!passwordValid && (
                <p className="text-red-500 text-sm mt-1">
                  Password must have at least one lowercase letter, one
                  uppercase letter, one number, one special character, and be at
                  least 6 characters long.
                </p>
              )}

              {/* Image Upload */}
              <label className="label text-black dark:text-accent">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-sm bg-gray-100 dark:bg-gray-600 w-full text-black dark:text-gray-200"
                onChange={handleImageUpload}
              />

              {/* Submit */}
              <button className="btn dark:btn-accent mt-4">Register</button>

              {/* Link & Social */}
              <p className="text-sm mt-2 text-center text-blue-500">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="text-primary dark:text-green-500 underline"
                >
                  Login here
                </a>
              </p>
              <SocialLogin />
            </form>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default Register;
