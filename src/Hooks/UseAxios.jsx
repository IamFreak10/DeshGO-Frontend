import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://y-theta-seven.vercel.app',
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
