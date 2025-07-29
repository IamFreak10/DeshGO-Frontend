import { useQuery } from '@tanstack/react-query';

import UseAuth from './UseAuth';
import useAxios from './UseAxios';

const useUserRole = () => {
  const { user, loading: authLoading } = UseAuth();
  const axiosInstance = useAxios();

  const {
    data: role = 'user',
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.email}?fields=role`);
      return res.data.role;
    },
  });

  return { role, roleLoading: authLoading || roleLoading, refetch };
};

export default useUserRole;
