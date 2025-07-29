import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import UseAuth from './UseAuth';

const axiosSecure = axios.create({
  baseURL: 'https://y-theta-seven.vercel.app',
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, logOut } = UseAuth();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if(!user?.accessToken){
          throw new axios.Cancel('Token is not ready yet')
        }
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error.response?.status;
        if (status === 403) {
          navigate('/forbidden');
        } else if (status === 401) {
          logOut().then(() => {
            navigate('/login');
          });
        }
        return Promise.reject(error); // Important!
      }
    );

    // Cleanup: eject interceptors on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
